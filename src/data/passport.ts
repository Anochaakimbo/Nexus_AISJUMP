import { skills } from "./profile";
import { resumeSections } from "./resume";
import type { Localized } from "./types";

export type Certificate = {
  id: string;
  title: Localized;
  issuer: string;
  year: string;
};

export const certificates: Certificate[] = [
  {
    id: "python-cert",
    title: { th: "Python for Everybody", en: "Python for Everybody" },
    issuer: "Coursera",
    year: "2025",
  },
  {
    id: "sql-cert",
    title: { th: "SQL Basics", en: "SQL Basics" },
    issuer: "ThaiMOOC",
    year: "2025",
  },
  {
    id: "hackathon-cert",
    title: {
      th: "AI Hackathon — รองชนะเลิศ",
      en: "AI Hackathon — Runner-up",
    },
    issuer: "NEXUS",
    year: "2025",
  },
];

const countIn = (sectionId: string) =>
  resumeSections.find((section) => section.id === sectionId)?.entries.length ??
  0;

/**
 * Counted from the real content rather than authored, so a tile can never
 * claim more projects than the résumé actually lists. Career Readiness lives
 * on the profile and is shown on the dashboard, not here.
 */
export const passportStats = {
  skills: skills.length,
  certificates: certificates.length,
  projects: countIn("projects"),
  activities: countIn("activities"),
};
