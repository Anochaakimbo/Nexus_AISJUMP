"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Careers the learner has bookmarked. Held in memory in the root layout, so a
 * career saved from the dashboard is already there when the profile opens; a
 * full reload resets it, exactly like the locale choice.
 */
type SavedContextValue = {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
};

const SavedContext = createContext<SavedContextValue | null>(null);

/** One seeded bookmark so the profile is not empty on first open. */
const INITIAL = ["data-analyst-scg"];

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(INITIAL);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  const toggle = useCallback(
    (id: string) =>
      setSavedIds((current) =>
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id],
      ),
    [],
  );

  const value = useMemo(
    () => ({ savedIds, isSaved, toggle }),
    [savedIds, isSaved, toggle],
  );

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export function useSavedCareers() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSavedCareers must be used inside <SavedProvider>");
  }
  return context;
}
