"use client";

import { useMemo } from "react";
import {
  Heart,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import { getCartSummary, useCartStore } from "@/store/cart-store";
import { getWishlistCount, useWishlistStore } from "@/store/wishlist-store";

export function CartWishlistSpotlight() {
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cart = useMemo(() => getCartSummary(cartItems), [cartItems]);
  const wishlistCount = useMemo(
    () => getWishlistCount(wishlistItems),
    [wishlistItems]
  );
  const hasCartItems = cart.count > 0;

  return (
    <Card className="overflow-hidden border-border/40 bg-gradient-to-br from-background via-background to-muted/30 shadow-xl">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Quick Commerce
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Cart & Wishlist</h3>
          <p className="text-sm text-muted-foreground">
            Stay synced across devices with instant checkout.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Cart Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                {cart.count > 0 && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {cart.count} {cart.count === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Cart Total
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  R{cart.total.toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {cart.count > 0 ? "Ready for checkout" : "Add items to begin"}
              </p>
            </div>
          </div>

          {/* Wishlist Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6 shadow-sm transition-all duration-300 hover:border-rose-500/30 hover:shadow-lg">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-500/5 transition-transform duration-300 group-hover:scale-150" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 shadow-inner">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                {wishlistCount > 0 && (
                  <span className="inline-flex items-center rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-500">
                    {wishlistCount} saved
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Wishlist
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {wishlistCount > 0 ? "Curated" : "Empty"}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {wishlistCount > 0
                  ? "Move items to cart"
                  : "Save items you love"}
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Section */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-muted/60 via-muted/40 to-transparent p-6">
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Subtotal</span>
                </div>
                <span className="font-semibold">
                  R{cart.total.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Items in cart</span>
                <span className="font-medium">{cart.count}</span>
              </div>
              {cart.count > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              )}
              <div className="h-px bg-border/60" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  R{cart.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="pt-2">
              {hasCartItems ? (
                <CheckoutButton
                  amount={cart.total}
                  productName="Cart checkout"
                />
              ) : (
                <Button
                  variant="outline"
                  className="w-full rounded-xl py-6 text-base"
                  disabled
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add items to checkout
                </Button>
              )}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Secure payments powered by Paystack
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
