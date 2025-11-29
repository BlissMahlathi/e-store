"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserRole } from "@/lib/constants";
import { useAuth } from "@/components/providers/auth-provider";
import { useSupabase } from "@/components/providers/supabase-provider";

export function LoginForm() {
  const { setRole } = useAuth();
  const supabase = useSupabase(true);
  const [role, setLocalRole] = useState<UserRole>("customer");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const attempt = async () => {
      setMessage(null);

      if (!supabase) {
        setRole(role);
        setMessage("Supabase not configured. Role updated locally.");
        return;
      }

      setIsSubmitting(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setIsSubmitting(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setRole(role);
      setMessage("Signed in via Supabase");
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
      <div>
        <label className="text-sm font-medium">Login as</label>
        <Select value={role} onValueChange={(value) => setLocalRole(value as UserRole)}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="vendor">Vendor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Continue"}
      </Button>
      {message ? <p className="text-center text-xs text-muted-foreground">{message}</p> : null}
    </form>
  );
}
