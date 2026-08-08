import type { Localized } from "@/lib/i18n/LocaleProvider";

export type { Localized };

/** Where the learner sits in the Transtheoretical Model. Drives the coach tone. */
export type ChangeStage =
  | "precontemplation"
  | "contemplation"
  | "preparation"
  | "action"
  | "maintenance";

export type Skill = {
  id: string;
  name: Localized;
  /** 0–100 */
  level: number;
};

export type RoadmapStatus = "done" | "in-progress" | "locked";

export type RoadmapLevel = {
  level: number;
  title: Localized;
  /** The skill this level trains. Progress mirrors that skill's level. */
  skillId?: string;
  /** 0–100 — derived, never authored. */
  progress: number;
  status: RoadmapStatus;
};

export type LearningKind = "course" | "video" | "article" | "podcast";

export type Course = {
  id: string;
  title: Localized;
  provider: string;
  kind: LearningKind;
  /** 0–5 */
  rating: number;
  /** raw learner count; formatted at render time */
  learners: number;
  free: boolean;
  /** two tailwind colour tokens used for the placeholder cover */
  cover: [string, string];
  skills: string[];
};

export type OpportunityKind =
  | "hackathon"
  | "scholarship"
  | "workshop"
  | "camp"
  | "competition"
  | "internship"
  | "volunteer";

export type Opportunity = {
  id: string;
  title: Localized;
  kind: OpportunityKind;
  location: Localized;
  deadline: Localized;
  accent: string;
};

export type Mentor = {
  id: string;
  name: Localized;
  role: Localized;
  company: string;
  /** 0–5 */
  rating: number;
  reviews: number;
  skills: string[];
  available: boolean;
};

export type SkillGap = {
  id: string;
  name: Localized;
};

export type JobMatch = {
  id: string;
  role: Localized;
  company: string;
  /** 0–100 */
  match: number;
  about: Localized;
  requiredSkills: string[];
  gap: SkillGap[];
  accent: string;
};

export type Task = {
  id: string;
  title: Localized;
  done: boolean;
};

export type CareerGoal = {
  id: string;
  title: Localized;
  summary: Localized;
  accent: string;
};

export type Profile = {
  name: string;
  goal: Localized;
  /** 0–100 */
  readiness: number;
  stage: ChangeStage;
};

export type Interest = {
  id: string;
  label: Localized;
  icon: string;
};
