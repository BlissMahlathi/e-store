import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MarketplaceProduct } from "@/lib/data/marketplace";
import { Badge } from "@/components/ui/badge";

type MarketplacePreviewProps = {
  products: MarketplaceProduct[];
};

export function MarketplacePreview({ products }: MarketplacePreviewProps) {
  const featured = products.slice(0, 6);

  return (
    <section className="space-y-6 py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Preview</p>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Curated marketplace</h2>
        </div>
        <p className="text-muted-foreground md:w-2/3">
          Products, services, and experiences from trusted vendors. Checkout unlocks only for registered customers, keeping
          commissions transparent.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {featured.length > 0 ? (
          featured.map((product) => (
            <Card key={product.id} className="border-border/70">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <Badge variant={product.status === "ready" ? "default" : "secondary"}>{product.status}</Badge>
                </div>
                <p className="text-xs uppercase text-muted-foreground">
                  by {product.vendorName}
                  {product.category ? ` · ${product.category.label}` : ""}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-2xl font-semibold">R{product.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  {product.rating.average ? `Rating ${product.rating.average.toFixed(1)} / 5` : "No reviews yet"}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-dashed border-border/60">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No listings published yet. Add your first product from the vendor dashboard to feature it here.
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
