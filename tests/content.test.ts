import { describe, expect, it } from "vitest";
import { DEFAULTS, sanitize } from "@/lib/content";
import { STRANDS } from "@/lib/curriculum/skills";

describe("editable content", () => {
  it("passes the defaults through unchanged", () => {
    expect(sanitize("features", DEFAULTS.features)).toEqual(DEFAULTS.features);
    expect(sanitize("aiLimits", DEFAULTS.aiLimits)).toEqual(DEFAULTS.aiLimits);
    expect(sanitize("drill", DEFAULTS.drill)).toEqual(DEFAULTS.drill);
    expect(sanitize("schedule", DEFAULTS.schedule)).toEqual(DEFAULTS.schedule);
    expect(sanitize("teachers", DEFAULTS.teachers)).toEqual(DEFAULTS.teachers);
    expect(sanitize("quests", DEFAULTS.quests)).toEqual(DEFAULTS.quests);
    expect(sanitize("focusPresets", DEFAULTS.focusPresets)).toEqual(DEFAULTS.focusPresets);
    expect(sanitize("breaks", DEFAULTS.breaks)).toEqual(DEFAULTS.breaks);
  });

  it("survives garbage", () => {
    for (const key of Object.keys(DEFAULTS) as (keyof typeof DEFAULTS)[]) {
      expect(sanitize(key, null), key).toEqual(DEFAULTS[key]);
      // Any text is a valid teaching method; everything else needs structure.
      if (key !== "teachingMethod") expect(sanitize(key, "nonsense"), key).toEqual(DEFAULTS[key]);
    }
  });

  it("clamps numbers and ignores unknown fields", () => {
    expect(sanitize("aiLimits", { messagesPerKidPerDay: "99999", maxMessageChars: -5, historyTurns: "abc", extra: 1 })).toEqual({
      messagesPerKidPerDay: 1000,
      maxMessageChars: 50,
      historyTurns: DEFAULTS.aiLimits.historyTurns,
    });
    expect(Object.keys(sanitize("features", { aiTeachers: false, hack: true }))).toEqual(Object.keys(DEFAULTS.features));
  });

  it("cleans up edited schedule blocks", () => {
    const out = sanitize("schedule", [
      { id: "Spanish Class!", label: "Spanish", icon: "🗣️", minutes: "500", kind: "weird", subject: "Not a subject", ideas: ["Practice verbs", ""] },
      { id: "spanish-class-", label: "Duplicate" },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ id: "spanish-class-", label: "Spanish", minutes: 120, kind: "guided", subject: "Other", ideas: ["Practice verbs"] });
    expect(sanitize("schedule", [])).toEqual(DEFAULTS.schedule);
  });

  it("keeps every teacher and every quest kind", () => {
    const t = sanitize("teachers", { algebra: { name: "Ms. Ada", hooks: [] } });
    expect(Object.keys(t).sort()).toEqual(STRANDS.map((s) => s.id).sort());
    expect(t.algebra.name).toBe("Ms. Ada");
    expect(t.algebra.hooks).toEqual(DEFAULTS.teachers.algebra.hooks);

    const q = sanitize("quests", [{ id: "x", kind: "mission", theme: "money", title: "Sell lemonade", text: "Do it.", minutes: 45, subject: "Math", xp: 50 }]);
    expect(q[0]).toMatchObject({ id: "x", kind: "mission", minutes: 45, subject: "Math" });
    for (const kind of ["brain", "create", "mission"]) expect(q.some((x) => x.kind === kind), kind).toBe(true);
  });
});
