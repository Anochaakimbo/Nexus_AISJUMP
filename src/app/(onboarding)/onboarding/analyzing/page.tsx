"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const STEP_MS = 800;

function Analyzing() {
  const router = useRouter();
  const params = useSearchParams();
  const { t } = useLocale();
  const [step, setStep] = useState(0);

  // Carry every answer through untouched; the goal screen does the scoring.
  const answers = params.toString();

  useEffect(() => {
    // Paced reveal of the three analysis steps, then straight into goal setting.
    const timers = [1, 2, 3].map((index) =>
      setTimeout(() => setStep(index), STEP_MS * index),
    );
    const done = setTimeout(
      () => router.replace(`/onboarding/goal?${answers}`),
      STEP_MS * 4,
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [router, answers]);

  const steps = [
    t("analyzing.step1"),
    t("analyzing.step2"),
    t("analyzing.step3"),
  ];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-navy px-6 text-white">
      <div className="w-full max-w-sm text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-white/10">
          <Icon name="sparkles" className="size-10 animate-pulse text-primary" />
        </span>

        <h1 className="mt-6 text-xl font-semibold">{t("analyzing.title")}</h1>
        <p className="mt-2 text-sm text-white/60">{t("analyzing.subtitle")}</p>

        <ul className="mt-8 space-y-3 text-left">
          {steps.map((label, index) => {
            const complete = step > index;
            const active = step === index;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors",
                  complete || active ? "bg-white/10" : "bg-white/5 text-white/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full",
                    complete ? "bg-primary" : "bg-white/15",
                  )}
                >
                  {complete ? (
                    <Icon name="check" className="size-3.5 text-white" />
                  ) : (
                    <span className="text-[10px]">{index + 1}</span>
                  )}
                </span>
                {label}
              </li>
            );
          })}
        </ul>

        <ProgressBar
          value={(step / 3) * 100}
          className="mt-8 bg-white/15"
        />
      </div>
    </div>
  );
}

export default function AnalyzingPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-navy" />}>
      <Analyzing />
    </Suspense>
  );
}
