"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge, Rating } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Mentor } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function MentorCard({ mentor }: { mentor: Mentor }) {
  const { t, l } = useLocale();
  const name = l(mentor.name);

  return (
    <Card className="flex items-start gap-3">
      <Avatar name={name} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-ink">{name}</h3>
          {mentor.available && (
            <Badge tone="primary" className="shrink-0">
              {t("mentor.available")}
            </Badge>
          )}
        </div>

        <p className="mt-0.5 truncate text-[11px] text-ink-muted">
          {l(mentor.role)} at {mentor.company}
        </p>

        <div className="mt-1.5 flex flex-wrap gap-1">
          {mentor.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-pill bg-surface px-2 py-0.5 text-[10px] text-ink-muted"
            >
              {skill}
            </span>
          ))}
        </div>

        <Rating
          value={mentor.rating}
          count={mentor.reviews}
          countLabel={t("common.reviews")}
          className="mt-1.5"
        />
      </div>
    </Card>
  );
}
