"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/layout/PageHeader";
import { StageProgress } from "@/features/coach/StageProgress";
import { profile } from "@/data/profile";
import { roadmap } from "@/data/roadmap";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function RoadmapPage() {
  const { t, l } = useLocale();
  const passed = roadmap.filter((level) => level.status === "done").length;

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={t("roadmap.title")} />

      <div className="space-y-4 px-4">
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
            {passed}
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

        {/* Where the learner is in the behavioural model, before the skill
            levels — the "why now" ahead of the "what next". */}
        <StageProgress current={profile.stage} />
      </div>
    </div>
  );
}
