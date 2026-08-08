"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { StatTile } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { JobMatchCard } from "@/features/careers/JobMatchCard";
import { StageLevelCard } from "@/features/coach/StageLevelCard";
import { cn } from "@/lib/cn";
import { profile, skills } from "@/data/profile";
import { certificates, passportStats } from "@/data/passport";
import { resumeSections } from "@/data/resume";
import { jobMatches, overallSkillGap } from "@/data/careers";
import { useSavedCareers } from "@/features/careers/SavedProvider";
import { tierFor } from "@/data/tiers";
import type { TranslationKey } from "@/lib/i18n/dictionary";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type Tab = "skills" | "works" | "certs" | "careers";

/**
 * Career Matching lives here as a tab rather than as its own destination — the
 * mobile bar only holds five, and a learner's matches belong with the profile
 * they are matched against.
 */
const tabs: Array<{ value: Tab; labelKey: TranslationKey }> = [
  { value: "skills", labelKey: "passport.tabSkills" },
  { value: "works", labelKey: "passport.tabWorks" },
  { value: "certs", labelKey: "passport.tabCerts" },
  { value: "careers", labelKey: "passport.tabCareers" },
];

function Passport() {
  const { t, l } = useLocale();
  const params = useSearchParams();
  const { savedIds } = useSavedCareers();
  const saved = jobMatches.filter((job) => savedIds.includes(job.id));
  const [showOutline, setShowOutline] = useState(false);
  const requested = params.get("tab") as Tab | null;
  const [tab, setTab] = useState<Tab>(
    tabs.some((item) => item.value === requested) && requested
      ? requested
      : "skills",
  );

  return (
    <div className="space-y-4 pb-4">
      <PageHeader
        title={t("passport.title")}
        action={
          <button
            type="button"
            aria-label={t("passport.share")}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card text-ink-muted ring-1 ring-line"
          >
            <Icon name="share" className="size-4" />
          </button>
        }
      />

      <div className="space-y-4 px-4">
        <Card className="flex items-center gap-3">
          <Avatar name={l(profile.name)} size={52} />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-ink">
              {l(profile.fullName)}
            </h2>
            <p className="truncate text-xs text-ink-muted">
              {l(profile.major)} · {t("dashboard.year")} {profile.year}
            </p>
          </div>
        </Card>

        <StageLevelCard currentStageId={profile.stage} />

        <Card className="grid grid-cols-4 gap-2">
          <StatTile value={passportStats.skills} label={t("passport.skills")} />
          <StatTile
            value={passportStats.certificates}
            label={t("passport.certificates")}
          />
          <StatTile
            value={passportStats.projects}
            label={t("passport.projects")}
          />
          <StatTile
            value={passportStats.activities}
            label={t("passport.activities")}
          />
        </Card>

        <div className="flex gap-1 rounded-pill bg-card p-1 ring-1 ring-line">
          {tabs.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setTab(item.value)}
              aria-pressed={tab === item.value}
              className={cn(
                "flex-1 rounded-pill py-2 text-xs font-medium transition-colors",
                tab === item.value
                  ? "bg-primary text-white"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>

        {tab === "skills" && (
          <Card className="space-y-3.5">
            {skills.map((skill) => {
              const tier = tierFor(skill.level);
              return (
                <div key={skill.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="min-w-0 truncate text-[13px] font-medium text-ink">
                      {l(skill.name)}
                    </span>
                    <span className="shrink-0 rounded-pill bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary-dark">
                      {l(tier.label)}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-pill bg-line">
                      <div
                        className="h-full rounded-pill bg-primary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[11px] text-ink-faint">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              );
            })}
          </Card>
        )}

        {tab === "works" && (
          <div className="space-y-4">
            {resumeSections.map((section) => (
              <section key={section.id} className="space-y-2">
                <h3 className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <Icon name={section.icon} className="size-4 text-primary" />
                  {l(section.title)}
                </h3>
                <Card className="divide-y divide-line py-0">
                  {section.entries.map((entry) => (
                    <div key={entry.id} className="py-3">
                      <p className="text-[13px] font-semibold text-ink">
                        {l(entry.title)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-faint">
                        {l(entry.meta)}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                        {l(entry.detail)}
                      </p>
                    </div>
                  ))}
                </Card>
              </section>
            ))}

            <div className="space-y-2">
              <Button
                variant="secondary"
                fullWidth
                aria-expanded={showOutline}
                onClick={() => setShowOutline((open) => !open)}
              >
                <Icon name="share" className="size-4" />
                {t("passport.export")}
              </Button>

              {showOutline && (
                <Card className="space-y-2">
                  <p className="text-[11px] font-medium text-ink-faint">
                    {t("passport.exportOutline")}
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      { key: "personal", label: t("passport.personalInfo"), count: null },
                      ...resumeSections.map((section) => ({
                        key: section.id,
                        label: l(section.title),
                        count: section.entries.length,
                      })),
                      { key: "skills", label: t("passport.tabSkills"), count: passportStats.skills },
                      { key: "certs", label: t("passport.tabCerts"), count: passportStats.certificates },
                    ].map((row) => (
                      <li
                        key={row.key}
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="flex items-center gap-2 text-ink">
                          <Icon name="check" className="size-3 text-primary" />
                          {row.label}
                        </span>
                        {row.count !== null && (
                          <span className="text-ink-faint">{row.count}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-line pt-2 text-[11px] text-ink-faint">
                    {t("passport.exportNote")}
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}

        {tab === "certs" && (
          <div className="space-y-2.5">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-lime">
                  <Icon name="passport" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {l(certificate.title)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-faint">
                    {certificate.issuer} · {certificate.year}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "careers" && (
          <div className="space-y-4">
            <section className="space-y-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {t("career.savedTitle")}
              </h3>
              {saved.length > 0 ? (
                <div className="space-y-2.5">
                  {saved.map((job) => (
                    <JobMatchCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <Card>
                  <p className="text-xs text-ink-muted">
                    {t("career.savedEmpty")}
                  </p>
                </Card>
              )}
            </section>

            <section className="space-y-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {t("career.skillGap")}
              </h3>
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
              <ButtonLink href="/roadmap" fullWidth>
                {t("career.viewPlan")}
              </ButtonLink>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PassportPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-surface" />}>
      <Passport />
    </Suspense>
  );
}
