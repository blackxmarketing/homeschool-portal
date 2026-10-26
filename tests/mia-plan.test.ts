import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { parsePlanWeek, planLessonItems, planLessons } from "@/lib/miaPlan";
import { MIA_COURSE_PLANS, miaCoursePlan } from "@/content/miacademy";
import { answerKeyCandidates } from "@/lib/miaLessons";
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

  it("builds Science items: video first, the packet's notes and activities, marked practice, the quiz; bonus left off", () => {
    const [, gravity] = planLessons(parsePlanWeek(WEEK));
    const items = planLessonItems(gravity, "sci", null, GRAVITY_PDF);
    expect(items.map((i) => [i.title, i.check])).toEqual([
      ["Watch the lesson video", "video"],
      ["Complete the guided notes", "self"],
      ["Forces Word Search", "photo"],
      ["STEM Challenge: Marble Run", "parent"],
      ["Online practice: Level 1", "practice"], // marked in Miacademy, so it counts
      ["Quiz Assessment", "quiz"],
    ]);
    // Regular Math lessons skip online practice even when it's marked.
    expect(planLessonItems({ ...gravity, course: "Math: Level E" }, "math", null, GRAVITY_PDF).some((i) => i.check === "practice")).toBe(false);
    // Ancient World History does the packet instead, even when practice is marked; U.S. Geography does every level.
    expect(planLessonItems({ ...gravity, course: "Ancient World History" }, "his", null, GRAVITY_PDF).some((i) => i.check === "practice")).toBe(false);
    expect(planLessonItems({ ...gravity, course: "U.S. Geography" }, "his", null, GRAVITY_PDF).some((i) => i.check === "practice")).toBe(true);
    expect(items[0].id).toBe(`task-${id(11)}`);
  });

  it("builds online-only classes from Miacademy's tasks (the story is a tap)", () => {
    const [opossum] = planLessons(parsePlanWeek(WEEK));
    const items = planLessonItems(opossum, "ela", miaCoursePlan("ela", opossum.course), null);
    expect(items.map((i) => [i.title, i.check])).toEqual([
      ["Read the story: Opossum", "self"],
      ["Online practice: Level 1", "online"],
      ["Quiz Assessment", "online"],
    ]);
  });
});

describe("Reading Comprehension with a reading guide (Level G and up)", () => {
  it("lists each step of the guide: written answers get the photo check, reading is a tap, the video and quiz come from Miacademy", () => {
    const course = "Reading Comprehension: Level G";
    expect(miaCoursePlan("ela", course)).toMatchObject({ name: "Reading Comprehension", onlineOnly: false, tapGuide: true });
    expect(miaCoursePlan("ela", "Reading Comprehension: Level E")).toMatchObject({ onlineOnly: true, readPdf: "Read the story" });
    const guide = [
      { title: "Watch the video.", kind: "video" as const, pages: [], supplies: [] },
      { title: "Complete the Vocabulary Activity.", kind: "worksheet" as const, pages: [4], supplies: [] },
      { title: "Read some information about today's passage.", kind: "other" as const, pages: [5], supplies: [] },
      { title: "Start thinking about the topics in the passage by answering the questions.", kind: "worksheet" as const, pages: [5], supplies: [] },
      { title: "Read the passage.", kind: "other" as const, pages: [6], supplies: [] },
      { title: "Reflect on what you have read by answering the questions.", kind: "worksheet" as const, pages: [7], supplies: [] },
      { title: "Complete the Online Assessment questions.", kind: "quiz" as const, pages: [], supplies: [] },
    ];
    const lesson = {
      key: "k",
      course,
      unitTitle: "Unit 5",
      title: "Finding the Central Idea",
      pdfUrl: "https://miaplaza-content.s3.us-west-2.amazonaws.com/x/RC6+5.1.1+Student+PDF.pdf",
      tasks: parsePlanWeek({
        Days: [{ Date: "2026-10-28", UnitTasks: [{ Unit: "u", TaskAssignments: [id(1), id(2), id(3)] }] }],
        UnitConversions: [{ UnitId: "u", Subject: "LanguageArts", Title: "Unit 5", CourseTitle: course }],
        TaskAssignmentConversions: [
          { TaskAssignmentId: id(1), Name: "Finding the Central Idea Student PDF", Type: "Pdf", Status: "None", PreviewData: { Title: "Finding the Central Idea", Url: "https://miaplaza-content.s3.us-west-2.amazonaws.com/x/RC6+5.1.1+Student+PDF.pdf" } },
          { TaskAssignmentId: id(2), Name: "Finding the Central Idea", Type: "Video", Status: "None", PreviewData: { Title: "Finding the Central Idea" } },
          { TaskAssignmentId: id(3), Name: "Quiz Assessment", Type: "Assessment", Status: "None", PreviewData: { Title: "Finding the Central Idea" } },
        ],
      }),
    };
    const items = planLessonItems(lesson, "ela", miaCoursePlan("ela", course), guide);
    expect(items.map((i) => [i.title, i.check])).toEqual([
      ["Watch the lesson video", "video"],
      ["Complete the Vocabulary Activity.", "photo"],
      ["Read some information about today's passage.", "self"],
      ["Start thinking about the topics in the passage by answering the questions.", "photo"],
      ["Read the passage.", "self"],
      ["Reflect on what you have read by answering the questions.", "photo"],
      ["Quiz Assessment", "quiz"],
    ]);
  });
});

describe("answer keys", () => {
  it("tries the Student PDF's own number first, then the lesson's other numbers (Reading Comprehension keys are numbered differently)", () => {
    const rc = "https://miaplaza-content.s3.us-west-2.amazonaws.com/Language+Arts/RC6+(K8)/RC6+4.4.1+Student+PDF.pdf";
    const c = answerKeyCandidates(rc);
    expect(c[0]).toBe("https://miaplaza-content.s3.us-west-2.amazonaws.com/Language+Arts/RC6+(K8)/RC6+4.4.1+Answer+Key.pdf");
    expect(c).toContain("https://miaplaza-content.s3.us-west-2.amazonaws.com/Language+Arts/RC6+(K8)/RC6+4.4.3+Answer+Key.pdf");
    expect(new Set(c).size).toBe(9);
    expect(answerKeyCandidates("https://x/Science/Gravity+Student+PDF.pdf")).toEqual(["https://x/Science/Gravity+Answer+Key.pdf"]);
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
