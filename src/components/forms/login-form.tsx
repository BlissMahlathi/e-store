"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserRole } from "@/lib/constants";
import { useAuth } from "@/components/providers/auth-provider";

export function LoginForm() {
  const { setRole } = useAuth();
  const [role, setLocalRole] = useState<UserRole>("customer");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRole(role);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" placeholder="you@email.com" required />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <Input type="password" placeholder="••••••••" required />
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
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}
