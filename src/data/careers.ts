import type { JobMatch, SkillGap } from "./types";

/**
 * A small shared gap vocabulary. Roles pick from it rather than inventing new
 * wording, which keeps `overallSkillGap` short enough to read as a list of
 * things to work on instead of a wall of chips.
 */
const GAP: Record<string, SkillGap> = {
  presentation: {
    id: "presentation",
    name: { th: "การนำเสนอ", en: "Presentation" },
  },
  businessEnglish: {
    id: "business-english",
    name: { th: "Business English", en: "Business English" },
  },
  cloud: { id: "cloud", name: { th: "Cloud", en: "Cloud" } },
  mlops: { id: "mlops", name: { th: "MLOps", en: "MLOps" } },
  experiment: {
    id: "experiment-design",
    name: { th: "การออกแบบการทดลอง", en: "Experiment design" },
  },
  domain: {
    id: "domain",
    name: { th: "ความรู้ธุรกิจ", en: "Business domain" },
  },
};

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
    gap: [GAP.presentation, GAP.businessEnglish],
    accent: "primary",
  },
  {
    id: "data-analyst-lazada",
    role: { th: "Data Analyst", en: "Data Analyst" },
    company: "Lazada",
    match: 81,
    about: {
      th: "ดูพฤติกรรมผู้ซื้อบนแพลตฟอร์ม หา insight เพื่อวางแคมเปญและปรับประสบการณ์ผู้ใช้",
      en: "Study buyer behaviour on the platform and turn it into campaign and UX decisions.",
    },
    requiredSkills: ["SQL", "Python", "A/B Testing", "Data Visualization"],
    gap: [GAP.experiment, GAP.businessEnglish],
    accent: "accent",
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
    gap: [GAP.businessEnglish, GAP.experiment],
    accent: "accent",
  },
  {
    id: "data-scientist-kbank",
    role: { th: "Data Scientist", en: "Data Scientist" },
    company: "KBank",
    match: 74,
    about: {
      th: "สร้างโมเดลประเมินความเสี่ยงและตรวจจับการทุจริต บนข้อมูลธุรกรรมขนาดใหญ่",
      en: "Build risk-scoring and fraud-detection models on large transaction datasets.",
    },
    requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL"],
    gap: [GAP.domain, GAP.presentation],
    accent: "primary",
  },
  {
    id: "data-engineer-scb",
    role: { th: "Data Engineer", en: "Data Engineer" },
    company: "SCB",
    match: 71,
    about: {
      th: "วาง pipeline ดึงและแปลงข้อมูลให้ทีมวิเคราะห์ใช้งานได้ ดูแลคุณภาพข้อมูลปลายทาง",
      en: "Build the pipelines that feed the analytics teams, and own the quality of what lands.",
    },
    requiredSkills: ["SQL", "Python", "ETL", "Cloud"],
    gap: [GAP.cloud, GAP.domain],
    accent: "violet",
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
    gap: [GAP.cloud, GAP.mlops],
    accent: "primary",
  },
  {
    id: "ai-engineer-line",
    role: { th: "AI Engineer", en: "AI Engineer" },
    company: "LINE",
    match: 66,
    about: {
      th: "พัฒนาฟีเจอร์ที่ใช้ AI บนแอปแชท ตั้งแต่การทดลองโมเดลไปจนถึงการปล่อยใช้งานจริง",
      en: "Build AI-backed features in the messaging app, from model experiments to release.",
    },
    requiredSkills: ["Python", "Deep Learning", "MLOps", "Cloud"],
    gap: [GAP.mlops, GAP.businessEnglish],
    accent: "rose",
  },
  {
    id: "business-analyst-cp",
    role: { th: "Business Analyst", en: "Business Analyst" },
    company: "CP",
    match: 64,
    about: {
      th: "แปลงโจทย์ธุรกิจเป็นข้อกำหนดของระบบ ทำงานกับทั้งฝ่ายธุรกิจและทีมพัฒนา",
      en: "Turn business problems into system requirements, working across business and engineering.",
    },
    requiredSkills: ["SQL", "Requirement Analysis", "Presentation"],
    gap: [GAP.presentation, GAP.domain],
    accent: "amber",
  },
  {
    id: "research-assistant-nectec",
    role: { th: "ผู้ช่วยวิจัย AI", en: "AI Research Assistant" },
    company: "NECTEC",
    match: 62,
    about: {
      th: "ช่วยงานวิจัยด้าน AI ภาษาไทย เตรียมชุดข้อมูลและทดลองโมเดลร่วมกับนักวิจัย",
      en: "Support Thai-language AI research: prepare datasets and run model experiments with researchers.",
    },
    requiredSkills: ["Python", "Deep Learning", "Statistics"],
    gap: [GAP.experiment, GAP.businessEnglish],
    accent: "cyan",
  },
];

/** Union of every role's gap — the learner's overall gap, computed not stored. */
export const overallSkillGap = Array.from(
  new Map(
    jobMatches.flatMap((job) => job.gap).map((item) => [item.id, item]),
  ).values(),
);
