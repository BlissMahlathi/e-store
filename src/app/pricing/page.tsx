import { Metadata } from "next";
import {
  COMMISSION_TIERS,
  COMMISSION_RATE,
  DISCOUNT_PERIOD_MONTHS,
  DISCOUNT_THRESHOLD_AMOUNT,
  HIGH_PERFORMER_DISCOUNT,
  COMPANY_NAME,
} from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export const metadata: Metadata = {
  title: "Vendor Pricing | Commission Rates & Fees",
  description:
    "Transparent pricing for vendors. Start with 12% commission, earn discounts as you grow. No hidden fees, weekly payouts. Join South Africa's fairest multi-vendor marketplace.",
  keywords: [
    "vendor fees South Africa",
    "marketplace commission rates",
    "sell online costs",
    "e-commerce fees SA",
    "vendor pricing",
    "multi-vendor commissions",
    "start selling online",
    "low commission marketplace",
  ],
  openGraph: {
    title: "Vendor Pricing | Fair Commission Rates",
    description:
      "Start with 12% commission, earn discounts as you grow. Transparent pricing, weekly payouts.",
    url: `${siteUrl}/pricing`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vendor Pricing | INHIMStore",
    description: "Fair commission rates for South African vendors.",
  },
  alternates: {
    canonical: `${siteUrl}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Pricing
        </p>
        <h1 className="text-4xl font-semibold">Commission-only economics</h1>
        <p className="mt-4 text-muted-foreground md:w-2/3">
          Start with a {Math.round(COMMISSION_RATE * 100)}% commission. Sell R
          {DISCOUNT_THRESHOLD_AMOUNT.toLocaleString()} in{" "}
          {DISCOUNT_PERIOD_MONTHS} months to receive an automatic{" "}
          {Math.round(HIGH_PERFORMER_DISCOUNT * 100)}% discount on fees.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {COMMISSION_TIERS.map((tier) => (
          <Card key={tier.label} className="border-border/70">
            <CardHeader>
              <p className="text-xs uppercase text-muted-foreground">
                {tier.label}
              </p>
              <CardTitle className="text-4xl">{tier.rate}</CardTitle>
              <p className="text-sm text-muted-foreground">{tier.range}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tier.benefit}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-primary/40">
        <CardContent className="space-y-2 p-6">
          <p className="text-sm font-medium">Payout cadence</p>
          <p className="text-sm text-muted-foreground">
            Weekly settlements every Friday · Minimum payout R1,000 · Priority
            processing for high-volume vendors.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
