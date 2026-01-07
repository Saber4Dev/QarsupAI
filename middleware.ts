/**
 * Next.js Middleware
 * 
 * Security Features:
 * - Security headers only
 * - Request validation
 * 
 * IMPORTANT: Rate limiting is NOT handled in middleware.
 * Rate limiting must be implemented inside individual API routes
 * (e.g., /app/api/route.ts) to avoid breaking App Router navigation.
 *
 * Why middleware rate limiting breaks App Router:
 * - Next.js App Router makes multiple RSC (React Server Components) GET requests
 * - These requests have ?rsc= query parameters
 * - Middleware rate limiting would block these requests, causing 429 errors
 * - Pages, layouts, and navigation would all be affected
 * - Rate limiting should only apply to specific API endpoints, not page navigation
 */

import { NextRequest, NextResponse } from 'next/server';

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
  // Skip middleware for static files, images, and assets
  // This improves performance by not processing static resources
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/images/') ||
    pathname === '/favicon.ico' ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|otf|json|xml|pdf|zip|mp4|mp3|wav|ogg)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }
  
  // Create response - ALL requests proceed normally
  // NO rate limiting, NO blocking, NO 429 responses
  const response = NextResponse.next();
  
  // Add security headers only
  Object.entries(getSecurityHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Middleware matcher
 * - Match all routes (exclusions handled in middleware function)
 * - Static files, images, and assets are skipped in the middleware function
 * - NO rate limiting in middleware - all requests proceed normally
 * - Rate limiting must be implemented in individual API routes if needed
 */
export const config = {
  matcher: [
    /*
     * Match all routes - exclusions are handled in the middleware function
     * This avoids regex capturing group issues in the matcher
     */
    '/(.*)',
  ],
};

