import type { Localized } from "./types";

/**
 * Proficiency bands for a 0–100 skill level. The same bands describe a skill on
 * the profile and a level's progress on the roadmap, so "ชำนาญ" means the same
 * thing wherever it appears.
 */
export type SkillTier = {
  /** Lowest level that still falls in this band. */
  min: number;
  label: Localized;
};

export const skillTiers: SkillTier[] = [
  { min: 90, label: { th: "ผู้เชี่ยวชาญ", en: "Expert" } },
  { min: 75, label: { th: "ชำนาญ", en: "Advanced" } },
  { min: 50, label: { th: "ใช้งานได้", en: "Intermediate" } },
  { min: 25, label: { th: "พื้นฐาน", en: "Basic" } },
  { min: 0, label: { th: "เริ่มต้น", en: "Beginner" } },
];

export function tierFor(level: number): SkillTier {
  return skillTiers.find((tier) => level >= tier.min) ?? skillTiers.at(-1)!;
}
