"use client";

import type { ChangeStage } from "@/data/types";
import { stages, getStage } from "@/features/coach/stages";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export interface StageLevelCardProps {
  currentStageId: ChangeStage;
  className?: string;
}

export function StageLevelCard({
  currentStageId,
  className,
}: StageLevelCardProps) {
  const { l } = useLocale();
  const currentStage = getStage(currentStageId);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl bg-[#FFF9EB] p-3.5 ring-1 ring-amber-200/70 shadow-xs",
        className,
      )}
    >
      {/* Left Stage Number Badge */}
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-orange-500 text-white shadow-xs">
        <span className="text-xl font-extrabold leading-none">
          {currentStage.order}
        </span>
      </div>

      {/* Middle Stage Titles */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-[#3D2206]">
          {l(currentStage.badgeTitle ?? currentStage.name)}
        </h3>
        <p className="truncate text-xs font-medium text-[#A66D28]">
          {l(
            currentStage.subtitle ?? {
              th: currentStage.id,
              en: currentStage.id,
            },
          )}
        </p>
      </div>

      {/* Right Stepper Dots */}
      <div className="flex items-center gap-1.5 shrink-0">
        {stages.map((stage) => {
          const isCompleted = stage.order < currentStage.order;
          const isCurrent = stage.order === currentStage.order;

          if (isCompleted) {
            return (
              <div
                key={stage.id}
                className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white shadow-2xs"
              >
                <Icon name="check" className="size-3.5 stroke-[3]" />
              </div>
            );
          }

          if (isCurrent) {
            return (
              <div
                key={stage.id}
                className="flex size-6.5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white ring-4 ring-amber-400/40 shadow-xs"
              >
                {stage.order}
              </div>
            );
          }

          return (
            <div
              key={stage.id}
              className="flex size-6 items-center justify-center rounded-full bg-[#F1F3F5] text-xs font-medium text-[#868E96] ring-1 ring-slate-200/50"
            >
              {stage.order}
            </div>
          );
        })}
      </div>
    </div>
  );
}
