import type { Interest, Profile, Skill, Task } from "./types";

/** The demo learner shown throughout the walkthrough. */
export const profile: Profile = {
  name: { th: "ไชยวัฒน์", en: "Chaiwat" },
  fullName: { th: "ไชยวัฒน์ ทองเลิศวงษ์", en: "Chaiwat Thonglertwong" },
  major: { th: "วิศวกรรมคอมพิวเตอร์", en: "Computer Engineering" },
  year: 2,
  goal: { th: "Data Scientist", en: "Data Scientist" },
  readiness: 64,
  stage: "preparation",
};

/**
 * The single source of truth for skill levels — the roadmap derives its level
 * progress from these, and the profile shows each one's proficiency tier.
 *
 * Order follows the learning path (Python → … → Visualization), English last.
 */
export const skills: Skill[] = [
  { id: "python", name: { th: "Python", en: "Python" }, level: 100 },
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

/**
 * Assessment step 2 — how the learner likes to work. Feeds the Skill DNA.
 * Colours are laid out so no two neighbours in the 3-column grid match.
 */
export const strengths: Interest[] = [
  { id: "analyse", label: { th: "วิเคราะห์ตัวเลข", en: "Analysing numbers" }, icon: "chart", color: "accent" },
  { id: "create", label: { th: "ออกแบบและสร้างสรรค์", en: "Designing & creating" }, icon: "palette", color: "violet" },
  { id: "connect", label: { th: "ทำงานกับผู้คน", en: "Working with people" }, icon: "people", color: "rose" },
  { id: "build", label: { th: "ลงมือทำและทดลอง", en: "Building & testing" }, icon: "chip", color: "amber" },
  { id: "organise", label: { th: "วางแผนและจัดระบบ", en: "Planning & organising" }, icon: "roadmap", color: "primary" },
  { id: "present", label: { th: "สื่อสารและนำเสนอ", en: "Communicating ideas" }, icon: "megaphone", color: "cyan" },
  { id: "solve", label: { th: "แก้ปัญหาเฉพาะหน้า", en: "Solving problems" }, icon: "target", color: "rose" },
  { id: "learn", label: { th: "เรียนรู้สิ่งใหม่เร็ว", en: "Learning fast" }, icon: "learn", color: "accent" },
  { id: "detail", label: { th: "ใส่ใจรายละเอียด", en: "Attention to detail" }, icon: "search", color: "violet" },
  { id: "language", label: { th: "ภาษาต่างประเทศ", en: "Foreign languages" }, icon: "globe", color: "cyan" },
  { id: "lead", label: { th: "เป็นผู้นำทีม", en: "Leading a team" }, icon: "flag", color: "amber" },
  { id: "write", label: { th: "เขียนและเล่าเรื่อง", en: "Writing & storytelling" }, icon: "message", color: "primary" },
];

/** Assessment step 1 — the interest grid. */
export const interests: Interest[] = [
  { id: "tech", label: { th: "เทคโนโลยี", en: "Technology" }, icon: "chip", color: "accent" },
  { id: "science", label: { th: "วิทยาศาสตร์", en: "Science" }, icon: "flask", color: "cyan" },
  { id: "business", label: { th: "ธุรกิจ", en: "Business" }, icon: "chart", color: "primary" },
  { id: "art", label: { th: "ศิลปะ & ดีไซน์", en: "Art & Design" }, icon: "palette", color: "violet" },
  { id: "medical", label: { th: "การแพทย์", en: "Medical" }, icon: "cross", color: "rose" },
  { id: "education", label: { th: "การศึกษา", en: "Education" }, icon: "school", color: "amber" },
  { id: "media", label: { th: "สื่อ & การตลาด", en: "Media & Marketing" }, icon: "megaphone", color: "rose" },
  { id: "social", label: { th: "สังคม & ชุมชน", en: "Society & Community" }, icon: "people", color: "primary" },
  { id: "sport", label: { th: "กีฬา & สุขภาพ", en: "Sport & Health" }, icon: "run", color: "cyan" },
];
