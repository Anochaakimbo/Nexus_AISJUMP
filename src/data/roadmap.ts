import { skills } from "./profile";
import type { CareerGoal, Localized, RoadmapLevel } from "./types";

/** The Data Scientist track from the design — seven levels, foundations first. */
const track: Array<{ title: Localized; skillId?: string }> = [
  { title: { th: "Python พื้นฐาน", en: "Python foundations" }, skillId: "python" },
  {
    title: { th: "สถิติและความน่าจะเป็น", en: "Statistics & Probability" },
    skillId: "statistics",
  },
  {
    title: { th: "SQL สำหรับวิเคราะห์ข้อมูล", en: "SQL for Data Analysis" },
    skillId: "sql",
  },
  { title: { th: "Machine Learning", en: "Machine Learning" }, skillId: "ml" },
  { title: { th: "Data Visualization", en: "Data Visualization" }, skillId: "viz" },
  { title: { th: "โปรเจกต์ & Portfolio", en: "Project & Portfolio" } },
  { title: { th: "ฝึกงาน / เตรียมสมัครงาน", en: "Internship / Job Prep" } },
];

/**
 * Progress is read from the skill each level trains, so a level and its skill
 * can never disagree. Levels without a skill (portfolio, internship) start at 0.
 */
export const roadmap: RoadmapLevel[] = track.map((step, index) => {
  const progress =
    skills.find((skill) => skill.id === step.skillId)?.level ?? 0;
  return {
    level: index + 1,
    title: step.title,
    skillId: step.skillId,
    progress,
    status: progress === 0 ? "locked" : progress >= 100 ? "done" : "in-progress",
  };
});

export const careerGoals: CareerGoal[] = [
  {
    id: "data-scientist",
    title: { th: "Data Scientist", en: "Data Scientist" },
    summary: {
      th: "วิเคราะห์ข้อมูลและสร้างโมเดลเพื่อช่วยธุรกิจตัดสินใจ",
      en: "Analyse data and build models that drive business decisions",
    },
    accent: "accent",
  },
  {
    id: "data-analyst",
    title: { th: "Data Analyst", en: "Data Analyst" },
    summary: {
      th: "เปลี่ยนข้อมูลดิบให้เป็นรายงานและ insight ที่ใช้งานได้จริง",
      en: "Turn raw data into reports and insights teams can act on",
    },
    accent: "primary",
  },
  {
    id: "ml-engineer",
    title: { th: "ML Engineer", en: "ML Engineer" },
    summary: {
      th: "นำโมเดล Machine Learning ขึ้นใช้งานจริงในระดับ production",
      en: "Ship machine learning models into production systems",
    },
    accent: "lime",
  },
];
