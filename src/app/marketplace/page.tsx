import { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { ProductCard } from "@/components/marketplace/product-card";
import { ProtectedContent } from "@/components/protected-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartWishlistSpotlight } from "@/components/cart/cart-wishlist-spotlight";

export const metadata: Metadata = {
  title: "Marketplace | e-store",
};

export default function MarketplacePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Discover</p>
        <h1 className="text-4xl font-semibold">Products & services</h1>
        <p className="text-muted-foreground md:w-2/3">
          Catalog curated by the e-store team. Checkout activates for registered customers so we can calculate commissions
          and trigger payouts.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CartWishlistSpotlight />
      <ProtectedContent allowed={["customer", "vendor", "admin"]}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exclusive bundles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Unlock curated launch bundles, fulfillment perks, and member pricing once you are logged in.</p>
          </CardContent>
        </Card>
      </ProtectedContent>
    </div>
  );
}
