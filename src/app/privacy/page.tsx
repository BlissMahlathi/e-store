import { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export const metadata: Metadata = {
  title: "Privacy Policy | Data Protection",
  description:
    "INHIMStore's privacy policy. Learn how we protect your data, handle cookies, and ensure secure transactions. We never sell customer data.",
  keywords: [
    "privacy policy",
    "data protection",
    "POPIA compliance",
    "South Africa privacy",
    "secure shopping",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6 text-sm text-muted-foreground">
      <h1 className="text-3xl font-semibold text-foreground">Privacy policy</h1>
      <p>
        We use cookies to store role preferences, authentication state, and
        analytics about dashboard performance.
      </p>
      <p>
        By browsing the site, you consent to this storage for up to 12 months.
        You may clear cookies anytime to reset.
      </p>
      <p>
        We never sell customer data and only share anonymized vendor insights
        for benchmarking.
      </p>
    </div>
  );
}
