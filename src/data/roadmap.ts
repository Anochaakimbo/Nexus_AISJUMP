import type { CareerGoal, RoadmapLevel } from "./types";

/** The Data Scientist track from the design — seven levels, foundations first. */
export const roadmap: RoadmapLevel[] = [
  {
    level: 1,
    title: { th: "Python พื้นฐาน", en: "Python foundations" },
    progress: 70,
    status: "in-progress",
  },
  {
    level: 2,
    title: { th: "สถิติและความน่าจะเป็น", en: "Statistics & Probability" },
    progress: 55,
    status: "in-progress",
  },
  {
    level: 3,
    title: { th: "SQL สำหรับวิเคราะห์ข้อมูล", en: "SQL for Data Analysis" },
    progress: 40,
    status: "in-progress",
  },
  {
    level: 4,
    title: { th: "Machine Learning", en: "Machine Learning" },
    progress: 30,
    status: "in-progress",
  },
  {
    level: 5,
    title: { th: "Data Visualization", en: "Data Visualization" },
    progress: 20,
    status: "in-progress",
  },
  {
    level: 6,
    title: { th: "โปรเจกต์ & Portfolio", en: "Project & Portfolio" },
    progress: 0,
    status: "locked",
  },
  {
    level: 7,
    title: { th: "ฝึกงาน / เตรียมสมัครงาน", en: "Internship / Job Prep" },
    progress: 0,
    status: "locked",
  },
];

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
