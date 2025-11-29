"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function EmailVerificationBanner() {
  const { isAuthenticated, emailVerified } = useAuth();

  if (!isAuthenticated || emailVerified) {
    return null;
  }

  return (
    <div className="bg-amber-100/80 px-4 py-3 text-sm text-amber-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5" />
          <p>Email verification pending. Please confirm from your inbox to unlock checkout and dashboards.</p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href="/support">Need a new link?</Link>
        </Button>
      </div>
    </div>
  );
}
