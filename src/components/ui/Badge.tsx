import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Tone = "neutral" | "primary" | "accent" | "lime" | "navy" | "warn";

const tones: Record<Tone, string> = {
  neutral: "bg-surface text-ink-muted",
  primary: "bg-primary-soft text-primary-dark",
  accent: "bg-accent-soft text-accent",
  lime: "bg-lime/15 text-lime",
  navy: "bg-navy/10 text-navy",
  warn: "bg-warn/15 text-warn",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Rating({
  value,
  count,
  countLabel,
  className,
}: {
  value: number;
  count?: number;
  countLabel?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 text-xs text-ink-muted", className)}
    >
      <Icon name="star" filled className="size-3.5 text-warn" />
      <span className="font-medium text-ink">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-ink-faint">
          ({count}
          {countLabel ? ` ${countLabel}` : ""})
        </span>
      )}
    </span>
  );
}
