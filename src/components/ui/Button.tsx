import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "inverse";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors disabled:pointer-events-none disabled:bg-line disabled:text-ink-faint";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-white text-ink border border-line hover:bg-surface",
  outline: "border border-primary text-primary hover:bg-primary-soft",
  // For dark surfaces. Overriding `secondary` with utility classes does not
  // work — Tailwind resolves conflicts by CSS order, not className order.
  inverse: "border border-white/25 text-white hover:bg-white/10",
};

export function Button({
  variant = "primary",
  className,
  fullWidth,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: Variant;
  fullWidth?: boolean;
}) {
  return (
    <button
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  fullWidth,
  ...props
}: React.ComponentProps<typeof Link> & {
  variant?: Variant;
  fullWidth?: boolean;
}) {
  return (
    <Link
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
      {...props}
    />
  );
}
