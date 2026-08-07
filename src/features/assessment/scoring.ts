import { careerGoals } from "@/data/roadmap";
import type { CareerGoal, Localized, Skill } from "@/data/types";

export type SkillDnaTrait = {
  id: string;
  label: Localized;
  /** 0–100 */
  score: number;
};

export type AssessmentAnswers = {
  interests: string[];
  strengths: string[];
  /** Chosen career, or null when the learner asked AI to suggest one. */
  goalId: string | null;
};

export type AssessmentResult = {
  traits: SkillDnaTrait[];
  suggested: CareerGoal[];
  /** True when the ordering came from the answers rather than an explicit pick. */
  aiChose: boolean;
};

/**
 * Scripted stand-in for the assessment model.
 *
 * DEMO SCOPE: scores come from a fixed weight table rather than a model, so the
 * walkthrough is reproducible. The shape matches what a scoring service returns.
 */
const interestWeights: Record<string, Partial<Record<string, number>>> = {
  analytical: { tech: 20, science: 18, business: 12, medical: 10 },
  creative: { art: 22, media: 18, education: 8, tech: 6 },
  people: { social: 20, education: 18, media: 10, sport: 10 },
  execution: { business: 18, tech: 14, sport: 14, science: 10 },
};

const strengthWeights: Record<string, Partial<Record<string, number>>> = {
  analytical: { analyse: 26, build: 10, organise: 8 },
  creative: { create: 26, present: 12, build: 8 },
  people: { connect: 26, present: 16, organise: 6 },
  execution: { build: 22, organise: 20, analyse: 8 },
};

const traitLabels: Record<string, Localized> = {
  analytical: { th: "การวิเคราะห์", en: "Analytical" },
  creative: { th: "ความคิดสร้างสรรค์", en: "Creative" },
  people: { th: "การทำงานกับผู้คน", en: "Working with people" },
  execution: { th: "การลงมือทำ", en: "Execution" },
};

const BASE_SCORE = 28;
const MAX_SCORE = 96;

function sum(
  picks: string[],
  weights: Partial<Record<string, number>> | undefined,
) {
  return picks.reduce((total, pick) => total + (weights?.[pick] ?? 0), 0);
}

export function scoreAssessment(answers: AssessmentAnswers): AssessmentResult {
  const traits = Object.keys(traitLabels)
    .map((id) => ({
      id,
      label: traitLabels[id],
      score: Math.min(
        MAX_SCORE,
        BASE_SCORE +
          sum(answers.interests, interestWeights[id]) +
          sum(answers.strengths, strengthWeights[id]),
      ),
    }))
    .sort((a, b) => b.score - a.score);

  // An explicit choice always wins; otherwise the strongest trait decides the order.
  const chosen = careerGoals.find((goal) => goal.id === answers.goalId);
  if (chosen) {
    return {
      traits,
      suggested: [chosen, ...careerGoals.filter((goal) => goal.id !== chosen.id)],
      aiChose: false,
    };
  }

  const order: Record<string, string> = {
    analytical: "data-scientist",
    execution: "ml-engineer",
    people: "data-analyst",
    creative: "data-analyst",
  };
  const leadId = order[traits[0]?.id ?? "analytical"];
  const lead = careerGoals.find((goal) => goal.id === leadId);

  return {
    traits,
    suggested: lead
      ? [lead, ...careerGoals.filter((goal) => goal.id !== lead.id)]
      : careerGoals,
    aiChose: true,
  };
}

/** Seeds the Skill Overview shown after onboarding completes. */
export function toStarterSkills(result: AssessmentResult): Skill[] {
  return result.traits.map((trait) => ({
    id: trait.id,
    name: trait.label,
    level: trait.score,
  }));
}
