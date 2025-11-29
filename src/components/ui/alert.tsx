import { cn } from "@/lib/utils";

export function Alert({ className, children, variant = "default" }: { className?: string; children: React.ReactNode; variant?: "default" | "destructive" }) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-2xl border p-4 text-sm",
        variant === "destructive" ? "border-red-500/40 bg-red-500/10 text-red-600" : "border-border/70 bg-muted/30",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("font-semibold", className)}>{children}</p>;
}

export function AlertDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm", className)}>{children}</p>;
}
