"use client";

import { useState } from "react";
import {
  kindIcon,
  kindLabelKey,
  OpportunityCard,
} from "@/features/opportunities/OpportunityCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchInput } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { opportunities } from "@/data/opportunities";
import type { OpportunityKind } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const kinds: OpportunityKind[] = [
  "hackathon",
  "scholarship",
  "workshop",
  "camp",
  "competition",
  "internship",
  "volunteer",
];

export default function OpportunitiesPage() {
  const { t } = useLocale();
  const [kind, setKind] = useState<OpportunityKind | null>(null);

  const filtered = kind
    ? opportunities.filter((item) => item.kind === kind)
    : opportunities;

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={t("opportunity.title")} />

      <div className="space-y-4 px-4">
        <SearchInput placeholder={t("opportunity.search")} />

        <div className="grid grid-cols-4 gap-2">
          {kinds.map((value) => {
            const active = kind === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setKind(active ? null : value)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl px-1 py-3 text-[10px] font-medium transition-colors",
                  active
                    ? "bg-primary-soft text-primary-dark ring-2 ring-primary"
                    : "bg-card text-ink-muted ring-1 ring-line hover:bg-surface",
                )}
              >
                <Icon name={kindIcon[value]} className="size-5" />
                <span className="truncate">{t(kindLabelKey[value])}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setKind(null)}
            aria-pressed={kind === null}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-2xl px-1 py-3 text-[10px] font-medium transition-colors",
              kind === null
                ? "bg-primary-soft text-primary-dark ring-2 ring-primary"
                : "bg-card text-ink-muted ring-1 ring-line hover:bg-surface",
            )}
          >
            <Icon name="grid" className="size-5" />
            <span className="truncate">{t("common.all")}</span>
          </button>
        </div>

        <section className="space-y-2.5">
          <SectionHeader title={t("opportunity.recommended")} />
          <div className="space-y-2.5">
            {filtered.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
