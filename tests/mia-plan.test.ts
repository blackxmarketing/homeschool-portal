import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { parsePlanWeek, planLessonItems, planLessons } from "@/lib/miaPlan";
import { MIA_COURSE_PLANS } from "@/content/miacademy";
import { parsePathCourses } from "@/lib/miaSync";
import type { ParsedActivity } from "@/lib/miaLessons";
import {
  addKid,
  createFamily,
  createParentPairCode,
  familyFromParentToken,
  getMiaSettings,
  miaChecklist,
  miaChildren,
  miaPathSync,
  miaSavePlan,
  miaSetPdfParsed,
  miaSetParseState,
  redeemAnyPairCode,
  setMiaChild,
  setMiaSettings,
} from "@/lib/store";

const SCI_PDF = "https://miaplaza-content.s3.us-west-2.amazonaws.com/Science/General+Science+(SC)+(K8)/SC4+Forces+Gravity+Student+PDF.pdf";
const id = (n: number) => `00000000-0000-4000-8000-0000000000${String(n).padStart(2, "0")}`;

/** One week of the parent's calendar, in the shape Miacademy sends (Science and Reading Comprehension). */
const WEEK = {
  Days: [
    { Date: "2026-10-19", UnitTasks: [{ Unit: "u-rc", TaskAssignments: [id(1), id(2), id(3)] }] },
    { Date: "2026-10-21", UnitTasks: [{ Unit: "u-sci", TaskAssignments: [id(10), id(11), id(12), id(13), id(14)] }] },
    { Date: "2026-10-23", UnitTasks: [] },
  ],
  UnitConversions: [
    { UnitId: "u-rc", Subject: "LanguageArts", Title: "Unit 2", CourseTitle: "Reading Comprehension: Level E" },
    { UnitId: "u-sci", Subject: "Science", Title: "Unit 3: Forces and Motion", CourseTitle: "General Science" },
  ],
  TaskAssignmentConversions: [
    { TaskAssignmentId: id(1), Name: "Opossum", Type: "Pdf", Status: "Completed", PreviewData: { Url: "https://miaplaza-content.s3.us-west-2.amazonaws.com/Language+Arts/RD+(K-8)/RD4+Opossum+Student.pdf", Title: "Opossum" } },
    { TaskAssignmentId: id(2), Name: "Level 1", Type: "Practice", Status: "Completed", PreviewData: { Title: "Opossum" } },
    { TaskAssignmentId: id(3), Name: "Quiz Assessment", Type: "Assessment", Status: "NotStarted", PreviewData: { Title: "Opossum" } },
    { TaskAssignmentId: id(10), Name: "Forces: Gravity Student PDF", Type: "Pdf", Status: "NotStarted", PreviewData: { Url: SCI_PDF, Title: "Forces: Gravity" } },
    { TaskAssignmentId: id(11), Name: "Forces: Gravity", Type: "Video", Status: "NotStarted", PreviewData: { Url: "/Controllers.Curriculum.TaskPreviewController/x", Title: "Forces: Gravity" } },
    { TaskAssignmentId: id(12), Name: "Level 1", Type: "Practice", Status: "NotStarted", PreviewData: { Title: "Forces: Gravity" } },
    { TaskAssignmentId: id(13), Name: "Quiz Assessment", Type: "Assessment", Status: "NotStarted", PreviewData: { Title: "Forces: Gravity" } },
    { TaskAssignmentId: id(14), Name: "Bonus: Gravity Game", Type: "Practice", Status: "NotStarted", PreviewData: { Title: "Forces: Gravity" } },
  ],
};

const GRAVITY_PDF: ParsedActivity[] = [
  { title: "Watch the lesson video", kind: "video", pages: [], supplies: [] },
  { title: "Complete the guided notes", kind: "notes", pages: [3], supplies: [] },
  { title: "Online practice: Level 1", kind: "practice", pages: [], supplies: [] },
  { title: "Forces Word Search", kind: "worksheet", pages: [4, 5], supplies: [] },
  { title: "STEM Challenge: Marble Run", kind: "hands_on", pages: [8], supplies: ["Marbles"] },
  { title: "Online assessment", kind: "quiz", pages: [], supplies: [] },
];

