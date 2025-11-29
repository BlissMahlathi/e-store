type PaystackConfig = {
  amount: number; // in ZAR/Rand
  email: string;
  reference?: string;
  metadata?: Record<string, unknown>;
};

export async function initiatePaystackCheckout({ amount, email, reference, metadata }: PaystackConfig) {
  if (typeof window === "undefined") return;

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error("Paystack public key missing. Set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your env.");
  }

  const { default: PaystackPop } = await import("@paystack/inline-js");

  const handler = PaystackPop.setup({
    key: publicKey,
    email,
    amount: Math.round(amount * 100),
    ref: reference ?? `estore-${Date.now()}`,
    metadata,
    callback: (response: unknown) => {
      console.log("Paystack success", response);
    },
    onClose: () => {
      console.log("Paystack checkout closed");
    },
  });

  handler.openIframe();
}
