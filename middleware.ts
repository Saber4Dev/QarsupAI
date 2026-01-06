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
  let endpointType = 'general';
  
  // Determine endpoint type for rate limiting
  if (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/reset-password')) {
    endpointType = 'auth';
  } else if (pathname.startsWith('/contact') && request.method === 'POST') {
    endpointType = 'contact';
  } else if (pathname.startsWith('/api/ai') && request.method === 'POST') {
    endpointType = 'ai'; // AI generation endpoints need stricter rate limiting
  }
  
  // Apply rate limiting (only check once)
  const rateLimitResponse = rateLimit(request, endpointType);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }
  
  // Create response with security headers
  const response = NextResponse.next();
  
  // Add security headers
  Object.entries(getSecurityHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Middleware matcher
 * - Apply to all routes except static files and API routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * 
     * Note: API routes are included for rate limiting
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};

