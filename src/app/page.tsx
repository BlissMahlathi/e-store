import { Metadata } from "next";
import { FeatureSteps } from "@/components/home/feature-steps";
import { Hero } from "@/components/home/hero";
import { MarketplacePreview } from "@/components/home/marketplace-preview";
import { Testimonials } from "@/components/home/testimonials";
import { fetchMarketplaceInventory } from "@/lib/data/marketplace";
import { COMPANY_NAME } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export const metadata: Metadata = {
  title: `${COMPANY_NAME} | South Africa's #1 Multi-Vendor Online Marketplace`,
  description:
    "Discover South Africa's premier online shopping destination. Shop quality products from verified local vendors. Secure Paystack payments, fast delivery, and exceptional customer service. Join 140+ vendors on INHIMStore.",
  keywords: [
    "online shopping South Africa",
    "best online store SA",
    "multi-vendor marketplace",
    "buy online Limpopo",
    "South African e-commerce",
    "local products online",
    "secure online shopping",
    "INHIMStore",
  ],
  openGraph: {
    title: `${COMPANY_NAME} | South Africa's Premier Online Marketplace`,
    description:
      "Shop from 140+ verified South African vendors. Secure payments, quality products, fast delivery.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "INHIMStore - Shop Online in South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Online Shopping SA`,
    description: "South Africa's trusted multi-vendor marketplace. Shop now!",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function Home() {
  const { products } = await fetchMarketplaceInventory({ limit: 6 });

  return (
    <div className="space-y-12">
      <Hero />
      <FeatureSteps />
      <MarketplacePreview products={products} />
      <Testimonials />
    </div>
  );
}
