import Link from "next/link";
import { cn } from "@/lib/cn";

const base = "block rounded-2xl bg-card p-4 shadow-[0_1px_3px_rgba(11,29,55,0.06)]";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn(base, className)} {...props} />;
}

export function CardLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, "transition-shadow hover:shadow-[0_4px_16px_rgba(11,29,55,0.10)]", className)}
      {...props}
    />
  );
}
