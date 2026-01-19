/**
 * robots.txt Generation for Next.js App Router
 * Controls how search engines crawl your site
 */

import { siteUrl } from '@/lib/config/site';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/checkout/',
          '/login',
          '/signup',
          '/reset-password',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/checkout/',
          '/login',
          '/signup',
          '/reset-password',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
