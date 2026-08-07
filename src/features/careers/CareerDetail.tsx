"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/Section";
import type { JobMatch } from "@/data/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * One scrollable view rather than three tabs — each tab held a single row of
 * chips, so the tab bar cost more taps than it saved.
 */
export function CareerDetail({ job }: { job: JobMatch }) {
  const { t, l } = useLocale();

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={l(job.role)} backHref="/careers" />

      <div className="space-y-5 px-4">
        <Card className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">
              {job.company}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              {l(job.about)}
            </p>
          </div>
          <ProgressRing
            value={job.match}
            size={72}
            sublabel={t("common.match")}
          />
        </Card>

        <section className="space-y-2.5">
          <SectionHeader title={t("career.requiredSkills")} />
          <Card className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-pill bg-accent-soft px-3 py-1 text-[11px] font-medium text-accent"
              >
                {skill}
              </span>
            ))}
          </Card>
        </section>

        <section className="space-y-2.5">
          <SectionHeader title={t("career.skillGap")} />
          <Card className="flex flex-wrap gap-2">
            {job.gap.map((item) => (
              <span
                key={item.id}
                className="rounded-pill bg-warn/15 px-3 py-1 text-[11px] font-medium text-warn"
              >
                {l(item.name)}
              </span>
            ))}
          </Card>
        </section>

        <ButtonLink href="/roadmap" fullWidth>
          {t("career.buildPlan")}
        </ButtonLink>
      </div>
    </div>
  );
}
