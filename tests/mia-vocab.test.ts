import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { addKid, createFamily, getMiaSettings, miaAct, miaVocab, miaVocabDone, setMiaSettings, today } from "@/lib/store";

const MONDAY = "2026-10-19";
const THURSDAY = "2026-10-22";
const FRIDAY = "2026-10-23";

describe("Vocabulary & Spelling first each school day", () => {
  let kid: number;
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Emme", avatar: "🐼", grade: 6, pin: "1111", dailyGoal: 45 });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 2, ela: 1, sci: 1, his: 1 } });
  });

  it("is the first step Monday to Thursday, with no checklist, until the kid checks it off", () => {
    expect(miaVocab(kid, MONDAY)).toEqual({ done: false, tasks: [] });
    expect(miaVocab(kid, THURSDAY)?.done).toBe(false);
    expect(miaVocab(kid, FRIDAY)).toBeNull();
    miaVocabDone(kid, MONDAY);
    expect(miaVocab(kid, MONDAY)?.done).toBe(true);
    expect(miaVocab(kid, THURSDAY)?.done).toBe(false);
  });

  it("isn't there for a kid without Miacademy timers", () => {
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 0, sci: 0, his: 0 } });
    expect(miaVocab(kid, MONDAY)).toBeNull();
  });

  const weekday = ((new Date(`${today()}T12:00:00Z`).getUTCDay() + 6) % 7) + 1;
  it.runIf(weekday <= 4)("core timers wait until it's done (on a school day)", () => {
    expect(() => miaAct(kid, "math", "start")).toThrow(/Vocabulary and Spelling first/);
    miaVocabDone(kid);
    expect(() => miaAct(kid, "math", "start")).not.toThrow();
  });
});
