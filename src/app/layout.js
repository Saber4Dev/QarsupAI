import './globals.css'
import './assets/css/tailwind.css'
import "./assets/css/materialdesignicons.min.css"
import { Figtree} from 'next/font/google'
import CookieWrapper from './components/cookieWrapper'
import { getDefaultMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/lib/seo/jsonld'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/jsonld'
import { siteUrl } from '@/lib/config/site'

const figtree= Figtree({ 
  subsets: ['latin'],
  weight:['400','500','600','700'],
  variable: '--font-figtree',
  display: 'swap',
  preload: true,
})

// Enhanced metadata with comprehensive SEO
export const metadata = {
  ...getDefaultMetadata(),
  // Additional link tags and meta tags
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo-icon-64.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo-icon-64.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

// Viewport and theme color must be exported separately in Next.js App Router
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fbbf24',
}

// Generate JSON-LD schemas
const organizationSchema = generateOrganizationSchema({
  name: 'Qarsup AI',
  url: siteUrl,
  logo: '/images/logo-white.png',
  description: 'AI Content Platform for Modern Teams',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@qarsup-ai.com',
  },
  sameAs: [
    'https://twitter.com/qarsupai',
    'https://facebook.com/qarsupai',
    'https://linkedin.com/company/qarsupai',
  ],
})

const websiteSchema = generateWebsiteSchema({
  name: 'Qarsup AI',
  url: siteUrl,
  description: 'AI Content Platform for Modern Teams',
  potentialAction: {
    type: 'SearchAction',
    urlTemplate: `${siteUrl}/search?q={search_term_string}`,
  },
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" dir="ltr">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* JSON-LD Structured Data */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className={`${figtree.variable} font-figtree text-base text-slate-900 dark:text-white dark:bg-slate-900 `} suppressHydrationWarning>
        {children}
        <CookieWrapper />
      </body>
    </html>
  )
}
