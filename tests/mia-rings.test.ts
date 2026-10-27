import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { parsePlanWeek } from "@/lib/miaPlan";
import { addKid, createFamily, getMiaSettings, miaBank, miaChecklist, miaFinishItem, miaRings, miaSavePlan, setMiaSettings } from "@/lib/store";

const id = (n: number) => `00000000-0000-4000-8000-0000000000${String(n).padStart(2, "0")}`;

/** Two online Grammar (Edition 1) tasks this week. */
const week = (status: string) => ({
  Days: [{ Date: "2026-10-20", UnitTasks: [{ Unit: "u", TaskAssignments: [id(1), id(2)] }] }],
  UnitConversions: [{ UnitId: "u", Subject: "LanguageArts", Title: "Beginning Composition", CourseTitle: "Language Arts: Level E (Edition 1)" }],
  TaskAssignmentConversions: [
    { TaskAssignmentId: id(1), Name: "The Writing Process: Getting Started: Video Lesson", Type: "Video", Status: "Completed", PreviewData: { Title: "The Writing Process" } },
    { TaskAssignmentId: id(2), Name: "Level 1", Type: "Practice", Status: status, PreviewData: { Title: "The Writing Process" } },
  ],
});

describe("the six weekly rings", () => {
  let kid: number;
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Bryce", avatar: "🐺", grade: 4, pin: "1111", dailyGoal: 45 });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 2, ela: 1, sci: 0, his: 0 } });
  });

  it("shows a ring for each class that's on, filling with each activity", () => {
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [parsePlanWeek(week("NotStarted"))]);
    const rings = miaRings(kid, "2026-10-20");
    // Only the Language Arts classes this kid takes get a ring (here: Edition 1 = Grammar).
    expect(rings.map((r) => r.id)).toEqual(["math", "grammar"]);
    // The video is done in Miacademy: it fills the ring once Bryce checks it off.
    expect(rings.find((r) => r.id === "grammar")).toMatchObject({ progress: 0, full: false });
    const top = miaChecklist(kid, "ela", "2026-10-20")!.parts.find((p) => p.name === "Writing (Edition 1)")!.upcoming[0];
    miaFinishItem(kid, top.lessonId, top.item.id);
    expect(miaRings(kid, "2026-10-20").find((r) => r.id === "grammar")).toMatchObject({ progress: 0.5, full: false });
    expect(miaBank(kid, "2026-10-20").thisWeek).toEqual([]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("pays 25 cents once when a ring fills Monday to Thursday, 15 cents after", () => {
    // A Tuesday: the kid checks the lesson off today.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-20T18:00:00Z"));
    // Focus Buddy sees the lesson, then Miacademy finishes it and the kid checks both off.
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [parsePlanWeek(week("NotStarted"))]);
    miaChecklist(kid, "ela", "2026-10-20");
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [parsePlanWeek(week("Completed"))]);
    for (const u of miaChecklist(kid, "ela", "2026-10-20")!.parts.find((p) => p.name === "Writing (Edition 1)")!.upcoming) miaFinishItem(kid, u.lessonId, u.item.id);
    expect(miaRings(kid, "2026-10-20").find((r) => r.id === "grammar")).toMatchObject({ progress: 1, full: true });
    miaRings(kid, "2026-10-20");
    expect(miaBank(kid, "2026-10-20").thisWeek).toEqual([{ ring: "grammar", cents: 25 }]);
    expect(() => miaFinishItem(kid, 999, "x")).toThrow();
  });

  it("doesn't count lessons finished before Focus Buddy saw them, whatever their calendar date", () => {
    // Fifteen Grammar lessons Miacademy already says are Completed, all dated this week (parents move the dates).
    const n = 15;
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [
      parsePlanWeek({
        Days: [{ Date: "2026-10-20", UnitTasks: [{ Unit: "u", TaskAssignments: Array.from({ length: n }, (_, i) => id(20 + i)) }] }],
        UnitConversions: [{ UnitId: "u", Subject: "LanguageArts", Title: "Unit", CourseTitle: "Language Arts: Level E (Edition 1)" }],
        TaskAssignmentConversions: Array.from({ length: n }, (_, i) => ({
          TaskAssignmentId: id(20 + i),
          Name: "Level 1",
          Type: "Practice",
          Status: "Completed",
          PreviewData: { Title: `Story ${i}` },
        })),
      }),
    ]);
    miaChecklist(kid, "ela", "2026-10-20");
    expect(miaRings(kid, "2026-10-20").find((r) => r.id === "grammar")).toMatchObject({ progress: 0, full: false, ahead: 0 });
  });

  it("gives Bryce six rings and Emme five (no Grammar: she doesn't take Edition 1)", () => {
    const allOn = { math: 2, ela: 1, sci: 1, his: 1 };
    const classes = (titles: string[]) => ({
      Days: [{ Date: "2026-10-20", UnitTasks: titles.map((_, i) => ({ Unit: `u${i}`, TaskAssignments: [id(10 + i)] })) }],
      UnitConversions: titles.map((t, i) => ({ UnitId: `u${i}`, Subject: "LanguageArts", Title: "Unit 1", CourseTitle: t })),
      TaskAssignmentConversions: titles.map((_, i) => ({ TaskAssignmentId: id(10 + i), Name: "Level 1", Type: "Practice", Status: "NotStarted", PreviewData: { Title: `Lesson ${i}` } })),
    });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: allOn });
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [
      parsePlanWeek(classes(["Reading Comprehension: Level E", "Language Arts: Level E (Edition 1)", "Language Arts: Level E (Revised 2026)"])),
    ]);
    expect(miaRings(kid, "2026-10-20").map((r) => r.id)).toEqual(["math", "sci", "his", "reading", "writing", "grammar"]);

    const emme = addKid(family, { name: "Emme", avatar: "🐼", grade: 6, pin: "2222", dailyGoal: 45 });
    setMiaSettings(emme, { ...getMiaSettings(emme), lessonsPerWeek: allOn });
    miaSavePlan(family, { id: id(91), name: "Emme" }, [parsePlanWeek(classes(["Reading Comprehension: Level G", "Language Arts: Level G"]))]);
    expect(miaRings(emme, "2026-10-20").map((r) => r.id)).toEqual(["math", "sci", "his", "reading", "writing"]);
  });
});
