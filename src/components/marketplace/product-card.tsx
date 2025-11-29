"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import type { Product } from "@/lib/constants";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface Props {
  product: Product;
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

  return (
    <Card className="flex flex-col border-border/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{product.name}</CardTitle>
          <Badge variant={product.category === "Services" ? "secondary" : "default"}>{product.category}</Badge>
        </div>
        <p className="text-xs uppercase text-muted-foreground">{product.vendor}</p>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <p className="text-2xl font-semibold">R{product.price.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Rating {product.rating} / 5</p>
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
