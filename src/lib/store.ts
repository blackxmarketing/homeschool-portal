import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getDb } from "./db";
import { checkAnswer, formatHelp, type AnswerKind, type Question } from "./curriculum/answers";
import { SKILLS, getSkill, type Strand } from "./curriculum/skills";
import { addDays, detectFlags, masteryProgress, reviewOutcome, REVIEW_INTERVALS, REVIEW_QUESTIONS } from "./engine/mastery";
import {
  nextPlacementSkill,
  placedSkills,
  placementFinished,
  placementProgress,
  recordPlacementAnswer,
  startPlacement,
  type PlacementState,
} from "./engine/placement";
import { buildPlan, gradeProgress, isAvailable, DAILY_QUESTION_CAP, type PlanItem, type SkillState } from "./engine/planner";
import { schoolYearStart, summarize, type DayMinutes } from "./compliance";
import { clampProfile, defaultProfile, parseProfile, type FocusProfile } from "./focus";
import { badges, levelInfo, type BadgeStats } from "./game";
import { pickQuest, type Quest, type QuestKind } from "@/content/quests";
import { allCourses, allQuests, blockById, courseById, drillSettings, focusPresets, questById, scheduleBlocks, teacherFor } from "./content";
import { ideaFor, type Block } from "@/content/schedule";
import { accuracyBand, factsPerMinute, forecast, GRADE_DONE, isStruggling, knowledgeGrade, wasteMeter } from "./engine/learningPlan";
import type { Visual } from "./curriculum/answers";
import { checkActivity, coachingFor, interactiveDone, LADDER, parseState, supportSummary, type SegmentState, type TeachState } from "./teaching";
import { expectedSeconds, gradeProbe, probeSolution } from "./probes";
import { adapt, buildProfile, conceptMastery, whatHelps, type Adaptation, type LearningEvent, type Profile } from "./learner";

export type Mode = "learn" | "review" | "placement";

const TIMEZONE = process.env.APP_TIMEZONE ?? "America/Denver";
/** Time on one question beyond this doesn't count toward minutes (they walked away). */
const MAX_COUNTED_MS = 3 * 60 * 1000;

export const AVATARS = ["🦊", "🐼", "🦁", "🐙", "🦉", "🐢", "🚀", "⚡", "🌵", "🐉"];

export function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(new Date());
}

// ---------------- Families, parents, kids ----------------

export interface Kid {
  id: number;
  family_id: number;
  name: string;
  avatar: string;
  grade: number;
  daily_goal_minutes: number;
  xp: number;
  placement_done: number;
}

const KID_COLUMNS = "id, family_id, name, avatar, grade, daily_goal_minutes, xp, placement_done";

export function hasAnyParent(): boolean {
  return !!getDb().prepare("SELECT 1 FROM parents LIMIT 1").get();
}

export function createFamily(input: { familyName: string; parentName: string; email: string; password: string }): number {
  const db = getDb();
  const hash = bcrypt.hashSync(input.password, 10);
  return db.transaction(() => {
    const fam = db.prepare("INSERT INTO families (name) VALUES (?)").run(input.familyName);
    db.prepare("INSERT INTO parents (family_id, name, email, password_hash) VALUES (?, ?, ?, ?)").run(
      fam.lastInsertRowid,
      input.parentName,
      input.email.toLowerCase().trim(),
      hash,
    );
    return Number(fam.lastInsertRowid);
  })();
}

export function verifyParent(email: string, password: string): { id: number; family_id: number } | null {
  const row = getDb()
    .prepare("SELECT id, family_id, password_hash FROM parents WHERE email = ?")
    .get(email.toLowerCase().trim()) as { id: number; family_id: number; password_hash: string } | undefined;
  if (!row || !bcrypt.compareSync(password, row.password_hash)) return null;
  return { id: row.id, family_id: row.family_id };
}

export function getFamily(id: number): { id: number; name: string; school_year_start: string } | undefined {
  return getDb().prepare("SELECT id, name, school_year_start FROM families WHERE id = ?").get(id) as never;
}

export function setSchoolYearStart(familyId: number, monthDay: string): void {
  getDb().prepare("UPDATE families SET school_year_start = ? WHERE id = ?").run(monthDay, familyId);
}

export function addKid(
  familyId: number,
  input: { name: string; avatar: string; grade: number; pin: string; dailyGoal: number; focus?: FocusProfile },
): number {
  const res = getDb()
    .prepare("INSERT INTO kids (family_id, name, avatar, grade, pin_hash, daily_goal_minutes, focus) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(
      familyId,
      input.name,
      input.avatar,
      input.grade,
      bcrypt.hashSync(input.pin, 10),
      input.dailyGoal,
      JSON.stringify(clampProfile(input.focus ?? defaultProfile("unsure", focusPresets()))),
    );
  return Number(res.lastInsertRowid);
}

export function getFocus(kidId: number): FocusProfile {
  const row = getDb().prepare("SELECT focus FROM kids WHERE id = ?").get(kidId) as { focus: string | null } | undefined;
  return parseProfile(row?.focus, focusPresets());
}

export function setFocus(kidId: number, profile: FocusProfile): void {
  getDb().prepare("UPDATE kids SET focus = ? WHERE id = ?").run(JSON.stringify(clampProfile(profile)), kidId);
}

export function updateKid(kidId: number, input: { grade: number; dailyGoal: number; pin?: string }): void {
  const db = getDb();
  db.prepare("UPDATE kids SET grade = ?, daily_goal_minutes = ? WHERE id = ?").run(input.grade, input.dailyGoal, kidId);
  if (input.pin) db.prepare("UPDATE kids SET pin_hash = ? WHERE id = ?").run(bcrypt.hashSync(input.pin, 10), kidId);
}

export function resetPlacement(kidId: number): void {
  getDb().prepare("UPDATE kids SET placement_state = NULL, placement_done = 0 WHERE id = ?").run(kidId);
}

export function listKids(familyId?: number): Kid[] {
  const db = getDb();
  if (familyId === undefined) return db.prepare(`SELECT ${KID_COLUMNS} FROM kids ORDER BY id`).all() as Kid[];
  return db.prepare(`SELECT ${KID_COLUMNS} FROM kids WHERE family_id = ? ORDER BY id`).all(familyId) as Kid[];
}

export function getKid(id: number): Kid | undefined {
  return getDb().prepare(`SELECT ${KID_COLUMNS} FROM kids WHERE id = ?`).get(id) as Kid | undefined;
}

// Simple lockout so a sibling can't brute-force a 4-digit PIN.
const pinFailures = new Map<number, { count: number; until: number }>();

export function verifyKidPin(kidId: number, pin: string): "ok" | "wrong" | "locked" {
  const f = pinFailures.get(kidId);
  if (f && f.until > Date.now()) return "locked";
  const row = getDb().prepare("SELECT pin_hash FROM kids WHERE id = ?").get(kidId) as { pin_hash: string } | undefined;
  if (row && bcrypt.compareSync(pin, row.pin_hash)) {
    pinFailures.delete(kidId);
    return "ok";
  }
  const count = (f?.count ?? 0) + 1;
  pinFailures.set(kidId, { count, until: count >= 5 ? Date.now() + 5 * 60 * 1000 : 0 });
  return count >= 5 ? "locked" : "wrong";
}

// ---------------- Skill state ----------------

interface KidSkillRow {
  skill_id: string;
  status: "learning" | "mastered";
  source: string;
  mastered_at: string | null;
  review_stage: number;
  next_review: string | null;
  review_answered: number;
  review_correct: number;
  counting_after: number;
}

function kidSkillRows(kidId: number): KidSkillRow[] {
  return getDb().prepare("SELECT * FROM kid_skills WHERE kid_id = ?").all(kidId) as KidSkillRow[];
}

function kidSkill(kidId: number, skillId: string): KidSkillRow | undefined {
  return getDb().prepare("SELECT * FROM kid_skills WHERE kid_id = ? AND skill_id = ?").get(kidId, skillId) as
    | KidSkillRow
    | undefined;
}

export function skillStates(kidId: number): Map<string, SkillState> {
  return new Map(kidSkillRows(kidId).map((r) => [r.skill_id, { status: r.status, nextReview: r.next_review }]));
}

function learnAttempts(kidId: number, skillId: string, after: number): { correct: boolean; usedHint: boolean }[] {
  const rows = getDb()
    .prepare(
      "SELECT correct, used_hint FROM attempts WHERE kid_id = ? AND skill_id = ? AND mode = 'learn' AND id > ? ORDER BY id DESC LIMIT 10",
    )
    .all(kidId, skillId, after) as { correct: number; used_hint: number }[];
  return rows.reverse().map((r) => ({ correct: !!r.correct, usedHint: !!r.used_hint }));
}

export function skillProgress(kidId: number, skillId: string) {
  const row = kidSkill(kidId, skillId);
  return {
    status: row?.status ?? null,
    ...masteryProgress(learnAttempts(kidId, skillId, row?.counting_after ?? 0)),
  };
}

function questionsToday(kidId: number, skillId: string, mode: Mode): number {
  const row = getDb()
    .prepare("SELECT COUNT(*) AS n FROM attempts WHERE kid_id = ? AND skill_id = ? AND mode = ? AND day = ?")
    .get(kidId, skillId, mode, today()) as { n: number };
  return row.n;
}

// ---------------- Daily plan ----------------

export interface PlanEntry extends PlanItem {
  title: string;
  grade: number;
  done: boolean;
  answeredToday: number;
}

export function todaysPlan(kidId: number): PlanEntry[] {
  const db = getDb();
  const day = today();
  const saved = db.prepare("SELECT plan FROM daily_plans WHERE kid_id = ? AND day = ?").get(kidId, day) as
    | { plan: string }
    | undefined;
  let items: PlanItem[];
  if (saved) {
    items = JSON.parse(saved.plan);
  } else {
    items = buildPlan(skillStates(kidId), day);
    db.prepare("INSERT INTO daily_plans (kid_id, day, plan) VALUES (?, ?, ?)").run(kidId, day, JSON.stringify(items));
  }

  return items.map((item) => {
    const skill = getSkill(item.skillId)!;
    const row = kidSkill(kidId, item.skillId);
    const answeredToday = questionsToday(kidId, item.skillId, item.type);
    const done =
      item.type === "review"
        ? !row || row.status === "learning" || (row.next_review !== null && row.next_review > day)
        : row?.status === "mastered" || answeredToday >= DAILY_QUESTION_CAP;
    return { ...item, title: skill.title, grade: skill.grade, done, answeredToday };
  });
}

