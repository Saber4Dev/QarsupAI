/**
 * Next.js Middleware
 * 
 * Security Features:
 * - Rate limiting for auth endpoints
 * - Security headers
 * - Request validation
 */

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from './src/lib/rate-limit';

/**
 * Security headers configuration
 * Following OWASP best practices
 */
function getSecurityHeaders(): Record<string, string> {
  return {
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    // XSS protection
    'X-Content-Type-Options': 'nosniff',
    // Prevent MIME type sniffing
    'X-XSS-Protection': '1; mode=block',
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: Consider removing unsafe-* in production
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co",
      "frame-src 'self' https://www.google.com",
      "frame-ancestors 'none'",
    ].join('; '),
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Permissions policy
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    // Strict transport security (only in production with HTTPS)
    ...(process.env.NODE_ENV === 'production' && {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    }),
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only apply rate limiting to these specific endpoints:
  // 1. Gemini API (AI generation)
  // 2. POST requests to login/signup/reset-password
  // Everything else (including images, pages, etc.) is NOT rate limited
  
  let endpointType: string | null = null;
  
  // Rate limit only these specific endpoints:
  if (pathname === '/api/ai/generate' && request.method === 'POST') {
    endpointType = 'ai';
  } else if (
    (pathname === '/login' || pathname === '/signup' || pathname === '/reset-password') &&
    request.method === 'POST'
  ) {
    endpointType = 'auth';
  }
  
  // Apply rate limiting only for the specific endpoints above
  if (endpointType) {
    const rateLimitResponse = rateLimit(request, endpointType);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  }
  
  // For all other routes, just add security headers (no rate limiting)
  const response = NextResponse.next();
  
  // Add security headers
  Object.entries(getSecurityHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Middleware matcher
 * - Exclude all static files, images, and assets
 * - Only process HTML pages and API routes
 * - Rate limiting only applies to specific endpoints in the middleware function
 */
export const config = {
  matcher: [
    /*
     * Exclude:
     * - _next/static and _next/image (Next.js static files)
     * - /images/ directory (all images)
     * - All file extensions (images, fonts, media, etc.)
     * 
     * This ensures images load normally without any middleware interference
     */
    '/((?!_next/static|_next/image|images/|favicon\\.ico|.*\\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|otf|json|xml|pdf|zip|mp4|mp3|wav|ogg)$).*)',
  ],
};

