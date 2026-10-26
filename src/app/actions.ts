"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, requireKid, requireParent, startSession } from "@/lib/auth";
import { SUBJECTS } from "@/lib/compliance";
import { clampProfile, defaultProfile, type AttentionAnswer } from "@/lib/focus";
import { focusPresets } from "@/lib/content";
import {
  AVATARS,
  addKid,
  PortalError,
  reviewMission,
  addTestScore,
  deleteTestScore,
  reviewBlock,
  reviewCourseTask,
  setGoal,
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
  verifyParent, setElectivesOff,
  dismissAlerts,
  parentMiaReset,
  parentMiaResetRing,
  parentMiaRestart,
  setMiaSettings,
  setParentPin,
  createPairCode,
  removeMiaDevice,
  parentMiaItem,
  parentMiaSupplies,
  createParentPairCode,
  removeMiaParentDevice,
  setMiaChild,
} from "@/lib/store";
import { MIA_SUBJECTS, type MiaSettings } from "@/content/miacademy";

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
  if (!Number.isInteger(grade) || grade < 0 || grade > 12) back(path, "Pick a grade from K to 12.");
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
  addKid(s.familyId, { name, avatar, ...fields, focus: defaultProfile(attentionAnswer(form), focusPresets()) });
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
  // Electives (grades K-5): a checked box means on.
  if (form.get("electives") && fields.grade <= 5) setElectivesOff(kid.id, form.get("elective_span") ? [] : ["span"]);
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
    ? focusPresets()[attention]
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

// ---------------- Phase 2b: goals, blocks, test scores ----------------

export async function setGoalAction(form: FormData) {
  const { kid } = await requireKid();
  const grade = Number(form.get("grade"));
  const target = str(form, "target");
  if (!Number.isInteger(grade) || grade < 3 || grade > 8) back("/kid/goal", "Pick a grade from 3 to 8.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(target) || target <= today()) back("/kid/goal", "Pick a date in the future.");
  setGoal(kid.id, grade, target);
  redirect("/kid?goal=1");
}

export async function reviewBlockAction(form: FormData) {
  const s = await requireParent();
  try {
    reviewBlock(s.familyId, Number(form.get("logId")), form.get("approve") === "1");
  } catch (e) {
    if (e instanceof PortalError) back("/parent", e.message);
    throw e;
  }
  revalidatePath("/parent");
  redirect("/parent");
}

function optPct(form: FormData, key: string): number | null {
  const v = str(form, key);
  if (!v) return null;
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 99 ? n : NaN;
}

export async function addTestScoreAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  const path = `/parent/kids/${kid.id}#tests`;
  const testDay = str(form, "testDay");
  const test = str(form, "test").slice(0, 40) || "MAP Growth";
  const subject = str(form, "subject").slice(0, 40);
  const score = Number(form.get("score"));
  const achievementPct = optPct(form, "achievementPct");
  const growthPct = optPct(form, "growthPct");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(testDay)) back(path, "Pick the test date.");
  if (!subject) back(path, "Pick a subject.");
  if (!Number.isInteger(score) || score < 1 || score > 2000) back(path, "Enter the score as a whole number (MAP RIT scores are usually 150-300).");
  if (Number.isNaN(achievementPct) || Number.isNaN(growthPct)) back(path, "Percentiles are whole numbers from 1 to 99.");
  addTestScore(kid.id, { testDay, test, subject, score, achievementPct, growthPct });
  revalidatePath(`/parent/kids/${kid.id}`);
  redirect(`/parent/kids/${kid.id}#tests`);
}

export async function deleteTestScoreAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  deleteTestScore(kid.id, Number(form.get("id")));
  redirect(`/parent/kids/${kid.id}#tests`);
}

export async function reviewCourseTaskAction(form: FormData) {
  const s = await requireParent();
  try {
    reviewCourseTask(s.familyId, Number(form.get("progressId")), form.get("approve") === "1");
  } catch (e) {
    if (e instanceof PortalError) back("/parent", e.message);
    throw e;
  }
  revalidatePath("/parent");
  redirect("/parent");
}

// ---------------- Miacademy timers ----------------

export async function miaSettingsAction(form: FormData) {
  const kid = await ownKid(Number(form.get("kidId")));
  setMiaSettings(kid.id, {
    allowPause: form.get("allowPause") === "on",
    breakMinutes: Number(form.get("breakMinutes")),
    helpPin: form.get("helpPin") === "on",
    buddy: str(form, "buddy") as MiaSettings["buddy"],
    lessonsPerWeek: Object.fromEntries(MIA_SUBJECTS.map((s) => [s.id, Number(form.get(`lessons_${s.id}`) ?? 0)])),
  });
  revalidatePath("/parent/settings");
  redirect("/parent/settings?saved=1");
}

