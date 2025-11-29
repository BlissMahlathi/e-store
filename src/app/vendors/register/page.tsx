import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VendorOnboardingForm } from "@/components/forms/vendor-onboarding-form";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Vendor registration | ${COMPANY_NAME}` };

export default function VendorRegisterPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Vendors</p>
        <h1 className="text-4xl font-semibold">Join the marketplace</h1>
        <p className="mt-4 text-muted-foreground md:w-2/3">
          Submit your catalog and payout details. We will review within 48 hours and only onboard verified email accounts.
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
