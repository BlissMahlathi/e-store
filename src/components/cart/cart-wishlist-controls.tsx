"use client";

import { useMemo, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
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
  const wishlistCount = useMemo(
    () => getWishlistCount(wishlist.items),
    [wishlist.items]
  );
  const hasCartItems = cart.items.length > 0;
  const hasWishlistItems = wishlist.items.length > 0;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Wishlist Sheet */}
      <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            className="relative h-10 w-10 rounded-full transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-1.5 text-[10px] font-semibold text-white shadow-lg ring-2 ring-background">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            ) : null}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-full max-w-md flex-col border-l border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <SheetHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
                <Heart className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <SheetTitle className="text-xl font-bold">Wishlist</SheetTitle>
                <SheetDescription className="text-sm">
                  {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            {hasWishlistItems ? (
              <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
                {wishlist.items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold leading-tight text-foreground">
                          {item.name}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          R{item.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => wishlist.removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 font-medium shadow-sm transition-all duration-200 hover:shadow-md"
                      onClick={() => {
                        cart.addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                        });
                        wishlist.removeItem(item.id);
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Move to cart
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                  <Heart className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    Your wishlist is empty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Save items you love for later
                  </p>
                </div>
              </div>
            )}

            {hasWishlistItems && (
              <div className="border-t border-border/50 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => wishlist.clear()}
                  className="w-full rounded-xl text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear wishlist
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="relative h-10 w-10 rounded-full transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartSummary.count ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-1.5 text-[10px] font-semibold text-white shadow-lg ring-2 ring-background">
                {cartSummary.count > 99 ? "99+" : cartSummary.count}
              </span>
            ) : null}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-full max-w-md flex-col border-l border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <SheetHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl font-bold">
                  Shopping Cart
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {cartSummary.count}{" "}
                  {cartSummary.count === 1 ? "item" : "items"} · R
                  {cartSummary.total.toLocaleString()}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            {hasCartItems ? (
              <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold leading-tight text-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          R{item.price.toLocaleString()} each
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => cart.removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from cart</span>
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-muted/30 p-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg transition-colors hover:bg-background"
                          onClick={() => cart.decrement(item.id)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="min-w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg transition-colors hover:bg-background"
                          onClick={() => cart.increment(item.id)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        R{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add items to get started
                  </p>
                </div>
              </div>
            )}

            {hasCartItems && (
              <div className="space-y-4 border-t border-border/50 pt-4">
                {/* Order Summary */}
                <div className="rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 p-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({cartSummary.count} items)
                      </span>
                      <span className="font-medium">
                        R{cartSummary.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="my-3 h-px bg-border/60" />
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold">Total</span>
                      <span className="text-xl font-bold text-primary">
                        R{cartSummary.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="space-y-2">
                  <CheckoutButton
                    amount={cartSummary.total}
                    productName="Cart checkout"
                  />
                  <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    Secure checkout powered by Paystack
                  </p>
                </div>

                {/* Clear Cart */}
                <Button
                  variant="ghost"
                  className="w-full rounded-xl text-muted-foreground hover:text-destructive"
                  onClick={() => cart.clear()}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear cart
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
