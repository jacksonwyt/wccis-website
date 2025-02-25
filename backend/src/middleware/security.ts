// src/middleware/security.ts
import { doubleCsrf } from 'csrf-csrf';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Express } from 'express';

const {
  generateToken,
  doubleCsrfProtection
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'your-secret-key',
  cookieName: 'csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  }
});

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
  
  // Rate limiting
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));

  // Form submission rate limiter
  const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10 // limit each IP to 10 form submissions per hour
  });

  // Apply form rate limiting to specific routes
  app.use(['/api/contact', '/api/insure'], formLimiter);

  // CSRF Protection
  app.use(doubleCsrfProtection);

  // Add CSRF token to response
  app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', generateToken(req, res), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    next();
  });

  return { formLimiter };
};