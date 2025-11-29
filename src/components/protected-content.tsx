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
  const { role } = useAuth();
  if (allowed.includes(role)) {
    return <>{children}</>;
  }
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/80 p-6 text-center">
      <ShieldAlert className="h-6 w-6 text-primary" />
      <p className="text-sm text-muted-foreground">
        Create an account or login with the appropriate role to unlock this feature.
      </p>
      <div className="flex flex-col gap-2 md:flex-row">
        <Button asChild variant="secondary">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/vendors/register">Register as vendor</Link>
        </Button>
      </div>
    </div>
  );
}
