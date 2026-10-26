import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { parsePathCourses } from "@/lib/miaSync";
import { addKid, createFamily, getMiaSettings, miaBank, miaChecklist, miaPathSync, miaRings, parentMiaResetRing, setMiaSettings } from "@/lib/store";

const DAY = 24 * 60 * 60 * 1000;
const id = (n: number) => `00000000-0000-4000-8000-0000000000${String(n).padStart(2, "0")}`;
const RC = "Reading Comprehension: Level E";
const course = (lesson: number, task: number, type = "Practice", thumb: string | null = null) => ({
  Title: RC,
  LearningPathTask: {
    TaskType: type,
    ThumbnailTitle: thumb,
    Description: "Can you earn a bronze medal?",
    Thumbnail: { OriginalUrl: "https://miacademy.co/x/lessons/backgrounds/LanguageArts.svg" },
    Link: `/Content.Lesson/page?lesson=%22${id(lesson)}%22&taskAssignment=%22${id(task)}%22&_=`,
  },
});

describe("a lesson Miacademy moved past counts in its own week", () => {
  let kid: number;
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Bryce", avatar: "🐺", grade: 6, pin: "1111", dailyGoal: 45 });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 1, sci: 0, his: 0 } });
  });

  it("last week's story doesn't fill this week's Reading ring (and this week's story still shows)", () => {
    // Last week: the story was on the assignments page.
    miaPathSync(kid, parsePathCourses([course(1, 10, "Pdf", "Opossum")]), Date.now() - 8 * DAY);
    // This week: Miacademy has moved on to a new story, before the kid has done anything.
    miaPathSync(kid, parsePathCourses([course(2, 20, "Pdf", "Katherine")]));
    const reading = miaChecklist(kid, "ela")!.parts.find((p) => p.name === "Reading Comprehension")!;
    expect(reading).toMatchObject({ doneThisWeek: 0, weekDone: false });
    expect(reading.upcoming.map((u) => u.item.title)).toEqual(["Read the story: Katherine"]);
    expect(miaRings(kid).find((r) => r.id === "reading")?.full).toBe(false);
    expect(miaBank(kid).thisWeek).toEqual([]);
  });

  it("a story started and finished this week still counts this week", () => {
    miaPathSync(kid, parsePathCourses([course(1, 10, "Pdf", "Opossum")]));
    miaPathSync(kid, parsePathCourses([course(2, 20, "Pdf", "Katherine")]));
    expect(miaChecklist(kid, "ela")!.parts.find((p) => p.name === "Reading Comprehension")).toMatchObject({ doneThisWeek: 1, weekDone: true });
  });

  it("a parent can reset a ring that filled by mistake: its money comes out and its lessons stop counting", () => {
    miaPathSync(kid, parsePathCourses([course(1, 10, "Pdf", "Opossum")]));
    miaPathSync(kid, parsePathCourses([course(2, 20, "Pdf", "Katherine")]));
    expect(miaRings(kid).find((r) => r.id === "reading")?.full).toBe(true);
    expect(miaBank(kid).thisWeek.map((p) => p.ring)).toEqual(["reading"]);

    parentMiaResetRing(family, kid, "reading");
    expect(miaBank(kid).thisWeek).toEqual([]);
    expect(miaRings(kid).find((r) => r.id === "reading")?.full).toBe(false);
    expect(miaChecklist(kid, "ela")!.parts.find((p) => p.name === "Reading Comprehension")).toMatchObject({ doneThisWeek: 0, weekDone: false });
    expect(() => parentMiaResetRing(family + 1, kid, "reading")).toThrow();
  });
});

describe("parent catch-up controls", () => {
  it("marks a timer done for today, and a checklist activity done", async () => {
    const { parentMiaMarkTimerDone, parentMiaItem, miaDay } = await import("@/lib/store");
    setDb(openDb(":memory:"));
    const family = createFamily({ familyName: "T", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    const kid = addKid(family, { name: "Bryce", avatar: "🐺", grade: 6, pin: "1111", dailyGoal: 45 });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 1, sci: 0, his: 0 } });

    parentMiaMarkTimerDone(family, kid, "ela");
    expect(miaDay(kid).ela?.finishedAt).toBeTypeOf("number");
    expect(() => parentMiaMarkTimerDone(family + 1, kid, "ela")).toThrow();

    miaPathSync(kid, parsePathCourses([course(1, 10, "Pdf", "Opossum")]));
    const reading = () => miaChecklist(kid, "ela")!.parts.find((p) => p.name === "Reading Comprehension")!;
    const top = reading().upcoming[0];
    parentMiaItem(family, kid, top.lessonId, top.item.id, "approve");
    expect(reading().upcoming.some((u) => u.item.id === top.item.id)).toBe(false);
  });
});