/** If everything planned is done, add the next batch so a motivated kid can keep going. */
export function extendPlan(kidId: number): void {
  const db = getDb();
  const day = today();
  const current = todaysPlan(kidId);
  if (current.some((p) => !p.done)) return;
  const have = new Set(current.map((p) => `${p.type}:${p.skillId}`));
  const more = buildPlan(skillStates(kidId), day).filter((p) => {
    if (have.has(`${p.type}:${p.skillId}`)) return false;
    return p.type === "review" || questionsToday(kidId, p.skillId, "learn") < DAILY_QUESTION_CAP;
  });
  const items: PlanItem[] = [...current.map(({ type, skillId }) => ({ type, skillId })), ...more];
  db.prepare("UPDATE daily_plans SET plan = ? WHERE kid_id = ? AND day = ?").run(JSON.stringify(items), kidId, day);
}

// ---------------- Questions & answers ----------------

export interface PublicQuestion {
  id: string;
  skillId: string;
  skillTitle: string;
  mode: Mode;
  prompt: string;
  kind: AnswerKind;
  choices?: string[];
  visual?: Visual;
  teacher: { name: string; avatar: string; hue: number; greeting: string; inspiredBy: string };
  formatHelp: string;
}

export class PortalError extends Error {}

/** Thrown when today's screen-time cap is used up. */
export class CapReachedError extends PortalError {}

export function capStatus(kidId: number): { minutes: number; cap: number; reached: boolean } {
  const minutes = minutesOnDay(kidId, today());
  const cap = getFocus(kidId).dailyCapMinutes;
  return { minutes, cap, reached: minutes >= cap };
}

function getPlacementState(kidId: number): PlacementState {
  const row = getDb().prepare("SELECT placement_state FROM kids WHERE id = ?").get(kidId) as {
    placement_state: string | null;
  };
  return row.placement_state ? JSON.parse(row.placement_state) : startPlacement();
}

export function placementStatus(kidId: number) {
  const state = getPlacementState(kidId);
  return { finished: placementFinished(state), ...placementProgress(state) };
}

export function issueQuestion(kidId: number, mode: Mode, skillId?: string): PublicQuestion {
  if (mode === "placement") {
    const next = nextPlacementSkill(getPlacementState(kidId));
    if (!next) throw new PortalError("Placement is already finished.");
    skillId = next;
  }
  const skill = skillId ? getSkill(skillId) : undefined;
  if (!skill) throw new PortalError("Unknown skill.");
  if (capStatus(kidId).reached) {
    throw new CapReachedError("You've hit today's screen-time limit. Great work! Time for a real-world mission.");
  }

  const row = kidSkill(kidId, skill.id);
  if (mode === "learn" && !row && !isAvailable(skill, skillStates(kidId))) {
    throw new PortalError("This skill is still locked. Master the skills before it first.");
  }
  if (mode === "review" && row?.status !== "mastered") {
    throw new PortalError("Only mastered skills can be reviewed.");
  }

  const q = skill.generate(Math.random);
  const id = crypto.randomUUID();
  getDb()
    .prepare("INSERT INTO issued_questions (id, kid_id, skill_id, mode, payload, issued_at) VALUES (?, ?, ?, ?, ?, ?)")
    .run(id, kidId, skill.id, mode, JSON.stringify(q), Date.now());

  return {
    id,
    skillId: skill.id,
    skillTitle: skill.title,
    mode,
    prompt: q.prompt,
    kind: q.kind,
    choices: q.choices,
    visual: q.visual,
    teacher: (({ id, name, avatar, hue, greeting, inspiredBy }) => ({ id, name, avatar, hue, greeting, inspiredBy }))(teacherFor(skill.strand)),
    formatHelp: formatHelp(q.kind),
  };
}

/** A fully worked example for "watch one first". Not saved and not graded. */
export function workedExample(kidId: number, skillId: string) {
  const skill = getSkill(skillId);
  if (!skill) throw new PortalError("Unknown skill.");
  if (!kidSkill(kidId, skill.id) && !isAvailable(skill, skillStates(kidId))) {
    throw new PortalError("This skill is still locked.");
  }
  const q = skill.generate(Math.random);
  return { skillTitle: skill.title, prompt: q.prompt, visual: q.visual, hint: q.hint, answer: q.answer, explanation: q.explanation };
}

interface IssuedRow {
  id: string;
  kid_id: number;
  skill_id: string;
  mode: Mode;
  payload: string;
  issued_at: number;
  hint_used: number;
  answered: number;
}

function issued(kidId: number, questionId: string): IssuedRow & { question: Question } {
  const row = getDb().prepare("SELECT * FROM issued_questions WHERE id = ? AND kid_id = ?").get(questionId, kidId) as
    | IssuedRow
    | undefined;
  if (!row) throw new PortalError("Question not found.");
  return { ...row, question: JSON.parse(row.payload) };
}

/** Marks the hint as used and returns what a tutor needs to write one. */
export function takeHint(kidId: number, questionId: string): { question: Question; skillTitle: string; grade: number } {
  const row = issued(kidId, questionId);
  if (row.answered) throw new PortalError("That question is already answered.");
  getDb().prepare("UPDATE issued_questions SET hint_used = 1 WHERE id = ?").run(questionId);
  const skill = getSkill(row.skill_id)!;
  const kid = getKid(kidId)!;
  return { question: row.question, skillTitle: skill.title, grade: kid.grade };
}

export type AnswerResult =
  | { formatError: string }
  | {
      correct: boolean;
      correctAnswer: string;
      explanation: string;
      xpGained: number;
      mastery?: { correct: number; count: number; mastered: boolean; justMastered: boolean };
      review?: { answered: number; total: number; finished: boolean; passed?: boolean };
      placement?: { finished: boolean; done: number; total: number };
    };

