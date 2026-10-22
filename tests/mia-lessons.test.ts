import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { answerKeyUrl, buildItems, guessStudentPdf, lessonTitleFromTask, weekStart, type ParsedActivity } from "@/lib/miaLessons";
import { lessonKeyFromLink, parsePathCourses } from "@/lib/miaSync";
import {
  addKid,
  createFamily,
  getMiaSettings,
  miaAct,
  miaChecklist,
  miaDay,
  miaFinishItem,
  miaLesson,
  miaPathSync,
  miaRecordPhotoCheck,
  miaSetParseState,
  miaSetStudentPdf,
  miaWaitingForParent,
  parentMiaItem,
  parentMiaSupplies,
  setMiaSettings,
  setParentPin,
  unseenAlerts,
} from "@/lib/store";

const PDF = "https://miaplaza-content.s3.us-west-2.amazonaws.com/Science/General+Science+(SC)+(K8)/SC4+Forces+Gravity+Student+PDF.pdf";

/** The checklist on page 1 of the "Forces: Gravity" Student PDF, as read off the PDF. */
const GRAVITY: ParsedActivity[] = [
  { title: "Watch the lesson video", kind: "video", pages: [], supplies: [] },
  { title: "Complete the guided notes", kind: "worksheet", pages: [3], supplies: [] },
  { title: "Online practice: Level 1", kind: "other", pages: [], supplies: [] },
  { title: "Rewatch the lesson video (optional)", kind: "video", pages: [], supplies: [] },
  { title: "Forces Word Search", kind: "worksheet", pages: [4, 5], supplies: [] },
  { title: "Online practice: Level 2", kind: "other", pages: [], supplies: [] },
  { title: "Out of This World", kind: "worksheet", pages: [6, 7], supplies: [] },
  { title: "Online practice Level 3", kind: "other", pages: [], supplies: [] },
  { title: "STEM Challenge: Marble Run", kind: "hands_on", pages: [8, 9, 10, 11, 12], supplies: ["Cardboard", "Stopwatch", "Marbles", "Tubing", "Tape"] },
  { title: "Online practice: Level 4", kind: "other", pages: [], supplies: [] },
  { title: "Online assessment", kind: "quiz", pages: [], supplies: [] },
];

/** Miacademy's assignments-page data, as the extension passes it on (Science only). */
const path = (lessonId: string, type: string, title: string | null, description = "Explore this activity!") => [
  {
    Title: "General Science",
    State: "Required",
    LearningPathTask: {
      TaskType: type,
      ThumbnailTitle: title,
      Description: description,
      Thumbnail: { OriginalUrl: "https://miacademy.co/generated/static-images/shared/shared/lessons/backgrounds/Science.svg" },
      Link: `/Content.Lesson/page?lesson=%22${lessonId}%22&isAssignmentMode=true&taskAssignment=%2233e3a3b5-10ec-46cf-b859-8d3576e0e996%22&_=`,
    },
  },
];
const GRAVITY_ID = "b2086720-4a09-4c3f-a96b-502b984d3143";
const MAGNETISM_ID = "c3086720-4a09-4c3f-a96b-502b984d3144";

