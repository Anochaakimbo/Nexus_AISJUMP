"use client";

import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Opportunity, OpportunityKind } from "@/data/types";
import type { TranslationKey } from "@/lib/i18n/dictionary";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const accents: Record<string, string> = {
  accent: "bg-accent-soft text-accent",
  primary: "bg-primary-soft text-primary-dark",
  lime: "bg-lime/15 text-lime",
  navy: "bg-navy/10 text-navy",
};

export const kindIcon: Record<OpportunityKind, string> = {
  hackathon: "sparkles",
  scholarship: "school",
  workshop: "chip",
  camp: "location",
  competition: "target",
  internship: "opportunity",
  volunteer: "people",
};

export const kindLabelKey: Record<OpportunityKind, TranslationKey> = {
  hackathon: "opportunity.hackathon",
  scholarship: "opportunity.scholarship",
  workshop: "opportunity.workshop",
  camp: "opportunity.camp",
  competition: "opportunity.competition",
  internship: "opportunity.internship",
  volunteer: "opportunity.volunteer",
};

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const { t, l } = useLocale();

  return (
    <Card className="flex items-start gap-3">
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          accents[opportunity.accent] ?? accents.accent,
        )}
      >
        <Icon name={kindIcon[opportunity.kind]} className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-ink">
          {l(opportunity.title)}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-faint">
          <Icon name="location" className="size-3" />
          {l(opportunity.location)}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-faint">
          <Icon name="calendar" className="size-3" />
          {t("common.deadline")} {l(opportunity.deadline)}
        </p>
      </div>

      <span className="shrink-0 rounded-pill bg-surface px-2.5 py-1 text-[10px] font-medium text-ink-muted">
        {t(kindLabelKey[opportunity.kind])}
      </span>
    </Card>
  );
}
