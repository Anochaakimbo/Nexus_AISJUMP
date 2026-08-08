import type { ChangeStage, Localized, Profile } from "@/data/types";
import { getStage } from "./stages";

export type CoachMessage = {
  stage: ChangeStage;
  stageLabel: Localized;
  headline: Localized;
  body: Localized;
  cta: { label: Localized; href: string };
};

/**
 * Scripted stand-in for the Growth Coach.
 *
 * DEMO SCOPE: the copy is written ahead of time, not generated. The selection
 * logic is real though — the stage decides the tone, the framing, and the call
 * to action, so the behavioural model can be explained live during the pitch.
 * Swapping this for a model call means replacing this one function.
 */
const script: Record<
  ChangeStage,
  Omit<CoachMessage, "stage" | "stageLabel">
> = {
  precontemplation: {
    headline: {
      th: "ลองดูว่าตลาดแรงงานกำลังมองหาอะไร",
      en: "See what the job market is asking for",
    },
    body: {
      th: "ลองดูทักษะที่บริษัทต้องการก่อน ยังไม่ต้องตัดสินใจ",
      en: "See what companies hire for. No decisions needed yet.",
    },
    cta: {
      label: { th: "ดูตำแหน่งที่น่าสนใจ", en: "Browse roles" },
      href: "/careers",
    },
  },
  contemplation: {
    headline: {
      th: "คุณมีจุดแข็งมากกว่าที่คิด",
      en: "You have more strengths than you think",
    },
    body: {
      th: "Skill DNA ของคุณตรงกับ 2 เส้นทางอาชีพแล้ว",
      en: "Your Skill DNA already fits two career paths.",
    },
    cta: {
      label: { th: "ดู Roadmap ที่แนะนำ", en: "See suggested roadmap" },
      href: "/roadmap",
    },
  },
  preparation: {
    headline: {
      th: "เริ่มจากขั้นเล็ก ๆ ที่ทำได้วันนี้",
      en: "Start with one small step today",
    },
    body: {
      th: "20 นาทีก็ขยับ Level 1 ได้แล้ว",
      en: "Twenty minutes moves Level 1 forward.",
    },
    cta: {
      label: { th: "เริ่มบทเรียนแรก", en: "Start the first lesson" },
      href: "/learn",
    },
  },
  action: {
    headline: {
      th: "วันนี้ทำ Workshop นี้ Career Readiness จะเพิ่มอีก 3%",
      en: "Finish this workshop today and Career Readiness rises 3%",
    },
    body: {
      th: "ต่อเนื่องมา 5 วัน อีก 2 บทเรียนจบ Level 1",
      en: "Five days in a row. Two lessons left in Level 1.",
    },
    cta: {
      label: { th: "ทำภารกิจวันนี้", en: "Do today's mission" },
      href: "/roadmap",
    },
  },
  maintenance: {
    headline: {
      th: "ถึงเวลาเปลี่ยนความรู้เป็นผลงาน",
      en: "Time to turn knowledge into proof",
    },
    body: {
      th: "ส่งผลงานเข้า Hackathon เก็บลง Talent Passport",
      en: "Enter a hackathon, add it to your passport.",
    },
    cta: {
      label: { th: "ดูโอกาสที่เปิดรับ", en: "See open opportunities" },
      href: "/opportunities",
    },
  },
};

export function getCoachMessage(learner: Profile): CoachMessage {
  const stage = getStage(learner.stage);
  return {
    stage: stage.id,
    stageLabel: stage.name,
    ...script[stage.id],
  };
}
