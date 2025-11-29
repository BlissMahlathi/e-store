"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartSummary } from "@/store/cart-store";
import { useWishlistSummary } from "@/store/wishlist-store";

export function CartWishlistSpotlight() {
  const cart = useCartSummary();
  const wishlist = useWishlistSummary();

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-base">Your saved items</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border/70 p-4">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Cart</p>
            <p className="text-xs text-muted-foreground">{cart.count} items · R{cart.total.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border/70 p-4">
          <Heart className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Wishlist</p>
            <p className="text-xs text-muted-foreground">{wishlist.count} saved</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
