import { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/forms/login-form";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Login | ${COMPANY_NAME} Store` };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold">Access your account</h1>
        <p className="text-sm text-muted-foreground">
          Customers, vendors, and admins share a single entry point. Email
          verification is required before access.
        </p>
      </div>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="h-48 animate-pulse bg-muted rounded-lg" />
            }
          >
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
