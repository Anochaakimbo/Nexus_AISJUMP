"use client";

import { useState } from "react";
import { CourseCard, CourseRow } from "@/features/learning/CourseCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterChip, SearchInput } from "@/components/ui/Field";
import { SectionHeader } from "@/components/ui/Section";
import { courses } from "@/data/courses";
import { skills } from "@/data/profile";
import type { LearningKind } from "@/data/types";
import type { TranslationKey } from "@/lib/i18n/dictionary";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const tabs: Array<{ value: LearningKind | "all"; labelKey: TranslationKey }> = [
  { value: "all", labelKey: "common.all" },
  { value: "course", labelKey: "learn.tabCourse" },
  { value: "video", labelKey: "learn.tabVideo" },
  { value: "article", labelKey: "learn.tabArticle" },
  { value: "podcast", labelKey: "learn.tabPodcast" },
];

const WEAK_SKILL_THRESHOLD = 50;

// Recommendations target the learner's weakest skills, so the carousel is a
// different set from the list below rather than the same cards twice.
const weakSkillIds = skills
  .filter((skill) => skill.level < WEAK_SKILL_THRESHOLD)
  .map((skill) => skill.id);

const recommended = courses.filter((course) =>
  course.skills.some((skill) => weakSkillIds.includes(skill)),
);
const recommendedIds = new Set(recommended.map((course) => course.id));

export default function LearnPage() {
  const { t } = useLocale();
  const [kind, setKind] = useState<LearningKind | "all">("all");

  const showRecommended = kind === "all";
  const listed = courses.filter(
    (course) =>
      (kind === "all" || course.kind === kind) &&
      !(showRecommended && recommendedIds.has(course.id)),
  );

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={t("learn.title")} />

      <div className="space-y-5 px-4">
        <SearchInput placeholder={t("learn.search")} />

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {tabs.map((tab) => (
            <FilterChip
              key={tab.value}
              active={kind === tab.value}
              onClick={() => setKind(tab.value)}
            >
              {t(tab.labelKey)}
            </FilterChip>
          ))}
        </div>

        {showRecommended && (
          <section className="space-y-2.5">
            <SectionHeader title={t("learn.recommended")} />
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {recommended.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}

        <div className="space-y-2.5">
          {listed.map((course) => (
            <CourseRow key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
