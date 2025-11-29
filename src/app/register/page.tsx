import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "@/components/forms/signup-form";

export const metadata: Metadata = { title: "Create account | INHIM Trading Store" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Account</p>
        <h1 className="text-4xl font-semibold">Register & verify</h1>
        <p className="text-muted-foreground">
          Complete signup to receive a verification email. You will only gain access to dashboards once your email is confirmed.
        </p>
      </div>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