export function submitAnswer(kidId: number, questionId: string, input: string): AnswerResult {
  const db = getDb();
  const row = issued(kidId, questionId);
  if (row.answered) throw new PortalError("That question is already answered.");

  const check = checkAnswer(row.question, input);
  if (!check.ok) return { formatError: check.formatError };

  const day = today();
  const usedHint = !!row.hint_used;
  const responseMs = Math.min(Date.now() - row.issued_at, MAX_COUNTED_MS);

  return db.transaction((): AnswerResult => {
    db.prepare("UPDATE issued_questions SET answered = 1, answered_at = ?, correct = ? WHERE id = ?").run(Date.now(), check.correct ? 1 : 0, questionId);
    const attempt = db
      .prepare(
        "INSERT INTO attempts (kid_id, skill_id, mode, correct, used_hint, response_ms, answer, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .run(kidId, row.skill_id, row.mode, check.correct ? 1 : 0, usedHint ? 1 : 0, responseMs, input.slice(0, 100), day);

    const base = {
      correct: check.correct,
      correctAnswer: row.question.answer,
      explanation: row.question.explanation,
    };
    let xp = check.correct ? (usedHint ? 5 : 10) : 0;

    if (row.mode === "learn") {
      let ks = kidSkill(kidId, row.skill_id);
      if (!ks) {
        db.prepare("INSERT INTO kid_skills (kid_id, skill_id, status) VALUES (?, ?, 'learning')").run(kidId, row.skill_id);
        ks = kidSkill(kidId, row.skill_id)!;
      }
      const progress = masteryProgress(learnAttempts(kidId, row.skill_id, ks.counting_after));
      const justMastered = ks.status === "learning" && progress.mastered;
      if (justMastered) {
        db.prepare(
          "UPDATE kid_skills SET status = 'mastered', source = 'practice', mastered_at = ?, review_stage = 0, next_review = ? WHERE kid_id = ? AND skill_id = ?",
        ).run(day, addDays(day, REVIEW_INTERVALS[0]), kidId, row.skill_id);
        xp += 50;
      }
      addXp(kidId, xp);
      return { ...base, xpGained: xp, mastery: { ...progress, justMastered } };
    }

    if (row.mode === "review") {
      const ks = kidSkill(kidId, row.skill_id)!;
      const answered = ks.review_answered + 1;
      const correct = ks.review_correct + (check.correct ? 1 : 0);
      if (answered < REVIEW_QUESTIONS) {
        db.prepare("UPDATE kid_skills SET review_answered = ?, review_correct = ? WHERE kid_id = ? AND skill_id = ?").run(
          answered,
          correct,
          kidId,
          row.skill_id,
        );
        addXp(kidId, xp);
        return { ...base, xpGained: xp, review: { answered, total: REVIEW_QUESTIONS, finished: false } };
      }
      const outcome = reviewOutcome(ks.review_stage, correct, day);
      if (outcome.passed) {
        db.prepare(
          "UPDATE kid_skills SET review_stage = ?, next_review = ?, review_answered = 0, review_correct = 0 WHERE kid_id = ? AND skill_id = ?",
        ).run(outcome.stage, outcome.nextReview, kidId, row.skill_id);
        xp += 20;
      } else {
        db.prepare(
          "UPDATE kid_skills SET status = 'learning', review_stage = 0, next_review = NULL, review_answered = 0, review_correct = 0, counting_after = ? WHERE kid_id = ? AND skill_id = ?",
        ).run(Number(attempt.lastInsertRowid), kidId, row.skill_id);
      }
      addXp(kidId, xp);
      return {
        ...base,
        xpGained: xp,
        review: { answered, total: REVIEW_QUESTIONS, finished: true, passed: outcome.passed },
      };
    }

    // Placement
    const state = recordPlacementAnswer(getPlacementState(kidId), check.correct);
    const finished = placementFinished(state);
    db.prepare("UPDATE kids SET placement_state = ?, placement_done = ? WHERE id = ?").run(
      JSON.stringify(state),
      finished ? 1 : 0,
      kidId,
    );
    if (finished) applyPlacement(kidId, placedSkills(state), day);
    xp = check.correct ? 5 : 0;
    addXp(kidId, xp);
    return { ...base, xpGained: xp, placement: { finished, ...placementProgress(state) } };
  })();
}

/** XP for learning; coins come with it (1 coin per 5 XP, at least 1) for the game's shop. */
function addXp(kidId: number, xp: number): void {
  if (xp) getDb().prepare("UPDATE kids SET xp = xp + ?, coins = coins + ? WHERE id = ?").run(xp, xp > 0 ? Math.max(1, Math.round(xp / 5)) : 0, kidId);
}

/** Marks placed skills as known. Reviews are spread out so they don't all land on one day. */
function applyPlacement(kidId: number, skills: string[], day: string): void {
  const db = getDb();
  const upsert = db.prepare(`
    INSERT INTO kid_skills (kid_id, skill_id, status, source, mastered_at, review_stage, next_review)
    VALUES (?, ?, 'mastered', 'placement', ?, 1, ?)
    ON CONFLICT (kid_id, skill_id) DO NOTHING`);
  skills.forEach((skillId, i) => upsert.run(kidId, skillId, day, addDays(day, 7 + (i % 21))));
  db.prepare("DELETE FROM daily_plans WHERE kid_id = ? AND day = ?").run(kidId, day);
}

// ---------------- Stats for kids and parents ----------------

export function minutesOnDay(kidId: number, day: string): number {
  const row = getDb()
    .prepare("SELECT COALESCE(SUM(response_ms), 0) AS ms FROM attempts WHERE kid_id = ? AND day = ?")
    .get(kidId, day) as { ms: number };
  return Math.round(row.ms / 60000);
}

export function streak(kidId: number): number {
  const days = new Set(
    (getDb().prepare("SELECT DISTINCT day FROM attempts WHERE kid_id = ? ORDER BY day DESC LIMIT 400").all(kidId) as {
      day: string;
    }[]).map((r) => r.day),
  );
  let d = today();
  if (!days.has(d)) d = addDays(d, -1); // today not started yet doesn't break the streak
  let n = 0;
  while (days.has(d)) {
    n++;
    d = addDays(d, -1);
  }
  return n;
}

export function kidFlags(kidId: number) {
  const db = getDb();
  const todays = (db
    // Placement misses are expected (it probes above their level), so they don't count as rushing.
    .prepare(
      "SELECT skill_id, correct, used_hint, response_ms FROM attempts WHERE kid_id = ? AND day = ? AND mode != 'placement' ORDER BY id",
    )
    .all(kidId, today()) as { skill_id: string; correct: number; used_hint: number; response_ms: number }[]).map((a) => ({
    skillId: a.skill_id,
    correct: !!a.correct,
    usedHint: !!a.used_hint,
    responseMs: a.response_ms,
  }));
  const learning = kidSkillRows(kidId)
    .filter((r) => r.status === "learning")
    .map((r) => {
      const n = (db
        .prepare("SELECT COUNT(*) AS n FROM attempts WHERE kid_id = ? AND skill_id = ? AND mode = 'learn' AND id > ?")
        .get(kidId, r.skill_id, r.counting_after) as { n: number }).n;
      const recent = learnAttempts(kidId, r.skill_id, r.counting_after);
      const acc = recent.length ? recent.filter((a) => a.correct).length / recent.length : 1;
      return { skillId: r.skill_id, attempts: n, recentAccuracy: acc };
    });
  return detectFlags(todays, learning).map((f) => ({
    ...f,
    skillTitle: f.skillId ? getSkill(f.skillId)?.title : undefined,
  }));
}

export function skillTable(kidId: number) {
  const rows = new Map(kidSkillRows(kidId).map((r) => [r.skill_id, r]));
  const states = skillStates(kidId);
  return SKILLS.map((s) => {
    const r = rows.get(s.id);
    const status = r?.status ?? (isAvailable(s, states) ? "ready" : "locked");
    return {
      id: s.id,
      title: s.title,
      grade: s.grade,
      strand: s.strand,
      code: s.code,
      status,
      source: r?.source ?? null,
      masteredAt: r?.mastered_at ?? null,
      nextReview: r?.next_review ?? null,
    };
  });
}

export function recentMastered(kidId: number, sinceDay: string) {
  return (getDb()
    .prepare(
      "SELECT skill_id, mastered_at FROM kid_skills WHERE kid_id = ? AND status = 'mastered' AND source = 'practice' AND mastered_at >= ? ORDER BY mastered_at DESC",
    )
    .all(kidId, sinceDay) as { skill_id: string; mastered_at: string }[]).map((r) => ({
    ...r,
    title: getSkill(r.skill_id)?.title ?? r.skill_id,
  }));
}

export function weekStats(kidId: number) {
  const since = addDays(today(), -6);
  const row = getDb()
    .prepare(
      "SELECT COUNT(*) AS questions, COALESCE(SUM(correct), 0) AS correct, COALESCE(SUM(used_hint), 0) AS hints, COALESCE(SUM(response_ms), 0) AS ms FROM attempts WHERE kid_id = ? AND day >= ?",
    )
    .get(kidId, since) as { questions: number; correct: number; hints: number; ms: number };
  return { since, ...row, minutes: Math.round(row.ms / 60000) };
}

// ---------------- Activity log & compliance ----------------

export function logActivity(kidId: number, input: { day: string; subject: string; minutes: number; note: string }): void {
  getDb()
    .prepare("INSERT INTO activity_log (kid_id, day, subject, minutes, note) VALUES (?, ?, ?, ?, ?)")
    .run(kidId, input.day, input.subject, input.minutes, input.note);
}

export function deleteActivity(kidId: number, id: number): void {
  getDb().prepare("DELETE FROM activity_log WHERE id = ? AND kid_id = ?").run(id, kidId);
}

export function activities(kidId: number, sinceDay: string) {
  return getDb()
    .prepare("SELECT id, day, subject, minutes, note FROM activity_log WHERE kid_id = ? AND day >= ? ORDER BY day DESC, id DESC")
    .all(kidId, sinceDay) as { id: number; day: string; subject: string; minutes: number; note: string }[];
}

/** Portal math time plus everything the parent logged, since the school year started. */
export function complianceRows(kidId: number, sinceDay: string): DayMinutes[] {
  const portal = (getDb()
    .prepare("SELECT day, SUM(response_ms) AS ms FROM attempts WHERE kid_id = ? AND day >= ? GROUP BY day")
    .all(kidId, sinceDay) as { day: string; ms: number }[]).map((r) => ({
    date: r.day,
    subject: "Math",
    minutes: Math.round(r.ms / 60000),
  }));
  const logged = activities(kidId, sinceDay).map((a) => ({ date: a.day, subject: a.subject, minutes: a.minutes }));
  return [...portal, ...logged];
}

export function compliance(kidId: number, familyId: number) {
  const fam = getFamily(familyId);
  const start = schoolYearStart(today(), fam?.school_year_start ?? "08-01");
  return { start, ...summarize(complianceRows(kidId, start)) };
}

// ---------------- Side quests, missions & sprints ----------------

/** Quests turned in during the last 30 days (optionally not counting today). */
function recentQuestIds(kidId: number, includeToday = true): Set<string> {
  const rows = getDb()
    .prepare("SELECT quest_id FROM quest_log WHERE kid_id = ? AND day >= ? AND day <= ?")
    .all(kidId, addDays(today(), -30), includeToday ? today() : addDays(today(), -1)) as { quest_id: string }[];
  return new Set(rows.map((r) => r.quest_id));
}

export function nextSideQuest(kidId: number, kinds: QuestKind[]): Quest {
  return pickQuest(recentQuestIds(kidId), kinds, Math.random, allQuests());
}

/** Missions offered on the kid's home page. Same three all day, new ones tomorrow. */
export function missionBoard(kidId: number, count = 3): Quest[] {
  let state = [...`${kidId}:${today()}`].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rand = () => {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    return state / 2 ** 32;
  };
  // Today's turned-in missions stay on the board so the kid sees their status.
  const exclude = recentQuestIds(kidId, false);
  const picked: Quest[] = [];
  for (let i = 0; i < count; i++) {
    const q = pickQuest(exclude, ["mission"], rand, allQuests());
    if (picked.some((p) => p.id === q.id)) break;
    picked.push(q);
    exclude.add(q.id);
  }
  return picked;
}

export function completeQuest(kidId: number, questId: string, response = ""): { status: string; xpGained: number } {
  const quest = questById(questId);
  if (!quest) throw new PortalError("Unknown quest.");
  const db = getDb();
  const day = today();
  if (db.prepare("SELECT 1 FROM quest_log WHERE kid_id = ? AND quest_id = ? AND day = ?").get(kidId, questId, day)) {
    throw new PortalError("You already turned in that quest today.");
  }
  if (quest.kind === "create" && response.trim().length < 10) {
    throw new PortalError("Write a little more so a parent can see your thinking.");
  }
  const status = quest.kind === "mission" ? "pending" : "done";
  db.prepare("INSERT INTO quest_log (kid_id, quest_id, kind, status, response, day) VALUES (?, ?, ?, ?, ?, ?)").run(
    kidId,
    questId,
    quest.kind,
    status,
    response.trim().slice(0, 1000),
    day,
  );
  // Missions earn their XP when a parent approves them.
  const xp = quest.kind === "mission" ? 0 : quest.xp;
  addXp(kidId, xp);
  return { status, xpGained: xp };
}

type QuestLogBase = {
  id: number;
  kid_id: number;
  quest_id: string;
  kind: QuestKind;
  status: "done" | "pending" | "approved" | "declined";
  response: string;
  day: string;
};

export type QuestLogRow = QuestLogBase & { title: string; xp: number; minutes: number; subject: string };

function withQuest<T extends QuestLogBase>(r: T): T & QuestLogRow {
  const q = questById(r.quest_id);
  return { ...r, title: q?.title ?? r.quest_id, xp: q?.xp ?? 0, minutes: q?.minutes ?? 0, subject: q?.subject ?? "Other" };
}

export function questLog(kidId: number, sinceDay: string): QuestLogRow[] {
  return (getDb()
    .prepare("SELECT id, kid_id, quest_id, kind, status, response, day FROM quest_log WHERE kid_id = ? AND day >= ? ORDER BY id DESC")
    .all(kidId, sinceDay) as QuestLogBase[]).map(withQuest);
}

export function pendingMissions(familyId: number) {
  return (getDb()
    .prepare(
      `SELECT q.id, q.kid_id, q.quest_id, q.kind, q.status, q.response, q.day, k.name AS kidName, k.avatar
       FROM quest_log q JOIN kids k ON k.id = q.kid_id
       WHERE k.family_id = ? AND q.status = 'pending' ORDER BY q.id`,
    )
    .all(familyId) as (QuestLogBase & { kidName: string; avatar: string })[]).map(withQuest);
}

/** Approving a mission awards its XP and logs its minutes under its subject for records. */
export function reviewMission(familyId: number, logId: number, approve: boolean): void {
  const db = getDb();
  const row = db
    .prepare(
      "SELECT q.kid_id, q.quest_id, q.day, q.status FROM quest_log q JOIN kids k ON k.id = q.kid_id WHERE q.id = ? AND k.family_id = ?",
    )
    .get(logId, familyId) as { kid_id: number; quest_id: string; day: string; status: string } | undefined;
  if (!row || row.status !== "pending") throw new PortalError("That mission isn't waiting for review.");
  const quest = questById(row.quest_id);
  db.transaction(() => {
    db.prepare("UPDATE quest_log SET status = ?, reviewed_at = datetime('now') WHERE id = ?").run(
      approve ? "approved" : "declined",
      logId,
    );
    if (approve && quest) {
      addXp(row.kid_id, quest.xp);
      if (quest.minutes && quest.subject) {
        logActivity(row.kid_id, { day: row.day, subject: quest.subject, minutes: quest.minutes, note: `Mission: ${quest.title}` });
      }
    }
  })();
}

export function recordSprint(kidId: number): void {
  getDb().prepare("INSERT INTO sprint_log (kid_id, day) VALUES (?, ?)").run(kidId, today());
}

export function sprintsToday(kidId: number): number {
  return (getDb().prepare("SELECT COUNT(*) AS n FROM sprint_log WHERE kid_id = ? AND day = ?").get(kidId, today()) as { n: number }).n;
}

export function gameStats(kid: Kid): BadgeStats {
  const db = getDb();
  const count = (sql: string) => (db.prepare(sql).get(kid.id) as { n: number }).n;
  const rows = kidSkillRows(kid.id);
  const mastered = new Set(rows.filter((r) => r.status === "mastered").map((r) => r.skill_id));
  const strands = [...new Set(SKILLS.map((s) => s.strand))];
  return {
    mastered: mastered.size,
    streak: streak(kid.id),
    // Each passed review moves a skill up one stage. Placement skills start at stage 1.
    reviewsPassed: rows.reduce((t, r) => t + Math.max(0, r.review_stage - (r.source === "placement" ? 1 : 0)), 0),
    questsDone: count("SELECT COUNT(*) AS n FROM quest_log WHERE kid_id = ? AND status IN ('done', 'approved')"),
    missionsApproved: count("SELECT COUNT(*) AS n FROM quest_log WHERE kid_id = ? AND status = 'approved'"),
    sprintsDone: count("SELECT COUNT(*) AS n FROM sprint_log WHERE kid_id = ?"),
    level: levelInfo(kid.xp).level,
    worldsComplete: strands.filter((st) => SKILLS.filter((s) => s.strand === st).every((s) => mastered.has(s.id))).length,
  };
}

export function kidBadges(kid: Kid) {
  return badges(gameStats(kid));
}

// ---------------- AI teachers ----------------

export interface TutorContext {
  question: Question;
  skillId: string;
  skillTitle: string;
  strand: Strand;
  grade: number;
  answered: boolean;
}

/** Everything a teacher needs to talk about one issued question. */
export function tutorContext(kidId: number, questionId: string): TutorContext {
  const row = issued(kidId, questionId);
  const skill = getSkill(row.skill_id)!;
  return {
    question: row.question,
    skillId: skill.id,
    skillTitle: skill.title,
    strand: skill.strand,
    grade: getKid(kidId)!.grade,
    answered: !!row.answered,
  };
}

/** Getting help before answering means the question won't count toward mastery (same as a hint). */
export function markHelped(kidId: number, questionId: string): void {
  getDb().prepare("UPDATE issued_questions SET hint_used = 1 WHERE id = ? AND kid_id = ? AND answered = 0").run(questionId, kidId);
}

export function tutorMessagesToday(kidId: number): number {
  return (getDb()
    .prepare("SELECT COUNT(*) AS n FROM tutor_messages WHERE kid_id = ? AND day = ? AND role = 'kid'")
    .get(kidId, today()) as { n: number }).n;
}

export function logTutor(
  kidId: number,
  m: { questionId: string | null; skillId: string; teacherId: string; kind: "chat" | "lesson" | "why"; role: "kid" | "teacher"; content: string },
): void {
  getDb()
    .prepare(
      "INSERT INTO tutor_messages (kid_id, question_id, skill_id, teacher_id, kind, role, content, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .run(kidId, m.questionId, m.skillId, m.teacherId, m.kind, m.role, m.content, today());
}

/** The chat about one question so far, oldest first. */
export function tutorChat(kidId: number, questionId: string): { role: "kid" | "teacher"; content: string }[] {
  return getDb()
    .prepare("SELECT role, content FROM tutor_messages WHERE kid_id = ? AND question_id = ? AND kind = 'chat' ORDER BY id")
    .all(kidId, questionId) as { role: "kid" | "teacher"; content: string }[];
}

/** Recent teacher conversations for the parent, newest first. */
export function recentTutorMessages(kidId: number, sinceDay: string, limit = 200) {
  return (getDb()
    .prepare(
      "SELECT id, question_id, skill_id, teacher_id, kind, role, content, day, created_at FROM tutor_messages WHERE kid_id = ? AND day >= ? ORDER BY id DESC LIMIT ?",
    )
    .all(kidId, sinceDay, limit) as {
    id: number;
    question_id: string | null;
    skill_id: string;
    teacher_id: string;
    kind: string;
    role: "kid" | "teacher";
    content: string;
    day: string;
    created_at: string;
  }[]).map((r) => ({ ...r, skillTitle: getSkill(r.skill_id)?.title ?? r.skill_id }));
}

// ---------------- The 2-hour day (Phase 2b) ----------------

export interface BlockStatus {
  block: Block;
  minutes: number;
  pct: number;
  state: "open" | "pending" | "approved" | "declined" | "done";
  idea: string;
}

/** Today's blocks with progress. Portal math minutes fill the math block, then the booster. */
export function dayBlocks(kidId: number): BlockStatus[] {
  const day = today();
  let math = minutesOnDay(kidId, day) + drillMinutesOnDay(kidId, day);
  const logs = new Map(
    (getDb().prepare("SELECT block_id, minutes, status FROM block_log WHERE kid_id = ? AND day = ?").all(kidId, day) as {
      block_id: string;
      minutes: number;
      status: BlockStatus["state"];
    }[]).map((r) => [r.block_id, r]),
  );
  return scheduleBlocks().map((block) => {
    let minutes = 0;
    let state: BlockStatus["state"] = "open";
    if (block.kind === "portal") {
      minutes = Math.min(block.minutes, math);
      math -= minutes;
      if (minutes >= block.minutes) state = "done";
    } else {
      const log = logs.get(block.id);
      if (log) {
        minutes = log.status === "declined" ? 0 : log.minutes;
        state = log.status;
      }
      // Lessons finished today in this block's courses count too.
      const fromCourses = courseMinutesToday(kidId, block.courses ?? []);
      if (fromCourses) {
        minutes = Math.min(block.minutes * 2, minutes + fromCourses);
        if (state === "open" && minutes >= block.minutes) state = "done";
      }
    }
    return { block, minutes, pct: Math.min(100, Math.round((minutes / block.minutes) * 100)), state, idea: ideaFor(block, day) };
  });
}

/** The kid finished a guided block. It waits for a parent to approve. */
export function finishBlock(kidId: number, blockId: string, minutes: number, note: string): void {
  const block = blockById(blockId);
  if (!block || block.kind !== "guided") throw new PortalError("Unknown block.");
  const m = Math.max(1, Math.min(block.minutes * 2, Math.round(minutes)));
  const res = getDb()
    .prepare("INSERT INTO block_log (kid_id, block_id, day, minutes, note, status) VALUES (?, ?, ?, ?, ?, 'pending') ON CONFLICT DO NOTHING")
    .run(kidId, block.id, today(), m, note.trim().slice(0, 500));
  if (!res.changes) throw new PortalError("You already turned in that block today.");
}

export function pendingBlocks(familyId: number) {
  return (getDb()
    .prepare(
      `SELECT b.id, b.kid_id, b.block_id, b.day, b.minutes, b.note, k.name AS kidName, k.avatar
       FROM block_log b JOIN kids k ON k.id = b.kid_id WHERE k.family_id = ? AND b.status = 'pending' ORDER BY b.id`,
    )
    .all(familyId) as { id: number; kid_id: number; block_id: string; day: string; minutes: number; note: string; kidName: string; avatar: string }[]).map(
    (r) => ({ ...r, block: blockById(r.block_id) }),
  );
}

/** Approving a block logs its minutes under the block's subject for records. */
export function reviewBlock(familyId: number, logId: number, approve: boolean): void {
  const db = getDb();
  const row = db
    .prepare("SELECT b.kid_id, b.block_id, b.day, b.minutes, b.note, b.status FROM block_log b JOIN kids k ON k.id = b.kid_id WHERE b.id = ? AND k.family_id = ?")
    .get(logId, familyId) as { kid_id: number; block_id: string; day: string; minutes: number; note: string; status: string } | undefined;
  if (!row || row.status !== "pending") throw new PortalError("That block isn't waiting for review.");
  const block = blockById(row.block_id);
  db.transaction(() => {
    db.prepare("UPDATE block_log SET status = ? WHERE id = ?").run(approve ? "approved" : "declined", logId);
    if (approve && block) {
      logActivity(row.kid_id, {
        day: row.day,
        subject: block.subject,
        minutes: row.minutes,
        note: `${block.label} block${row.note ? `: ${row.note}` : ""}`.slice(0, 300),
      });
      addXp(row.kid_id, 25);
    }
  })();
}

// ---------------- Goals ----------------

export function getGoal(kidId: number): { grade: number; target_day: string } | undefined {
  return getDb().prepare("SELECT grade, target_day FROM goals WHERE kid_id = ?").get(kidId) as never;
}

export function setGoal(kidId: number, grade: number, targetDay: string): void {
  getDb()
    .prepare(
      "INSERT INTO goals (kid_id, grade, target_day) VALUES (?, ?, ?) ON CONFLICT (kid_id) DO UPDATE SET grade = excluded.grade, target_day = excluded.target_day",
    )
    .run(kidId, grade, targetDay);
}

// ---------------- Fact drills ----------------

export const DRILL_OPS = ["+", "−", "×", "÷"] as const;

export function saveDrill(kidId: number, op: string, correct: number, wrong: number, seconds: number): void {
  if (!(DRILL_OPS as readonly string[]).includes(op)) throw new PortalError("Unknown drill.");
  getDb()
    .prepare("INSERT INTO drill_results (kid_id, day, op, correct, wrong, seconds) VALUES (?, ?, ?, ?, ?, ?)")
    .run(kidId, today(), op, Math.max(0, Math.min(200, correct)), Math.max(0, Math.min(200, wrong)), Math.max(1, Math.min(300, seconds)));
}

function drillMinutesOnDay(kidId: number, day: string): number {
  const row = getDb().prepare("SELECT COALESCE(SUM(seconds), 0) AS s FROM drill_results WHERE kid_id = ? AND day = ?").get(kidId, day) as {
    s: number;
  };
  return Math.round(row.s / 60);
}

/** Best recent speed (facts per minute) for each operation. */
export function drillStats(kidId: number) {
  const rows = getDb()
    .prepare("SELECT op, correct, seconds, day FROM drill_results WHERE kid_id = ? AND day >= ? ORDER BY id DESC")
    .all(kidId, addDays(today(), -30)) as { op: string; correct: number; seconds: number; day: string }[];
  return DRILL_OPS.map((op) => {
    const mine = rows.filter((r) => r.op === op);
    const best = Math.max(0, ...mine.map((r) => factsPerMinute(r.correct, r.seconds)));
    return {
      op,
      best,
      runs: mine.length,
      last: mine[0] ? factsPerMinute(mine[0].correct, mine[0].seconds) : null,
      fluent: best >= drillSettings().fluentPerMinute,
    };
  });
}

// ---------------- Test scores ----------------

export function addTestScore(
  kidId: number,
  s: { testDay: string; test: string; subject: string; score: number; achievementPct: number | null; growthPct: number | null },
): void {
  getDb()
    .prepare("INSERT INTO test_scores (kid_id, test_day, test, subject, score, achievement_pct, growth_pct) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(kidId, s.testDay, s.test, s.subject, s.score, s.achievementPct, s.growthPct);
}

export function deleteTestScore(kidId: number, id: number): void {
  getDb().prepare("DELETE FROM test_scores WHERE id = ? AND kid_id = ?").run(id, kidId);
}

export function testScores(kidId: number) {
  return getDb()
    .prepare("SELECT id, test_day, test, subject, score, achievement_pct, growth_pct FROM test_scores WHERE kid_id = ? ORDER BY test_day, id")
    .all(kidId) as {
    id: number;
    test_day: string;
    test: string;
    subject: string;
    score: number;
    achievement_pct: number | null;
    growth_pct: number | null;
  }[];
}

// ---------------- Learning plan ----------------

const PACE_WEEKS = 4;

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 864e5);
}

/** Everything on the parent's learning plan, computed from practice data. */
export function learningPlan(kid: Kid) {
  const db = getDb();
  const rows = gradeProgress(skillStates(kid.id));
  const since = addDays(today(), -PACE_WEEKS * 7);
  const masteredRecently = (db
    .prepare("SELECT COUNT(*) AS n FROM kid_skills WHERE kid_id = ? AND status = 'mastered' AND source = 'practice' AND mastered_at >= ?")
    .get(kid.id, since) as { n: number }).n;
  const minutesRecently = Math.round(
    (db.prepare("SELECT COALESCE(SUM(response_ms), 0) AS ms FROM attempts WHERE kid_id = ? AND day >= ?").get(kid.id, since) as { ms: number }).ms /
      60000,
  );
  // Observe at least a week, so a first busy day doesn't look like a huge pace.
  const firstDay = (db.prepare("SELECT MIN(day) AS d FROM attempts WHERE kid_id = ?").get(kid.id) as { d: string | null }).d;
  const daysActive = firstDay ? Math.max(7, Math.min(PACE_WEEKS * 7, daysBetween(firstDay, today()) + 1)) : PACE_WEEKS * 7;
  const weeksObserved = daysActive / 7;

  const grades = rows.map((r) => ({
    ...r,
    pct: Math.round((r.mastered / r.total) * 100),
    forecast: forecast(r, masteredRecently, minutesRecently, weeksObserved),
  }));

  const week = weekStats(kid.id);
  const recent = db
    .prepare("SELECT issued_at, answered_at, correct FROM issued_questions WHERE kid_id = ? AND mode != 'placement' AND issued_at >= ? ORDER BY issued_at")
    .all(kid.id, Date.now() - 7 * 864e5) as { issued_at: number; answered_at: number | null; correct: number | null }[];
  const waste = wasteMeter(
    recent
      .map((q, i) => ({ q, next: recent[i + 1] }))
      .filter(({ q }) => q.answered_at !== null)
      .map(({ q, next }) => {
        const gap = next ? next.issued_at - q.answered_at! : null;
        return { correct: !!q.correct, responseMs: q.answered_at! - q.issued_at, reviewMs: gap !== null && gap < 10 * 60_000 ? gap : null };
      }),
  );

  return {
    ageGrade: kid.grade,
    knowledgeGrade: Math.min(knowledgeGrade(rows), 9),
    grades,
    masteredRecently,
    minutesRecently,
    weeksObserved: Math.round(weeksObserved * 10) / 10,
    accuracy: { correct: week.correct, total: week.questions, band: accuracyBand(week.correct, week.questions) },
    waste,
  };
}

/** Progress toward the kid's goal: skills left and the pace needed to hit the date. */
export function goalProgress(kid: Kid) {
  const goal = getGoal(kid.id);
  if (!goal) return null;
  const row = gradeProgress(skillStates(kid.id)).find((r) => r.grade === goal.grade);
  if (!row) return null;
  const remaining = Math.max(0, Math.ceil(row.total * GRADE_DONE) - row.mastered);
  const days = Math.max(0, daysBetween(today(), goal.target_day));
  const schoolDays = Math.max(1, Math.round((days * 5) / 7));
  return {
    ...goal,
    mastered: row.mastered,
    total: row.total,
    remaining,
    days,
    perSchoolDay: Math.round((remaining / schoolDays) * 10) / 10,
    perWeek: Math.round((remaining / Math.max(1, days / 7)) * 10) / 10,
    done: remaining === 0,
  };
}

// ---------------- Struggle detector ----------------

/** Mastered prerequisites of a skill: where to go "back to basics" when stuck. */
export function masteredPrereqs(kidId: number, skillId: string): { id: string; title: string }[] {
  const states = skillStates(kidId);
  return (getSkill(skillId)?.prereqs ?? [])
    .filter((p) => states.get(p)?.status === "mastered")
    .map((p) => ({ id: p, title: getSkill(p)!.title }));
}

/** Skills the kid is stuck on right now (see isStruggling). */
export function strugglingSkills(kidId: number): string[] {
  return kidSkillRows(kidId)
    .filter((r) => r.status === "learning")
    .filter((r) => {
      const n = (getDb()
        .prepare("SELECT COUNT(*) AS n FROM attempts WHERE kid_id = ? AND skill_id = ? AND mode = 'learn' AND id > ?")
        .get(kidId, r.skill_id, r.counting_after) as { n: number }).n;
      return isStruggling(learnAttempts(kidId, r.skill_id, r.counting_after), n);
    })
    .map((r) => r.skill_id);
}

// ---------------- Courses (Phase 3) ----------------

/** Share of check questions needed to pass a lesson's check. */
export const CHECK_PASS = 0.8;

interface LessonRow {
  id: number;
  kid_id: number;
  course_id: string;
  lesson_id: string;
  check_best: number;
  check_total: number;
  check_passed: number;
  task_status: "none" | "done" | "pending" | "approved" | "declined";
  task_response: string;
  task_feedback: string;
  completed_day: string | null;
  minutes: number;
}

function lessonRow(kidId: number, courseId: string, lessonId: string): LessonRow | undefined {
  return getDb()
    .prepare("SELECT * FROM lesson_progress WHERE kid_id = ? AND course_id = ? AND lesson_id = ?")
    .get(kidId, courseId, lessonId) as LessonRow | undefined;
}

function ensureLessonRow(kidId: number, courseId: string, lessonId: string): LessonRow {
  getDb().prepare("INSERT INTO lesson_progress (kid_id, course_id, lesson_id) VALUES (?, ?, ?) ON CONFLICT DO NOTHING").run(kidId, courseId, lessonId);
  return lessonRow(kidId, courseId, lessonId)!;
}

export type LessonStatus = "locked" | "open" | "started" | "waiting" | "done";

function statusOf(row: LessonRow | undefined, unlocked: boolean): LessonStatus {
  if (row?.completed_day) return "done";
  if (!unlocked) return "locked";
  if (row?.task_status === "pending") return "waiting";
  if (row && (row.check_best > 0 || row.task_status !== "none")) return "started";
  return "open";
}

/** Every course with each lesson's status. Lessons unlock in order. */
export function courseOverview(kidId: number) {
  const rows = getDb().prepare("SELECT * FROM lesson_progress WHERE kid_id = ?").all(kidId) as LessonRow[];
  const byKey = new Map(rows.map((r) => [`${r.course_id}:${r.lesson_id}`, r]));
  return allCourses().map((course) => {
    let prevDone = true;
    const lessons = course.lessons.map((lesson) => {
      const row = byKey.get(`${course.id}:${lesson.id}`);
      const status = statusOf(row, prevDone);
      prevDone = status === "done";
      return { lesson, status };
    });
    return { course, lessons, done: lessons.filter((l) => l.status === "done").length };
  });
}

/** Everything the lesson page needs, or null if the course or lesson doesn't exist. */
export function lessonView(kidId: number, courseId: string, lessonId: string) {
  const overview = courseOverview(kidId).find((c) => c.course.id === courseId);
  if (!overview) return null;
  const i = overview.lessons.findIndex((l) => l.lesson.id === lessonId);
  if (i < 0) return null;
  const row = lessonRow(kidId, courseId, lessonId);
  return {
    course: overview.course,
    lesson: overview.lessons[i].lesson,
    status: overview.lessons[i].status,
    index: i,
    next: overview.lessons[i + 1]?.lesson ?? null,
    checkPassed: !!row?.check_passed,
    checkBest: row?.check_best ?? 0,
    taskStatus: row?.task_status ?? "none",
    taskResponse: row?.task_response ?? "",
    taskFeedback: row?.task_feedback ?? "",
  };
}

function openLesson(kidId: number, courseId: string, lessonId: string) {
  const v = lessonView(kidId, courseId, lessonId);
  if (!v) throw new PortalError("Lesson not found.");
  if (v.status === "locked") throw new PortalError("Finish the lesson before this one first.");
  return v;
}

/** Finishes a lesson once its check is passed and its task is done or approved. Logs minutes and XP. */
function maybeCompleteLesson(kidId: number, courseId: string, lessonId: string): boolean {
  const course = courseById(courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);
  const row = lessonRow(kidId, courseId, lessonId);
  if (!course || !lesson || !row || row.completed_day) return false;
  const checkOk = lesson.check.length === 0 || !!row.check_passed;
  if (lesson.teach?.length) {
    const support = (getDb().prepare("SELECT support FROM lesson_progress WHERE id = ?").get(row.id) as { support: string | null }).support;
    if (!interactiveDone(lesson, parseState(support, lesson.teach.length))) return false;
  }
  const taskOk = !lesson.task || row.task_status === "done" || row.task_status === "approved";
  if (!checkOk || !taskOk) return false;
  const day = today();
  const db = getDb();
  db.transaction(() => {
    db.prepare("UPDATE lesson_progress SET completed_day = ?, minutes = ?, updated_at = datetime('now') WHERE id = ?").run(day, lesson.minutes, row.id);
    logActivity(kidId, { day, subject: lesson.subject ?? course.subject, minutes: lesson.minutes, note: `Lesson: ${course.title} · ${lesson.title}`.slice(0, 300) });
    addXp(kidId, 50);
  })();
  return true;
}

/** Grades a lesson check. `answers` holds the chosen index for each question. */
export function submitCheck(kidId: number, courseId: string, lessonId: string, answers: number[]) {
  const { lesson } = openLesson(kidId, courseId, lessonId);
  const results = lesson.check.map((q, i) => ({ correct: answers[i] === q.answer, answer: q.answer, why: q.why }));
  const score = results.filter((r) => r.correct).length;
  const total = lesson.check.length;
  const passed = total === 0 || score / total >= CHECK_PASS;
  const row = ensureLessonRow(kidId, courseId, lessonId);
  getDb()
    .prepare("UPDATE lesson_progress SET check_best = MAX(check_best, ?), check_total = ?, check_passed = MAX(check_passed, ?), updated_at = datetime('now') WHERE id = ?")
    .run(score, total, passed ? 1 : 0, row.id);
  addXp(kidId, score * 5);
  const completed = maybeCompleteLesson(kidId, courseId, lessonId);
  return { score, total, passed, results, completed, xpGained: score * 5 + (completed ? 50 : 0) };
}

/**
 * Turns in a lesson task. Written work counts right away (and gets feedback);
 * projects, labs and speeches wait for a parent.
 */
export function submitTask(kidId: number, courseId: string, lessonId: string, response: string) {
  const { lesson } = openLesson(kidId, courseId, lessonId);
  if (!lesson.task) throw new PortalError("This lesson has no task.");
  const text = response.trim().slice(0, 6000);
  if (text.length < 20) throw new PortalError("Write a bit more so your work can be checked.");
  const row = ensureLessonRow(kidId, courseId, lessonId);
  if (row.task_status === "pending") throw new PortalError("This is already waiting for a parent to check.");
  const status = lesson.task.kind === "write" ? "done" : "pending";
  getDb()
    .prepare("UPDATE lesson_progress SET task_status = ?, task_response = ?, task_feedback = '', updated_at = datetime('now') WHERE id = ?")
    .run(status, text, row.id);
  const completed = maybeCompleteLesson(kidId, courseId, lessonId);
  return { status, completed, lesson };
}

export function saveTaskFeedback(kidId: number, courseId: string, lessonId: string, feedback: string): void {
  getDb()
    .prepare("UPDATE lesson_progress SET task_feedback = ? WHERE kid_id = ? AND course_id = ? AND lesson_id = ?")
    .run(feedback.slice(0, 6000), kidId, courseId, lessonId);
}

/** Projects, labs and speeches waiting for a parent. */
export function pendingCourseTasks(familyId: number) {
  return (getDb()
    .prepare(
      `SELECT p.id, p.kid_id, p.course_id, p.lesson_id, p.task_response, k.name AS kidName, k.avatar
       FROM lesson_progress p JOIN kids k ON k.id = p.kid_id
       WHERE k.family_id = ? AND p.task_status = 'pending' ORDER BY p.updated_at`,
    )
    .all(familyId) as { id: number; kid_id: number; course_id: string; lesson_id: string; task_response: string; kidName: string; avatar: string }[]).map((r) => {
    const course = courseById(r.course_id);
    const lesson = course?.lessons.find((l) => l.id === r.lesson_id);
    return { ...r, course, lesson };
  });
}

export function reviewCourseTask(familyId: number, progressId: number, approve: boolean): void {
  const row = getDb()
    .prepare("SELECT p.* FROM lesson_progress p JOIN kids k ON k.id = p.kid_id WHERE p.id = ? AND k.family_id = ?")
    .get(progressId, familyId) as LessonRow | undefined;
  if (!row || row.task_status !== "pending") throw new PortalError("That task isn't waiting for review.");
  getDb().prepare("UPDATE lesson_progress SET task_status = ?, updated_at = datetime('now') WHERE id = ?").run(approve ? "approved" : "declined", row.id);
  if (approve) maybeCompleteLesson(row.kid_id, row.course_id, row.lesson_id);
}

/** Minutes of lessons finished today in the given courses (fills 2-hour-day rings). */
export function courseMinutesToday(kidId: number, courseIds: string[]): number {
  if (!courseIds.length) return 0;
  const rows = getDb()
    .prepare("SELECT course_id, minutes FROM lesson_progress WHERE kid_id = ? AND completed_day = ?")
    .all(kidId, today()) as { course_id: string; minutes: number }[];
  return rows.filter((r) => courseIds.includes(r.course_id)).reduce((t, r) => t + r.minutes, 0);
}

/** Recent course work for the parent: written answers, feedback and status. */
export function recentCourseWork(kidId: number, limit = 30) {
  return (getDb()
    .prepare("SELECT * FROM lesson_progress WHERE kid_id = ? AND task_status != 'none' ORDER BY updated_at DESC LIMIT ?")
    .all(kidId, limit) as LessonRow[]).map((r) => {
    const course = courseById(r.course_id);
    return { ...r, course, lesson: course?.lessons.find((l) => l.id === r.lesson_id) };
  });
}

// ---------------- Teaching model: coaching and struggle tracking ----------------

function teachContext(kidId: number, courseId: string, lessonId: string) {
  const v = lessonView(kidId, courseId, lessonId);
  if (!v) throw new PortalError("Lesson not found.");
  if (v.status === "locked") throw new PortalError("Finish the lesson before this one first.");
  const row = ensureLessonRow(kidId, courseId, lessonId);
  const raw = (getDb().prepare("SELECT support FROM lesson_progress WHERE id = ?").get(row.id) as { support: string | null }).support;
  return { ...v, rowId: row.id, state: parseState(raw, v.lesson.teach?.length ?? 0) };
}

function saveTeachState(rowId: number, state: TeachState): void {
  getDb().prepare("UPDATE lesson_progress SET support = ?, updated_at = datetime('now') WHERE id = ?").run(JSON.stringify(state), rowId);
}

/** Where a kid is in a lesson's teaching (for resuming). */
export function teachProgress(kidId: number, courseId: string, lessonId: string): TeachState {
  return teachContext(kidId, courseId, lessonId).state;
}

/**
 * A quick-think answer. Right: the segment is done. Wrong: climb the coaching
 * ladder (see lib/teaching.ts) and return the next kind of help.
 */
export function answerThink(kidId: number, courseId: string, lessonId: string, segIndex: number, choice: number) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const seg = ctx.lesson.teach?.[segIndex];
  if (!seg) throw new PortalError("Unknown part of the lesson.");
  const st = ctx.state.segments[segIndex];
  if (choice === seg.think.answer) {
    const first = !st.done;
    if (!st.done) st.done = "passed";
    saveTeachState(ctx.rowId, ctx.state);
    if (first) logThinkResolved(kidId, courseId, lessonId, segIndex, st, true);
    addXp(kidId, st.misses === 0 ? 10 : 5);
    return { correct: true, why: seg.think.why, state: st, coaching: null, needsAi: false };
  }
  st.misses++;
  st.rung = Math.max(st.rung, Math.min(LADDER.reveal, st.misses));
  if (st.rung >= LADDER.reveal && !st.done) {
    st.done = "supported";
    logThinkResolved(kidId, courseId, lessonId, segIndex, st, false);
  }
  saveTeachState(ctx.rowId, ctx.state);
  return {
    correct: false,
    why: null,
    state: st,
    coaching: coachingFor(seg, st, choice),
    // The AI coach steps in at the example rung with an explanation built around this kid's mistakes.
    needsAi: st.rung === LADDER.example,
    seg,
    lesson: ctx.lesson,
    course: ctx.course,
  };
}

