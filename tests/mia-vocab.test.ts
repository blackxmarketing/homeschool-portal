import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { parsePlanWeek } from "@/lib/miaPlan";
import { addKid, createFamily, miaAct, miaPathSync, miaSavePlan, miaVocab, miaVocabDone, today } from "@/lib/store";
import { parsePathCourses } from "@/lib/miaSync";

const id = (n: number) => `00000000-0000-4000-8000-0000000000${String(n).padStart(2, "0")}`;
const MONDAY = "2026-10-19";
const TUESDAY = "2026-10-20";

/** Two Vocabulary tasks on Monday, one on Tuesday, and a Math task. */
const week = (status = "NotStarted") => ({
  Days: [
    { Date: MONDAY, UnitTasks: [{ Unit: "v", TaskAssignments: [id(1), id(2)] }, { Unit: "m", TaskAssignments: [id(9)] }] },
    { Date: TUESDAY, UnitTasks: [{ Unit: "v", TaskAssignments: [id(3)] }] },
  ],
  UnitConversions: [
    { UnitId: "v", Subject: "LanguageArts", Title: "Unit 1", CourseTitle: "Vocabulary: Level G" },
    { UnitId: "m", Subject: "Math", Title: "Unit 1", CourseTitle: "Math: Level G" },
  ],
  TaskAssignmentConversions: [
    { TaskAssignmentId: id(1), Name: "Word Study: Video Lesson", Type: "Video", Status: status, PreviewData: { Title: "Word Study" } },
    { TaskAssignmentId: id(2), Name: "Level 1", Type: "Practice", Status: status, PreviewData: { Title: "Word Study" } },
    { TaskAssignmentId: id(3), Name: "Level 2", Type: "Practice", Status: status, PreviewData: { Title: "Word Study" } },
    { TaskAssignmentId: id(9), Name: "Video Lesson", Type: "Video", Status: status, PreviewData: { Title: "Fractions" } },
  ],
});

describe("Vocabulary first each school day", () => {
  let kid: number;
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Emme", avatar: "🐼", grade: 6, pin: "1111", dailyGoal: 45 });
  });

  it("is its own step, not part of Language Arts, with today's marked tasks", () => {
    expect(parsePlanWeek(week()).filter((t) => t.subject === "vocab").map((t) => t.taskId)).toEqual([id(1), id(2), id(3)]);
    miaSavePlan(family, { id: id(90), name: "Emme" }, [parsePlanWeek(week())]);
    expect(miaVocab(kid, MONDAY)).toEqual({
      done: false,
      tasks: [
        { title: "Word Study: Video Lesson", lesson: "Word Study", done: false },
        { title: "Level 1", lesson: "Word Study", done: false },
      ],
    });
    // Nothing marked Wednesday, and no school on Friday.
    expect(miaVocab(kid, "2026-10-21")).toBeNull();
    expect(miaVocab(kid, "2026-10-23")).toBeNull();
  });

  it("is done when Miacademy marks it, when the assignments page moves past it, or when the kid says so", () => {
    miaSavePlan(family, { id: id(90), name: "Emme" }, [parsePlanWeek(week("Completed"))]);
    expect(miaVocab(kid, MONDAY)?.done).toBe(true);

    miaSavePlan(family, { id: id(90), name: "Emme" }, [parsePlanWeek(week())]);
    const path = (task: number) => ({
      Title: "Vocabulary: Level G",
      LearningPathTask: {
        TaskType: "Practice",
        ThumbnailTitle: null,
        Description: "x",
        Thumbnail: { OriginalUrl: "https://miacademy.co/x/lessons/backgrounds/LanguageArts.svg" },
        Link: `/Content.Lesson/page?lesson=%22${id(50)}%22&taskAssignment=%22${id(task)}%22&_=`,
      },
    });
    miaPathSync(kid, parsePathCourses([path(2)]));
    expect(miaVocab(kid, MONDAY)?.tasks.map((t) => t.done)).toEqual([true, false]);
    miaPathSync(kid, parsePathCourses([path(3)]));
    expect(miaVocab(kid, MONDAY)?.done).toBe(true);

    expect(miaVocab(kid, TUESDAY)?.done).toBe(false);
    miaVocabDone(kid, TUESDAY);
    expect(miaVocab(kid, TUESDAY)?.done).toBe(true);
  });

  it("kids without a Vocabulary class have no step", () => {
    expect(miaVocab(kid, MONDAY)).toBeNull();
  });

  const weekday = ((new Date(`${today()}T12:00:00Z`).getUTCDay() + 6) % 7) + 1;
  it.runIf(weekday <= 4)("core timers wait until it's done (on a school day)", () => {
    const w = week();
    w.Days[0].Date = today();
    miaSavePlan(family, { id: id(90), name: "Emme" }, [parsePlanWeek(w)]);
    expect(() => miaAct(kid, "math", "start")).toThrow(/Vocabulary first/);
    miaVocabDone(kid);
    expect(() => miaAct(kid, "math", "start")).not.toThrow();
  });
});
