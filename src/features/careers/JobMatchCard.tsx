"use client";

import { CardLink } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";
import type { JobMatch } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const accents: Record<string, string> = {
  accent: "bg-accent-soft text-accent",
  primary: "bg-primary-soft text-primary-dark",
  lime: "bg-lime/15 text-lime",
  navy: "bg-navy/10 text-navy",
};

const ringTone: Record<string, "primary" | "accent" | "lime"> = {
  accent: "accent",
  primary: "primary",
  lime: "lime",
  navy: "accent",
};

export function JobMatchCard({ job }: { job: JobMatch }) {
  const { t, l } = useLocale();

  return (
    <CardLink href={`/careers/${job.id}`} className="flex items-center gap-3">
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl text-base font-bold",
          accents[job.accent] ?? accents.accent,
        )}
      >
        {job.company[0]}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-ink">
          {l(job.role)}
        </h3>
        <p className="mt-0.5 truncate text-[11px] text-ink-faint">
          {job.company}
        </p>
      </div>

      {/* The ring carries the number; a "Match 83%" line beside it said it twice. */}
      <ProgressRing
        value={job.match}
        size={52}
        sublabel={t("common.match")}
        tone={ringTone[job.accent] ?? "accent"}
      />
    </CardLink>
  );
}