/** The smaller first-step question shown when a kid is stuck. */
export function answerSimpler(kidId: number, courseId: string, lessonId: string, segIndex: number, choice: number) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const seg = ctx.lesson.teach?.[segIndex];
  if (!seg) throw new PortalError("Unknown part of the lesson.");
  const q = seg.approaches.simpler;
  const correct = choice === q.answer;
  if (correct) {
    ctx.state.segments[segIndex].simplerDone = true;
    saveTeachState(ctx.rowId, ctx.state);
  }
  return { correct, feedback: correct ? q.why : q.hints[choice] || "Not quite. Try another one." };
}

/** "I'm lost": climb one rung of help without counting a miss. */
export function imLost(kidId: number, courseId: string, lessonId: string, segIndex: number) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const seg = ctx.lesson.teach?.[segIndex];
  if (!seg) throw new PortalError("Unknown part of the lesson.");
  const st = ctx.state.segments[segIndex];
  st.lost++;
  st.rung = Math.min(LADDER.example, Math.max(st.rung + 1, LADDER.analogy));
  saveTeachState(ctx.rowId, ctx.state);
  const c = coachingFor(seg, st, seg.think.answer);
  return { state: st, coaching: { ...c, hint: "" }, needsAi: st.rung === LADDER.example, seg, lesson: ctx.lesson, course: ctx.course };
}

