import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CipcRegistrationForm } from "@/components/forms/cipc-registration-form";
import {
  BUSINESS_SERVICE_STEPS,
  COMPANY_NAME,
  REGISTRATION_EMAIL,
} from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export const metadata: Metadata = {
  title: "CIPC Company Registration Services | Start Your Business",
  description:
    "Professional CIPC company registration services in South Africa. Register your Pty Ltd, incorporate your business, and join our marketplace. Fast, affordable, hassle-free business registration.",
  keywords: [
    "CIPC registration",
    "company registration South Africa",
    "register Pty Ltd",
    "business incorporation SA",
    "start a company South Africa",
    "CIPC services",
    "business registration Limpopo",
    "affordable company registration",
    "register business online",
  ],
  openGraph: {
    title: "CIPC Company Registration | Start Your Business Today",
    description:
      "Professional CIPC registration services. Register your company and join South Africa's leading marketplace.",
    url: `${siteUrl}/services/cipc-support`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CIPC Registration Services | INHIMStore",
    description: "Register your South African company with us.",
  },
  alternates: {
    canonical: `${siteUrl}/services/cipc-support`,
  },
};

export default function CipcSupportPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Business services
        </p>
        <h1 className="text-4xl font-semibold">Register with CIPC</h1>
        <p className="text-muted-foreground md:w-2/3">
          {COMPANY_NAME} assists founders whose businesses are not yet
          registered. Complete the form below and we will file directly with
          CIPC, notify you via {REGISTRATION_EMAIL}, and unlock your vendor
          credentials once the entity is active.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {BUSINESS_SERVICE_STEPS.map((step) => (
          <Card key={step.title} className="border-border/70">
            <CardHeader>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle>Registration intake form</CardTitle>
        </CardHeader>
        <CardContent>
          <CipcRegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
}
