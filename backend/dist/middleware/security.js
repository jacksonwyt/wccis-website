"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSecurityMiddleware = void 0;
// src/middleware/security.ts
const csrf_csrf_1 = require("csrf-csrf");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const { generateToken, doubleCsrfProtection } = (0, csrf_csrf_1.doubleCsrf)({
    getSecret: () => process.env.CSRF_SECRET || 'your-secret-key',
    cookieName: 'csrf-token',
    cookieOptions: {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    }
});
const configureSecurityMiddleware = (app) => {
    // Basic security headers
    app.use((0, helmet_1.default)());
    // Configure CSP
    app.use(helmet_1.default.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", 'https:', 'data:'],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    }));
    // Rate limiting
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }));
    // Form submission rate limiter
    const formLimiter = (0, express_rate_limit_1.default)({
        windowMs: 60 * 60 * 1000, // 1 hour
        max: 10 // limit each IP to 10 form submissions per hour
    });
    // Apply form rate limiting to specific routes
    app.use(['/api/contact', '/api/insure'], formLimiter);
    // CSRF Protection - exclude health check routes
    app.use((req, res, next) => {
        // Skip CSRF protection for health check routes
        if (req.path === '/api/health' || req.path === '/api/health/') {
            return next();
        }
        doubleCsrfProtection(req, res, next);
    });
    // Add CSRF token to response - exclude health check routes
    app.use((req, res, next) => {
        // Skip adding CSRF token for health check routes
        if (req.path === '/api/health' || req.path === '/api/health/') {
            return next();
        }
        res.cookie('XSRF-TOKEN', generateToken(req, res), {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        next();
    });
    return { formLimiter };
};
exports.configureSecurityMiddleware = configureSecurityMiddleware;