describe("building a lesson checklist", () => {
  it("keeps each activity as its own item, minus practice and optional ones", () => {
    const items = buildItems(GRAVITY);
    expect(items.map((i) => [i.title, i.check])).toEqual([
      ["Watch the lesson video", "video"],
      ["Complete the guided notes", "photo"],
      ["Forces Word Search", "photo"],
      ["Out of This World", "photo"],
      ["STEM Challenge: Marble Run", "parent"],
      ["Online assessment", "quiz"],
    ]);
    expect(items[4].supplies).toContain("Marbles");
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
  });

  it("finds the answer key next to the Student PDF", () => {
    expect(answerKeyUrl(PDF)).toBe(PDF.replace("Student+PDF.pdf", "Answer+Key.pdf"));
    expect(answerKeyUrl("https://x/y.pdf")).toBeNull();
  });

  it("guesses the next lesson's PDF from this one's", () => {
    expect(guessStudentPdf(PDF, "Forces: Gravity", "Forces: Magnetism")).toBe(PDF.replace("Forces+Gravity", "Forces+Magnetism"));
    expect(guessStudentPdf(PDF, "Something else", "Forces: Magnetism")).toBeNull();
  });

  it("reads Miacademy's data", () => {
    expect(lessonTitleFromTask("Forces: Gravity Student PDF")).toBe("Forces: Gravity");
    expect(lessonKeyFromLink(path(GRAVITY_ID, "Pdf", "x")[0].LearningPathTask.Link)).toBe(GRAVITY_ID);
    expect(parsePathCourses(path(GRAVITY_ID, "Pdf", "Forces: Gravity Student PDF"))).toEqual([
      { subject: "sci", courseTitle: "General Science", taskType: "Pdf", taskTitle: "Forces: Gravity Student PDF", lessonKey: GRAVITY_ID },
    ]);
    expect(parsePathCourses("nonsense")).toEqual([]);
  });

  it("starts the week on Monday", () => {
    expect(weekStart("2026-10-21")).toBe("2026-10-19");
    expect(weekStart("2026-10-25")).toBe("2026-10-19");
    expect(weekStart("2026-10-26")).toBe("2026-10-26");
  });
});