export function noteAiRescue(kidId: number, courseId: string, lessonId: string, segIndex: number): void {
  const ctx = teachContext(kidId, courseId, lessonId);
  if (!ctx.state.segments[segIndex]) return;
  ctx.state.segments[segIndex].aiRescues++;
  saveTeachState(ctx.rowId, ctx.state);
}

/** Checks the hands-on activity. */
export function answerActivity(kidId: number, courseId: string, lessonId: string, answer: number[]) {
  const ctx = teachContext(kidId, courseId, lessonId);
  if (!ctx.lesson.activity) throw new PortalError("This lesson has no activity.");
  const result = checkActivity(ctx.lesson.activity, answer);
  ctx.state.activity.tries++;
  // After 3 tries, show the solution and let them continue: practice, not a wall.
  const showSolution = !result.correct && ctx.state.activity.tries >= 3;
  if (result.correct || showSolution) ctx.state.activity.done = true;
  saveTeachState(ctx.rowId, ctx.state);
  if (result.correct) addXp(kidId, 15);
  const w = ctx.lesson.activity;
  const solution = !showSolution
    ? null
    : w.type === "sort"
      ? w.items.map((it) => it.bucket)
      : w.type === "sequence"
        ? w.steps.map((_, i) => i)
        : w.type === "highlight"
          ? w.correct
          : null;
  return { ...result, tries: ctx.state.activity.tries, done: ctx.state.activity.done, solution };
}

