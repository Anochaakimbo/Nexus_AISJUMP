import { cn } from "@/lib/cn";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** The donut used for Career Readiness and job-match scores. */
export function ProgressRing({
  value,
  size = 96,
  label,
  sublabel,
  tone = "primary",
  className,
}: {
  value: number;
  size?: number;
  label?: string;
  sublabel?: string;
  tone?: "primary" | "accent" | "lime";
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const stroke = {
    primary: "stroke-primary",
    accent: "stroke-accent",
    lime: "stroke-lime",
  }[tone];

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label ?? ""} ${clamped}%`.trim()}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          className="fill-none stroke-line"
          strokeWidth={9}
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          className={cn("fill-none", stroke)}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - clamped / 100)}
        />
      </svg>
      {/* Text scales with the ring — a fixed size overflows at small diameters. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span
          className="font-semibold text-ink"
          style={{ fontSize: Math.round(size * 0.24) }}
        >
          {clamped}%
        </span>
        {sublabel && size >= 72 && (
          <span
            className="mt-1 text-ink-faint"
            style={{ fontSize: Math.round(size * 0.13) }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "primary",
  className,
}: {
  value: number;
  tone?: "primary" | "accent" | "lime" | "warn";
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const fill = {
    primary: "bg-primary",
    accent: "bg-accent",
    lime: "bg-lime",
    warn: "bg-warn",
  }[tone];

  return (
    <div className={cn("h-1.5 w-full rounded-pill bg-line", className)}>
      <div
        className={cn("h-full rounded-pill transition-[width]", fill)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
