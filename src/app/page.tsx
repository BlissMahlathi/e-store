import { FeatureSteps } from "@/components/home/feature-steps";
import { Hero } from "@/components/home/hero";
import { MarketplacePreview } from "@/components/home/marketplace-preview";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <FeatureSteps />
      <MarketplacePreview />
      <Testimonials />
    </div>
  );
}
