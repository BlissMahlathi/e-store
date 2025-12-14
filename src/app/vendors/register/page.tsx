import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VendorOnboardingForm } from "@/components/forms/vendor-onboarding-form";
import { COMPANY_NAME } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export const metadata: Metadata = {
  title: "Become a Vendor | Sell on Our Marketplace",
  description:
    "Join 140+ successful vendors on INHIMStore. Sell your products to thousands of customers. Low commission rates, weekly payouts, dedicated support. Apply to become a vendor today.",
  keywords: [
    "become a vendor",
    "sell online South Africa",
    "join marketplace",
    "vendor registration",
    "sell products online",
    "start selling SA",
    "e-commerce vendor",
    "multi-vendor platform",
    "seller registration",
  ],
  openGraph: {
    title: "Become a Vendor | Sell on INHIMStore",
    description:
      "Join 140+ vendors. Low commissions, weekly payouts, dedicated support.",
    url: `${siteUrl}/vendors/register`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Become a Vendor | INHIMStore",
    description: "Start selling on South Africa's trusted marketplace.",
  },
  alternates: {
    canonical: `${siteUrl}/vendors/register`,
  },
};

export default function VendorRegisterPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Vendors
        </p>
        <h1 className="text-4xl font-semibold">Join the marketplace</h1>
        <p className="mt-4 text-muted-foreground md:w-2/3">
          Submit your catalog and payout details. We will review within 48 hours
          and only onboard verified email accounts.
        </p>
      </div>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Vendor onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <VendorOnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
}
