/** Tiny class-name joiner. Keeps the dependency list at zero. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** 12000 -> "12K" — matches the learner counts in the design. */
export function formatCount(value: number) {
  if (value >= 1000) {
    const thousands = value / 1000;
    const rounded = thousands >= 10 ? Math.round(thousands) : thousands.toFixed(1);
    return `${String(rounded).replace(/\.0$/, "")}K`;
  }
  return String(value);
}
