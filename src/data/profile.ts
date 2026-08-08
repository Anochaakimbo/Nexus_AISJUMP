import type { Interest, Profile, Skill, Task } from "./types";

/** The demo learner shown throughout the walkthrough. */
export const profile: Profile = {
  name: "Mind",
  goal: { th: "Data Scientist", en: "Data Scientist" },
  readiness: 64,
  stage: "action",
};

/**
 * The single source of truth for skill levels — the roadmap derives its
 * progress from these, and the radar renders them in this order.
 *
 * Order follows the learning path (Python → … → Visualization) with English
 * last, so the six axes read as a sequence rather than an arbitrary rotation.
 */
export const skills: Skill[] = [
  { id: "python", name: { th: "Python", en: "Python" }, level: 70 },
  { id: "statistics", name: { th: "สถิติ", en: "Statistics" }, level: 45 },
  { id: "sql", name: { th: "SQL", en: "SQL" }, level: 55 },
  {
    id: "ml",
    name: { th: "Machine Learning", en: "Machine Learning" },
    level: 30,
  },
  {
    id: "viz",
    name: { th: "Data Visualization", en: "Data Visualization" },
    level: 20,
  },
  { id: "english", name: { th: "ภาษาอังกฤษ", en: "English" }, level: 40 },
];

export const dailyTasks: Task[] = [
  {
    id: "t1",
    title: { th: "เรียนคอร์ส Python ต่อ", en: "Continue the Python course" },
    done: false,
  },
  {
    id: "t2",
    title: { th: "ทำแบบฝึกหัด Chapter 2", en: "Finish Chapter 2 exercises" },
    done: false,
  },
  {
    id: "t3",
    title: { th: "นัด Mentor Session", en: "Book a mentor session" },
    done: false,
  },
];

/** Assessment step 2 — how the learner likes to work. Feeds the Skill DNA. */
export const strengths: Interest[] = [
  { id: "analyse", label: { th: "วิเคราะห์ตัวเลข", en: "Analysing numbers" }, icon: "chart" },
  { id: "create", label: { th: "ออกแบบและสร้างสรรค์", en: "Designing & creating" }, icon: "palette" },
  { id: "connect", label: { th: "ทำงานกับผู้คน", en: "Working with people" }, icon: "people" },
  { id: "build", label: { th: "ลงมือทำและทดลอง", en: "Building & testing" }, icon: "chip" },
  { id: "organise", label: { th: "วางแผนและจัดระบบ", en: "Planning & organising" }, icon: "roadmap" },
  { id: "present", label: { th: "สื่อสารและนำเสนอ", en: "Communicating ideas" }, icon: "megaphone" },
];

/** Assessment step 1 — the interest grid. */
export const interests: Interest[] = [
  { id: "tech", label: { th: "เทคโนโลยี", en: "Technology" }, icon: "chip" },
  { id: "science", label: { th: "วิทยาศาสตร์", en: "Science" }, icon: "flask" },
  { id: "business", label: { th: "ธุรกิจ", en: "Business" }, icon: "chart" },
  { id: "art", label: { th: "ศิลปะ & ดีไซน์", en: "Art & Design" }, icon: "palette" },
  { id: "medical", label: { th: "การแพทย์", en: "Medical" }, icon: "cross" },
  { id: "education", label: { th: "การศึกษา", en: "Education" }, icon: "school" },
  { id: "media", label: { th: "สื่อ & การตลาด", en: "Media & Marketing" }, icon: "megaphone" },
  { id: "social", label: { th: "สังคม & ชุมชน", en: "Society & Community" }, icon: "people" },
  { id: "sport", label: { th: "กีฬา & สุขภาพ", en: "Sport & Health" }, icon: "run" },
];
