"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FilterChip } from "@/components/ui/Field";
import { PageHeader } from "@/components/layout/PageHeader";
import { CareerResultCard } from "@/features/careers/CareerResultCard";
import { jobMatches } from "@/data/careers";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Companies present in the listings — derived so the chips never drift. */
const companies = Array.from(new Set(jobMatches.map((job) => job.company)));

export default function CareerSearchPage() {
  const { t, l } = useLocale();
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState<string | null>(null);

  const term = query.trim().toLowerCase();
  const results = jobMatches.filter((job) => {
    if (company && job.company !== company) return false;
    if (!term) return true;
    return (
      l(job.role).toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.requiredSkills.some((skill) => skill.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={t("career.title")} backHref="/dashboard" />

      <div className="space-y-4 px-4">
        <div className="flex h-12 items-center gap-2 rounded-pill bg-card px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-primary">
          <Icon name="search" className="size-4 shrink-0 text-primary" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("career.searchPlaceholder")}
            aria-label={t("career.searchPlaceholder")}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          <FilterChip active={company === null} onClick={() => setCompany(null)}>
            {t("common.all")}
          </FilterChip>
          {companies.map((name) => (
            <FilterChip
              key={name}
              active={company === name}
              onClick={() => setCompany(company === name ? null : name)}
            >
              {name}
            </FilterChip>
          ))}
        </div>

        {results.length === 0 ? (
          <p className="px-1 text-xs text-ink-faint">{t("career.noResults")}</p>
        ) : (
          <div className="space-y-2.5">
            {results.map((job) => (
              <CareerResultCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
