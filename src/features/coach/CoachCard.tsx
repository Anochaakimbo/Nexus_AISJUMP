"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getCoachMessage } from "@/features/coach/coach";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * The Growth Coach panel. The stage badge is deliberately visible — it is the
 * part of the pitch that shows the coach is behaviour-driven, not a feed.
 */
export function CoachCard() {
  const { t, l } = useLocale();
  const message = getCoachMessage(profile);

  return (
    <div className="rounded-2xl bg-linear-to-br from-navy to-navy-soft p-4 text-white">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary/20">
          <Icon name="sparkles" className="size-4 text-primary" />
        </span>
        <span className="text-xs font-semibold">{t("dashboard.coach")}</span>
        <span className="ml-auto rounded-pill bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
          {t("stage.label")}: {l(message.stageLabel)}
        </span>
      </div>

      <p className="mt-3 text-sm font-medium leading-snug">
        {l(message.headline)}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-white/70">
        {l(message.body)}
      </p>

      <ButtonLink
        href={message.cta.href}
        className="mt-3 h-9 px-4 text-xs"
      >
        {l(message.cta.label)}
      </ButtonLink>
    </div>
  );
}
