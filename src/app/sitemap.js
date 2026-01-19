/**
 * Sitemap Generation for Next.js App Router
 * Automatically generates sitemap.xml for search engines
 */

import { siteUrl } from '@/lib/config/site';

// Static routes
const staticRoutes = [
  {
    url: '',
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: '/aboutus',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: '/blog',
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: '/pricing',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: '/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: '/services',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: '/helpcenter',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: '/privacy',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: '/terms',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: '/cookies',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  {
    url: '/legal/acceptable-use',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  {
    url: '/legal/data-processing',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  {
    url: '/legal/refund-policy',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
  },
];

// Blog posts (you can fetch these from your database or API)
// For now, using static data
import { blogData } from './data/data';

function generateBlogRoutes() {
  return blogData.map(blog => ({
    url: `/blog-detail/${blog.id}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
}

export default function sitemap() {
  const blogRoutes = generateBlogRoutes();
  
  const allRoutes = [
    ...staticRoutes,
    ...blogRoutes,
  ].map(route => ({
    url: `${siteUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return allRoutes;
}
