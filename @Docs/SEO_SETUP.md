# SEO Setup Documentation

This document outlines the comprehensive SEO implementation for the Qarsup AI website using Next.js App Router.

## Overview

The SEO setup includes:
- ✅ Meta Tags (Static & Dynamic)
- ✅ JSON-LD Structured Data
- ✅ Sitemap Generation
- ✅ robots.txt
- ✅ Link Tags & Preconnect
- ✅ Image Optimization
- ✅ Script Optimization
- ✅ Manifest.json for PWA

## File Structure

```
src/
├── lib/
│   └── seo/
│       ├── metadata.js      # Metadata configuration and utilities
│       └── jsonld.js         # JSON-LD schema generators
├── app/
│   ├── layout.js            # Root layout with global metadata
│   ├── sitemap.js           # Dynamic sitemap generation
│   ├── robots.js            # robots.txt generation
│   ├── page.js              # Homepage with SoftwareApplication schema
│   ├── aboutus/
│   │   ├── layout.js        # About page metadata
│   │   └── page.js
│   ├── blog/
│   │   ├── layout.js        # Blog listing metadata
│   │   └── page.js
│   ├── blog-detail/
│   │   └── [id]/
│   │       ├── layout.js    # Dynamic blog post metadata
│   │       └── page.js      # Blog post with Article schema
│   └── ... (other pages with layouts)
public/
└── manifest.json            # PWA manifest
```

## 1. Meta Tags

### Root Layout (`src/app/layout.js`)

The root layout includes comprehensive metadata:
- Title and description
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Robots directives
- Viewport and mobile optimization
- Theme colors
- Favicon and app icons

### Page-Specific Metadata

Each page directory has a `layout.js` file that exports metadata:

```javascript
// Example: src/app/aboutus/layout.js
import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';

export const metadata = genMeta({
  ...pageMetadata.about,
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/aboutus`,
  image: '/images/about.jpg',
});
```

### Dynamic Metadata

For dynamic routes (like blog posts), use `generateMetadata` function:

```javascript
// Example: src/app/blog-detail/[id]/layout.js
export async function generateMetadata({ params }) {
  const blog = blogData.find(b => b.id === parseInt(params.id));
  return genMeta({
    title: blog.title,
    description: `Read ${blog.title} by ${blog.author}`,
    url: `${siteUrl}/blog-detail/${blog.id}`,
    image: blog.image,
    type: 'article',
  });
}
```

## 2. JSON-LD Structured Data

### Available Schemas

The `src/lib/seo/jsonld.js` file provides generators for:

1. **Organization Schema** - Company information
2. **Website Schema** - Site-wide information with search action
3. **WebPage Schema** - Individual page information
4. **Article Schema** - Blog posts and articles
5. **BreadcrumbList Schema** - Navigation breadcrumbs
6. **SoftwareApplication Schema** - App/product information
7. **FAQPage Schema** - FAQ sections

### Usage

```javascript
import { JsonLd } from '@/lib/seo/jsonld';
import { generateArticleSchema } from '@/lib/seo/jsonld';

const articleSchema = generateArticleSchema({
  headline: 'Blog Post Title',
  description: 'Description',
  image: 'https://example.com/image.jpg',
  datePublished: '2024-01-01',
  author: { '@type': 'Person', name: 'Author Name' },
});

// In component
<JsonLd data={articleSchema} />
```

### Implemented Schemas

- **Homepage**: SoftwareApplication schema
- **Blog Posts**: Article + BreadcrumbList schemas
- **Root Layout**: Organization + Website schemas

## 3. Sitemap

### Location
`src/app/sitemap.js`

### Features
- Automatically generates sitemap.xml
- Includes all static routes
- Dynamically includes blog posts
- Sets priority and change frequency
- Accessible at `/sitemap.xml`

### Adding New Routes

Edit `src/app/sitemap.js` and add to `staticRoutes` array:

```javascript
{
  url: '/new-page',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
}
```

## 4. robots.txt

### Location
`src/app/robots.js`

### Configuration
- Allows all user agents
- Disallows private routes (dashboard, API, admin)
- Points to sitemap location
- Accessible at `/robots.txt`

### Customization

Edit `src/app/robots.js` to modify crawl rules:

```javascript
disallow: [
  '/api/',
  '/dashboard/',
  '/checkout/',
  // Add more paths as needed
],
```

## 5. Link Tags & Preconnect

### Implemented in Root Layout

- **Preconnect**: Google Fonts for faster font loading
- **DNS Prefetch**: External resources
- **Favicon**: Multiple sizes for different devices
- **Apple Touch Icon**: iOS home screen icon
- **Manifest**: PWA manifest link
- **Theme Color**: Browser theme color

## 6. Image Optimization

### Next.js Image Configuration

Configured in `next.config.js`:

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

### Best Practices

1. Always use Next.js `Image` component
2. Provide proper `alt` attributes for accessibility
3. Use appropriate `sizes` prop for responsive images
4. Set width and height when possible

## 7. Script Optimization

### Font Loading

Fonts are optimized with:
- `display: 'swap'` for better performance
- `preload: true` for faster initial load
- Subset loading (latin only)

### Dynamic Imports

Client components use dynamic imports for code splitting:

```javascript
const Navbar = dynamic(() => import('./components/navbar'))
```

## 8. Environment Variables

### Required

Set in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://qarsup-ai.com
```

