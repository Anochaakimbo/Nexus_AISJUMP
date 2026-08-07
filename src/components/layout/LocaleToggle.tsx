"use client";

import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Icon } from "@/components/ui/Icon";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, toggle } = useLocale();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-pill bg-card px-3 text-xs font-semibold text-ink-muted ring-1 ring-line transition-colors hover:text-ink",
        className,
      )}
    >
      <Icon name="globe" className="size-4" />
      {locale === "th" ? "TH" : "EN"}
    </button>
  );
}
