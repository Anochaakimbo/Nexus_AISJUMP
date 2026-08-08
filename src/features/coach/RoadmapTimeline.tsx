"use client";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { RoadmapLevel, RoadmapStatus } from "@/data/types";
import { tierFor } from "@/data/tiers";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const dot: Record<RoadmapStatus, string> = {
  done: "bg-primary text-white",
  "in-progress": "bg-card text-primary ring-2 ring-primary",
  locked: "bg-line text-ink-faint",
};

/**
 * The levels of one stage, on a single rail. Grouping now comes from the stage
 * that owns these levels, so this renders a flat list rather than sub-phases.
 * The dot state is what says "passed / doing / not started" at a glance — a
 * check mark only appears once the level is actually cleared.
 */
export function RoadmapTimeline({ levels }: { levels: RoadmapLevel[] }) {
  const { t, l } = useLocale();
  const lastLevel = levels.at(-1)?.level;

  return (
    <ol>
      {levels.map((level) => (
        <li key={level.level} className="relative flex gap-3 pb-2.5">
          {level.level !== lastLevel && (
            <span
              aria-hidden="true"
              className="absolute left-2.75 top-7 h-full w-px bg-line"
            />
          )}

          <span
            className={cn(
              "relative z-10 mt-1 flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
              dot[level.status],
            )}
          >
            {level.status === "done" ? (
              <Icon name="check" className="size-3.5" />
            ) : level.status === "locked" ? (
              <Icon name="lock" className="size-3" />
            ) : (
              level.level
            )}
          </span>

          <div
            className={cn(
              "min-w-0 flex-1 rounded-xl p-2.5",
              level.status === "locked" ? "bg-card/60" : "bg-card",
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p
                className={cn(
                  "min-w-0 truncate text-xs font-semibold",
                  level.status === "locked" ? "text-ink-faint" : "text-ink",
                )}
              >
                {level.level}. {l(level.title)}
              </p>
              <span
                className={cn(
                  "shrink-0 rounded-pill px-2 py-0.5 text-[10px] font-medium",
                  level.status === "done"
                    ? "bg-primary text-white"
                    : level.status === "locked"
                      ? "bg-line text-ink-faint"
                      : "bg-primary-soft text-primary-dark",
                )}
              >
                {level.status === "done"
                  ? t("roadmap.passed")
                  : l(tierFor(level.progress).label)}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1 flex-1 rounded-pill bg-line">
                <div
                  className="h-full rounded-pill bg-primary"
                  style={{ width: `${level.progress}%` }}
                />
              </div>
              <span className="shrink-0 text-[10px] text-ink-faint">
                {level.progress}%
              </span>
            </div>
            {level.status === "in-progress" && (
              <p className="mt-1 text-[10px] text-ink-faint">
                {100 - level.progress}% {t("roadmap.toNext")}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
