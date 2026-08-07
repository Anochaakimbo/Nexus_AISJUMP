import type { JobMatch } from "./types";

/**
 * Each role carries its own gap. The learner's overall gap (shown on the
 * Career Matching list) is derived from these rather than stored twice.
 */
export const jobMatches: JobMatch[] = [
  {
    id: "data-analyst-scg",
    role: { th: "Data Analyst", en: "Data Analyst" },
    company: "SCG",
    match: 83,
    about: {
      th: "วิเคราะห์ข้อมูลการผลิตและการขาย จัดทำรายงานและ dashboard เพื่อสนับสนุนการตัดสินใจของทีมธุรกิจ",
      en: "Analyse production and sales data, and build reports and dashboards that support business decisions.",
    },
    requiredSkills: ["SQL", "Python", "Data Visualization", "Statistics"],
    gap: [
      { id: "presentation", name: { th: "Presentation", en: "Presentation" } },
      {
        id: "business-english",
        name: { th: "Business English", en: "Business English" },
      },
    ],
    accent: "primary",
  },
  {
    id: "data-scientist-google",
    role: { th: "Data Scientist", en: "Data Scientist" },
    company: "Google",
    match: 76,
    about: {
      th: "ออกแบบและทดลองโมเดลเพื่อตอบโจทย์ผลิตภัณฑ์ ทำงานร่วมกับทีมวิศวกรรมและผลิตภัณฑ์อย่างใกล้ชิด",
      en: "Design and run model experiments for product questions, working closely with engineering and product teams.",
    },
    requiredSkills: [
      "Python",
      "SQL",
      "Machine Learning",
      "Statistics",
      "Communication",
    ],
    gap: [
      {
        id: "business-english",
        name: { th: "Business English", en: "Business English" },
      },
      {
        id: "experiment-design",
        name: { th: "Experiment Design", en: "Experiment Design" },
      },
    ],
    accent: "accent",
  },
  {
    id: "ml-engineer-ais",
    role: { th: "ML Engineer", en: "ML Engineer" },
    company: "AIS",
    match: 69,
    about: {
      th: "นำโมเดล Machine Learning ขึ้นใช้งานจริง ดูแล pipeline และประสิทธิภาพของระบบในระดับ production",
      en: "Ship machine learning models to production and own the pipelines and performance that keep them running.",
    },
    requiredSkills: ["Python", "Machine Learning", "Cloud", "MLOps"],
    gap: [
      { id: "cloud", name: { th: "Cloud", en: "Cloud" } },
      { id: "mlops", name: { th: "MLOps", en: "MLOps" } },
    ],
    accent: "lime",
  },
];

/** Union of every role's gap — the learner's overall gap, computed not stored. */
export const overallSkillGap = Array.from(
  new Map(
    jobMatches.flatMap((job) => job.gap).map((item) => [item.id, item]),
  ).values(),
);
