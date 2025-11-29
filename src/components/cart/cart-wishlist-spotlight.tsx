"use client";

import { useMemo } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import { getCartSummary, useCartStore } from "@/store/cart-store";
import { getWishlistCount, useWishlistStore } from "@/store/wishlist-store";

export function CartWishlistSpotlight() {
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cart = useMemo(() => getCartSummary(cartItems), [cartItems]);
  const wishlistCount = useMemo(() => getWishlistCount(wishlistItems), [wishlistItems]);
  const hasCartItems = cart.count > 0;

  return (
    <Card className="border-border/60">
      <CardHeader className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick commerce</p>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl">Cart & wishlist status</CardTitle>
          <p className="text-sm text-muted-foreground">Stay synced across devices with instant checkout.</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-primary/10 p-2 text-primary">
                <ShoppingCart className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">Cart</p>
                <p className="text-xs text-muted-foreground">{cart.count} items ready</p>
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold">R{cart.total.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Includes taxes where applicable.</p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-primary/10 p-2 text-primary">
                <Heart className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">Wishlist</p>
                <p className="text-xs text-muted-foreground">{wishlistCount} saved</p>
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold">{wishlistCount ? "Curated" : "Waiting"}</p>
            <p className="text-xs text-muted-foreground">Move items into your cart to checkout.</p>
          </div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-muted/40 p-5 shadow-inner">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">R{cart.total.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Items</span>
              <span>{cart.count}</span>
            </div>
          </div>
          <div className="mt-5">
            {hasCartItems ? (
              <CheckoutButton amount={cart.total} productName="Cart checkout" />
            ) : (
              <Button variant="outline" className="w-full" disabled>
                Add items to checkout
              </Button>
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            We route you through Paystack for secure payments. You can always review your order before paying.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
