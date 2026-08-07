"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LocaleToggle } from "./LocaleToggle";

/**
 * Title bar for module pages.
 *
 * `backHref` is opt-in: tab-bar destinations are top-level, so they get no back
 * arrow. Only pushed screens (assessment, a single role) show one.
 */
export function PageHeader({
  title,
  backHref,
  action,
}: {
  title: string;
  backHref?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 bg-surface/90 px-4 py-3 backdrop-blur">
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card text-ink-muted ring-1 ring-line"
        >
          <Icon name="arrowLeft" className="size-4" />
        </Link>
      )}
      <h1 className="min-w-0 flex-1 truncate text-lg font-semibold text-ink">
        {title}
      </h1>
      {action}
      <LocaleToggle />
    </header>
  );
}
