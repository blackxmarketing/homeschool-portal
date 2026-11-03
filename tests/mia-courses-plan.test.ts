import { beforeEach, describe, expect, it } from "vitest";
import { getDb, openDb, setDb } from "@/lib/db";
import { parseCourseTasks, parsePlanWeek } from "@/lib/miaPlan";
import { addKid, createFamily, getMiaSettings, miaChecklist, miaFinishItem, miaLesson, miaSaveCourses, miaSavePlan, miaSetParseState, miaSetPdfParsed, setMiaSettings, unseenAlerts } from "@/lib/store";

const id = (n: number) => `00000000-0000-4000-8000-0000000000${String(n).padStart(2, "0")}`;
const S3 = "https://miaplaza-content.s3.us-west-2.amazonaws.com/Social+Studies/US+Geography";

/** What parent mode reads off the course page: U.S. Geography, one lesson done, two to do. */
const task = (n: number, lesson: string, type: string, name: string, completed = false, seq = n) => ({
  taskId: id(n),
  course: "U.S. Geography",
  subject: "GeographyAndHistory",
  unitTitle: "Unit 4: The Midwest",
  lessonTitle: lesson,
  name,
  type,
  completed,
  pdfUrl: type === "Pdf" ? `${S3}/USG+${lesson.replace(/ /g, "+")}+Student+PDF.pdf` : null,
  keyUrl: `${S3}/USG+${lesson.replace(/ /g, "+")}+Answer+Key.pdf`,
  seq,
});
const COURSE = [
  task(1, "The Great Lakes", "Video", "The Great Lakes", true),
  task(2, "The Great Lakes", "Assessment", "Quiz", true),
  task(10, "The Great Plains", "Video", "The Great Plains", false, 10),
  task(11, "The Great Plains", "Pdf", "The Great Plains Student PDF", false, 11),
  task(12, "The Great Plains", "Practice", "Level 1", false, 12),
  task(13, "The Great Plains", "Assessment", "Quiz", false, 13),
  task(20, "Mississippi River", "Video", "Mississippi River", false, 20),
  task(21, "Mississippi River", "Assessment", "Quiz", false, 21),
];

