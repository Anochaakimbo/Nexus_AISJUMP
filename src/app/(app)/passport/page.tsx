"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { RadarChart } from "@/components/ui/RadarChart";
import { StatTile } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/cn";
import { profile, skills } from "@/data/profile";
import { certificates, featuredWorks, passportStats } from "@/data/passport";
import type { TranslationKey } from "@/lib/i18n/dictionary";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type Tab = "skills" | "works" | "certs";

/**
 * Career Readiness is not repeated here — it is the dashboard's headline.
 * The passport's job is the evidence behind it.
 */
const tabs: Array<{ value: Tab; labelKey: TranslationKey }> = [
  { value: "skills", labelKey: "passport.tabSkills" },
  { value: "works", labelKey: "passport.tabWorks" },
  { value: "certs", labelKey: "passport.tabCerts" },
];

export default function PassportPage() {
  const { t, l } = useLocale();
  const [tab, setTab] = useState<Tab>("skills");

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
          <Avatar name={profile.name} size={52} />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-ink">
              {profile.name}
            </h2>
            <p className="truncate text-xs text-ink-muted">{l(profile.goal)}</p>
          </div>
        </Card>

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
                "flex-1 rounded-pill py-2 text-[13px] font-medium transition-colors",
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
          <Card>
            <RadarChart
              caption={t("passport.tabSkills")}
              axes={skills.map((skill) => ({
                id: skill.id,
                label: l(skill.name),
                value: skill.level,
              }))}
            />
          </Card>
        )}

        {tab === "works" && (
          <div className="space-y-2.5">
            {featuredWorks.map((work) => (
              <Card key={work.id} className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                  <Icon name="chart" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {l(work.title)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">
                    {l(work.kind)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-faint">
                    {l(work.tools)}
                  </p>
                </div>
              </Card>
            ))}
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
      </div>
    </div>
  );
}
