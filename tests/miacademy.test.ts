import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { applyMia, clampMiaSettings, isOpen, MiaRuleError, newTimer, remaining, type MiaTimerState } from "@/lib/miaTimer";
import { MIA_DEFAULT_SETTINGS } from "@/content/miacademy";
import {
  addKid,
  createFamily,
  getKid,
  getMiaSettings,
  miaAct,
  miaDay,
  miaReminderIgnored,
  parentMiaReset,
  parentMiaRestart,
  PortalError,
  setMiaSettings,
  setParentPin,
  unseenAlerts,
  verifyParentPin,
} from "@/lib/store";

const MIN = 60 * 1000;
const run = (s: MiaTimerState, ...steps: [Parameters<typeof applyMia>[1], number][]) =>
  steps.reduce((acc, [action, at]) => applyMia(acc, action, at).state, s);

describe("Miacademy timer rules", () => {
  it("counts down 30 minutes from start", () => {
    const s = newTimer(0);
    expect(remaining(s, 0)).toBe(30 * MIN);
    expect(remaining(s, 12 * MIN)).toBe(18 * MIN);
    expect(remaining(s, 40 * MIN)).toBe(0);
  });

  it("only finishes when the time is really up", () => {
    const s = newTimer(0);
    expect(() => applyMia(s, "finish", 10 * MIN)).toThrow(MiaRuleError);
    const done = applyMia(s, "finish", 30 * MIN);
    expect(done.event).toBe("finished");
    expect(isOpen(done.state)).toBe(false);
    expect(() => applyMia(done.state, "start", 31 * MIN)).toThrow(/done for today/);
  });

  it("stops the clock while choosing, on help and on a break, then waits for Start", () => {
    let s = run(newTimer(0), ["pause", 10 * MIN]);
    expect(remaining(s, 15 * MIN)).toBe(20 * MIN);
    s = run(s, ["break", 15 * MIN]);
    expect(s.pause).toMatchObject({ type: "break", endAt: 20 * MIN });
    s = run(s, ["breakDone", 20 * MIN]);
    expect(s.pause?.type).toBe("ready");
    expect(remaining(s, 25 * MIN)).toBe(20 * MIN);
    s = run(s, ["start", 25 * MIN]);
    expect(remaining(s, 25 * MIN)).toBe(20 * MIN);
    expect(remaining(s, 30 * MIN)).toBe(15 * MIN);
  });

  it("allows one break per subject, but help any time", () => {
    let s = run(newTimer(0), ["pause", MIN], ["break", MIN], ["breakDone", 2 * MIN], ["start", 2 * MIN], ["pause", 3 * MIN]);
    expect(() => applyMia(s, "break", 3 * MIN)).toThrow(/already had your break/);
    const help = applyMia(s, "help", 3 * MIN);
    expect(help.event).toBe("help");
    s = run(help.state, ["helpResume", 8 * MIN]);
    expect(s.pause).toBeNull();
    expect(s.helps).toBe(1);
  });

  it("uses the parent's break length", () => {
    const s = applyMia(applyMia(newTimer(0), "pause", 0).state, "break", 0, { ...MIA_DEFAULT_SETTINGS, breakMinutes: 2 }).state;
    expect(s.pause).toMatchObject({ type: "break", lenMs: 2 * MIN });
  });

  it("can't pause when a parent turned pausing off", () => {
    expect(() => applyMia(newTimer(0), "pause", MIN, { ...MIA_DEFAULT_SETTINGS, allowPause: false })).toThrow(/turned off/);
  });

  it("tells a parent once when a kid is late back from a break", () => {
    const s = run(newTimer(0), ["pause", MIN], ["break", MIN], ["breakDone", 6 * MIN]);
    expect(applyMia(s, "late", 6 * MIN + 30 * 1000).event).toBeNull();
    const late = applyMia(s, "late", 7 * MIN);
    expect(late.event).toBe("late");
    expect(applyMia(late.state, "late", 9 * MIN).event).toBeNull();
  });

  it("cleans up settings from a form", () => {
    expect(clampMiaSettings({ breakMinutes: 99, buddy: "dragon" as never })).toMatchObject({ breakMinutes: 5, buddy: "panda" });
    expect(clampMiaSettings({ breakMinutes: 0, buddy: "wolf" })).toMatchObject({ breakMinutes: 1, buddy: "wolf" });
  });
});

