import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Express, Request, Response, NextFunction } from 'express';

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

  // Mock CSRF protection middleware
  // In a real app, we'd use csurf or a similar package
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Add a mock csrfToken function to the request
    (req as any).csrfToken = () => {
      return 'mock-csrf-token-for-testing-123456';
    };
    next();
  });

  // CSRF token generation route
  app.get('/api/csrf', (req: Request, res: Response) => {
    res.json({ 
      status: 'success', 
      csrfToken: (req as any).csrfToken() 
    });
  });

  return { formLimiter };
}; 