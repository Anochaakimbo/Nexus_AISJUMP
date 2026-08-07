"use client";

import { JobMatchCard } from "@/features/careers/JobMatchCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/Field";
import { SectionHeader } from "@/components/ui/Section";
import { jobMatches, overallSkillGap } from "@/data/careers";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function CareersPage() {
  const { t, l } = useLocale();

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={t("career.title")} />

      <div className="space-y-5 px-4">
        <SearchInput placeholder={t("career.search")} />

        <section className="space-y-2.5">
          <SectionHeader title={t("career.recommended")} />
          <div className="space-y-2.5">
            {jobMatches.map((job) => (
              <JobMatchCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* The union across all roles. Each role's own gap lives on its detail page. */}
        <section className="space-y-2.5">
          <SectionHeader
            title={t("career.skillGap")}
            actionLabel={t("career.viewPlan")}
            actionHref="/roadmap"
          />
          <Card className="flex flex-wrap gap-2">
            {overallSkillGap.map((item) => (
              <span
                key={item.id}
                className="rounded-pill bg-warn/15 px-3 py-1 text-[11px] font-medium text-warn"
              >
                {l(item.name)}
              </span>
            ))}
          </Card>
        </section>
      </div>
    </div>
  );
}
