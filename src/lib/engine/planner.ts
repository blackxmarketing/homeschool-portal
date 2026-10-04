import { SKILLS, type Skill } from "../curriculum/skills";

export type SkillStatus = "mastered" | "learning";

export interface SkillState {
  status: SkillStatus;
  nextReview: string | null;
}

export interface PlanItem {
  type: "review" | "learn";
  skillId: string;
}

export const MAX_REVIEWS_PER_DAY = 3;
export const MAX_LEARN_PER_DAY = 3;
/** A kid moves on from a learn item after this many questions in one day, mastered or not. */
export const DAILY_QUESTION_CAP = 20;

export function isAvailable(skill: Skill, states: Map<string, SkillState>): boolean {
  return skill.prereqs.every((p) => states.get(p)?.status === "mastered");
}

/** Skills the kid is ready to start: not mastered, all prerequisites mastered. */
export function frontier(states: Map<string, SkillState>): Skill[] {
  return SKILLS.filter((s) => states.get(s.id)?.status !== "mastered" && isAvailable(s, states));
}

/**
 * Builds the day's math plan: due reviews first (oldest first), then skills
 * already in progress, then new skills from the frontier. New skills come
 * from the lowest grade first and are spread across strands so one day
 * isn't all fractions.
 */
export function buildPlan(states: Map<string, SkillState>, today: string): PlanItem[] {
  const reviews = [...states.entries()]
    .filter(([, s]) => s.status === "mastered" && s.nextReview !== null && s.nextReview <= today)
    .sort((a, b) => (a[1].nextReview! < b[1].nextReview! ? -1 : 1))
    .slice(0, MAX_REVIEWS_PER_DAY)
    .map(([skillId]): PlanItem => ({ type: "review", skillId }));

  const ready = frontier(states);
  const inProgress = ready.filter((s) => states.get(s.id)?.status === "learning");
  const fresh = ready.filter((s) => !states.has(s.id)).sort((a, b) => a.grade - b.grade);

  const learn: Skill[] = [];
  const strands = new Set<string>();
  for (const s of inProgress) {
    if (learn.length >= MAX_LEARN_PER_DAY) break;
    learn.push(s);
    strands.add(s.strand);
  }
  // Prefer a strand we haven't used yet today, then fill with whatever is left.
  for (const pass of [true, false]) {
    for (const s of fresh) {
      if (learn.length >= MAX_LEARN_PER_DAY) break;
      if (learn.includes(s)) continue;
      if (pass && strands.has(s.strand)) continue;
      learn.push(s);
      strands.add(s.strand);
    }
  }

  return [...reviews, ...learn.map((s): PlanItem => ({ type: "learn", skillId: s.id }))];
}

/**
 * Where a kid stands in each grade: share of that grade's skills mastered.
 * Used for the "working at / ahead of grade level" view.
 */
export function gradeProgress(states: Map<string, SkillState>): { grade: number; mastered: number; total: number }[] {
  const grades = [...new Set(SKILLS.map((s) => s.grade))].sort((a, b) => a - b);
  return grades.map((grade) => {
    const skills = SKILLS.filter((s) => s.grade === grade);
    return {
      grade,
      total: skills.length,
      mastered: skills.filter((s) => states.get(s.id)?.status === "mastered").length,
    };
  });
}
