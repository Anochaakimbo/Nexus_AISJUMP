import Link from "next/link";
import { cn } from "@/lib/cn";

export function SectionHeader({
  title,
  actionLabel,
  actionHref,
  className,
}: {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-3", className)}>
      <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-xs font-medium text-primary hover:underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function StatTile({
  value,
  label,
  className,
}: {
  value: string | number;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-lg font-semibold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] text-ink-faint">{label}</div>
    </div>
  );
}
