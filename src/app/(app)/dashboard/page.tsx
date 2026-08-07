"use client";

import Link from "next/link";
import { CoachCard } from "@/features/coach/CoachCard";
import { OpportunityCard } from "@/features/opportunities/OpportunityCard";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/Section";
import { dailyTasks, profile } from "@/data/profile";
import { opportunities } from "@/data/opportunities";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Destinations that are not in the bottom tab bar. Two tiles, no overlap with
 * the nav — this replaces the earlier journey strip, which repeated every
 * destination a third time.
 */
const quickLinks = [
  { href: "/mentors", icon: "mentor", labelKey: "nav.mentor" },
  { href: "/careers", icon: "career", labelKey: "nav.career" },
] as const;

export default function DashboardPage() {
  const { t, l } = useLocale();

  return (
    <div className="space-y-6 px-4 py-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="min-w-0 truncate text-lg font-semibold text-ink">
          {t("dashboard.greeting")}, {profile.name}
        </h1>
        <div className="flex shrink-0 items-center gap-2">
          <LocaleToggle />
          <button
            type="button"
            aria-label={t("dashboard.notifications")}
            className="flex size-9 items-center justify-center rounded-full bg-card text-ink-muted ring-1 ring-line"
          >
            <Icon name="bell" className="size-4" />
          </button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* A stat, not a link — Career Matching already has its own tile below,
            and two affordances to one destination is noise. */}
        <Card className="flex items-center gap-4">
          <ProgressRing value={profile.readiness} size={80} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-muted">{t("dashboard.readiness")}</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-ink">
              {l(profile.goal)}
            </p>
          </div>
        </Card>

        <CoachCard />
      </div>

      <section className="space-y-2.5">
        {/* No "see all" — every task is already listed, and the coach card
            above already points at the roadmap. */}
        <SectionHeader title={t("dashboard.dailyTasks")} />
        <Card className="divide-y divide-line py-0">
          {dailyTasks.map((task) => (
            <button
              key={task.id}
              type="button"
              className="flex w-full items-center gap-3 py-3 text-left"
            >
              <span className="size-5 shrink-0 rounded-full ring-1 ring-line" />
              <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
                {l(task.title)}
              </span>
            </button>
          ))}
        </Card>
      </section>

      <section className="space-y-2.5">
        <SectionHeader
          title={t("dashboard.recommended")}
          actionLabel={t("common.seeAll")}
          actionHref="/opportunities"
        />
        <div className="space-y-2.5">
          {opportunities.slice(0, 3).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>

      <nav aria-label={t("nav.profile")} className="grid grid-cols-2 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2.5 rounded-2xl bg-card p-3.5 text-[13px] font-medium text-ink ring-1 ring-line transition-colors hover:bg-primary-soft"
          >
            <Icon name={link.icon} className="size-5 text-primary" />
            {t(link.labelKey)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
