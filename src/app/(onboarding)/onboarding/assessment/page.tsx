"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/cn";
import { interests, strengths } from "@/data/profile";
import { careerGoals } from "@/data/roadmap";
import type { Interest } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const MIN_INTERESTS = 3;
const MIN_STRENGTHS = 1;
const STEPS = 3;

/** Square icon tiles shared by the two multi-select steps. */
function ChoiceGrid({
  options,
  picked,
  onToggle,
}: {
  options: Interest[];
  picked: string[];
  onToggle: (id: string) => void;
}) {
  const { l } = useLocale();
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => {
        const active = picked.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id)}
            aria-pressed={active}
            className={cn(
              "flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl p-2 text-center text-[11px] font-medium transition-colors",
              active
                ? "bg-primary-soft text-primary-dark ring-2 ring-primary"
                : "bg-card text-ink-muted ring-1 ring-line hover:bg-surface",
            )}
          >
            <Icon
              name={option.icon}
              className={cn("size-6", active ? "text-primary" : "text-ink-faint")}
            />
            <span className="leading-tight">{l(option.label)}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function AssessmentPage() {
  const router = useRouter();
  const { t, l } = useLocale();

  const [step, setStep] = useState(0);
  const [pickedInterests, setPickedInterests] = useState<string[]>([]);
  const [pickedStrengths, setPickedStrengths] = useState<string[]>([]);
  // null means "let AI decide" — a deliberate answer, not an empty one.
  const [goalId, setGoalId] = useState<string | null>(null);
  const [goalAnswered, setGoalAnswered] = useState(false);

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
      setter((current) =>
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id],
      );

  const canContinue = [
    pickedInterests.length >= MIN_INTERESTS,
    pickedStrengths.length >= MIN_STRENGTHS,
    goalAnswered,
  ][step];

  const heading = [
    t("assessment.pickInterests"),
    t("assessment.pickStrengths"),
    t("assessment.pickGoal"),
  ][step];

  const goBack = () =>
    step === 0 ? router.push("/onboarding") : setStep(step - 1);

  const goNext = () => {
    if (step < STEPS - 1) {
      setStep(step + 1);
      return;
    }
    const query = new URLSearchParams({
      i: pickedInterests.join(","),
      s: pickedStrengths.join(","),
    });
    if (goalId) query.set("g", goalId);
    router.push(`/onboarding/analyzing?${query}`);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <PageHeader title={t("assessment.title")} backHref="/onboarding" />

      <div className="mx-auto w-full max-w-md flex-1 px-4 pb-8">
        <p className="text-sm text-ink-muted">{t("assessment.subtitle")}</p>

        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: STEPS }, (_, index) => (
            <span
              key={index}
              className={cn(
                "h-1 flex-1 rounded-pill transition-colors",
                index <= step ? "bg-primary" : "bg-line",
              )}
            />
          ))}
        </div>

        <h2 className="mt-6 text-[15px] font-semibold text-ink">{heading}</h2>

        <div className="mt-4">
          {step === 0 && (
            <ChoiceGrid
              options={interests}
              picked={pickedInterests}
              onToggle={toggle(setPickedInterests)}
            />
          )}

          {step === 1 && (
            <ChoiceGrid
              options={strengths}
              picked={pickedStrengths}
              onToggle={toggle(setPickedStrengths)}
            />
          )}

          {step === 2 && (
            <div className="space-y-3">
              {careerGoals.map((goal) => {
                const active = goalAnswered && goalId === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => {
                      setGoalId(goal.id);
                      setGoalAnswered(true);
                    }}
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
                      {active && (
                        <Icon name="check" className="size-3 text-white" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">
                        {l(goal.title)}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                        {l(goal.summary)}
                      </span>
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setGoalId(null);
                  setGoalAnswered(true);
                }}
                aria-pressed={goalAnswered && goalId === null}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left text-sm font-medium transition-colors",
                  goalAnswered && goalId === null
                    ? "text-primary-dark ring-2 ring-primary"
                    : "text-ink-muted ring-1 ring-line hover:bg-surface",
                )}
              >
                <Icon name="sparkles" className="size-5 shrink-0 text-primary" />
                {t("assessment.unsure")}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={goBack}>
            {t("common.back")}
          </Button>
          <Button className="flex-1" disabled={!canContinue} onClick={goNext}>
            {t("common.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
