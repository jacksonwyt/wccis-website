"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSecurityMiddleware = void 0;
// src/middleware/security.ts
const csurf_1 = __importDefault(require("csurf"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
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
    // Create CSRF protection middleware
    const csrfProtection = (0, csurf_1.default)({
        cookie: {
            key: '_csrf', // The name of the cookie to use
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        }
    });
    // CSRF protection middleware
    app.use((req, res, next) => {
        // Skip CSRF protection for health check routes and GET/HEAD requests
        if (req.path === '/api/health' || req.path === '/api/health/' ||
            req.method === 'GET' || req.method === 'HEAD') {
            return next();
        }
        // Apply CSRF protection
        csrfProtection(req, res, next);
    });
    // CSRF token generation route
    app.get('/api/csrf', csrfProtection, (req, res) => {
        return res.json({
            status: 'success',
            csrfToken: req.csrfToken()
        });
    });
    return { formLimiter };
};
exports.configureSecurityMiddleware = configureSecurityMiddleware;