describe("the checklist from the parent's course pages", () => {
  let kid: number;
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Bryce", avatar: "🐺", grade: 6, pin: "1111", dailyGoal: 45 });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 0, sci: 0, his: 1 } });
    miaSavePlan(family, { id: id(90), name: "Bryce" }, []);
  });

  it("reads tasks: assigned ones to do, done ones marked, bad rows dropped", () => {
    const tasks = parseCourseTasks([...COURSE, { taskId: "nope", course: "x", seq: 1 }]);
    expect(tasks).toHaveLength(COURSE.length);
    expect(tasks[0]).toMatchObject({ subject: "his", status: "Completed", day: "" });
    expect(tasks[3]).toMatchObject({ type: "Pdf", status: "Assigned", pdfUrl: expect.stringContaining("Student+PDF"), keyUrl: expect.stringContaining("Answer+Key") });
  });

  it("builds the whole class ahead of time, in course order, skipping lessons finished before", () => {
    expect(miaSaveCourses(kid, parseCourseTasks(COURSE))).toBe(COURSE.length);
    const his = miaChecklist(kid, "his")!.parts[0];
    // The Great Lakes was already finished: not on the checklist, and not counted this week.
    expect(his.lessonTitle).toBe("The Great Plains");
    expect(his.doneThisWeek).toBe(0);
    // Its answer key comes from the course page.
    const lesson = miaLesson(kid, his.upcoming[0].lessonId)!;
    expect(lesson.answerKey).toContain("The+Great+Plains+Answer+Key.pdf");
  });

  it("keeps the calendar's dates for tasks it also knows", () => {
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [
      parsePlanWeek({
        Days: [{ Date: "2026-10-27", UnitTasks: [{ Unit: "u", TaskAssignments: [id(10)] }] }],
        UnitConversions: [{ UnitId: "u", Subject: "GeographyAndHistory", Title: "Unit 4: The Midwest", CourseTitle: "U.S. Geography" }],
        TaskAssignmentConversions: [{ TaskAssignmentId: id(10), Name: "The Great Plains", Type: "Video", Status: "None", PreviewData: { Title: "The Great Plains" } }],
      }),
    ]);
    miaSaveCourses(kid, parseCourseTasks(COURSE));
    const his = miaChecklist(kid, "his")!.parts[0];
    expect(his.lessonTitle).toBe("The Great Plains");
    expect(his.upcoming.length).toBeGreaterThan(0);
  });

  it("moves on when the kid does in Miacademy, even before the parent's course pages catch up", () => {
    miaSaveCourses(kid, parseCourseTasks(COURSE.filter((t) => t.type !== "Pdf")));
    expect(miaChecklist(kid, "his")!.parts[0].lessonTitle).toBe("The Great Plains");
    // The kid is on Mississippi River's quiz; the course pages still say The Great Plains isn't done.
    getDb().prepare("INSERT INTO mia_path (kid_id, course, task_id, task_type, at) VALUES (?, 'U.S. Geography', ?, 'Assessment', 1)").run(kid, id(21));
    const his = miaChecklist(kid, "his")!.parts[0];
    expect(his.lessonTitle).toBe("Mississippi River");
    expect(his.doneThisWeek).toBe(1);
  });

  const atTask = (n: number) =>
    getDb().prepare("INSERT OR REPLACE INTO mia_path (kid_id, course, task_id, task_type, at) VALUES (?, 'U.S. Geography', ?, 'Video', 1)").run(kid, id(n));
  const notes = [{ title: "Complete the guided notes", kind: "notes" as const, pages: [2], supplies: [] }];
  /** The Great Plains with its packet read, and no practice (so the packet's activities count). */
  function withPacket() {
    miaSaveCourses(kid, parseCourseTasks(COURSE.filter((t) => t.type !== "Practice")));
    const lessonId = miaChecklist(kid, "his")!.parts[0].upcoming[0].lessonId;
    miaSetPdfParsed(lessonId, notes);
    miaSetParseState(lessonId, "ready");
    return lessonId;
  }
  const notesId = (lessonId: number) => miaLesson(kid, lessonId)!.items!.find((i) => i.check === "self")!.id;

  it("puts the packet before the test, whatever Miacademy's order", () => {
    const quizFirst = COURSE.map((t) => (t.taskId === id(13) ? { ...t, seq: 10.5 } : t));
    miaSaveCourses(kid, parseCourseTasks(quizFirst));
    const lessonId = miaChecklist(kid, "his")!.parts[0].upcoming[0].lessonId;
    miaSetPdfParsed(lessonId, notes);
    miaChecklist(kid, "his");
    expect(miaLesson(kid, lessonId)!.items!.at(-1)!.check).toBe("quiz");
  });

  it("holds on the packet when the kid moves on without it, tells a parent once, and counts the lesson when it's done", () => {
    const lessonId = withPacket();
    miaChecklist(kid, "his");
    atTask(20);
    const his = () => miaChecklist(kid, "his")!.parts[0];
    expect(his()).toMatchObject({ lessonTitle: "The Great Plains", doneThisWeek: 0 });
    expect(his().upcoming[0]).toMatchObject({ item: { check: "self" }, state: { held: true } });
    expect(unseenAlerts(family).filter((a) => /before finishing the packet/.test(a.message))).toHaveLength(1);
    miaFinishItem(kid, lessonId, notesId(lessonId));
    expect(his()).toMatchObject({ lessonTitle: "Mississippi River", doneThisWeek: 1 });
  });

  it("holds when the kid opens the test with the packet open", () => {
    const lessonId = withPacket();
    miaChecklist(kid, "his");
    atTask(13);
    expect(miaChecklist(kid, "his")!.parts[0].upcoming.find((u) => u.item.check === "self")).toMatchObject({ lessonId, state: { held: true } });
  });

  it("closes a lesson far behind where the kid is, packet and all (catching up)", () => {
    withPacket();
    miaChecklist(kid, "his");
    const later = { ...task(30, "Ohio River", "Video", "Ohio River", false, 30) };
    miaSaveCourses(kid, parseCourseTasks([...COURSE.filter((t) => t.type !== "Practice"), later]));
    atTask(30);
    expect(miaChecklist(kid, "his")!.parts[0].lessonTitle).not.toBe("The Great Plains");
  });

  it("counts a lesson only once Miacademy shows it finished, not on the check-offs alone", () => {
    miaSaveCourses(kid, parseCourseTasks(COURSE.filter((t) => t.type === "Video" || t.taskId === id(1))));
    const his = () => miaChecklist(kid, "his")!.parts[0];
    const top = his().upcoming[0];
    miaFinishItem(kid, top.lessonId, top.item.id);
    expect(his().doneThisWeek).toBe(0);
    atTask(20);
    expect(his().doneThisWeek).toBe(1);
  });

  it("follows the class on the kid's assignments page, and forgets a class the parent removed", () => {
    // Also enrolled in Government (first on the parent's class list), but working on The Midwest.
    const gov = [
      { ...task(50, "Branches of Government", "Video", "Branches of Government", false, 0), course: "Geography and Government", unitTitle: "Unit 1" },
      { ...task(51, "Branches of Government", "Assessment", "Quiz", false, 1), course: "Geography and Government", unitTitle: "Unit 1" },
    ];
    const geo = COURSE.map((t) => ({ ...t, seq: 1_000_000 + t.seq }));
    miaSaveCourses(kid, parseCourseTasks([...gov, ...geo]));
    expect(miaChecklist(kid, "his")!.parts[0].lessonTitle).toBe("Branches of Government");
    getDb().prepare("INSERT INTO mia_path (kid_id, course, task_id, task_type, at) VALUES (?, 'U.S. Geography', ?, 'Video', 1)").run(kid, id(10));
    expect(miaChecklist(kid, "his")!.parts[0].lessonTitle).toBe("The Great Plains");
    // The parent removes Government in Miacademy: the next read of the course pages drops it.
    miaSaveCourses(kid, parseCourseTasks(geo));
    const courses = getDb().prepare("SELECT DISTINCT course FROM mia_plan_tasks WHERE kid_id = ?").all(kid) as { course: string }[];
    expect(courses.map((c) => c.course)).toEqual(["U.S. Geography"]);
  });
});
