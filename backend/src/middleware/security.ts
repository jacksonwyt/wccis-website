// backend/src/middleware/security.ts
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import csrf from 'csurf';
import { Express } from 'express';
import { cleanseInput } from '../utils/security';

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Form submission specific rate limiter
export const formRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 form submissions per hour
  message: 'Too many form submissions, please try again later.'
});

// Configure security middleware
export const configureSecurityMiddleware = (app: Express) => {
  // Basic security headers
  app.use(helmet());
  
  // Configure CSP
  app.use(
    helmet.contentSecurityPolicy({
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
    })
  );

  // Enable CSRF protection
  app.use(csrf({ cookie: true }));

  // Add CSRF token to all responses
  app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });

  // Global rate limiter
  app.use(rateLimiter);

  // Form submission rate limiter
  app.use(['/api/contact', '/api/insure', '/api/certificate'], formRateLimiter);
};

// Input sanitization middleware
export const sanitizeInputs = (req: any, res: any, next: any) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = cleanseInput(req.body[key]);
      }
    }
  }
  next();
};