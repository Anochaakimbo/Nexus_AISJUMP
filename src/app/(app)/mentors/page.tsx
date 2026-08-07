"use client";

import { useState } from "react";
import { MentorCard } from "@/features/mentors/MentorCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterChip, SearchInput } from "@/components/ui/Field";
import { SectionHeader } from "@/components/ui/Section";
import { mentors } from "@/data/mentors";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Skill facets derived from the mentor list so the chips never drift. */
const facets = Array.from(new Set(mentors.flatMap((mentor) => mentor.skills)));

export default function MentorsPage() {
  const { t } = useLocale();
  const [skill, setSkill] = useState<string | null>(null);

  const filtered = skill
    ? mentors.filter((mentor) => mentor.skills.includes(skill))
    : mentors;

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={t("mentor.title")} />

      <div className="space-y-4 px-4">
        <SearchInput placeholder={t("mentor.search")} />

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          <FilterChip active={skill === null} onClick={() => setSkill(null)}>
            {t("common.all")}
          </FilterChip>
          {facets.map((facet) => (
            <FilterChip
              key={facet}
              active={skill === facet}
              onClick={() => setSkill(skill === facet ? null : facet)}
            >
              {facet}
            </FilterChip>
          ))}
        </div>

        <section className="space-y-2.5">
          <SectionHeader title={t("mentor.recommended")} />
          <div className="space-y-2.5">
            {filtered.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
