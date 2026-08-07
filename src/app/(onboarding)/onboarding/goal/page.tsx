"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { PageHeader } from "@/components/layout/PageHeader";
import { scoreAssessment } from "@/features/assessment/scoring";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/i18n/LocaleProvider";

function split(value: string | null) {
  return (value ?? "").split(",").filter(Boolean);
}

function Goal() {
  const router = useRouter();
  const params = useSearchParams();
  const { t, l } = useLocale();

  // Skill DNA and the ordering both come from the answers actually given.
  const result = useMemo(
    () =>
      scoreAssessment({
        interests: split(params.get("i")),
        strengths: split(params.get("s")),
        goalId: params.get("g"),
      }),
    [params],
  );

  const [goalId, setGoalId] = useState(result.suggested[0]?.id ?? "");

  return (
    <div className="flex min-h-dvh flex-col">
      <PageHeader
        title={t("skillDna.title")}
        backHref="/onboarding/assessment"
      />

      <div className="mx-auto w-full max-w-md flex-1 px-4 pb-8">
        <p className="text-sm text-ink-muted">{t("skillDna.subtitle")}</p>

        <Card className="mt-4 space-y-3">
          {result.traits.map((trait) => (
            <div key={trait.id}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-ink">{l(trait.label)}</span>
                <span className="text-ink-faint">{trait.score}%</span>
              </div>
              <ProgressBar value={trait.score} className="mt-1.5" />
            </div>
          ))}
        </Card>

        <h2 className="mt-8 text-[15px] font-semibold text-ink">
          {t("goal.title")}
        </h2>
        <p className="mt-1 text-xs text-ink-muted">{t("goal.subtitle")}</p>

        <div className="mt-4 space-y-3">
          {result.suggested.map((goal, index) => {
            const active = goal.id === goalId;
            // Only the top entry is AI's pick, and only when no goal was chosen.
            const aiPick = result.aiChose && index === 0;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setGoalId(goal.id)}
                aria-pressed={active}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl bg-card p-4 text-left transition-colors",
                  active
                    ? "ring-2 ring-primary"
                    : "ring-1 ring-line hover:bg-surface",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                    active ? "bg-primary" : "bg-line",
                  )}
                >
                  {active && <Icon name="check" className="size-3 text-white" />}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink">
                      {l(goal.title)}
                    </span>
                    {aiPick && (
                      <span className="inline-flex items-center gap-1 rounded-pill bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary-dark">
                        <Icon name="sparkles" className="size-3" />
                        {t("assessment.aiPicked")}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                    {l(goal.summary)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <Button
          fullWidth
          className="mt-6"
          onClick={() => router.push("/dashboard")}
        >
          {t("goal.confirm")}
        </Button>
      </div>
    </div>
  );
}

export default function GoalPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-surface" />}>
      <Goal />
    </Suspense>
  );
}
