/**
 * Rate Limiting Middleware
 * 
 * OWASP Best Practices:
 * - IP-based rate limiting
 * - User-based rate limiting (when authenticated)
 * - Graceful 429 responses
 * - Configurable limits per endpoint
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate limit configuration
 * - Different limits for different endpoint types
 */
interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string; // Custom error message
}

// Rate limit configurations per endpoint type
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    message: 'Too many authentication attempts. Please try again later.',
  },
  general: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    message: 'Too many requests. Please slow down.',
  },
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 contact form submissions per hour
    message: 'Too many contact form submissions. Please try again later.',
  },
  ai: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 AI generations per minute (to prevent API abuse)
    message: 'Too many content generation requests. Please wait a moment before generating more content.',
  },
};

/**
 * In-memory store for rate limiting
 * In production, consider using Redis or similar
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up expired entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute

/**
 * Get client identifier for rate limiting
 * - Uses IP address
 * - Can be extended to use user ID when authenticated
 */
function getClientId(request: NextRequest): string {
  // Get IP from headers (considering proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return ip;
}

/**
 * Check if request exceeds rate limit
 */
function checkRateLimit(
  clientId: string,
  endpointType: string = 'general'
): { allowed: boolean; remaining: number; resetTime: number } {
  const config = RATE_LIMITS[endpointType] || RATE_LIMITS.general;
  const key = `${clientId}:${endpointType}`;
  const now = Date.now();
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired one
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }
  
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }
  
  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Rate limit middleware
 * Returns 429 if limit exceeded, otherwise null
 */
export function rateLimit(
  request: NextRequest,
  endpointType: string = 'general'
): NextResponse | null {
  const clientId = getClientId(request);
  const result = checkRateLimit(clientId, endpointType);
  
  if (!result.allowed) {
    const config = RATE_LIMITS[endpointType] || RATE_LIMITS.general;
    const response = NextResponse.json(
      {
        error: config.message || 'Too many requests',
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
      },
      { status: 429 }
    );
    
    // Add rate limit headers (RFC 6585)
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', '0');
    response.headers.set('X-RateLimit-Reset', result.resetTime.toString());
    response.headers.set('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000).toString());
    
    return response;
  }
  
  return null;
}

/**
 * Get rate limit info for response headers
 */
export function getRateLimitHeaders(
  request: NextRequest,
  endpointType: string = 'general'
): Record<string, string> {
  const clientId = getClientId(request);
  const result = checkRateLimit(clientId, endpointType);
  const config = RATE_LIMITS[endpointType] || RATE_LIMITS.general;
  
  return {
    'X-RateLimit-Limit': config.maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetTime.toString(),
  };
}