export async function parentPinAction(form: FormData) {
  const s = await requireParent();
  const pin = str(form, "pin");
  if (pin !== str(form, "pin2")) back("/parent/settings", "The two PINs don't match.");
  try {
    setParentPin(s.familyId, pin);
  } catch (e) {
    if (e instanceof PortalError) back("/parent/settings", e.message);
    throw e;
  }
  redirect("/parent/settings?saved=1");
}

/** Restart a timer that's waiting for help, or let a kid run a subject again today. */
export async function miaParentAction(form: FormData) {
  const s = await requireParent();
  const kidId = Number(form.get("kidId"));
  const subject = str(form, "subject");
  try {
    if (form.get("op") === "restart") parentMiaRestart(s.familyId, kidId, subject);
    else parentMiaReset(s.familyId, kidId, subject);
  } catch (e) {
    if (e instanceof PortalError) back("/parent", e.message);
    throw e;
  }
  revalidatePath("/parent");
  redirect("/parent");
}

export async function miaResetRingAction(form: FormData) {
  const s = await requireParent();
  try {
    parentMiaResetRing(s.familyId, Number(form.get("kidId")), str(form, "ring"));
  } catch (e) {
    if (e instanceof PortalError) back("/parent", e.message);
    throw e;
  }
  revalidatePath("/parent");
  redirect("/parent");
}

export async function dismissAlertAction(form: FormData) {
  const s = await requireParent();
  const id = form.get("alertId");
  dismissAlerts(s.familyId, id ? Number(id) : undefined);
  revalidatePath("/parent");
  redirect("/parent");
}

export async function miaPairCodeAction(form: FormData) {
  const s = await requireParent();
  const kidId = Number(form.get("kidId"));
  let code: string;
  try {
    code = createPairCode(s.familyId, kidId);
  } catch (e) {
    if (e instanceof PortalError) back("/parent/settings", e.message);
    throw e;
  }
  redirect(`/parent/settings?code=${code}&codeKid=${kidId}#ext-${kidId}`);
}

export async function miaRemoveDeviceAction(form: FormData) {
  const s = await requireParent();
  removeMiaDevice(s.familyId, Number(form.get("deviceId")));
  revalidatePath("/parent/settings");
  redirect("/parent/settings?saved=1");
}

/** Approve a hands-on activity, or skip one, on a kid's Miacademy checklist. */
export async function miaItemAction(form: FormData) {
  const s = await requireParent();
  try {
    parentMiaItem(s.familyId, Number(form.get("kidId")), Number(form.get("lessonId")), str(form, "itemId"), form.get("op") === "skip" ? "skip" : "approve");
  } catch (e) {
    if (e instanceof PortalError) back("/parent", e.message);
    throw e;
  }
  revalidatePath("/parent");
  redirect("/parent");
}

/** A timer paused for supplies: the supplies are ready (timer starts again), or skip the activity. */
export async function miaSuppliesAction(form: FormData) {
  const s = await requireParent();
  try {
    parentMiaSupplies(s.familyId, Number(form.get("kidId")), str(form, "subject"), form.get("op") === "skip" ? "skip" : "ready");
  } catch (e) {
    if (e instanceof PortalError) back("/parent", e.message);
    throw e;
  }
  revalidatePath("/parent");
  redirect("/parent");
}

/** A code to connect Focus Buddy on a parent's computer (parent mode reads the Miacademy calendar). */
export async function miaParentCodeAction() {
  const s = await requireParent();
  const code = createParentPairCode(s.familyId);
  redirect(`/parent/settings?pcode=${code}#focus-buddy-parent`);
}

export async function miaParentDeviceAction(form: FormData) {
  const s = await requireParent();
  removeMiaParentDevice(s.familyId, Number(form.get("deviceId")));
  revalidatePath("/parent/settings");
  redirect("/parent/settings?saved=1#focus-buddy-parent");
}

/** Which portal kid a Miacademy student is. */
export async function miaChildAction(form: FormData) {
  const s = await requireParent();
  const kid = str(form, "kidId");
  try {
    setMiaChild(s.familyId, str(form, "child"), kid ? Number(kid) : null);
  } catch (e) {
    if (e instanceof PortalError) back("/parent/settings", e.message);
    throw e;
  }
  revalidatePath("/parent/settings");
  redirect("/parent/settings?saved=1#focus-buddy-parent");
}
