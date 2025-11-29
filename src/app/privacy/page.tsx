import { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Privacy | ${COMPANY_NAME}` };

export default function PrivacyPage() {
  return (
    <div className="space-y-6 text-sm text-muted-foreground">
      <h1 className="text-3xl font-semibold text-foreground">Privacy policy</h1>
      <p>We use cookies to store role preferences, authentication state, and analytics about dashboard performance.</p>
      <p>By browsing the site, you consent to this storage for up to 12 months. You may clear cookies anytime to reset.</p>
      <p>We never sell customer data and only share anonymized vendor insights for benchmarking.</p>
    </div>
  );
}
