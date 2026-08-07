"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function OnboardingPage() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-dvh flex-col bg-navy px-6 pb-10 pt-6 text-white">
      <div className="flex justify-end">
        <LocaleToggle className="bg-white/10 text-white ring-white/20" />
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold tracking-tight">
            NE<span className="text-primary">X</span>US
          </div>
          <div className="mt-1 text-[9px] font-medium tracking-[0.28em] text-white/60">
            AI TALENT ECOSYSTEM
          </div>
        </div>

        {/* Stands in for the illustration in the design spec. */}
        <div className="relative my-10 aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-accent/40 via-navy-soft to-primary/30 ring-1 ring-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="sparkles" className="size-20 text-white/80" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-5">
            {["learn", "roadmap", "career"].map((icon) => (
              <span
                key={icon}
                className="flex size-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur"
              >
                <Icon name={icon} className="size-5 text-white" />
              </span>
            ))}
          </div>
        </div>

        <h1 className="text-center text-2xl font-semibold leading-snug">
          {t("onboarding.title")}
        </h1>
        <p className="mt-2 text-center text-sm text-white/70">
          {t("onboarding.subtitle")}
        </p>

        <div className="mt-8 space-y-3">
          <ButtonLink href="/onboarding/assessment" fullWidth>
            {t("onboarding.start")}
          </ButtonLink>
          <ButtonLink href="/dashboard" variant="inverse" fullWidth>
            {t("onboarding.login")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
