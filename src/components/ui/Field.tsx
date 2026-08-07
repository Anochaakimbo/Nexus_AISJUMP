import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export function SearchInput({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-11 flex-1 items-center gap-2 rounded-pill bg-card px-4 ring-1 ring-line">
        <Icon name="search" className="size-4 text-ink-faint" />
        <input
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
        />
      </div>
      <button
        type="button"
        aria-label="Filter"
        className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-card text-ink-muted ring-1 ring-line"
      >
        <Icon name="filter" className="size-4" />
      </button>
    </div>
  );
}

export function FilterChip({
  active = false,
  className,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-pill px-4 py-1.5 text-[13px] font-medium transition-colors",
        active
          ? "bg-primary text-white"
          : "bg-card text-ink-muted ring-1 ring-line hover:bg-surface",
        className,
      )}
      {...props}
    />
  );
}
