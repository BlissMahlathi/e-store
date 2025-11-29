"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSupabase } from "@/components/providers/supabase-provider";

export function SignupForm() {
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
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/login`,
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
      setStatus("Registration submitted. Please verify your email before logging in.");
      (event.currentTarget as HTMLFormElement).reset();
    };

    run();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Full name</label>
        <Input type="text" name="fullName" placeholder="Your name" autoComplete="name" />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" name="email" required placeholder="you@email.com" />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <Input type="password" name="password" required placeholder="Create a strong password" />
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
