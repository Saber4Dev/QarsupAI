/**
 * SEO Metadata Configuration
 * Centralized metadata configuration for the Qarsup AI website
 */

import { siteUrl } from '@/lib/config/site';

const siteConfig = {
  name: 'Qarsup AI',
  title: 'Qarsup AI - AI Content Platform for Modern Teams',
  description: 'Artificial intelligence makes it fast and easy to create content for your blog, social media, website, and more! The AI content platform for videos, modern teams, and social media.',
  url: siteUrl,
  ogImage: '/images/logo-white.png',
  twitterHandle: '@qarsupai',
  author: 'Qarsup AI',
  keywords: [
    'AI content creation',
    'AI writer',
    'copywriting',
    'content generation',
    'artificial intelligence',
    'AI tools',
    'content marketing',
    'social media content',
    'blog writing',
    'AI copywriting'
  ],
  locale: 'en_US',
  type: 'website',
};

/**
 * Generate metadata object for Next.js App Router
 */
export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  noindex = false,
  nofollow = false,
} = {}) {
  const metaTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.title;
  
  const metaDescription = description || siteConfig.description;
  const metaImage = image || `${siteConfig.url}${siteConfig.ogImage}`;
  const metaUrl = url || siteConfig.url;
  
  const robots = [];
  if (noindex) robots.push('noindex');
  if (nofollow) robots.push('nofollow');
  if (robots.length === 0) robots.push('index', 'follow');

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords || siteConfig.keywords.join(', '),
    authors: authors || [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors: authors.map(a => a.name || a) }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      creator: siteConfig.twitterHandle,
      images: [metaImage],
    },
    alternates: {
      canonical: metaUrl,
    },
    metadataBase: new URL(siteConfig.url),
  };
}

/**
 * Get default metadata for the site
 */
export function getDefaultMetadata() {
  return generateMetadata();
}

/**
 * Page-specific metadata configurations
 */
export const pageMetadata = {
  home: {
    title: 'Qarsup AI - AI Content Platform for Modern Teams',
    description: 'The AI content platform for videos, modern teams, and social media. Create high-quality content fast with artificial intelligence.',
    keywords: ['AI content platform', 'AI writer', 'content creation', 'copywriting AI'],
  },
  about: {
    title: 'About Us - Qarsup AI',
    description: 'Learn about Qarsup AI and how we help teams create amazing content using artificial intelligence. Work smarter with AI-powered content creation.',
    keywords: ['about Qarsup AI', 'AI company', 'content creation team'],
  },
  blog: {
    title: 'Blog - Latest AI Content & Marketing News | Qarsup AI',
    description: 'Stay updated with the latest news, tips, and insights about AI content creation, marketing, and copywriting.',
    keywords: ['AI blog', 'content marketing blog', 'AI news', 'marketing tips'],
  },
  pricing: {
    title: 'Pricing Plans - Qarsup AI',
    description: 'Choose the right pricing plan for your content creation needs. Affordable AI-powered content generation for teams of all sizes.',
    keywords: ['AI pricing', 'content creation pricing', 'AI tools pricing'],
  },
  contact: {
    title: 'Contact Us - Qarsup AI',
    description: 'Get in touch with Qarsup AI. We\'re here to help you with your content creation needs.',
    keywords: ['contact Qarsup AI', 'AI support', 'customer service'],
  },
  services: {
    title: 'Services - AI Content Creation Services | Qarsup AI',
    description: 'Discover our AI-powered content creation services. From blog posts to social media content, we help you create amazing content fast.',
    keywords: ['AI services', 'content creation services', 'copywriting services'],
  },
  privacy: {
    title: 'Privacy Policy - Qarsup AI',
    description: 'Read our privacy policy to understand how Qarsup AI collects, uses, and protects your personal information.',
  },
  terms: {
    title: 'Terms of Service - Qarsup AI',
    description: 'Read our terms of service to understand the rules and regulations for using Qarsup AI.',
  },
  login: {
    title: 'Login - Qarsup AI',
    description: 'Login to your Qarsup AI account to start creating amazing content.',
    noindex: true,
  },
  signup: {
    title: 'Sign Up - Qarsup AI',
    description: 'Sign up for Qarsup AI and start creating amazing content with AI. Free 14-day trial, no credit card required.',
  },
  dashboard: {
    title: 'Dashboard - Qarsup AI',
    description: 'Access your Qarsup AI dashboard to manage your content creation projects.',
    noindex: true,
  },
};

export default siteConfig;
