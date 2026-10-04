import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getDb } from "./db";
import { checkAnswer, formatHelp, type AnswerKind, type Question } from "./curriculum/answers";
import { SKILLS, getSkill } from "./curriculum/skills";
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
import { buildPlan, isAvailable, DAILY_QUESTION_CAP, type PlanItem, type SkillState } from "./engine/planner";
import { schoolYearStart, summarize, type DayMinutes } from "./compliance";

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

export function addKid(familyId: number, input: { name: string; avatar: string; grade: number; pin: string; dailyGoal: number }): number {
  const res = getDb()
    .prepare("INSERT INTO kids (family_id, name, avatar, grade, pin_hash, daily_goal_minutes) VALUES (?, ?, ?, ?, ?, ?)")
    .run(familyId, input.name, input.avatar, input.grade, bcrypt.hashSync(input.pin, 10), input.dailyGoal);
  return Number(res.lastInsertRowid);
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
  formatHelp: string;
}

export class PortalError extends Error {}

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
    formatHelp: formatHelp(q.kind),
  };
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
    db.prepare("UPDATE issued_questions SET answered = 1 WHERE id = ?").run(questionId);
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

function addXp(kidId: number, xp: number): void {
  if (xp) getDb().prepare("UPDATE kids SET xp = xp + ? WHERE id = ?").run(xp, kidId);
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
