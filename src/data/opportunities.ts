import type { Opportunity } from "./types";

export const opportunities: Opportunity[] = [
  {
    id: "ai-hackathon-2025",
    title: { th: "AI Hackathon 2025", en: "AI Hackathon 2025" },
    kind: "hackathon",
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    deadline: { th: "20 พ.ค. 68", en: "20 May 2025" },
    accent: "accent",
  },
  {
    id: "scg-young-talent",
    title: { th: "SCG Young Talent 2025", en: "SCG Young Talent 2025" },
    kind: "scholarship",
    location: { th: "ทั่วประเทศ", en: "Nationwide" },
    deadline: { th: "31 พ.ค. 68", en: "31 May 2025" },
    accent: "primary",
  },
  {
    id: "data-science-camp",
    title: {
      th: "ค่ายพัฒนาทักษะ Data Science",
      en: "Data Science Skills Camp",
    },
    kind: "camp",
    location: { th: "เชียงใหม่", en: "Chiang Mai" },
    deadline: { th: "15 พ.ค. 68", en: "15 May 2025" },
    accent: "lime",
  },
  {
    id: "google-internship-2025",
    title: { th: "Google Internship 2025", en: "Google Internship 2025" },
    kind: "internship",
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    deadline: { th: "30 พ.ค. 68", en: "30 May 2025" },
    accent: "navy",
  },
  {
    id: "kosen-scholarship",
    title: { th: "ทุนการศึกษา กสศ.", en: "EEF Scholarship" },
    kind: "scholarship",
    location: { th: "ทั่วประเทศ", en: "Nationwide" },
    deadline: { th: "31 พ.ค. 68", en: "31 May 2025" },
    accent: "primary",
  },
  {
    id: "viz-workshop",
    title: {
      th: "Workshop: Data Visualization",
      en: "Workshop: Data Visualization",
    },
    kind: "workshop",
    location: { th: "ออนไลน์", en: "Online" },
    deadline: { th: "10 พ.ค. 68", en: "10 May 2025" },
    accent: "accent",
  },
];
