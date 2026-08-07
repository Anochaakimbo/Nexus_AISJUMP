"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";
import { roadmap } from "@/data/roadmap";
import type { RoadmapStatus } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const marker: Record<RoadmapStatus, { style: string; icon: string }> = {
  done: { style: "bg-primary text-white", icon: "check" },
  "in-progress": { style: "bg-primary text-white", icon: "check" },
  locked: { style: "bg-line text-ink-faint", icon: "lock" },
};

export default function RoadmapPage() {
  const { t, l } = useLocale();
  const started = roadmap.filter((level) => level.progress > 0).length;

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={t("roadmap.title")} />

      <div className="space-y-4 px-4">
        {/* Goal and progress in one row — the earlier tab pair added a screen
            of explanation for a single number. */}
        <Card className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-ink-faint">
              {t("roadmap.careerGoal")}
            </p>
            <p className="mt-0.5 truncate text-base font-semibold text-ink">
              {l(profile.goal)}
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-primary">
            {started}
            <span className="text-ink-faint">/{roadmap.length}</span>
          </span>
          <Link
            href="/onboarding/assessment"
            aria-label={t("roadmap.changeGoal")}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink-muted"
          >
            <Icon name="target" className="size-4" />
          </Link>
        </Card>

        <ol className="space-y-2.5">
          {roadmap.map((level) => (
            <li key={level.level}>
              <Card className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    marker[level.status].style,
                  )}
                >
                  <Icon name={marker[level.status].icon} className="size-3.5" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">
                    {level.level}. {l(level.title)}
                  </p>
                  <ProgressBar value={level.progress} className="mt-1.5" />
                </div>

                <span className="shrink-0 text-xs font-medium text-ink-muted">
                  {level.progress}%
                </span>
                <Icon
                  name="chevronRight"
                  className="size-4 shrink-0 text-ink-faint"
                />
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
