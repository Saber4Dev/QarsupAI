/**
 * JSON-LD Schema Generator
 * Creates structured data for better SEO and rich snippets
 */

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema(config = {}) {
  const {
    name = 'Qarsup AI',
    url = 'https://qarsup-ai.com',
    logo = 'https://qarsup-ai.com/images/logo-white.png',
    description = 'AI Content Platform for Modern Teams',
    contactPoint = {},
    sameAs = [],
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: `${url}${logo}`,
    description,
    ...(contactPoint.email && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...contactPoint,
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/**
 * Generate Website JSON-LD schema
 */
export function generateWebsiteSchema(config = {}) {
  const {
    name = 'Qarsup AI',
    url = 'https://qarsup-ai.com',
    description = 'AI Content Platform for Modern Teams',
    potentialAction = {},
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    ...(potentialAction.type && {
      potentialAction: {
        '@type': potentialAction.type,
        target: {
          '@type': 'EntryPoint',
          urlTemplate: potentialAction.urlTemplate || `${url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

/**
 * Generate WebPage JSON-LD schema
 */
export function generateWebPageSchema(config = {}) {
  const {
    name,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author,
    publisher = {
      '@type': 'Organization',
      name: 'Qarsup AI',
    },
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(author && { author }),
    publisher,
  };
}

/**
 * Generate Article JSON-LD schema (for blog posts)
 */
export function generateArticleSchema(config = {}) {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author = {
      '@type': 'Person',
      name: 'Qarsup AI',
    },
    publisher = {
      '@type': 'Organization',
      name: 'Qarsup AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://qarsup-ai.com/images/logo-white.png',
      },
    },
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? (Array.isArray(image) ? image : [image]) : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author,
    publisher,
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate SoftwareApplication JSON-LD schema
 */
export function generateSoftwareApplicationSchema(config = {}) {
  const {
    name = 'Qarsup AI',
    applicationCategory = 'BusinessApplication',
    operatingSystem = 'Web',
    offers = {},
    aggregateRating = {},
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory,
    operatingSystem,
    ...(offers.price && {
      offers: {
        '@type': 'Offer',
        ...offers,
      },
    }),
    ...(aggregateRating.ratingValue && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ...aggregateRating,
      },
    }),
  };
}

/**
 * Generate FAQPage JSON-LD schema
 */
export function generateFAQSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Component to render JSON-LD script
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