/** Records an "explain it back" attempt. Done when understood, or after three honest tries. */
export function recordExplain(kidId: number, courseId: string, lessonId: string, understood: boolean, feedback: string) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const e = ctx.state.explain;
  e.tries++;
  e.understood = e.understood || understood;
  e.feedback = feedback.slice(0, 2000);
  if (understood || e.tries >= 3) e.done = true;
  saveTeachState(ctx.rowId, ctx.state);
  if (understood) addXp(kidId, 20);
  maybeCompleteLesson(kidId, courseId, lessonId);
  return { ...e };
}

export function explainContext(kidId: number, courseId: string, lessonId: string) {
  const ctx = teachContext(kidId, courseId, lessonId);
  if (!ctx.lesson.explain) throw new PortalError("This lesson has no explain-it-back step.");
  return ctx;
}

/** Context for a question a kid asks their teacher during one part of a lesson. */
export function askContext(kidId: number, courseId: string, lessonId: string, seg: number) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const segment = Number.isInteger(seg) && seg >= 0 ? ctx.lesson.teach?.[seg] : undefined;
  return { ...ctx, segment };
}

/**
 * What a kid has said to their teachers in this course before (questions they
 * asked, explanations they gave), newest first. Teachers use it to connect
 * ideas across lessons.
 */
