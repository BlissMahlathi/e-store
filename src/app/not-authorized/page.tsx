import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Access restricted" };

export default function NotAuthorizedPage({ searchParams }: { searchParams: { reason?: string } }) {
  const requiresVerification = searchParams?.reason === "verify";
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
      <ShieldAlert className="h-12 w-12 text-primary" />
      <h1 className="text-3xl font-semibold">{requiresVerification ? "Verify email" : "Access restricted"}</h1>
      <p className="text-muted-foreground">
        {requiresVerification
          ? "Your email must be verified before accessing this route. Check your inbox or request a new link."
          : "You tried to view a route you do not have permission to access."}
      </p>
      {requiresVerification ? (
        <Button asChild>
          <Link href="/support">Request verification help</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      )}
    </div>
  );
}
