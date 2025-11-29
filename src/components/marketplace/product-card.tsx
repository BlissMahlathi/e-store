"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import type { MarketplaceProduct } from "@/lib/data/marketplace";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface Props {
  product: MarketplaceProduct;
}

export function ProductCard({ product }: Props) {
  const cart = useCartStore();
  const wishlist = useWishlistStore();
  const isWishlisted = wishlist.items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    cart.addItem({ id: product.id, name: product.name, price: product.price });
  };

  const handleToggleWishlist = () => {
    wishlist.toggleItem({ id: product.id, name: product.name, price: product.price });
  };

  const ratingLabel = product.rating.average
    ? `${product.rating.average.toFixed(1)} • ${product.rating.count} review${product.rating.count === 1 ? "" : "s"}`
    : "No reviews yet";

  return (
    <Card className="flex h-full flex-col border-border/70 bg-card/90 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60">
      <div className="relative h-44 overflow-hidden rounded-t-2xl border-b border-border/60 bg-muted">
        {product.thumbnailUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.thumbnailUrl})` }}
            aria-label={`${product.name} preview`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20" aria-hidden />
        )}
        <Badge className="absolute left-3 top-3 capitalize" variant={product.status === "ready" ? "default" : "secondary"}>
          {product.status}
        </Badge>
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-tight">{product.name}</CardTitle>
          {product.category && <Badge variant="outline">{product.category.label}</Badge>}
        </div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.vendorName}</p>
        {product.summary && <p className="text-sm text-muted-foreground line-clamp-2">{product.summary}</p>}
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <div>
          <p className="text-2xl font-semibold">R{product.price.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{ratingLabel}</p>
        </div>
        <div className="flex flex-col gap-2">
          <CheckoutButton amount={product.price} productName={product.name} />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
              Add to cart
            </Button>
            <Button variant={isWishlisted ? "default" : "secondary"} className="flex-1" onClick={handleToggleWishlist}>
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
