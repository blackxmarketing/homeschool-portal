"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireParent } from "@/lib/auth";
import { CONTENT_KEYS, DEFAULTS, getContent, resetContent, setContent, type ContentKey } from "@/lib/content";
import { STRANDS } from "@/lib/curriculum/skills";

const PAGE = "/parent/content";

function s(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

/** Text areas hold one item per line. */
function lines(form: FormData, key: string): string[] {
  return s(form, key)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function done(section: string): never {
  revalidatePath("/", "layout");
  redirect(`${PAGE}?saved=${section}#${section}`);
}

export async function saveFeaturesAction(form: FormData) {
  await requireParent();
  const keys = Object.keys(DEFAULTS.features);
  setContent("features", Object.fromEntries(keys.map((k) => [k, form.get(`f.${k}`) === "on"])));
  setContent("aiLimits", {
    messagesPerKidPerDay: s(form, "messagesPerKidPerDay"),
    maxMessageChars: s(form, "maxMessageChars"),
    historyTurns: s(form, "historyTurns"),
  });
  setContent("drill", { seconds: s(form, "drillSeconds"), fluentPerMinute: s(form, "fluentPerMinute") });
  done("features");
}

export async function saveScheduleAction(form: FormData) {
  await requireParent();
  const count = Number(form.get("count")) || 0;
  const blocks = [];
  for (let i = 0; i <= count; i++) {
    const p = `b.${i}.`;
    if (form.get(`${p}delete`) === "on") continue;
    const label = s(form, `${p}label`);
    if (!label) continue; // the empty "add a block" row
    blocks.push({
      order: Number(form.get(`${p}order`)) || i + 1,
      id: s(form, `${p}id`) || label,
      label,
      icon: s(form, `${p}icon`),
      minutes: s(form, `${p}minutes`),
      kind: s(form, `${p}kind`),
      subject: s(form, `${p}subject`),
      hue: s(form, `${p}hue`),
      ideas: lines(form, `${p}ideas`),
      courses: s(form, `${p}courses`).split(/[\s,]+/).filter(Boolean),
    });
  }
  blocks.sort((a, b) => a.order - b.order);
  setContent("schedule", blocks);
  done("schedule");
}

export async function saveTeachersAction(form: FormData) {
  await requireParent();
  const teachers: Record<string, unknown> = {};
  for (const st of STRANDS) {
    const p = `t.${st.id}.`;
    teachers[st.id] = {
      name: s(form, `${p}name`),
      avatar: s(form, `${p}avatar`),
      inspiredBy: s(form, `${p}inspiredBy`),
      hue: s(form, `${p}hue`),
      voice: s(form, `${p}voice`),
      hooks: lines(form, `${p}hooks`),
      greeting: s(form, `${p}greeting`),
    };
  }
  setContent("teachers", teachers);
  setContent("teachingMethod", s(form, "teachingMethod"));
  done("teachers");
}

export async function saveQuestsAction(form: FormData) {
  await requireParent();
  const count = Number(form.get("count")) || 0;
  const existing = new Set(getContent("quests").map((q) => q.id));
  const quests = [];
  for (let i = 0; i <= count; i++) {
    const p = `q.${i}.`;
    if (form.get(`${p}delete`) === "on") continue;
    const title = s(form, `${p}title`);
    if (!title) continue; // the empty "add a quest" row
    let id = s(form, `${p}id`);
    if (!id) {
      // New quest: make an id from the title that doesn't clash.
      const base = `custom.${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
      id = base;
      for (let n = 2; existing.has(id); n++) id = `${base}-${n}`;
      existing.add(id);
    }
    quests.push({
      id,
      kind: s(form, `${p}kind`),
      theme: s(form, `${p}theme`),
      title,
      text: s(form, `${p}text`),
      reveal: s(form, `${p}reveal`),
      minutes: s(form, `${p}minutes`),
      subject: s(form, `${p}subject`),
      xp: s(form, `${p}xp`),
    });
  }
  setContent("quests", quests);
  done("quests");
}

export async function saveFocusAction(form: FormData) {
  await requireParent();
  const presets: Record<string, unknown> = {};
  for (const a of ["yes", "unsure", "no"]) {
    presets[a] = {
      sprintMinutes: s(form, `p.${a}.sprintMinutes`),
      breakMinutes: s(form, `p.${a}.breakMinutes`),
      sideQuestEvery: s(form, `p.${a}.sideQuestEvery`),
      dailyCapMinutes: s(form, `p.${a}.dailyCapMinutes`),
    };
  }
  setContent("focusPresets", presets);
  // Brain breaks: one per line as "icon | title | what to do".
  setContent(
    "breaks",
    lines(form, "breaks").map((l) => {
      const [icon, title, ...rest] = l.split("|").map((x) => x.trim());
      return { icon, title, text: rest.join(" | ") };
    }),
  );
  done("focus");
}

export async function resetContentAction(form: FormData) {
  await requireParent();
  const section = s(form, "section");
  const keys: Record<string, ContentKey[]> = {
    features: ["features", "aiLimits", "drill"],
    schedule: ["schedule"],
    teachers: ["teachers", "teachingMethod"],
    quests: ["quests"],
    focus: ["focusPresets", "breaks"],
    courses: ["courses"],
  };
  for (const k of keys[section] ?? []) if (CONTENT_KEYS.includes(k)) resetContent(k);
  revalidatePath("/", "layout");
  redirect(`${PAGE}?reset=${section}#${section}`);
}
