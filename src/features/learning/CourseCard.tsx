"use client";

import { Badge, Rating } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { cn, formatCount } from "@/lib/cn";
import type { Course } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// Written out rather than interpolated so Tailwind can see every class.
const covers: Record<string, string> = {
  "navy-accent": "from-navy to-accent",
  "accent-primary": "from-accent to-primary",
  "primary-lime": "from-primary to-lime",
  "lime-primary": "from-lime to-primary",
  "navy-lime": "from-navy to-lime",
  "accent-navy": "from-accent to-navy",
  "primary-accent": "from-primary to-accent",
};

const kindIcon: Record<Course["kind"], string> = {
  course: "learn",
  video: "play",
  article: "passport",
  podcast: "message",
};

export function CourseCard({ course }: { course: Course }) {
  const { t, l } = useLocale();
  const gradient = covers[`${course.cover[0]}-${course.cover[1]}`] ?? covers["navy-accent"];

  return (
    <Card className="flex w-44 shrink-0 flex-col p-3">
      <div
        className={cn(
          "flex aspect-16/10 items-center justify-center rounded-xl bg-linear-to-br",
          gradient,
        )}
      >
        <Icon name={kindIcon[course.kind]} className="size-7 text-white/90" />
      </div>

      <h3 className="mt-2.5 line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
        {l(course.title)}
      </h3>

      <p className="mt-1 text-[11px] text-ink-faint">
        {course.provider}
        {course.free && ` · ${t("common.free")}`}
      </p>

      <div className="mt-auto flex items-center gap-1.5 pt-2">
        <Rating value={course.rating} />
        <span className="text-[11px] text-ink-faint">
          ({formatCount(course.learners)})
        </span>
      </div>
    </Card>
  );
}

export function CourseRow({ course }: { course: Course }) {
  const { t, l } = useLocale();
  const gradient = covers[`${course.cover[0]}-${course.cover[1]}`] ?? covers["navy-accent"];

  return (
    <Card className="flex items-center gap-3">
      <div
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br",
          gradient,
        )}
      >
        <Icon name={kindIcon[course.kind]} className="size-6 text-white/90" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-ink">
          {l(course.title)}
        </h3>
        <p className="mt-0.5 text-[11px] text-ink-faint">
          {course.provider}
          {course.free && ` · ${t("common.free")}`}
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <Rating value={course.rating} />
          <span className="text-[11px] text-ink-faint">
            ({formatCount(course.learners)})
          </span>
        </div>
      </div>
      {course.free && <Badge tone="primary">{t("common.free")}</Badge>}
    </Card>
  );
}