describe("reading the parent's Miacademy calendar", () => {
  it("lists every marked task with its lesson, type, status and PDF", () => {
    const tasks = parsePlanWeek(WEEK);
    expect(tasks).toHaveLength(8);
    expect(tasks[3]).toMatchObject({ day: "2026-10-21", course: "General Science", subject: "sci", lessonTitle: "Forces: Gravity", type: "Pdf", pdfUrl: SCI_PDF });
    expect(tasks[4].pdfUrl).toBeNull(); // a video's preview link isn't a PDF
    expect(parsePlanWeek("nonsense")).toEqual([]);
  });

  it("builds Science items: video first, the packet's notes and activities, the quiz; practice and bonus left off", () => {
    const [, gravity] = planLessons(parsePlanWeek(WEEK));
    const items = planLessonItems(gravity, "sci", null, GRAVITY_PDF);
    expect(items.map((i) => [i.title, i.check])).toEqual([
      ["Watch the lesson video", "video"],
      ["Complete the guided notes", "self"],
      ["Forces Word Search", "photo"],
      ["STEM Challenge: Marble Run", "parent"],
      ["Quiz Assessment", "quiz"],
    ]);
    expect(items[0].id).toBe(`task-${id(11)}`);
  });

  it("builds online-only classes from Miacademy's tasks (the story is a tap)", () => {
    const [opossum] = planLessons(parsePlanWeek(WEEK));
    const items = planLessonItems(opossum, "ela", MIA_COURSE_PLANS.ela[0], null);
    expect(items.map((i) => [i.title, i.check])).toEqual([
      ["Read the story: Opossum", "self"],
      ["Online practice: Level 1", "online"],
      ["Quiz Assessment", "online"],
    ]);
  });
});

describe("parent mode in the store", () => {
  let kid: number;
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Bryce", avatar: "🐺", grade: 4, pin: "1111", dailyGoal: 45 });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 1, sci: 1, his: 0 } });
  });

  it("connects a parent's computer with its own code", () => {
    const code = createParentPairCode(family, 0);
    expect(code).toMatch(/^P[A-Z2-9]{5}$/);
    const r = redeemAnyPairCode(code, 1000);
    expect(r.kind).toBe("parent");
    expect(familyFromParentToken(r.token)).toBe(family);
    expect(() => redeemAnyPairCode(code, 2000)).toThrow(/didn't work/);
  });

  it("matches a Miacademy student to a kid by first name, and a parent can change it", () => {
    expect(miaSavePlan(family, { id: id(90), name: "Bryce" }, [parsePlanWeek(WEEK)]).kidId).toBe(kid);
    expect(miaSavePlan(family, { id: id(91), name: "Emerson" }, [parsePlanWeek(WEEK)])).toEqual({ kidId: null, tasks: 0 });
    setMiaChild(family, id(91), kid);
    expect(miaChildren(family).find((c) => c.name === "Emerson")?.kid_id).toBe(kid);
  });

  it("builds the checklist from the calendar and checks tasks off as the kid moves past them", () => {
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [parsePlanWeek(WEEK)]);
    // The Student PDF isn't read yet: only the video shows, and the PDF is waiting to be read.
    let sci = miaChecklist(kid, "sci")!.parts[0];
    expect(sci.fromCalendar).toBe(true);
    expect(sci.upcoming.map((u) => u.item.title)).toEqual(["Watch the lesson video"]);
    expect(sci.toRead).toHaveLength(1);
    miaSetPdfParsed(sci.toRead[0], GRAVITY_PDF);
    miaSetParseState(sci.toRead[0], "ready");
    sci = miaChecklist(kid, "sci")!.parts[0];
    expect(sci.upcoming.map((u) => u.item.title)).toEqual(["Watch the lesson video", "Complete the guided notes", "Forces Word Search"]);
    // On Bryce's assignments page the Science task is now the quiz: the video is done.
    miaPathSync(kid, parsePathCourses([
      {
        Title: "General Science",
        LearningPathTask: {
          TaskType: "Assessment",
          Thumbnail: { OriginalUrl: "https://miacademy.co/x/lessons/backgrounds/Science.svg" },
          Link: `/Content.Lesson/page?lesson=%22${id(50)}%22&taskAssignment=%22${id(13)}%22&_=`,
        },
      },
    ]));
    sci = miaChecklist(kid, "sci")!.parts[0];
    expect(sci.upcoming[0].item.title).toBe("Complete the guided notes");
  });

  it("finishes an online-only lesson once Miacademy marks its tasks done", () => {
    const week = structuredClone(WEEK);
    week.TaskAssignmentConversions[2].Status = "Completed";
    miaSavePlan(family, { id: id(90), name: "Bryce" }, [parsePlanWeek(week)]);
    const rc = miaChecklist(kid, "ela", "2026-10-19")!.parts[0];
    // Miacademy marked every task (the story too) done: nothing left for this lesson.
    expect(rc.upcoming).toEqual([]);
  });
});
