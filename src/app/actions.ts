"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, requireParent, startSession } from "@/lib/auth";
import { SUBJECTS } from "@/lib/compliance";
import { clampProfile, defaultProfile, PRESETS, type AttentionAnswer } from "@/lib/focus";
import {
  AVATARS,
  addKid,
  PortalError,
  reviewMission,
  setFocus,
  createFamily,
  deleteActivity,
  getKid,
  hasAnyParent,
  logActivity,
  resetPlacement,
  setSchoolYearStart,
  today,
  updateKid,
  verifyKidPin,
  verifyParent,
} from "@/lib/store";

function str(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function back(path: string, error: string): never {
  redirect(`${path}${path.includes("?") ? "&" : "?"}error=${encodeURIComponent(error)}`);
}

export async function setupAction(form: FormData) {
  if (hasAnyParent()) redirect("/parent/login");
  const familyName = str(form, "familyName");
  const parentName = str(form, "parentName");
  const email = str(form, "email");
  const password = str(form, "password");
  if (!familyName || !parentName || !email) back("/setup", "Please fill in every field.");
  if (password.length < 10) back("/setup", "Use a password of at least 10 characters.");
  const familyId = createFamily({ familyName, parentName, email, password });
  const parent = verifyParent(email, password)!;
  await startSession({ role: "parent", parentId: parent.id, familyId });
  redirect("/parent/settings?welcome=1");
}

export async function parentLoginAction(form: FormData) {
  const parent = verifyParent(str(form, "email"), str(form, "password"));
  if (!parent) back("/parent/login", "That email and password don't match.");
  await startSession({ role: "parent", parentId: parent.id, familyId: parent.family_id });
  redirect("/parent");
}

export async function kidLoginAction(form: FormData) {
  const kidId = Number(form.get("kidId"));
  const kid = getKid(kidId);
  if (!kid) redirect("/");
  const result = verifyKidPin(kidId, str(form, "pin"));
  if (result === "locked") back(`/login/${kidId}`, "Too many tries. Wait 5 minutes or ask a parent.");
  if (result === "wrong") back(`/login/${kidId}`, "That PIN isn't right. Try again!");
  await startSession({ role: "kid", kidId, familyId: kid.family_id });
  redirect("/kid");
}

export async function logoutAction() {
  await endSession();
  redirect("/");
}

function parseKidFields(form: FormData, path: string) {
  const grade = Number(form.get("grade"));
  const dailyGoal = Number(form.get("dailyGoal"));
  const pin = str(form, "pin");
  if (!Number.isInteger(grade) || grade < 1 || grade > 12) back(path, "Pick a grade from 1 to 12.");
  if (!Number.isInteger(dailyGoal) || dailyGoal < 10 || dailyGoal > 180) back(path, "Daily goal should be 10-180 minutes.");
  if (pin && !/^\d{4}$/.test(pin)) back(path, "PINs are exactly 4 digits.");
  return { grade, dailyGoal, pin };
}

export async function addKidAction(form: FormData) {
  const s = await requireParent();
  const name = str(form, "name");
  const avatar = AVATARS.includes(str(form, "avatar")) ? str(form, "avatar") : AVATARS[0];
  const fields = parseKidFields(form, "/parent/settings");
  if (!name) back("/parent/settings", "Every kid needs a name.");
  if (!fields.pin) back("/parent/settings", "Set a 4-digit PIN for the kid to log in with.");
  addKid(s.familyId, { name, avatar, ...fields, focus: defaultProfile(attentionAnswer(form)) });
  revalidatePath("/parent/settings");
  redirect("/parent/settings?saved=1");
}

async function ownKid(kidId: number) {
  const s = await requireParent();
  const kid = getKid(kidId);
  if (!kid || kid.family_id !== s.familyId) redirect("/parent");
  return kid;
}

export async function updateKidAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  const fields = parseKidFields(form, "/parent/settings");
  updateKid(kid.id, { grade: fields.grade, dailyGoal: fields.dailyGoal, pin: fields.pin || undefined });
  revalidatePath("/parent/settings");
  redirect("/parent/settings?saved=1");
}

function attentionAnswer(form: FormData): AttentionAnswer {
  const v = str(form, "attention");
  return v === "yes" || v === "no" ? v : "unsure";
}

export async function focusAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  const attention = attentionAnswer(form);
  // "Use recommended" resets the numbers to the preset for the attention answer.
  const numbers = form.get("preset")
    ? PRESETS[attention]
    : {
        sprintMinutes: Number(form.get("sprintMinutes")),
        breakMinutes: Number(form.get("breakMinutes")),
        sideQuestEvery: Number(form.get("sideQuestEvery")),
        dailyCapMinutes: Number(form.get("dailyCapMinutes")),
      };
  const profile = clampProfile({ attention, ...numbers });
  if (profile.dailyCapMinutes < kid.daily_goal_minutes) {
    back("/parent/settings", `The daily screen cap can't be less than ${kid.name}'s daily goal (${kid.daily_goal_minutes} min).`);
  }
  setFocus(kid.id, profile);
  revalidatePath("/parent/settings");
  redirect("/parent/settings?saved=1");
}

export async function reviewMissionAction(form: FormData) {
  const s = await requireParent();
  try {
    reviewMission(s.familyId, Number(form.get("logId")), form.get("approve") === "1");
  } catch (e) {
    if (e instanceof PortalError) back("/parent", e.message);
    throw e;
  }
  revalidatePath("/parent");
  redirect("/parent");
}

export async function resetPlacementAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  resetPlacement(kid.id);
  redirect("/parent/settings?saved=1");
}

export async function schoolYearAction(form: FormData) {
  const s = await requireParent();
  const v = str(form, "start");
  if (!/^\d{2}-\d{2}$/.test(v)) back("/parent/settings", "Use MM-DD for the school year start, like 08-15.");
  setSchoolYearStart(s.familyId, v);
  redirect("/parent/settings?saved=1");
}

export async function logActivityAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  const path = `/parent/kids/${kid.id}`;
  const day = str(form, "day") || today();
  const subject = str(form, "subject");
  const minutes = Number(form.get("minutes"));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) back(path, "Pick a date.");
  if (!(SUBJECTS as readonly string[]).includes(subject)) back(path, "Pick a subject.");
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 600) back(path, "Minutes should be between 1 and 600.");
  logActivity(kid.id, { day, subject, minutes, note: str(form, "note").slice(0, 300) });
  revalidatePath(path);
  redirect(`${path}?logged=1`);
}

export async function deleteActivityAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  deleteActivity(kid.id, Number(form.get("id")));
  redirect(`/parent/kids/${kid.id}`);
}
