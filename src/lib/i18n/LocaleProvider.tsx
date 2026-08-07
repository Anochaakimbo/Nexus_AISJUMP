"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { dictionary, type Locale, type TranslationKey } from "./dictionary";

/** Content that ships in both languages — used by the mock data layer. */
export type Localized = { th: string; en: string };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  /** Look up a UI string by key. */
  t: (key: TranslationKey) => string;
  /** Resolve a bilingual value coming from the data layer. */
  l: (value: Localized) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Held in memory only. The provider lives in the root layout, so the choice
  // survives navigation between modules and resets on a full reload.
  const [locale, setLocale] = useState<Locale>("th");

  const t = useCallback(
    (key: TranslationKey) => dictionary[locale][key],
    [locale],
  );
  const l = useCallback((value: Localized) => value[locale], [locale]);
  const toggle = useCallback(
    () => setLocale((current) => (current === "th" ? "en" : "th")),
    [],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t, l }),
    [locale, toggle, t, l],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return context;
}
