import { cn } from "@/lib/cn";

const palette = [
  "bg-accent text-white",
  "bg-primary text-white",
  "bg-navy text-white",
  "bg-lime text-white",
];

/**
 * Initials avatar. The design shows photographs; the demo has no licensed
 * portraits, so a deterministic coloured initial stands in rather than
 * shipping placeholder faces.
 */
export function Avatar({
  name,
  size = 44,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initial = Array.from(name.trim())[0] ?? "?";
  const swatch =
    palette[Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        swatch,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
