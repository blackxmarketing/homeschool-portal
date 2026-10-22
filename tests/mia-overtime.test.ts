import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { applyMia, MiaRuleError, newTimer } from "@/lib/miaTimer";
import { addKid, createFamily, miaAct, miaBank, unseenAlerts } from "@/lib/store";

const MIN = 60 * 1000;

describe("overtime: finishing a Miacademy task after the 30 minutes", () => {
  it("only starts when time is up, keeps running, and can't be paused", () => {
    const t = newTimer(0);
    expect(() => applyMia(t, "overtime", 10 * MIN)).toThrow(MiaRuleError);
    const over = applyMia(t, "overtime", 30 * MIN).state;
    expect(over.overtimeSince).toBe(30 * MIN);
    expect(applyMia(over, "overtime", 31 * MIN).state.overtimeSince).toBe(30 * MIN); // once
    expect(() => applyMia(over, "pause", 31 * MIN)).toThrow(/Finish what you're working on/);
    const done = applyMia(over, "finish", 36 * MIN).state;
    expect(done).toMatchObject({ finishedAt: 36 * MIN, overtimeMs: 6 * MIN });
  });

  it("a normal finish has no overtime", () => {
    expect(applyMia(newTimer(0), "finish", 30 * MIN).state.overtimeMs).toBe(0);
  });

  describe("in the store", () => {
    let kid: number;
    let family: number;
    beforeEach(() => {
      setDb(openDb(":memory:"));
      family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
      kid = addKid(family, { name: "Bryce", avatar: "🐺", grade: 7, pin: "1111", dailyGoal: 45 });
    });

    it("pays 5 cents once per subject a day, and tells a parent when it ran past 15 minutes", () => {
      const start = Date.now();
      miaAct(kid, "math", "start", { now: start });
      miaAct(kid, "math", "overtime", { now: start + 30 * MIN });
      miaAct(kid, "math", "finish", { now: start + 34 * MIN });
      expect(miaBank(kid).thisWeek.filter((p) => p.ring.startsWith("overtime:math"))).toEqual([expect.objectContaining({ cents: 5 })]);
      expect(unseenAlerts(family).filter((a) => a.kind === "overtime")).toHaveLength(0);

      miaAct(kid, "sci", "start", { now: start + 35 * MIN });
      miaAct(kid, "sci", "overtime", { now: start + 65 * MIN });
      miaAct(kid, "sci", "finish", { now: start + 82 * MIN });
      expect(unseenAlerts(family).filter((a) => a.kind === "overtime").map((a) => a.message)).toEqual([
        "Bryce went 17 minutes over in Science finishing a Miacademy task.",
      ]);
      expect(miaBank(kid).monthCents).toBeGreaterThanOrEqual(10);
    });

    it("pays nothing extra without overtime", () => {
      const start = Date.now();
      miaAct(kid, "his", "start", { now: start });
      miaAct(kid, "his", "finish", { now: start + 30 * MIN });
      expect(miaBank(kid).thisWeek).toEqual([]);
    });
  });
});
