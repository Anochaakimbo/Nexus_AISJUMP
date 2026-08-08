import { skills } from "./profile";
import type { CareerGoal, Localized, RoadmapLevel } from "./types";

/**
 * The Data Scientist track — seven levels, foundations first. Grouping comes
 * from the growth stage that owns each level (see features/coach/stages.ts).
 */
const track: Array<{ title: Localized; skillId?: string }> = [
  { title: { th: "Python พื้นฐาน", en: "Python foundations" }, skillId: "python" },
  { title: { th: "สถิติและความน่าจะเป็น", en: "Statistics & Probability" }, skillId: "statistics" },
  { title: { th: "SQL สำหรับวิเคราะห์ข้อมูล", en: "SQL for Data Analysis" }, skillId: "sql" },
  { title: { th: "Machine Learning", en: "Machine Learning" }, skillId: "ml" },
  { title: { th: "Data Visualization", en: "Data Visualization" }, skillId: "viz" },
  { title: { th: "โปรเจกต์ & Portfolio", en: "Project & Portfolio" } },
  { title: { th: "ฝึกงาน / เตรียมสมัครงาน", en: "Internship / Job Prep" } },
];

/** A level is passed at 100% — that is what advances you to the next one. */
const PASS_MARK = 100;

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
    status:
      progress >= PASS_MARK
        ? "done"
        : progress === 0
          ? "locked"
          : "in-progress",
  };
});

/** Summaries stay short — they render inside a square tile, not a wide row. */
export const careerGoals: CareerGoal[] = [
  {
    id: "data-scientist",
    title: { th: "Data Scientist", en: "Data Scientist" },
    summary: {
      th: "วิเคราะห์ข้อมูล สร้างโมเดลช่วยตัดสินใจ",
      en: "Analyse data, build decision models",
    },
    icon: "chart",
    color: "accent",
  },
  {
    id: "data-analyst",
    title: { th: "Data Analyst", en: "Data Analyst" },
    summary: {
      th: "เปลี่ยนข้อมูลเป็นรายงานที่ใช้ได้จริง",
      en: "Turn data into reports teams use",
    },
    icon: "search",
    color: "cyan",
  },
  {
    id: "ml-engineer",
    title: { th: "ML Engineer", en: "ML Engineer" },
    summary: {
      th: "นำโมเดล ML ขึ้นใช้งานจริง",
      en: "Ship ML models to production",
    },
    icon: "chip",
    color: "violet",
  },
];
