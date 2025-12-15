import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { EmailVerificationBanner } from "@/components/alerts/email-verification-banner";
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  SUPPORT_PHONE_DISPLAY,
  REGISTRATION_EMAIL,
} from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY_NAME} | South Africa's Premier Multi-Vendor Online Marketplace`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: `${COMPANY_NAME} is South Africa's leading multi-vendor e-commerce platform. Shop from trusted local vendors, enjoy secure payments via Paystack, and discover quality products from Limpopo and beyond. ${COMPANY_TAGLINE}.`,
  keywords: [
    // Primary keywords
    "online store South Africa",
    "multi-vendor marketplace",
    "South African e-commerce",
    "buy online South Africa",
    "online shopping SA",
    // Location-specific
    "Limpopo online store",
    "Nkowankowa marketplace",
    "Tzaneen online shopping",
    "South African vendors",
    // Product/service keywords
    "local products South Africa",
    "secure online payments",
    "Paystack payments",
    "vendor marketplace",
    "CIPC registration services",
    "business registration South Africa",
    // Brand keywords
    "INHIMStore",
    "INHIM Trading",
    // Long-tail keywords
    "best online store South Africa",
    "trusted multi-vendor platform",
    "sell products online South Africa",
    "become a vendor South Africa",
    "affordable online shopping",
    "quality products Limpopo",
  ],
  authors: [
    { name: "INHIM Trading (Pty) Ltd", url: siteUrl },
    { name: "C Maenetja" },
  ],
  creator: "INHIM Trading (Pty) Ltd",
  publisher: "INHIM Trading (Pty) Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "E-commerce",
  classification: "Multi-Vendor Marketplace",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: COMPANY_NAME,
    title: `${COMPANY_NAME} | South Africa's Premier Multi-Vendor Online Marketplace`,
    description: `Shop from trusted South African vendors. Secure payments, quality products, and exceptional service. ${COMPANY_TAGLINE}.`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} - South Africa's Multi-Vendor Marketplace`,
        type: "image/png",
      },
      {
        url: `${siteUrl}/og-image-square.png`,
        width: 600,
        height: 600,
        alt: `${COMPANY_NAME} Logo`,
        type: "image/png",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Multi-Vendor Marketplace`,
    description:
      "South Africa's premier multi-vendor e-commerce platform. Shop quality products from local vendors.",
    images: [`${siteUrl}/twitter-image.png`],
    creator: "@inhimstore",
    site: "@inhimstore",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons - Using INHIMStore logo
  icons: {
    icon: [
      { url: "/INHIMStore-logo.png", sizes: "any", type: "image/png" },
      { url: "/INHIMStore-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/INHIMStore-logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/INHIMStore-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/INHIMStore-logo.png", type: "image/png" }],
  },

  // Manifest
  manifest: "/manifest.json",

  // Verification (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Alternates
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-ZA": siteUrl,
      en: siteUrl,
    },
  },

  // App Links
  appLinks: {
    web: {
      url: siteUrl,
      should_fallback: true,
    },
  },

  // Other
  other: {
    "msapplication-TileColor": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": COMPANY_NAME,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
      description: `${COMPANY_NAME} is South Africa's leading multi-vendor e-commerce platform operated by INHIM Trading (Pty) Ltd.`,
      email: REGISTRATION_EMAIL,
      telephone: SUPPORT_PHONE_DISPLAY,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nkowankowa",
        addressRegion: "Limpopo",
        addressCountry: "ZA",
      },
      sameAs: [
        "https://www.facebook.com/inhimstore",
        "https://www.instagram.com/inhimstore",
        "https://twitter.com/inhimstore",
        "https://www.linkedin.com/company/inhimstore",
      ],
      foundingDate: "2024",
      founders: [
        {
          "@type": "Person",
          name: "Mr HB Mahlathi",
        },
        {
          "@type": "Person",
          name: "C Maenetja",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SUPPORT_PHONE_DISPLAY,
          contactType: "customer service",
          availableLanguage: ["English", "Sepedi", "Xitsonga"],
          areaServed: "ZA",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: COMPANY_NAME,
      description: `South Africa's premier multi-vendor e-commerce marketplace`,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-ZA",
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
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: `${COMPANY_NAME} | South Africa's Premier Multi-Vendor Online Marketplace`,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      description: `Shop from trusted South African vendors on ${COMPANY_NAME}. Secure payments, quality products, and exceptional service.`,
      inLanguage: "en-ZA",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
    },
    {
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
        addressLocality: "Nkowankowa",
        addressRegion: "Limpopo",
        addressCountry: "ZA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -23.8889,
        longitude: 30.2889,
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
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://js.paystack.co" />
        <meta name="geo.region" content="ZA-LP" />
        <meta name="geo.placename" content="Nkowankowa, Limpopo" />
        <meta name="geo.position" content="-23.8889;30.2889" />
        <meta name="ICBM" content="-23.8889, 30.2889" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}
      >
        <SupabaseProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <EmailVerificationBanner />
              <main
                className="flex-1 bg-background"
                id="main-content"
                role="main"
              >
                <div className="mx-auto w-full max-w-6xl px-4 py-10">
                  {children}
                </div>
              </main>
              <SiteFooter />
            </div>
            <CookieConsent />
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