This is used for:
- Canonical URLs
- Open Graph URLs
- Sitemap URLs
- JSON-LD schemas

## 9. Testing SEO

### Tools

1. **Google Search Console**
   - Submit sitemap: `https://yoursite.com/sitemap.xml`
   - Monitor indexing status

2. **Google Rich Results Test**
   - Test JSON-LD schemas: https://search.google.com/test/rich-results

3. **Schema Markup Validator**
   - Validate structured data: https://validator.schema.org/

4. **PageSpeed Insights**
   - Test performance: https://pagespeed.web.dev/

5. **Lighthouse**
   - Built into Chrome DevTools
   - Tests SEO, Performance, Accessibility

### Checklist

- [ ] All pages have unique titles and descriptions
- [ ] Open Graph images are set (1200x630px recommended)
- [ ] Canonical URLs are correct
- [ ] Sitemap is accessible and valid
- [ ] robots.txt is configured correctly
- [ ] JSON-LD schemas validate
- [ ] Images have alt text
- [ ] Mobile-friendly (responsive design)
- [ ] Fast page load times
- [ ] HTTPS enabled

## 10. Page-Specific Metadata

### Current Pages with Metadata

- ✅ Homepage (`/`)
- ✅ About Us (`/aboutus`)
- ✅ Blog (`/blog`)
- ✅ Blog Detail (`/blog-detail/[id]`)
- ✅ Pricing (`/pricing`)
- ✅ Contact (`/contact`)
- ✅ Services (`/services`)
- ✅ Privacy (`/privacy`)
- ✅ Terms (`/terms`)
- ✅ Login (`/login`) - noindex
- ✅ Signup (`/signup`)

### Adding Metadata to New Pages

1. Create a `layout.js` file in the page directory
2. Import metadata utilities
3. Export metadata:

```javascript
import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Page Title',
  description: 'Page description',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/page-path`,
});
```

## 11. Advanced Features

### Breadcrumbs

Breadcrumb schemas are automatically generated for blog posts. To add to other pages:

```javascript
import { generateBreadcrumbSchema } from '@/lib/seo/jsonld';

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: siteUrl },
  { name: 'Category', url: `${siteUrl}/category` },
  { name: 'Page', url: `${siteUrl}/page` },
]);
```

### FAQ Schema

For FAQ pages:

```javascript
import { generateFAQSchema } from '@/lib/seo/jsonld';

const faqSchema = generateFAQSchema([
  { question: 'Question 1?', answer: 'Answer 1' },
  { question: 'Question 2?', answer: 'Answer 2' },
]);
```

## 12. Performance Optimization

### Implemented

- ✅ Image optimization (AVIF, WebP)
- ✅ Font optimization (swap, preload)
- ✅ Code splitting (dynamic imports)
- ✅ Compression enabled
- ✅ Cache headers for static assets
- ✅ DNS prefetch for external resources

### Cache Headers

Static assets are cached for 1 year:
- Images: `/images/:path*`
- Fonts: `/assets/fonts/:path*`

## 13. Security Headers

Additional security headers in `next.config.js`:
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

## 14. Maintenance

### Updating Sitemap

When adding new pages:
1. Add route to `staticRoutes` in `sitemap.js`
2. Set appropriate priority and changeFrequency

### Updating Metadata

1. Edit `src/lib/seo/metadata.js` for site-wide changes
2. Edit individual `layout.js` files for page-specific changes

### Adding New Schema Types

1. Add generator function to `src/lib/seo/jsonld.js`
2. Use in appropriate pages/components

## 15. Troubleshooting

### Metadata Not Showing

- Ensure `layout.js` exports `metadata`
- Check that metadata is not overridden by child layouts
- Verify environment variables are set

### Sitemap Not Updating

- Clear Next.js cache: `.next` folder
- Rebuild: `npm run build`
- Check sitemap.js syntax

### JSON-LD Errors

- Validate at https://validator.schema.org/
- Check for syntax errors in schema objects
- Ensure all required fields are present

## Conclusion

This SEO setup provides a comprehensive foundation for search engine optimization. All major SEO best practices are implemented and ready for production use.

For questions or issues, refer to:
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
