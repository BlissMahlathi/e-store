"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signOut } = useAuth();
  const supabase = useSupabase(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user just registered or verified
  const justRegistered = searchParams.get("registered") === "true";
  const justVerified = searchParams.get("verified") === "true";
  const redirectTo = searchParams.get("redirect");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const attempt = async () => {
      setMessage(null);
      setError(null);

      if (!supabase) {
        setError("Supabase not configured. Configure environment variables.");
        return;
      }

      setIsSubmitting(true);
      const { error: signInError, data } =
        await supabase.auth.signInWithPassword({ email, password });
      setIsSubmitting(false);

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (!data.user?.email_confirmed_at) {
        await supabase.auth.signOut();
        setError(
          "Please verify your email first. Check your inbox for the confirmation link."
        );
        return;
      }

      setMessage("Signed in successfully! Redirecting...");

      // Determine redirect destination based on role
      const role =
        data.user?.app_metadata?.role ||
        data.user?.user_metadata?.role ||
        "customer";

      // If there's a redirect parameter, use it
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }

      // Otherwise, redirect based on role
      setTimeout(() => {
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "vendor") {
          router.push("/dashboard/vendor");
        } else {
          router.push("/marketplace");
        }
        router.refresh();
      }, 1000);
    };

    attempt();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {justRegistered && (
        <Alert>
          <AlertTitle>Registration successful!</AlertTitle>
          <AlertDescription>
            Please check your email and click the verification link before
            logging in.
          </AlertDescription>
        </Alert>
      )}
      {justVerified && (
        <Alert>
          <AlertTitle>Email verified!</AlertTitle>
          <AlertDescription>
            Your email has been verified. You can now log in.
          </AlertDescription>
        </Alert>
      )}
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" name="email" placeholder="you@email.com" required />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Continue"}
      </Button>
      {message && (
        <p className="text-center text-sm text-green-600 font-medium">
          {message}
        </p>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        type="button"
        variant="ghost"
        className="w-full text-xs"
        onClick={() => signOut()}
      >
        Sign out of all sessions
      </Button>
    </form>
  );
}