export function kidVoiceMemory(kidId: number, courseId: string, limit = 8): string[] {
  return (getDb()
    .prepare("SELECT content FROM tutor_messages WHERE kid_id = ? AND teacher_id = ? AND role = 'kid' ORDER BY id DESC LIMIT ?")
    .all(kidId, `course:${courseId}`, limit) as { content: string }[]).map((r) => r.content.slice(0, 240));
}

/** Lessons where a kid needed extra help, for the parent's page. */
export function supportReport(kidId: number) {
  const rows = getDb()
    .prepare("SELECT course_id, lesson_id, support, completed_day FROM lesson_progress WHERE kid_id = ? AND support IS NOT NULL ORDER BY updated_at DESC")
    .all(kidId) as { course_id: string; lesson_id: string; support: string; completed_day: string | null }[];
  return rows
    .map((r) => {
      const course = courseById(r.course_id);
      const lesson = course?.lessons.find((l) => l.id === r.lesson_id);
      if (!course || !lesson) return null;
      const state = parseState(r.support, lesson.teach?.length ?? 0);
      return {
        course,
        lesson,
        completed: r.completed_day,
        segments: supportSummary(lesson, state),
        explain: state.explain,
        activityTries: state.activity.tries,
      };
    })
    .filter((x): x is NonNullable<typeof x> => !!x && (x.segments.length > 0 || x.explain.tries > 1 || !x.explain.understood && x.explain.done));
}

/** Checks an activity used as a teaching visual (practice only; it doesn't affect progress). */
export function checkSegmentVisual(kidId: number, courseId: string, lessonId: string, segIndex: number, answer: number[]) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const w = ctx.lesson.teach?.[segIndex]?.visual;
  if (!w) throw new PortalError("Nothing to check here.");
  return checkActivity(w, answer);
}

// ---------------- Learning events, probes and the learner model (Phase 3c) ----------------

const MAX_MS = 10 * 60_000;
const clampMs = (ms: unknown) => Math.max(0, Math.min(MAX_MS, Math.round(Number(ms) || 0)));

/** One row per answered item: what the learner model learns from. */
export function logLearningEvent(
  kidId: number,
  e: { subject: string; concept: string; firstTry: boolean; score: number; ms: number; expectedMs: number; helped: boolean; source: string },
): void {
  getDb()
    .prepare(
      "INSERT INTO learning_events (kid_id, subject, concept, first_try, score, ms, expected_ms, helped, source, day, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .run(kidId, e.subject, e.concept, e.firstTry ? 1 : 0, e.score, clampMs(e.ms), Math.round(e.expectedMs), e.helped ? 1 : 0, e.source, today(), Date.now());
}

function courseEvents(kidId: number, subject: string): LearningEvent[] {
  return (getDb()
    .prepare("SELECT concept, first_try, score, ms, expected_ms, helped, at FROM learning_events WHERE kid_id = ? AND subject = ? ORDER BY at DESC LIMIT 400")
    .all(kidId, subject) as { concept: string; first_try: number; score: number; ms: number; expected_ms: number; helped: number; at: number }[]).map(
    (r) => ({ concept: r.concept, firstTry: !!r.first_try, score: r.score, ms: r.ms, expectedMs: r.expected_ms, helped: !!r.helped, at: r.at }),
  );
}

/** Math practice already records every answer; it feeds the same model. */
function mathEvents(kidId: number): LearningEvent[] {
  return (getDb()
    .prepare("SELECT skill_id, correct, used_hint, response_ms, created_at FROM attempts WHERE kid_id = ? AND mode != 'placement' ORDER BY id DESC LIMIT 400")
    .all(kidId) as { skill_id: string; correct: number; used_hint: number; response_ms: number; created_at: string }[]).map((r) => ({
    concept: r.skill_id,
    firstTry: !!r.correct && !r.used_hint,
    score: r.correct ? 1 : 0,
    ms: r.response_ms,
    expectedMs: 45_000,
    helped: !!r.used_hint,
    at: Date.parse(`${r.created_at.replace(" ", "T")}Z`) || 0,
  }));
}

/** For each part a kid needed help on and then got, which rung of help was showing. */
function rescuesFor(kidId: number, courseId: string) {
  const rows = getDb().prepare("SELECT lesson_id, support FROM lesson_progress WHERE kid_id = ? AND course_id = ? AND support IS NOT NULL").all(kidId, courseId) as {
    lesson_id: string;
    support: string;
  }[];
  const out: { rungAtSuccess: number }[] = [];
  for (const r of rows) {
    const st = parseState(r.support, 12);
    for (const s of st.segments) if (s.done === "passed" && s.misses > 0) out.push({ rungAtSuccess: s.rung });
  }
  return out;
}

function conceptTitle(concept: string, courseId: string): string {
  if (courseId === "math") return getSkill(concept)?.title ?? concept;
  const [lessonId, part] = concept.split("#");
  const lesson = courseById(courseId)?.lessons.find((l) => l.id === lessonId);
  if (!lesson) return concept;
  if (part?.startsWith("m")) return `${lesson.title} (show what you know)`;
  const seg = lesson.teach?.[Number(part)];
  return seg ? `${lesson.title}: ${seg.title}` : lesson.title;
}

export interface SubjectProfile {
  key: string;
  title: string;
  icon: string;
  profile: Profile;
  helps: ReturnType<typeof whatHelps>;
  adaptation: Adaptation;
  weakest: { concept: string; title: string; p: number }[];
}

export function subjectProfile(kidId: number, key: string): SubjectProfile {
  const course = key === "math" ? null : courseById(key);
  const events = key === "math" ? mathEvents(kidId) : courseEvents(kidId, key);
  const profile = buildProfile(events);
  const helps = whatHelps(key === "math" ? [] : rescuesFor(kidId, key));
  return {
    key,
    title: course?.title ?? "Math",
    icon: course?.icon ?? "⚔️",
    profile,
    helps,
    adaptation: adapt(profile, helps),
    weakest: profile.weakest.map((w) => ({ ...w, title: conceptTitle(w.concept, key) })),
  };
}

/** Profiles for math and every course the kid has started. */
export function learnerProfiles(kidId: number): SubjectProfile[] {
  const started = (getDb().prepare("SELECT DISTINCT subject FROM learning_events WHERE kid_id = ?").all(kidId) as { subject: string }[]).map((r) => r.subject);
  const keys = ["math", ...allCourses().map((c) => c.id).filter((id) => started.includes(id))];
  return keys.map((k) => subjectProfile(kidId, k));
}

/** How the coach adapts a course for this kid right now. */
export function adaptationFor(kidId: number, courseId: string): Adaptation {
  return subjectProfile(kidId, courseId).adaptation;
}

function probeContext(kidId: number, courseId: string, lessonId: string, segIndex: number) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const seg = ctx.lesson.teach?.[segIndex];
  if (!seg?.probe) throw new PortalError("Unknown part of the lesson.");
  return { ctx, seg, probe: seg.probe, st: ctx.state.segments[segIndex] };
}

