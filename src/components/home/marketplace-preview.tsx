import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export function MarketplacePreview() {
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
        {PRODUCTS.slice(0, 6).map((product) => (
          <Card key={product.id} className="border-border/70">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{product.name}</CardTitle>
                <Badge variant={product.status === "ready" ? "default" : "secondary"}>{product.status}</Badge>
              </div>
              <p className="text-xs uppercase text-muted-foreground">
                by {product.vendor} · {product.category}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-2xl font-semibold">R{product.price.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Rating {product.rating} / 5</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
