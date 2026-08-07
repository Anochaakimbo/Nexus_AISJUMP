import { cn } from "@/lib/cn";

export function Logo({
  className,
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "white";
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          tone === "white" ? "text-white" : "text-navy",
        )}
      >
        NE<span className="text-primary">X</span>US
      </span>
      <span
        className={cn(
          "mt-0.5 text-[7px] font-medium tracking-[0.18em]",
          tone === "white" ? "text-white/70" : "text-ink-faint",
        )}
      >
        AI TALENT ECOSYSTEM
      </span>
    </span>
  );
}
