"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { ChangeStage } from "@/data/types";
import { roadmap } from "@/data/roadmap";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { RoadmapTimeline } from "./RoadmapTimeline";
import { stages } from "./stages";

/**
 * A horizontal stepper. Stage names are deliberately not printed under the
 * dots: five Thai labels across a phone leaves ~64px each, which clips every
 * name. The selected stage is named in full by the card below instead, so the
 * row stays compact and nothing is truncated.
 */
export function StageProgress({ current }: { current: ChangeStage }) {
  const { t, l } = useLocale();
  const currentStage = stages.find((stage) => stage.id === current);
  const [selectedId, setSelectedId] = useState<ChangeStage>(current);

  if (!currentStage) return null;
  const selected =
    stages.find((stage) => stage.id === selectedId) ?? currentStage;
  const selectedLevels = roadmap.filter((level) =>
    selected.levels?.includes(level.level),
  );

  return (
    <Card className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-[13px] font-semibold text-ink">
          {t("stage.label")}
        </h2>
        <span className="text-[11px] text-ink-faint">
          {currentStage.order}/{stages.length}
        </span>
      </div>

      {/* Equal columns so the dots sit on a regular pitch and each label gets
          exactly one column of width to wrap into. */}
      <ol className="grid grid-cols-5">
        {stages.map((stage, index) => {
          const reached = stage.order <= currentStage.order;
          const isSelected = stage.id === selectedId;
          // The connector is filled only once the stage after it is reached.
          const nextReached =
            index + 1 < stages.length &&
            stages[index + 1].order <= currentStage.order;

          return (
            <li
              key={stage.id}
              className="relative flex flex-col items-center gap-1.5 px-0.5"
            >
              {index < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 top-4 h-1 w-full -translate-y-1/2 rounded-pill",
                    nextReached ? "bg-primary" : "bg-line",
                  )}
                />
              )}

              <button
                type="button"
                onClick={() => setSelectedId(stage.id)}
                aria-pressed={isSelected}
                aria-label={l(stage.name)}
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  reached ? "bg-primary text-white" : "bg-line text-ink-faint",
                  isSelected &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-card",
                )}
              >
                {stage.order}
              </button>

              <span
                className={cn(
                  "text-center text-[9px] leading-tight",
                  isSelected
                    ? "font-semibold text-primary-dark"
                    : reached
                      ? "text-ink-muted"
                      : "text-ink-faint",
                )}
              >
                {l(stage.name)}
              </span>
            </li>
          );
        })}
      </ol>

      {/* The stage is already named under its dot, so the card carries only
          what that label cannot: the work inside the stage. */}
      <div className="rounded-xl bg-surface p-3">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-medium text-ink-faint">
            {t("stage.milestones")}
          </p>
          {selected.id === current && (
            <span className="rounded-pill bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary-dark">
              {t("stage.current")}
            </span>
          )}
        </div>

        {/* Stages that own roadmap levels show those; the rest show milestones. */}
        {selectedLevels.length > 0 ? (
          <div className="mt-1.5">
            <RoadmapTimeline levels={selectedLevels} />
          </div>
        ) : (
          <ul className="mt-1 space-y-1">
            {selected.milestones?.map((milestone) => (
              <li
                key={milestone.label.en}
                className="flex items-start gap-2 text-xs"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                    milestone.done
                      ? "bg-primary text-white"
                      : "bg-card ring-1 ring-line",
                  )}
                >
                  {milestone.done && <Icon name="check" className="size-2.5" />}
                </span>
                <span
                  className={cn(milestone.done ? "text-ink" : "text-ink-faint")}
                >
                  {l(milestone.label)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
