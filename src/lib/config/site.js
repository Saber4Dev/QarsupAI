/**
 * Site Configuration
 * Centralized site URL configuration from environment variables
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qarsup-ai.com';

export const siteConfig = {
  url: siteUrl,
  name: 'Qarsup AI',
  email: 'support@qarsup-ai.com',
};
