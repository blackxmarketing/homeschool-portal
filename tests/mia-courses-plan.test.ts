import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { parseCourseTasks, parsePlanWeek } from "@/lib/miaPlan";
import { addKid, createFamily, getMiaSettings, miaChecklist, miaLesson, miaSaveCourses, miaSavePlan, setMiaSettings } from "@/lib/store";

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
});
