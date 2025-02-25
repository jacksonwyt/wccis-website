import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const rateLimit = {
  windowMs: process.env.NODE_ENV === 'development' ? 1 * 60 * 1000 : 15 * 60 * 1000, // 1 minute in dev, 15 minutes in prod
  max: process.env.NODE_ENV === 'development' ? 1000 : 100 // higher limit in dev mode
};

const rateLimitStore = new Map();

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Basic rate limiting
  const ip = request.headers.get('x-real-ip') || 
             request.headers.get('x-forwarded-for') || 
             request.headers.get('cf-connecting-ip') || 
             'anonymous';
  const now = Date.now();
  const windowStart = now - rateLimit.windowMs;

  // Clean old entries
  for (const [key, timestamp] of rateLimitStore.entries()) {
    if (timestamp < windowStart) {
      rateLimitStore.delete(key);
    }
  }

  // Check rate limit
  const requestCount = [...rateLimitStore.entries()].filter(
    ([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart
  ).length;

  if (requestCount >= rateLimit.max) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Record request
  rateLimitStore.set(`${ip}-${now}`, now);

  // Add security headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  };

  // Add headers to response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add caching headers for static assets
  if (request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
