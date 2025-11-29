"use client";

import { useMemo, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCartSummary, useCartStore } from "@/store/cart-store";
import { getWishlistCount, useWishlistStore } from "@/store/wishlist-store";

type CartWishlistControlsProps = {
  className?: string;
};

export function CartWishlistControls({ className }: CartWishlistControlsProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const cart = useCartStore();
  const wishlist = useWishlistStore();
  const cartSummary = useMemo(() => getCartSummary(cart.items), [cart.items]);
  const wishlistCount = useMemo(() => getWishlistCount(wishlist.items), [wishlist.items]);
  const hasCartItems = cart.items.length > 0;
  const hasWishlistItems = wishlist.items.length > 0;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
            <Heart className="h-5 w-5" />
            {wishlistCount ? (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {wishlistCount}
              </span>
            ) : null}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-md">
          <SheetHeader>
            <SheetTitle>Wishlist</SheetTitle>
            <SheetDescription>Items you want to monitor before purchasing.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {hasWishlistItems ? (
              <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "55vh" }}>
                {wishlist.items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border/70 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">R{item.price.toLocaleString()}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => wishlist.removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-3 w-full"
                      onClick={() => {
                        cart.addItem({ id: item.id, name: item.name, price: item.price });
                        wishlist.removeItem(item.id);
                      }}
                    >
                      Move to cart
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Empty wishlist.</p>
            )}
            {hasWishlistItems ? (
              <Button variant="ghost" onClick={() => wishlist.clear()} className="w-full">
                Clear wishlist
              </Button>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartSummary.count ? (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {cartSummary.count}
              </span>
            ) : null}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-md">
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <SheetDescription>Secure checkout unlocks after login & email verification.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {hasCartItems ? (
              <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "55vh" }}>
                {cart.items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border/70 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          R{item.price.toLocaleString()} · Qty {item.quantity}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => cart.removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from cart</span>
                      </Button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => cart.decrement(item.id)}>
                        -
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => cart.increment(item.id)}>
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Cart is empty.</p>
            )}
            {hasCartItems ? (
              <div className="rounded-2xl border border-border/70 bg-muted/50 p-4 text-sm shadow-inner">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{cartSummary.count}</span>
                </div>
                <div className="mt-1 flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>R{cartSummary.total.toLocaleString()}</span>
                </div>
                <div className="mt-4">
                  <CheckoutButton amount={cartSummary.total} productName="Cart checkout" />
                </div>
                <Button variant="ghost" className="mt-2 w-full" onClick={() => cart.clear()}>
                  Clear cart
                </Button>
              </div>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
