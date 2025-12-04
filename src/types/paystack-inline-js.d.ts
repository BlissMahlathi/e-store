declare module "@paystack/inline-js" {
  type PaystackSetupOptions = {
    key: string;
    email: string;
    amount: number;
    ref?: string;
    currency?: string;
    channels?: string[];
    metadata?: Record<string, unknown>;
    onClose?: () => void;
    callback?: (response: { reference: string }) => void;
  };

  type PaystackHandler = {
    openIframe: () => void;
  };

  const PaystackPop: {
    setup(options: PaystackSetupOptions): PaystackHandler;
  };

  export default PaystackPop;
}
