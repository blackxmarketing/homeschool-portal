import { beforeEach, describe, expect, it } from "vitest";
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
    expect(rings.find((r) => r.id === "grammar")).toMatchObject({ progress: 0.5, full: false });
    expect(miaBank(kid, "2026-10-20").thisWeek).toEqual([]);
  });

  it("pays 25 cents once when a ring fills Monday to Thursday, 15 cents after", () => {
    // Every task was finished in Miacademy before the calendar was read: the lesson counts on its day (Tuesday).
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [parsePlanWeek(week("Completed"))]);
    miaChecklist(kid, "ela", "2026-10-20");
    expect(miaRings(kid, "2026-10-20").find((r) => r.id === "grammar")).toMatchObject({ progress: 1, full: true });
    miaRings(kid, "2026-10-20");
    expect(miaBank(kid, "2026-10-20").thisWeek).toEqual([{ ring: "grammar", cents: 25 }]);
    expect(() => miaFinishItem(kid, 999, "x")).toThrow();
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
