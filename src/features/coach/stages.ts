import type { ChangeStage, Localized } from "@/data/types";

/**
 * Transtheoretical Model (Prochaska & DiClemente) — the five stages of change.
 *
 * NEXUS treats these as the spine of the coach: the same learner data produces
 * a different message depending on which stage they are in. That is what
 * separates a Behavioural Growth Coach from a recommendation list.
 *
 * `lever` names the Self-Determination Theory need the stage leans on
 * (autonomy / competence / relatedness), which is what the copy is built to feed.
 *
 * Only `name` and `order` are rendered. `quote`, `description`, and `lever` are
 * kept deliberately: they are the model itself, and they become the prompt
 * material for the coach once a real LLM replaces the scripted copy.
 */
export type StageDefinition = {
  id: ChangeStage;
  order: number;
  name: Localized;
  badgeTitle?: Localized;
  subtitle?: Localized;
  quote: Localized;
  description: Localized;
  lever: "autonomy" | "competence" | "relatedness";
  /**
   * What the learner does while in this stage. Stages that map onto roadmap
   * levels carry `levels` instead — the level list is the milestone list there,
   * so the two never state the same thing twice.
   */
  milestones?: Array<{ label: Localized; done: boolean }>;
  /** Roadmap level numbers that belong to this stage. */
  levels?: number[];
};

export const stages: StageDefinition[] = [
  {
    id: "precontemplation",
    order: 1,
    name: { th: "ยังไม่มีเป้าหมาย", en: "No goal yet" },
    badgeTitle: { th: "ขั้นตระหนักรู้", en: "Awareness" },
    subtitle: { th: "Precontemplation", en: "Precontemplation" },
    quote: {
      th: "“ยังไม่คิดเรื่องอาชีพเลย”",
      en: "“I haven't thought about a career.”",
    },
    description: {
      th: "ยังไม่ได้คิดว่าอยากทำอาชีพอะไร หรือคิดว่ายังไม่ต้องรีบ",
      en: "No career in mind yet, or feels there is no rush.",
    },
    lever: "autonomy",
    milestones: [
      { label: { th: "ทำแบบประเมินศักยภาพ", en: "Take the assessment" }, done: true },
      { label: { th: "ดูทักษะที่ตลาดแรงงานต้องการ", en: "See what the market wants" }, done: true },
    ],
  },
  {
    id: "contemplation",
    order: 2,
    name: { th: "เริ่มมองหาเส้นทาง", en: "Exploring paths" },
    badgeTitle: { th: "ขั้นค้นหาเส้นทาง", en: "Exploration" },
    subtitle: { th: "Contemplation", en: "Contemplation" },
    quote: {
      th: "“ก็อยากเก่งขึ้นนะ แต่...”",
      en: "“I want to get better, but…”",
    },
    description: {
      th: "เริ่มรู้ว่าต้องพัฒนาทักษะ แต่ยังไม่แน่ใจว่าจะเริ่มตรงไหน",
      en: "Knows skills need work, but unsure where to start.",
    },
    lever: "autonomy",
    milestones: [
      { label: { th: "ดู Skill DNA ของตัวเอง", en: "Review your Skill DNA" }, done: true },
      { label: { th: "เทียบ 3 เส้นทางอาชีพ", en: "Compare three career paths" }, done: true },
    ],
  },
  {
    id: "preparation",
    order: 3,
    name: { th: "วางแผนแล้ว", en: "Plan ready" },
    badgeTitle: { th: "ขั้นเตรียมพร้อม", en: "Preparation" },
    subtitle: { th: "Preparation", en: "Preparation" },
    quote: {
      th: "“เอาล่ะ! ต้องเรียนอะไรบ้าง?”",
      en: "“Right — what do I learn first?”",
    },
    description: {
      th: "รู้เป้าหมายแล้ว กำลังวางแผนว่าจะพัฒนาทักษะไหนก่อน",
      en: "Goal is set; planning which skill to build first.",
    },
    lever: "competence",
    milestones: [
      { label: { th: "เลือกเป้าหมาย Data Scientist", en: "Pick the Data Scientist goal" }, done: true },
      { label: { th: "สร้าง Roadmap 7 ระดับ", en: "Build the 7-level roadmap" }, done: true },
    ],
  },
  {
    id: "action",
    order: 4,
    name: { th: "กำลังพัฒนาทักษะ", en: "Building skills" },
    badgeTitle: { th: "ขั้นลงมือทำ", en: "Action" },
    subtitle: { th: "Action", en: "Action" },
    quote: {
      th: "“ลุยกันเลย!”",
      en: "“Let's go!”",
    },
    description: {
      th: "กำลังเรียนและทำโปรเจกต์จริง ควรได้กำลังใจเมื่อทำได้ตามเป้า",
      en: "Learning and building for real — needs recognition when targets land.",
    },
    lever: "competence",
    levels: [1, 2, 3, 4, 5],
  },
  {
    id: "maintenance",
    order: 5,
    name: { th: "ทำต่อเนื่องได้", en: "Staying on track" },
    badgeTitle: { th: "ขั้นทำอย่างต่อเนื่อง", en: "Maintenance" },
    subtitle: { th: "Maintenance", en: "Maintenance" },
    quote: {
      th: "“ทำจนเป็นนิสัยแล้ว!”",
      en: "“It's a habit now.”",
    },
    description: {
      th: "เรียนรู้และสะสมผลงานต่อเนื่อง พร้อมเข้าสู่ตลาดแรงงาน",
      en: "Learning and building consistently — ready for the job market.",
    },
    lever: "relatedness",
    levels: [6, 7],
  },
];

export function getStage(id: ChangeStage): StageDefinition {
  const stage = stages.find((candidate) => candidate.id === id);
  if (!stage) throw new Error(`Unknown change stage: ${id}`);
  return stage;
}
