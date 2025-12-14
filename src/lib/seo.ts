/**
 * SEO Configuration for INHIMStore
 * Centralized SEO settings and structured data generators
 */

import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  REGISTRATION_EMAIL,
  SUPPORT_PHONE_DISPLAY,
} from "./constants";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

// Core SEO configuration
export const seoConfig = {
  siteName: COMPANY_NAME,
  siteDescription: `${COMPANY_NAME} is South Africa's leading multi-vendor e-commerce platform. Shop from trusted local vendors with secure Paystack payments.`,
  siteUrl,
  twitterHandle: "@inhimstore",
  locale: "en_ZA",
  country: "South Africa",
  region: "Limpopo",
  city: "Nkowankowa",
  coordinates: {
    latitude: -23.8889,
    longitude: 30.2889,
  },
};

// Default Open Graph image
export const defaultOgImage = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${COMPANY_NAME} - South Africa's Multi-Vendor Marketplace`,
  type: "image/png",
};

// Generate Organization structured data
export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: COMPANY_NAME,
    alternateName: "INHIM Trading (Pty) Ltd",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/INHIMStore-logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/INHIMStore-logo.png`,
    description: seoConfig.siteDescription,
    email: REGISTRATION_EMAIL,
    telephone: SUPPORT_PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      addressLocality: seoConfig.city,
      addressRegion: seoConfig.region,
      addressCountry: "ZA",
    },
    sameAs: [
      "https://www.facebook.com/inhimstore",
      "https://www.instagram.com/inhimstore",
      "https://twitter.com/inhimstore",
      "https://www.linkedin.com/company/inhimstore",
    ],
    foundingDate: "2024",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SUPPORT_PHONE_DISPLAY,
        contactType: "customer service",
        availableLanguage: ["English", "Sepedi", "Xitsonga"],
        areaServed: "ZA",
      },
    ],
  };
}

// Generate WebSite structured data with search action
export function generateWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: COMPANY_NAME,
    description: seoConfig.siteDescription,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: seoConfig.locale,
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/marketplace?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
}

// Generate BreadcrumbList structured data
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate Product structured data
export function generateProductSchema(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  inStock?: boolean;
  vendorName?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@type": "Product",
    "@id": `${siteUrl}/marketplace/product/${product.id}`,
    name: product.name,
    description: product.description,
    image: product.image || `${siteUrl}/og-image.png`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.vendorName || COMPANY_NAME,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/marketplace/product/${product.id}`,
      priceCurrency: "ZAR",
      price: product.price,
      availability:
        product.inStock !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: product.vendorName || COMPANY_NAME,
      },
    },
    ...(product.rating &&
      product.reviewCount && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      }),
  };
}

// Generate LocalBusiness/Store structured data
export function generateStoreSchema() {
  return {
    "@type": "Store",
    "@id": `${siteUrl}/#store`,
    name: COMPANY_NAME,
    description:
      "Multi-vendor e-commerce marketplace featuring products from trusted South African vendors",
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    priceRange: "R-RRR",
    address: {
      "@type": "PostalAddress",
      addressLocality: seoConfig.city,
      addressRegion: seoConfig.region,
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoConfig.coordinates.latitude,
      longitude: seoConfig.coordinates.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    paymentAccepted: ["Credit Card", "Debit Card", "Mobile Payment"],
    currenciesAccepted: "ZAR",
  };
}

// Generate FAQ structured data
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate Service structured data
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "ZAR",
      },
    }),
  };
}

// Combine multiple schemas into a graph
export function generateJsonLd(schemas: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

// Primary keywords for the site
export const primaryKeywords = [
  "online store South Africa",
  "multi-vendor marketplace",
  "South African e-commerce",
  "buy online South Africa",
  "online shopping SA",
  "Limpopo online store",
  "local products South Africa",
  "secure online payments",
  "Paystack payments",
  "vendor marketplace",
  "INHIMStore",
  "INHIM Trading",
];

// Long-tail keywords
export const longTailKeywords = [
  "best online store South Africa",
  "trusted multi-vendor platform",
  "sell products online South Africa",
  "become a vendor South Africa",
  "affordable online shopping",
  "quality products Limpopo",
  "CIPC registration services",
  "business registration South Africa",
  "Nkowankowa marketplace",
  "Tzaneen online shopping",
];
