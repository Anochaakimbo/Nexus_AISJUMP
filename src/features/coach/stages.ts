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
 */
export type StageDefinition = {
  id: ChangeStage;
  order: number;
  quote: Localized;
  description: Localized;
  lever: "autonomy" | "competence" | "relatedness";
};

export const stages: StageDefinition[] = [
  {
    id: "precontemplation",
    order: 1,
    quote: {
      th: "“ไม่เห็นมีอะไรต้องเปลี่ยนนี่”",
      en: "“Nothing needs to change.”",
    },
    description: {
      th: "ยังไม่ยอมรับว่ามีปัญหา หรือคิดว่าทุกอย่างโอเคดีอยู่แล้ว",
      en: "Not yet seeing a problem, or assuming everything is already fine.",
    },
    lever: "autonomy",
  },
  {
    id: "contemplation",
    order: 2,
    quote: {
      th: "“จริง ๆ แล้วมันก็มีปัญหาอยู่นะ แต่...”",
      en: "“There is an issue, but…”",
    },
    description: {
      th: "เริ่มเห็นว่ามีบางอย่างที่ควรปรับปรุง แต่ยังลังเลว่าจะเปลี่ยนดีไหม",
      en: "Starting to see what could improve, but still hesitating.",
    },
    lever: "autonomy",
  },
  {
    id: "preparation",
    order: 3,
    quote: {
      th: "“เอาล่ะ! ต้องทำอะไรบ้างนะ?”",
      en: "“Right — what do I actually do?”",
    },
    description: {
      th: "เริ่มวางแผนชัดเจน และพร้อมที่จะลงมือทำ",
      en: "Making a concrete plan and getting ready to act.",
    },
    lever: "competence",
  },
  {
    id: "action",
    order: 4,
    quote: {
      th: "“ลุยกันเลย!”",
      en: "“Let's go!”",
    },
    description: {
      th: "ลงมือทำจริง ๆ และควรหาวิธีให้กำลังใจตัวเองเมื่อทำได้ตามเป้า",
      en: "Actually doing the work — and needs recognition when targets land.",
    },
    lever: "competence",
  },
  {
    id: "maintenance",
    order: 5,
    quote: {
      th: "“ทำจนเป็นนิสัยแล้ว!”",
      en: "“It's a habit now.”",
    },
    description: {
      th: "ทำต่อเนื่องจนกลายเป็นส่วนหนึ่งของชีวิต",
      en: "Sustained until it becomes part of daily life.",
    },
    lever: "relatedness",
  },
];

export function getStage(id: ChangeStage): StageDefinition {
  const stage = stages.find((candidate) => candidate.id === id);
  if (!stage) throw new Error(`Unknown change stage: ${id}`);
  return stage;
}