/**
 * An interactive answer for a lesson part. Same coaching ladder as the
 * multiple-choice version, with coaching matched to the specific mistake.
 */
export function answerProbe(kidId: number, courseId: string, lessonId: string, segIndex: number, answer: unknown, ms: number) {
  const { ctx, seg, probe, st } = probeContext(kidId, courseId, lessonId, segIndex);
  if (st.done) return { correct: true, graded: null, state: st, coaching: null, needsAi: false, solution: null };
  const graded = gradeProbe(probe, answer);
  st.ms = (st.ms ?? 0) + clampMs(ms);
  const resolve = (finalScore: number) =>
    logLearningEvent(kidId, {
      subject: courseId,
      concept: `${lessonId}#${segIndex}`,
      firstTry: st.misses === 0 && st.lost === 0 && graded.correct,
      score: finalScore,
      ms: st.ms ?? 0,
      expectedMs: expectedSeconds(probe) * 1000,
      helped: st.rung > 0 || st.lost > 0,
      source: "probe",
    });
  if (graded.correct) {
    st.done = "passed";
    saveTeachState(ctx.rowId, ctx.state);
    resolve(1);
    addXp(kidId, st.misses === 0 ? 10 : 5);
    return { correct: true, graded, state: st, coaching: null, needsAi: false, solution: null };
  }
  st.misses++;
  // Support mode: lead with the help that has worked for this kid before.
  const lead = adaptationFor(kidId, courseId).leadWith;
  const floor = lead === "analogy" ? LADDER.analogy : lead === "example" ? LADDER.example : 0;
  st.rung = Math.max(st.rung, Math.min(LADDER.reveal, st.misses), st.misses === 1 ? floor : 0);
  let solution: unknown = null;
  if (st.rung >= LADDER.reveal) {
    st.done = "supported";
    solution = probeSolution(probe);
    resolve(graded.score);
  }
  saveTeachState(ctx.rowId, ctx.state);
  const c = coachingFor(seg, st, -1);
  return {
    correct: false,
    graded: { ...graded, coach: graded.coach ?? probe.hint ?? null },
    state: st,
    coaching: { ...c, hint: graded.coach ?? probe.hint ?? "Not quite. Look again at what you just learned.", reveal: null },
    needsAi: st.rung === LADDER.example,
    solution,
    seg,
    lesson: ctx.lesson,
    course: ctx.course,
  };
}

/**
 * "Show what you know": the interactive mastery check, graded one question
 * at a time so kids get instant feedback. Credit is full on the first try,
 * 60% on a second try; after two tries the answer is shown. Pass = 80% of the
 * possible credit across the set. A failed round can be retried after review.
 * A test-out (offered when a kid is ahead) needs 90% and also counts the
 * teaching as done.
 */
export function answerMasteryItem(
  kidId: number,
  courseId: string,
  lessonId: string,
  index: number,
  answer: unknown,
  ms: number,
  testOut: boolean,
) {
  const ctx = teachContext(kidId, courseId, lessonId);
  const probes = ctx.lesson.mastery ?? [];
  const p = probes[index];
  if (!p) throw new PortalError("Unknown question.");
  if (testOut && !adaptationFor(kidId, courseId).offerTestOut) throw new PortalError("Test-out isn't available for this lesson right now.");
  const st = ctx.state;
  if (!st.masteryItems || st.masteryItems.length !== probes.length) st.masteryItems = probes.map(() => ({ tries: 0, credit: 0, done: false, ms: 0 }));
  const item = st.masteryItems[index];
  if (item.done) throw new PortalError("You already answered that one.");
  item.tries++;
  item.ms += clampMs(ms);
  const g = gradeProbe(p, answer);
  let solution: unknown = null;
  if (g.correct || item.tries >= 2) {
    item.done = true;
    item.credit = g.score * (item.tries === 1 ? 1 : 0.6);
    if (!g.correct) solution = probeSolution(p);
    logLearningEvent(kidId, {
      subject: courseId,
      concept: `${lessonId}#m${index}`,
      firstTry: g.correct && item.tries === 1,
      score: g.score,
      ms: item.ms,
      expectedMs: expectedSeconds(p) * 1000,
      helped: item.tries > 1 || (st.masteryRounds ?? 0) > 0,
      source: testOut ? "test-out" : "mastery",
    });
  }
  const allDone = st.masteryItems.every((i) => i.done);
  const score = st.masteryItems.reduce((t, i) => t + i.credit, 0) / probes.length;
  const passed = allDone && score >= (testOut ? 0.9 : CHECK_PASS);
  let completed = false;
  if (allDone) {
    const row = ensureLessonRow(kidId, courseId, lessonId);
    if (passed && testOut) {
      st.segments.forEach((s) => (s.done ||= "passed"));
      st.activity.done = true;
      st.explain.done = true;
      st.explain.understood = true;
    }
    saveTeachState(ctx.rowId, st);
    getDb()
      .prepare("UPDATE lesson_progress SET check_best = MAX(check_best, ?), check_total = ?, check_passed = MAX(check_passed, ?), updated_at = datetime('now') WHERE id = ?")
      .run(Math.round(score * probes.length), probes.length, passed ? 1 : 0, row.id);
    addXp(kidId, Math.round(score * 25));
    if (passed) completed = maybeCompleteLesson(kidId, courseId, lessonId);
  } else {
    saveTeachState(ctx.rowId, st);
  }
  return {
    correct: g.correct,
    parts: g.parts,
    coach: g.correct ? null : g.coach ?? p.hint ?? null,
    detail: g.detail,
    tries: item.tries,
    itemDone: item.done,
    solution,
    summary: allDone ? { score: Math.round(score * 100), passed, completed } : null,
  };
}

/** Starts a fresh round of the mastery check after a kid didn't pass. */
export function retryMastery(kidId: number, courseId: string, lessonId: string) {
  const ctx = teachContext(kidId, courseId, lessonId);
  ctx.state.masteryRounds = (ctx.state.masteryRounds ?? 0) + 1;
  ctx.state.masteryItems = undefined;
  saveTeachState(ctx.rowId, ctx.state);
  return { ok: true };
}

/**
 * Warm-up review for kids who are behind or slipping: interactive questions
 * from the weakest parts of this course they've already been taught.
 */
export function reviewItems(kidId: number, courseId: string, limit = 2) {
  const course = courseById(courseId);
  if (!course) return [];
  const mastery = conceptMastery(courseEvents(kidId, courseId));
  return [...mastery.entries()]
    .filter(([c, p]) => p < 0.6 && !c.includes("#m"))
    .sort((a, b) => a[1] - b[1])
    .map(([concept]) => {
      const [lessonId, part] = concept.split("#");
      const lesson = course.lessons.find((l) => l.id === lessonId);
      const seg = lesson?.teach?.[Number(part)];
      return seg?.probe ? { lessonId, seg: Number(part), title: `${lesson!.title}: ${seg.title}`, probe: seg.probe } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x)
    .slice(0, limit);
}

/** A warm-up review answer. Practice only, but it updates the learner model. */
export function answerReview(kidId: number, courseId: string, lessonId: string, segIndex: number, answer: unknown, ms: number, attempt: number) {
  const seg = courseById(courseId)?.lessons.find((l) => l.id === lessonId)?.teach?.[segIndex];
  if (!seg?.probe) throw new PortalError("Unknown review question.");
  const graded = gradeProbe(seg.probe, answer);
  if (graded.correct || attempt >= 2) {
    logLearningEvent(kidId, {
      subject: courseId,
      concept: `${lessonId}#${segIndex}`,
      firstTry: graded.correct && attempt <= 1,
      score: graded.score,
      ms,
      expectedMs: expectedSeconds(seg.probe) * 1000,
      helped: attempt > 1,
      source: "review",
    });
  }
  return { ...graded, coach: graded.correct ? null : graded.coach ?? seg.probe.hint ?? null, solution: !graded.correct && attempt >= 2 ? probeSolution(seg.probe) : null };
}

/** Lets the multiple-choice quick think feed the learner model too. */
export function logThinkResolved(kidId: number, courseId: string, lessonId: string, segIndex: number, st: SegmentState, correct: boolean) {
  logLearningEvent(kidId, {
    subject: courseId,
    concept: `${lessonId}#${segIndex}`,
    firstTry: correct && st.misses === 0 && st.lost === 0,
    score: correct ? 1 : 0,
    ms: st.ms ?? 0,
    expectedMs: 30_000,
    helped: st.rung > 0 || st.lost > 0,
    source: "think",
  });
}
