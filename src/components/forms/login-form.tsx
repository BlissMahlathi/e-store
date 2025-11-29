"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LoginForm() {
  const { signOut } = useAuth();
  const supabase = useSupabase(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const attempt = async () => {
      setMessage(null);

      if (!supabase) {
        setError("Supabase not configured. Configure environment variables.");
        return;
      }

      setIsSubmitting(true);
      const { error: signInError, data } = await supabase.auth.signInWithPassword({ email, password });
      setIsSubmitting(false);

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (!data.user?.email_confirmed_at) {
        await supabase.auth.signOut();
        setError("Verify your email before accessing dashboards. Check your inbox for the confirmation link.");
        return;
      }

      setMessage("Signed in. Redirecting you to your dashboard...");
    };

    attempt();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" name="email" placeholder="you@email.com" required />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <Input type="password" name="password" placeholder="••••••••" required />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Continue"}
      </Button>
      {message ? <p className="text-center text-xs text-muted-foreground">{message}</p> : null}
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <Button type="button" variant="ghost" className="w-full text-xs" onClick={() => signOut()}>
        Sign out of all sessions
      </Button>
    </form>
  );
}
