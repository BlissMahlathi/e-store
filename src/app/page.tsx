import { FeatureSteps } from "@/components/home/feature-steps";
import { Hero } from "@/components/home/hero";
import { MarketplacePreview } from "@/components/home/marketplace-preview";
import { Testimonials } from "@/components/home/testimonials";
import { fetchMarketplaceInventory } from "@/lib/data/marketplace";

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