describe("Miacademy timers in the store", () => {
  let kid: number;
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Kid", avatar: "🙂", grade: 7, pin: "1111", dailyGoal: 45 });
  });

  it("runs each subject once a day unless a parent allows it again", () => {
    miaAct(kid, "math", "start", { now: 0 });
    expect(() => miaAct(kid, "sci", "start", { now: MIN })).toThrow(/Finish Math first/);
    miaAct(kid, "math", "finish", { now: 30 * MIN });
    expect(miaDay(kid).math?.finishedAt).toBe(30 * MIN);
    expect(() => miaAct(kid, "math", "start", { now: 31 * MIN })).toThrow(/done for today/);
    parentMiaReset(family, kid, "math");
    expect(miaDay(kid).math).toBeNull();
    miaAct(kid, "math", "start", { now: 32 * MIN });
    expect(isOpen(miaDay(kid).math)).toBe(true);
  });

  it("alerts the parent for help and needs the parent PIN to restart", () => {
    miaAct(kid, "ela", "start", { now: 0 });
    miaAct(kid, "ela", "pause", { now: MIN });
    miaAct(kid, "ela", "help", { now: MIN });
    expect(unseenAlerts(family).map((a) => a.kind)).toEqual(["help"]);
    expect(() => miaAct(kid, "ela", "helpResume", { now: 2 * MIN, pin: "1234" })).toThrow(/set a parent PIN/);
    setParentPin(family, "4321");
    expect(() => miaAct(kid, "ela", "helpResume", { now: 2 * MIN, pin: "1234" })).toThrow(/isn't right/);
    miaAct(kid, "ela", "helpResume", { now: 2 * MIN, pin: "4321" });
    expect(miaDay(kid).ela?.pause).toBeNull();
  });

  it("restarts without a PIN when that setting is off, or from the parent page", () => {
    setMiaSettings(kid, { ...getMiaSettings(kid), helpPin: false });
    miaAct(kid, "his", "start", { now: 0 });
    miaAct(kid, "his", "pause", { now: MIN });
    miaAct(kid, "his", "help", { now: MIN });
    miaAct(kid, "his", "helpResume", { now: 2 * MIN });
    miaAct(kid, "his", "pause", { now: 3 * MIN });
    miaAct(kid, "his", "help", { now: 3 * MIN });
    parentMiaRestart(family, kid, "his", 4 * MIN);
    expect(miaDay(kid).his?.pause).toBeNull();
  });

  it("keeps a parent's other family out", () => {
    const other = createFamily({ familyName: "Other", parentName: "Q", email: `q${Math.random()}@test.test`, password: "password1" });
    miaAct(kid, "math", "start", { now: 0 });
    expect(() => parentMiaReset(other, kid, "math")).toThrow(PortalError);
  });

  it("locks the parent PIN after five wrong tries", () => {
    setParentPin(family, "2468");
    for (let i = 0; i < 4; i++) expect(verifyParentPin(family, "0000")).toBe("wrong");
    expect(verifyParentPin(family, "0000")).toBe("locked");
    expect(verifyParentPin(family, "2468")).toBe("locked");
  });

  it("rejects a parent PIN that isn't 4-6 digits", () => {
    expect(() => setParentPin(family, "12")).toThrow(PortalError);
    expect(() => setParentPin(family, "abcd")).toThrow(PortalError);
  });

  it("tells a parent at most every 15 minutes that no timer is running", () => {
    miaReminderIgnored(kid, 0);
    miaReminderIgnored(kid, 5 * MIN);
    miaReminderIgnored(kid, 16 * MIN);
    expect(unseenAlerts(family).filter((a) => a.kind === "no-timer")).toHaveLength(2);
    expect(getKid(kid)).toBeDefined();
  });
});
