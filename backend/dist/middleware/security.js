"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireHttps = exports.configureSecurity = exports.generateToken = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const csrf_csrf_1 = require("csrf-csrf");
const errors_1 = require("../types/errors");
// Set up rate limiter: maximum of 100 requests per minute
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after a minute',
    skipSuccessfulRequests: false, // Count all requests
});
// CSRF Protection configuration
const { generateToken, doubleCsrfProtection } = (0, csrf_csrf_1.doubleCsrf)({
    getSecret: () => process.env.CSRF_SECRET || 'default-csrf-secret-key',
    cookieName: "csrf-token",
    cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === 'production'
    },
});
exports.generateToken = generateToken;
// CORS options
const corsOptions = {
    origin: (origin, callback) => {
        // In development allow all origins
        if (process.env.NODE_ENV !== 'production') {
            callback(null, true);
            return;
        }
        // In production only allow specific origins
        const allowedOrigins = [
            process.env.FRONTEND_URL || 'https://wccis.com',
            'https://www.wccis.com',
            /\.wccis\.com$/
        ];
        // Check if the origin is allowed
        if (!origin) {
            callback(null, true);
            return;
        }
        const originAllowed = allowedOrigins.some(allowedOrigin => {
            if (typeof allowedOrigin === 'string') {
                return origin === allowedOrigin;
            }
            return allowedOrigin.test(origin);
        });
        if (originAllowed) {
            callback(null, true);
        }
        else {
            callback(new Error('CORS not allowed'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    maxAge: 86400 // 24 hours
};
// Create and configure security middleware
const configureSecurity = () => {
    return [
        // Apply CORS
        (0, cors_1.default)(corsOptions),
        // Apply CSRF Protection
        doubleCsrfProtection,
        // Apply helmet security headers
        (0, helmet_1.default)({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.google-analytics.com', 'https://www.googletagmanager.com'],
                    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                    imgSrc: ["'self'", 'data:', 'https://www.google-analytics.com'],
                    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                    connectSrc: ["'self'", 'https://www.google-analytics.com']
                }
            },
            xssFilter: true,
            noSniff: true,
            referrerPolicy: { policy: 'same-origin' }
        }),
        // Apply rate limiting
        limiter
    ];
};
exports.configureSecurity = configureSecurity;
// Prevent non-SSL traffic in production
const requireHttps = (req, res, next) => {
    if (process.env.NODE_ENV === 'production' &&
        req.headers['x-forwarded-proto'] !== 'https') {
        return next(errors_1.AppError.forbidden('SSL required'));
    }
    next();
};
exports.requireHttps = requireHttps;
