"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";

export function CheckoutButton() {
  const { role } = useAuth();
  const canCheckout = role === "customer" || role === "vendor" || role === "admin";

  return (
    <Button disabled={!canCheckout} className="w-full">
      <ShoppingCart className="mr-2 h-4 w-4" />
      {canCheckout ? "Checkout" : "Login to checkout"}
    </Button>
  );
}