describe("a kid's Science checklist", () => {
  let kid: number;
  let family: number;
  const lessonOf = () => miaChecklist(kid, "sci")!.upcoming[0].lessonId;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
    kid = addKid(family, { name: "Kid", avatar: "🙂", grade: 4, pin: "1111", dailyGoal: 45 });
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 0, sci: 1, his: 0 } });
  });

  function startGravity() {
    miaPathSync(kid, parsePathCourses(path(GRAVITY_ID, "Pdf", "Forces: Gravity Student PDF")));
    const id = miaSetStudentPdf(kid, GRAVITY_ID, PDF)!;
    miaSetParseState(id, "ready", buildItems(GRAVITY));
    return id;
  }

  it("ignores subjects without a checklist", () => {
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 0, sci: 0, his: 0 } });
    miaPathSync(kid, parsePathCourses(path(GRAVITY_ID, "Pdf", "Forces: Gravity Student PDF")));
    expect(miaChecklist(kid, "sci")).toBeNull();
  });

  it("waits for the Student PDF, then shows three activities at a time", () => {
    miaPathSync(kid, parsePathCourses(path(GRAVITY_ID, "Pdf", "Forces: Gravity Student PDF")));
    expect(miaChecklist(kid, "sci")).toMatchObject({ needsPdf: true, upcoming: [], lessonTitle: "Forces: Gravity" });
    expect(miaSetStudentPdf(kid, GRAVITY_ID, "https://evil.example/x.pdf")).toBeNull();
    const id = miaSetStudentPdf(kid, GRAVITY_ID, PDF)!;
    miaSetParseState(id, "ready", buildItems(GRAVITY));
    const c = miaChecklist(kid, "sci")!;
    expect(c.upcoming.map((u) => u.item.title)).toEqual(["Watch the lesson video", "Complete the guided notes", "Forces Word Search"]);
    expect(c).toMatchObject({ left: 6, target: 1, doneThisWeek: 0 });
  });

  it("checks off the video when Miacademy moves on to the quiz", () => {
    startGravity();
    miaPathSync(kid, parsePathCourses(path(GRAVITY_ID, "Assessment", null)));
    expect(miaChecklist(kid, "sci")!.upcoming[0].item.title).toBe("Complete the guided notes");
  });

  it("keeps the first photo's score, re-checks fixes, and tells a parent about low scores", () => {
    const id = startGravity();
    miaRecordPhotoCheck(kid, id, "complete-the-guided-notes", { right: 2, total: 6, wrong: [{ question: "blank 1", answer: "attraction" }] }, "1/a.jpg");
    expect(unseenAlerts(family).map((a) => a.kind)).toEqual(["low-score"]);
    miaRecordPhotoCheck(kid, id, "complete-the-guided-notes", { right: 6, total: 6, wrong: [] }, "1/b.jpg");
    expect(miaLesson(kid, id)!.states["complete-the-guided-notes"]).toMatchObject({ right: 2, total: 6, wrong: [] });
    miaFinishItem(kid, id, "complete-the-guided-notes");
    expect(miaLesson(kid, id)!.states["complete-the-guided-notes"].done).toBe(true);
    expect(() => miaFinishItem(kid, id, "forces-word-search")).toThrow(/photo first/);
  });

  it("pauses the timer for supplies; a parent restarts it, then approves the activity", () => {
    const id = startGravity();
    setParentPin(family, "2468");
    miaAct(kid, "sci", "start", { now: 0 });
    expect(() => miaAct(kid, "sci", "supplies", { now: 1000, lessonId: id, itemId: "forces-word-search" })).toThrow(/doesn't need supplies/);
    miaAct(kid, "sci", "supplies", { now: 60_000, lessonId: id, itemId: "stem-challenge-marble-run" });
    expect(miaDay(kid).sci?.pause?.type).toBe("supplies");
    expect(unseenAlerts(family).map((a) => a.kind)).toContain("supplies");
    // On the kid's screen it always takes the parent PIN.
    expect(() => miaAct(kid, "sci", "helpResume", { now: 120_000 })).toThrow(/isn't right/);
    parentMiaSupplies(family, kid, "sci", "ready", 120_000);
    expect(miaDay(kid).sci?.pause).toBeNull();
    expect(miaLesson(kid, id)!.states["stem-challenge-marble-run"].suppliesReady).toBe(true);
    miaFinishItem(kid, id, "stem-challenge-marble-run", "1/run.jpg");
    expect(miaWaitingForParent(family)).toHaveLength(1);
    parentMiaItem(family, kid, id, "stem-challenge-marble-run", "approve");
    expect(miaWaitingForParent(family)).toHaveLength(0);
    expect(miaLesson(kid, id)!.states["stem-challenge-marble-run"].done).toBe(true);
  });

  it("lets a parent skip a supplies activity with the PIN on the kid's screen", () => {
    const id = startGravity();
    setParentPin(family, "2468");
    miaAct(kid, "sci", "start", { now: 0 });
    miaAct(kid, "sci", "supplies", { now: 1000, lessonId: id, itemId: "stem-challenge-marble-run" });
    miaAct(kid, "sci", "helpResume", { now: 2000, pin: "2468", skip: true });
    expect(miaLesson(kid, id)!.states["stem-challenge-marble-run"]).toMatchObject({ done: true, skipped: true });
    expect(miaDay(kid).sci?.pause).toBeNull();
  });

  it("finishes the lesson when Miacademy moves to the next one, and counts it for the week", () => {
    const id = startGravity();
    for (const item of ["complete-the-guided-notes", "forces-word-search", "out-of-this-world"]) {
      miaRecordPhotoCheck(kid, id, item, { right: 5, total: 5, wrong: [] }, "1/x.jpg");
      miaFinishItem(kid, id, item);
    }
    parentMiaItem(family, kid, id, "stem-challenge-marble-run", "skip");
    miaPathSync(kid, parsePathCourses(path(GRAVITY_ID, "Assessment", null)));
    expect(miaChecklist(kid, "sci")!.upcoming.map((u) => u.item.title)).toEqual(["Online assessment"]);
    // Quiz done in Miacademy: it moves on to the next lesson, and guesses that lesson's PDF.
    const toRead = miaPathSync(kid, parsePathCourses(path(MAGNETISM_ID, "Pdf", "Forces: Magnetism Student PDF")));
    expect(miaLesson(kid, id)!.doneDay).not.toBeNull();
    expect(miaChecklist(kid, "sci")).toMatchObject({ doneThisWeek: 1, lessonTitle: "Forces: Magnetism" });
    expect(toRead).toHaveLength(1);
    expect(miaLesson(kid, toRead[0])!.studentPdf).toBe(PDF.replace("Forces+Gravity", "Forces+Magnetism"));
    expect(lessonOf).toThrow(); // nothing to show until the new PDF is read
  });
});
