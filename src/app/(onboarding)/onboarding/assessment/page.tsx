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
// Four steps; the last one is optional and never blocks the finish button.
const STEPS = 4;

// Written out in full so Tailwind can see every class.
const tints: Record<Interest["color"], string> = {
  accent: "bg-accent/10 text-accent",
  cyan: "bg-cyan/10 text-cyan",
  primary: "bg-primary/10 text-primary-dark",
  amber: "bg-amber/10 text-amber",
  rose: "bg-rose/10 text-rose",
  violet: "bg-violet/10 text-violet",
};

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
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-xl transition-colors",
                active ? "bg-primary text-white" : tints[option.color],
              )}
            >
              <Icon name={option.icon} className="size-5" />
            </span>
            <span className="leading-tight">{l(option.label)}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Square career tile. Same block language as the two grids above it. */
function GoalTile({
  active,
  icon,
  tint,
  title,
  summary,
  onSelect,
}: {
  active: boolean;
  icon: string;
  tint: string;
  title: string;
  summary?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl p-3 text-center transition-colors",
        active
          ? "bg-primary-soft ring-2 ring-primary"
          : "bg-card ring-1 ring-line hover:bg-surface",
      )}
    >
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-xl transition-colors",
          active ? "bg-primary text-white" : tint,
        )}
      >
        <Icon name={icon} className="size-5" />
      </span>
      <span
        className={cn(
          "text-[13px] font-semibold leading-tight",
          active ? "text-primary-dark" : "text-ink",
        )}
      >
        {title}
      </span>
      {summary && (
        <span className="text-[11px] leading-tight text-ink-muted">
          {summary}
        </span>
      )}
    </button>
  );
}

