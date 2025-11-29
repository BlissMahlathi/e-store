"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { initiatePaystackCheckout } from "@/lib/paystack";

type CheckoutButtonProps = {
  amount: number;
  productName: string;
};

export function CheckoutButton({ amount, productName }: CheckoutButtonProps) {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const canCheckout = role === "customer" || role === "vendor" || role === "admin";

  const handleCheckout = async () => {
    if (!canCheckout) return;
    setIsLoading(true);
    try {
      await initiatePaystackCheckout({
        amount,
        email: "customer@example.com",
        metadata: { productName },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={!canCheckout || isLoading} className="w-full" onClick={handleCheckout}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      {canCheckout ? (isLoading ? "Processing..." : "Checkout") : "Login to checkout"}
    </Button>
  );
}
