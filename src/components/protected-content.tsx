"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import type { UserRole } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type Props = {
  allowed: UserRole[];
  children: React.ReactNode;
};

export function ProtectedContent({ allowed, children }: Props) {
  const { role, isAuthenticated, emailVerified } = useAuth();

  if (allowed.includes(role) && (!isAuthenticated || emailVerified)) {
    return <>{children}</>;
  }

  const requiresVerification = isAuthenticated && !emailVerified;

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/80 p-6 text-center">
      <ShieldAlert className="h-6 w-6 text-primary" />
      <p className="text-sm text-muted-foreground">
        {requiresVerification
          ? "Verify your email to unlock this feature. Check your inbox for the confirmation link."
          : "Create an account or sign in with the correct role to continue."}
      </p>
      <div className="flex flex-col gap-2 md:flex-row">
        {!isAuthenticated ? (
          <>
            <Button asChild variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Create account</Link>
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href="/support">Need help verifying?</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