export default function AssessmentPage() {
  const router = useRouter();
  const { t, l } = useLocale();

  const [step, setStep] = useState(0);
  const [pickedInterests, setPickedInterests] = useState<string[]>([]);
  const [pickedStrengths, setPickedStrengths] = useState<string[]>([]);
  // Free-text strengths the grid doesn't cover.
  const [ownStrengths, setOwnStrengths] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  // null means "let AI decide" — a deliberate answer, not an empty one.
  const [goalId, setGoalId] = useState<string | null>(null);
  const [goalAnswered, setGoalAnswered] = useState(false);
  const [ownGoals, setOwnGoals] = useState<string[]>([]);
  const [goalDraft, setGoalDraft] = useState("");
  // Filename only — the prototype has nowhere to upload to.
  const [attachment, setAttachment] = useState<string | null>(null);

  const pickGoal = (id: string | null) => {
    setGoalId(id);
    setGoalAnswered(true);
  };

  const addOwnGoal = () => {
    const value = goalDraft.trim();
    if (!value || ownGoals.includes(value)) return;
    setOwnGoals((current) => [...current, value]);
    setGoalDraft("");
    pickGoal(`custom:${value}`);
  };

  const removeOwnGoal = (goal: string) => {
    setOwnGoals((current) => current.filter((value) => value !== goal));
    if (goalId === `custom:${goal}`) {
      setGoalId(null);
      setGoalAnswered(false);
    }
  };

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
      setter((current) =>
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id],
      );

  const addOwn = () => {
    const value = draft.trim();
    if (!value || ownStrengths.includes(value)) return;
    setOwnStrengths((current) => [...current, value]);
    setDraft("");
  };

  const strengthCount = pickedStrengths.length + ownStrengths.length;

  // Attachment leads; it is optional, so it never blocks the next button.
  const canContinue = [
    true,
    pickedInterests.length >= MIN_INTERESTS,
    strengthCount >= MIN_STRENGTHS,
    goalAnswered,
  ][step];

  const heading = [
    t("assessment.attachLabel"),
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
    if (ownStrengths.length) query.set("o", ownStrengths.join("|"));
    if (goalId) query.set("g", goalId);
    if (attachment) query.set("f", attachment);
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
          {step === 1 && (
            <ChoiceGrid
              options={interests}
              picked={pickedInterests}
              onToggle={toggle(setPickedInterests)}
            />
          )}

          {step === 2 && (
            <>
              <ChoiceGrid
                options={strengths}
                picked={pickedStrengths}
                onToggle={toggle(setPickedStrengths)}
              />

              <div className="mt-5">
                <h3 className="text-[13px] font-semibold text-ink">
                  {t("assessment.otherLabel")}
                </h3>

                <div className="mt-2 flex gap-2">
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addOwn();
                      }
                    }}
                    placeholder={t("assessment.otherPlaceholder")}
                    aria-label={t("assessment.otherLabel")}
                    className="h-11 min-w-0 flex-1 rounded-pill bg-card px-4 text-sm text-ink ring-1 ring-line outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    variant="secondary"
                    className="h-11 shrink-0 px-5 text-sm"
                    disabled={!draft.trim()}
                    onClick={addOwn}
                  >
                    {t("assessment.add")}
                  </Button>
                </div>

                {ownStrengths.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {ownStrengths.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() =>
                            setOwnStrengths((current) =>
                              current.filter((value) => value !== item),
                            )
                          }
                          aria-label={`${t("assessment.removeItem")}: ${item}`}
                          className="inline-flex items-center gap-1.5 rounded-pill bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary-dark"
                        >
                          {item}
                          <Icon name="close" className="size-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Two columns, not three: a career needs a line of explanation,
                  which does not fit a third-width square. */}
              <div className="grid grid-cols-2 gap-3">
                {careerGoals.map((goal) => {
                  const active = goalAnswered && goalId === goal.id;
                  return (
                    <GoalTile
                      key={goal.id}
                      active={active}
                      icon={goal.icon}
                      tint={tints[goal.color]}
                      title={l(goal.title)}
                      summary={l(goal.summary)}
                      onSelect={() => pickGoal(goal.id)}
                    />
                  );
                })}

                {ownGoals.map((goal) => (
                  <div key={goal} className="relative">
                    <GoalTile
                      active={goalAnswered && goalId === `custom:${goal}`}
                      icon="flag"
                      tint={tints.amber}
                      title={goal}
                      summary={t("assessment.yourGoal")}
                      onSelect={() => pickGoal(`custom:${goal}`)}
                    />
                    <button
                      type="button"
                      onClick={() => removeOwnGoal(goal)}
                      aria-label={`${t("assessment.removeItem")}: ${goal}`}
                      className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-surface text-ink-faint"
                    >
                      <Icon name="close" className="size-3" />
                    </button>
                  </div>
                ))}

                <GoalTile
                  active={goalAnswered && goalId === null}
                  icon="sparkles"
                  tint={tints.primary}
                  title={t("assessment.unsure")}
                  onSelect={() => pickGoal(null)}
                />
              </div>

              <div className="mt-5">
                <h3 className="text-[13px] font-semibold text-ink">
                  {t("assessment.otherGoal")}
                </h3>
                <div className="mt-2 flex gap-2">
                  <input
                    value={goalDraft}
                    onChange={(event) => setGoalDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addOwnGoal();
                      }
                    }}
                    placeholder={t("assessment.otherGoalPlaceholder")}
                    aria-label={t("assessment.otherGoal")}
                    className="h-11 min-w-0 flex-1 rounded-pill bg-card px-4 text-sm text-ink ring-1 ring-line outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    variant="secondary"
                    className="h-11 shrink-0 px-5 text-sm"
                    disabled={!goalDraft.trim()}
                    onClick={addOwnGoal}
                  >
                    {t("assessment.add")}
                  </Button>
                </div>
              </div>

            </>
          )}

          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="shrink-0 rounded-pill bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-faint">
                  {t("assessment.optional")}
                </span>
                <p className="text-xs text-ink-muted">
                  {t("assessment.attachWhy")}
                </p>
              </div>

              {attachment ? (
                <div className="flex items-center gap-3 rounded-2xl bg-primary-soft p-4">
                  <Icon
                    name="passport"
                    className="size-6 shrink-0 text-primary-dark"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-primary-dark">
                    {attachment}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    aria-label={t("assessment.removeItem")}
                    className="shrink-0 text-primary-dark"
                  >
                    <Icon name="close" className="size-4" />
                  </button>
                </div>
              ) : (
                <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-card p-6 text-center transition-colors hover:bg-surface">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon name="share" className="size-6" />
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {t("assessment.attachButton")}
                  </span>
                  <span className="text-[11px] text-ink-faint">
                    {t("assessment.attachHint")}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="sr-only"
                    onChange={(event) =>
                      setAttachment(event.target.files?.[0]?.name ?? null)
                    }
                  />
                </label>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={goBack}>
            {t("common.back")}
          </Button>
          <Button className="flex-1" disabled={!canContinue} onClick={goNext}>
            {step === STEPS - 1 ? t("assessment.finish") : t("common.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
