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
// Note: Only Gemini API and auth endpoints are rate limited
// All other routes (pages, images, etc.) are NOT rate limited
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10, // 10 attempts per 15 minutes
    message: 'Too many authentication attempts. Please try again later.',
  },
  ai: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20, // 20 AI generations per minute
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
  endpointType: string
): { allowed: boolean; remaining: number; resetTime: number } {
  const config = RATE_LIMITS[endpointType];
  
  // If no config found, allow the request (shouldn't happen if middleware is correct)
  if (!config) {
    return {
      allowed: true,
      remaining: Infinity,
      resetTime: Date.now() + 60000,
    };
  }
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
  endpointType: string
): NextResponse | null {
  const clientId = getClientId(request);
  const result = checkRateLimit(clientId, endpointType);
  
  if (!result.allowed) {
    const config = RATE_LIMITS[endpointType];
    
    // Safety check - if no config, allow request
    if (!config) {
      return null;
    }
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
  endpointType: string
): Record<string, string> {
  const clientId = getClientId(request);
  const result = checkRateLimit(clientId, endpointType);
  const config = RATE_LIMITS[endpointType];
  
  // Safety check
  if (!config) {
    return {};
  }
  
  return {
    'X-RateLimit-Limit': config.maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetTime.toString(),
  };
}

