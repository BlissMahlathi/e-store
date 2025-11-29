"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { UserRole } from "@/lib/constants";

type AuthContextValue = {
  role: UserRole;
  isAuthenticated: boolean;
  setRole: (next: UserRole) => void;
};

const STORAGE_KEY = "estore-role";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    if (typeof window === "undefined") return "customer";
    return (window.localStorage.getItem(STORAGE_KEY) as UserRole | null) ?? "customer";
  });

  const setRole = (next: UserRole) => {
    setRoleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      role,
      isAuthenticated: role !== "guest",
      setRole,
    }),
    [role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
