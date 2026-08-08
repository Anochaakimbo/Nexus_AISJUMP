"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";
import type { JobMatch } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useSavedCareers } from "./SavedProvider";

const ringTone: Record<string, "primary" | "accent" | "lime"> = {
  accent: "accent",
  primary: "primary",
  lime: "lime",
  cyan: "accent",
  violet: "accent",
  rose: "primary",
  amber: "lime",
};

/**
 * One role in a result list: the match, who it is with, what it asks for, and
 * a bookmark that writes straight through to the profile.
 */
export function CareerResultCard({ job }: { job: JobMatch }) {
  const { t, l } = useLocale();
  const { isSaved, toggle } = useSavedCareers();
  const saved = isSaved(job.id);

  return (
    <Card className="space-y-2.5">
      <div className="flex items-center gap-3">
        <Link
          href={`/careers/${job.id}`}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <ProgressRing
            value={job.match}
            size={44}
            tone={ringTone[job.accent] ?? "accent"}
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink">
              {l(job.role)}
            </span>
            <span className="block truncate text-[11px] text-ink-faint">
              {job.company}
            </span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => toggle(job.id)}
          aria-pressed={saved}
          aria-label={saved ? t("career.unsave") : t("career.save")}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
            saved
              ? "bg-primary text-white"
              : "bg-surface text-ink-muted ring-1 ring-line",
          )}
        >
          <Icon name="bookmark" filled={saved} className="size-4" />
        </button>
      </div>

      <div>
        <p className="text-[11px] font-medium text-ink-faint">
          {t("career.requiredSkills")}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {job.requiredSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-pill bg-accent-soft px-2.5 py-0.5 text-[10px] font-medium text-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
