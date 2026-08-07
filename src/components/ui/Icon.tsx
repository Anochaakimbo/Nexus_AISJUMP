import { cn } from "@/lib/cn";

/**
 * Single inline SVG sprite — no icon dependency.
 * All glyphs are 24x24 on a consistent stroke so they sit together in the nav.
 */
const paths: Record<string, string> = {
  // Navigation — one per module
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  roadmap: "M12 3v4m0 4v4m0 4v2M7 7H5a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4H7",
  learn: "M3 6.5 12 3l9 3.5-9 3.5zM6 11v5.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11",
  opportunity: "M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM9 8V6a3 3 0 0 1 6 0v2",
  mentor:
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1",
  passport:
    "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 8h6M9 12h6M9 16h3",
  career: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0",

  // Interface
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  filter: "M4 6h16M7 12h10M10 18h4",
  bell: "M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9zM10 19a2 2 0 0 0 4 0",
  check: "m5 13 4 4L19 7",
  chevronRight: "m9 5 7 7-7 7",
  chevronLeft: "m15 5-7 7 7 7",
  arrowLeft: "M19 12H5m0 0 6-6m-6 6 6 6",
  star: "m12 3 2.7 5.8 6.3.8-4.6 4.4 1.2 6.2L12 17.3 6.4 20.2l1.2-6.2L3 9.6l6.3-.8z",
  location: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  calendar:
    "M5 6h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM8 3v4M16 3v4M4 11h16",
  share: "M12 15V3m0 0L8 7m4-4 4 4M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5",
  sparkles: "m12 3 1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 16l.9 2.1L21 19l-2.1.9L18 22l-.9-2.1L15 19l2.1-.9z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  lock: "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V8a4 4 0 1 1 8 0v3",
  play: "M8 5.5v13l10-6.5z",
  message: "M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",

  // Assessment interests
  chip: "M8 8h8v8H8zM4 10h4M4 14h4M16 10h4M16 14h4M10 4v4M14 4v4M10 16v4M14 16v4",
  flask: "M9 3h6M10 3v6L5 19a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 19l-5-10V3",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  palette:
    "M12 21a9 9 0 1 1 0-18c5 0 9 3.4 9 7.5 0 2.5-2 3.5-3.5 3.5H16a2 2 0 0 0-1.4 3.4A1.8 1.8 0 0 1 12 21zM7.5 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM11 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15.5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  cross: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z",
  school: "M12 4 3 8.5 12 13l9-4.5zM7 11v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5",
  megaphone: "M4 10v4a1 1 0 0 0 1 1h3l7 4V5L8 9H5a1 1 0 0 0-1 1zM18 9a4 4 0 0 1 0 6",
  people:
    "M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20a7 7 0 0 1 14 0M17 6.2a3.5 3.5 0 0 1 0 6.6M18 14a6 6 0 0 1 4 5.7",
  run: "M14 5a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 14 5zM6 21l3.5-5 2-4.5L9 8.5 6.5 11M11.5 11.5 16 14l1.5 7M12.5 7 16 9l3-.5",
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  // The default lives here, not in the base classes: Tailwind resolves
  // conflicting utilities by CSS order, so a hardcoded `size-6` in the base
  // would beat every caller's smaller size instead of being overridden.
  className = "size-6",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  const d = paths[name] ?? paths.check;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}
