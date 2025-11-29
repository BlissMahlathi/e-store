"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { useWishlistStore, useWishlistSummary } from "@/store/wishlist-store";

export function CartWishlistControls() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const cart = useCartStore();
  const wishlist = useWishlistStore();
  const cartSummary = useCartSummary();
  const wishlistSummary = useWishlistSummary();

  return (
    <div className="flex items-center gap-2">
      <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
            <Heart className="h-5 w-5" />
            {wishlistSummary.count ? (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {wishlistSummary.count}
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
            {wishlist.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Empty wishlist.</p>
            ) : (
              wishlist.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">R{item.price.toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => wishlist.removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </div>
              ))
            )}
            {wishlist.items.length ? (
              <Button variant="secondary" onClick={() => wishlist.clear()}>
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
            {cart.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Cart is empty.</p>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      R{item.price.toLocaleString()} · Qty {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => cart.decrement(item.id)}>
                      -
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => cart.increment(item.id)}>
                      +
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => cart.removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove from cart</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
            {cart.items.length ? (
              <div className="space-y-2 text-sm">
                <p className="flex items-center justify-between font-medium">
                  <span>Items</span>
                  <span>{cartSummary.count}</span>
                </p>
                <p className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>R{cartSummary.total.toLocaleString()}</span>
                </p>
                <Button className="w-full" onClick={() => setCartOpen(false)}>
                  Proceed to checkout
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => cart.clear()}>
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
