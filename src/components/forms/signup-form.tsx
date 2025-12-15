"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSupabase } from "@/components/providers/supabase-provider";

function getBaseUrl() {
  // First try the environment variable (works on server and client)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Fallback to window.location.origin on client
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  // Last resort fallback
  return "https://inhimstore.co.za";
}

export function SignupForm() {
  const router = useRouter();
  const supabase = useSupabase(true);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = (formData.get("fullName") as string | null)?.trim() ?? "";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const run = async () => {
      if (!supabase) {
        setError("Supabase not configured. Add your project keys.");
        return;
      }
      setStatus(null);
      setError(null);
      setIsSubmitting(true);

      const baseUrl = getBaseUrl();
      const emailRedirectTo = `${baseUrl}/login?verified=true`;

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
          data: {
            role: "customer",
            display_name: fullName || undefined,
          },
        },
      });
      setIsSubmitting(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setStatus(
        "Registration successful! Check your email for the verification link."
      );
      (event.currentTarget as HTMLFormElement).reset();

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 3000);
    };

    run();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Full name</label>
        <Input
          type="text"
          name="fullName"
          placeholder="Your name"
          autoComplete="name"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" name="email" required placeholder="you@email.com" />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          name="password"
          required
          placeholder="Create a strong password"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Create account"}
      </Button>
      {status ? (
        <Alert>
          <AlertTitle>Next steps</AlertTitle>
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
