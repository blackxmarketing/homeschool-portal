import { beforeEach, describe, expect, it } from "vitest";
import { openDb, setDb } from "@/lib/db";
import { answerKeyUrl, buildItems, guessStudentPdf, lessonTitleFromTask, nextNumberedPdfs, onlineTaskTitle, weekStart, type ParsedActivity } from "@/lib/miaLessons";
import { lessonKeyFromLink, parsePathCourses, sameLesson } from "@/lib/miaSync";
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
  miaSetBigLesson,
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
  { title: "Complete the guided notes", kind: "notes", pages: [3], supplies: [] },
  { title: "Online practice: Level 1", kind: "practice", pages: [], supplies: [] },
  { title: "Rewatch the lesson video (optional)", kind: "video", pages: [], supplies: [] },
  { title: "Forces Word Search", kind: "worksheet", pages: [4, 5], supplies: [] },
  { title: "Online practice: Level 2", kind: "practice", pages: [], supplies: [] },
  { title: "Out of This World", kind: "worksheet", pages: [6, 7], supplies: [] },
  { title: "Online practice Level 3", kind: "practice", pages: [], supplies: [] },
  { title: "STEM Challenge: Marble Run", kind: "hands_on", pages: [8, 9, 10, 11, 12], supplies: ["Cardboard", "Stopwatch", "Marbles", "Tubing", "Tape"] },
  { title: "Online practice: Level 4", kind: "practice", pages: [], supplies: [] },
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
      ["Complete the guided notes", "self"],
      ["Forces Word Search", "photo"],
      ["Out of This World", "photo"],
      ["STEM Challenge: Marble Run", "parent"],
      ["Online assessment", "quiz"],
    ]);
    expect(items[4].supplies).toContain("Marbles");
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
  });

  it("does the PDF activities in Math too, but online practice instead on Wrap Up lessons", () => {
    const math: ParsedActivity[] = [
      { title: "Watch the lesson video", kind: "video", pages: [], supplies: [] },
      { title: "Complete the guided notes", kind: "notes", pages: [2], supplies: [] },
      { title: "Fraction Match", kind: "worksheet", pages: [3], supplies: [] },
      { title: "Bonus: Fraction Art", kind: "worksheet", pages: [4], supplies: [] },
      { title: "Online practice: Level 1", kind: "practice", pages: [], supplies: [] },
      { title: "Online practice: Level 2", kind: "practice", pages: [], supplies: [] },
      { title: "Online assessment", kind: "quiz", pages: [], supplies: [] },
    ];
    expect(buildItems(math, "math", "Mixed Numbers").map((i) => i.check)).toEqual(["video", "self", "photo", "quiz"]);
    expect(buildItems(math, "math", "Unit 4 Wrap Up").map((i) => [i.title, i.check])).toEqual([
      ["Watch the lesson video", "video"],
      ["Complete the guided notes", "self"],
      ["Online practice: Level 1", "practice"],
      ["Online practice: Level 2", "practice"],
      ["Online assessment", "quiz"],
    ]);
    // U.S. Geography: guided notes and every practice level, no packet activities.
    expect(buildItems(math, "his", "The South", "U.S. Geography").map((i) => i.check)).toEqual(["video", "self", "practice", "practice", "quiz"]);
    expect(buildItems(math, "his", "What Is Government?", "U.S Government (Revised 2026)").map((i) => i.check)).toEqual(["video", "self", "photo", "quiz"]);
    // Wrap Up only changes Math.
    expect(buildItems(math, "sci", "Unit 4 Wrap-Up").map((i) => i.check)).toEqual(["video", "self", "photo", "quiz"]);
  });

  it("reads a real Math checklist: video and notes on one line, practice dropped", () => {
    // Page 1 of "Improper Fractions" (MAE 4.6.1).
    const improper: ParsedActivity[] = [
      { title: "Video and Guided Notes", kind: "notes", pages: [2, 3], supplies: [] },
      { title: "Practice - Level 1", kind: "practice", pages: [], supplies: [] },
      { title: "Practice - Level 2", kind: "practice", pages: [], supplies: [] },
      { title: "Identify It", kind: "worksheet", pages: [4], supplies: [] },
      { title: "Practice - Level 3", kind: "practice", pages: [], supplies: [] },
      { title: "Practice - Level 4", kind: "practice", pages: [], supplies: [] },
      { title: "Fraction Forms", kind: "worksheet", pages: [5], supplies: [] },
      { title: "Assessment", kind: "quiz", pages: [], supplies: [] },
    ];
    expect(buildItems(improper, "math", "Improper Fractions", "Math: Level E").map((i) => [i.title, i.check, i.pages.join(",")])).toEqual([
      ["Watch the lesson video", "video", ""],
      ["Complete the guided notes", "self", "2,3"],
      ["Identify It", "photo", "4"],
      ["Fraction Forms", "photo", "5"],
      ["Assessment", "quiz", ""],
    ]);
  });

  it("builds U.S. Geography from Miacademy when the packet has no checklist", () => {
    // "Great Smoky Mountains National Park" (USG 3.4.1): note pages and extension ideas only.
    const smoky: ParsedActivity[] = [
      { title: "Listening Sheet", kind: "notes", pages: [3, 4], supplies: [] },
      { title: "Coloring and Labeling: The Smoky Mountains", kind: "other", pages: [5], supplies: [] },
      { title: "Model cabin", kind: "hands_on", pages: [], supplies: ["Popsicle sticks", "Glue"] },
      { title: "Operation Exploration Investigation", kind: "other", pages: [6], supplies: [] },
    ];
    const items = buildItems(smoky, "his", "Great Smoky Mountains National Park", "U.S. Geography");
    expect(items.map((i) => [i.title, i.check])).toEqual([
      ["Watch the lesson video", "video"],
      ["Listening Sheet", "self"],
      ["Online practice (all levels)", "practice"],
      ["Online quiz", "quiz"],
    ]);
    expect(items[2].allLevels).toBe(true);
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
      {
        subject: "sci",
        courseTitle: "General Science",
        taskType: "Pdf",
        taskTitle: "Forces: Gravity Student PDF",
        lessonKey: GRAVITY_ID,
        taskKey: "33e3a3b5-10ec-46cf-b859-8d3576e0e996",
        taskDescription: "Explore this activity!",
      },
    ]);
    expect(parsePathCourses("nonsense")).toEqual([]);
  });

  it("names online tasks for kids and guesses numbered PDFs", () => {
    expect(onlineTaskTitle("Video", null, "Can you watch all of this learning video: The Writing Process: Getting Started?")).toBe(
      "Watch the video: The Writing Process: Getting Started",
    );
    expect(onlineTaskTitle("Practice", null, "Can you earn a bronze medal in Sentences 2?")).toBe("Earn a bronze medal in Sentences 2");
    const la = "https://miaplaza-content.s3.us-west-2.amazonaws.com/Language+Arts/LS4+(Revised+2026)/LS4+2.13.1+Student+PDF.pdf";
    expect(nextNumberedPdfs(la)).toEqual([la.replace("2.13.1", "2.14.1"), la.replace("2.13.1", "3.1.1")]);
    expect(nextNumberedPdfs(PDF)).toEqual([]);
    expect(sameLesson("Book Talk: Revising and Editing", "Book Talk: Revising and Editing")).toBe(true);
    expect(sameLesson("Unit 2 Assessment", "Book Talk: Revising and Editing")).toBe(false);
    expect(sameLesson("Anything", "Language Arts: Level E (Revised 2026)", "Language Arts: Level E (Revised 2026)")).toBe(true);
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
  const lessonOf = () => miaChecklist(kid, "sci")!.parts[0].upcoming[0].lessonId;
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
    expect(miaChecklist(kid, "sci")!.parts[0]).toMatchObject({ needsPdf: true, upcoming: [], lessonTitle: "Forces: Gravity" });
    expect(miaSetStudentPdf(kid, GRAVITY_ID, "https://evil.example/x.pdf")).toBeNull();
    const id = miaSetStudentPdf(kid, GRAVITY_ID, PDF)!;
    miaSetParseState(id, "ready", buildItems(GRAVITY));
    const c = miaChecklist(kid, "sci")!.parts[0];
    expect(c.upcoming.map((u) => u.item.title)).toEqual(["Watch the lesson video", "Complete the guided notes", "Forces Word Search"]);
    expect(c).toMatchObject({ left: 6, target: 1, doneThisWeek: 0 });
  });

  it("checks off the video when Miacademy moves on to the quiz", () => {
    startGravity();
    miaPathSync(kid, parsePathCourses(path(GRAVITY_ID, "Assessment", null)));
    expect(miaChecklist(kid, "sci")!.parts[0].upcoming[0].item.title).toBe("Complete the guided notes");
  });

  it("keeps the first photo's score, re-checks fixes, and tells a parent about low scores", () => {
    const id = startGravity();
    miaRecordPhotoCheck(kid, id, "forces-word-search", { right: 2, total: 6, wrong: [{ question: "clue 1", answer: "force" }] }, "1/a.jpg");
    expect(unseenAlerts(family).map((a) => a.kind)).toEqual(["low-score"]);
    miaRecordPhotoCheck(kid, id, "forces-word-search", { right: 6, total: 6, wrong: [] }, "1/b.jpg");
    expect(miaLesson(kid, id)!.states["forces-word-search"]).toMatchObject({ right: 2, total: 6, wrong: [] });
    miaFinishItem(kid, id, "forces-word-search");
    expect(miaLesson(kid, id)!.states["forces-word-search"].done).toBe(true);
    expect(() => miaFinishItem(kid, id, "out-of-this-world")).toThrow(/photo first/);
    // Guided notes: just a tap.
    miaFinishItem(kid, id, "complete-the-guided-notes");
    expect(miaLesson(kid, id)!.states["complete-the-guided-notes"].done).toBe(true);
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
    miaFinishItem(kid, id, "complete-the-guided-notes");
    for (const item of ["forces-word-search", "out-of-this-world"]) {
      miaRecordPhotoCheck(kid, id, item, { right: 5, total: 5, wrong: [] }, "1/x.jpg");
      miaFinishItem(kid, id, item);
    }
    parentMiaItem(family, kid, id, "stem-challenge-marble-run", "skip");
    miaPathSync(kid, parsePathCourses(path(GRAVITY_ID, "Assessment", null)));
    expect(miaChecklist(kid, "sci")!.parts[0].upcoming.map((u) => u.item.title)).toEqual(["Online assessment"]);
    // Quiz done in Miacademy: it moves on to the next lesson, and guesses that lesson's PDF.
    const toRead = miaPathSync(kid, parsePathCourses(path(MAGNETISM_ID, "Pdf", "Forces: Magnetism Student PDF")));
    expect(miaLesson(kid, id)!.doneDay).not.toBeNull();
    expect(miaChecklist(kid, "sci")!.parts[0]).toMatchObject({ doneThisWeek: 1, lessonTitle: "Forces: Magnetism" });
    expect(toRead).toHaveLength(1);
    expect(miaLesson(kid, toRead[0])!.studentPdf).toBe(PDF.replace("Forces+Gravity", "Forces+Magnetism"));
    expect(lessonOf).toThrow(); // nothing to show until the new PDF is read
  });

  it("checks off practice levels one at a time as Miacademy moves through them", () => {
    setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 2, ela: 0, sci: 0, his: 0 } });
    const wrap = (type: string, task: string) => [
      {
        Title: "Math: Level E",
        LearningPathTask: {
          TaskType: type,
          ThumbnailTitle: type === "Pdf" ? "Unit 4 Wrap Up Student PDF" : null,
          Description: "x",
          Thumbnail: { OriginalUrl: "https://miacademy.co/x/lessons/backgrounds/Math.svg" },
          Link: `/Content.Lesson/page?lesson=%22${GRAVITY_ID}%22&taskAssignment=%22${task}%22&_=`,
        },
      },
    ];
    const T = (n: number) => `00000000-0000-0000-0000-00000000000${n}`;
    miaPathSync(kid, parsePathCourses(wrap("Pdf", T(1))));
    const id = miaSetStudentPdf(kid, GRAVITY_ID, PDF.replace("Forces+Gravity", "Unit+4+Wrap+Up"))!;
    miaSetParseState(
      id,
      "ready",
      buildItems(
        [
          { title: "Watch the lesson video", kind: "video", pages: [], supplies: [] },
          { title: "Online practice: Level 1", kind: "practice", pages: [], supplies: [] },
          { title: "Online practice: Level 2", kind: "practice", pages: [], supplies: [] },
          { title: "Online assessment", kind: "quiz", pages: [], supplies: [] },
        ],
        "math",
        "Unit 4 Wrap Up",
      ),
    );
    const titles = () => miaChecklist(kid, "math")!.parts[0].upcoming.map((u) => u.item.title);
    miaPathSync(kid, parsePathCourses(wrap("Video", T(2))));
    expect(titles()[0]).toBe("Watch the lesson video");
    miaPathSync(kid, parsePathCourses(wrap("Practice", T(3))));
    expect(titles()[0]).toBe("Online practice: Level 1");
    miaPathSync(kid, parsePathCourses(wrap("Practice", T(4))));
    expect(titles()[0]).toBe("Online practice: Level 2");
    miaPathSync(kid, parsePathCourses(wrap("Assessment", T(5))));
    expect(titles()).toEqual(["Online assessment"]);
  });

  describe("Language Arts: three classes", () => {
    const course = (title: string, bg: string, lesson: string, type: string, task: string, thumb: string | null, description = "x") => ({
      Title: title,
      LearningPathTask: {
        TaskType: type,
        ThumbnailTitle: thumb,
        Description: description,
        Thumbnail: { OriginalUrl: `https://miacademy.co/x/lessons/backgrounds/${bg}.svg` },
        Link: `/Content.Lesson/page?lesson=%22${lesson}%22&taskAssignment=%22${task}%22&_=`,
      },
    });
    const id = (n: number) => `00000000-0000-0000-0000-0000000000${String(n).padStart(2, "0")}`;
    const RC = "Reading Comprehension: Level E";
    const ED1 = "Language Arts: Level E (Edition 1)";
    const LAR = "Language Arts: Level E (Revised 2026)";
    beforeEach(() => setMiaSettings(kid, { ...getMiaSettings(kid), lessonsPerWeek: { math: 0, ela: 1, sci: 0, his: 0 } }));

    it("puts Reading Comprehension first on Monday and Edition 1 first Tuesday to Thursday", () => {
      const monday = miaChecklist(kid, "ela", "2026-10-19")!;
      expect(monday.parts.map((p) => [p.name, p.slot, p.target])).toEqual([
        ["Reading Comprehension", "first", 1],
        ["Writing (Edition 1)", "first", 1],
        ["Language Arts", "main", 2],
      ]);
      expect(monday.firstToday).toBe(0);
      // Not finished Monday: Reading Comprehension still comes first on Tuesday.
      expect(miaChecklist(kid, "ela", "2026-10-20")!.firstToday).toBe(0);
      // No first class on Friday.
      expect(miaChecklist(kid, "ela", "2026-10-23")!.firstToday).toBeNull();
    });

    it("lists online-only tasks as they come, and stops after the week's lesson", () => {
      miaPathSync(kid, parsePathCourses([course(RC, "LanguageArts", id(1), "Pdf", id(10), "Opossum")]));
      expect(miaChecklist(kid, "ela")!.parts[0].upcoming.map((u) => [u.item.title, u.item.check])).toEqual([["Read the story: Opossum", "self"]]);
      miaPathSync(kid, parsePathCourses([course(RC, "LanguageArts", id(1), "Practice", id(11), null, "Can you earn a bronze medal in Opossum?")]));
      expect(miaChecklist(kid, "ela")!.parts[0].upcoming.map((u) => [u.item.title, u.item.check])).toEqual([["Earn a bronze medal in Opossum", "online"]]);
      miaPathSync(kid, parsePathCourses([course(RC, "LanguageArts", id(1), "Assessment", id(12), null)]));
      expect(miaChecklist(kid, "ela")!.parts[0].upcoming.map((u) => u.item.title)).toEqual(["Take the quiz"]);
      // Miacademy moves on to the next lesson: this week's Reading Comprehension is done; nothing more until next week.
      miaPathSync(kid, parsePathCourses([course(RC, "LanguageArts", id(2), "Pdf", id(20), "Katherine")]));
      // (Counted on the day it was finished, so look at it from today.)
      const c = miaChecklist(kid, "ela")!;
      expect(c.parts[0]).toMatchObject({ doneThisWeek: 1, weekDone: true, upcoming: [] });
      // Reading Comprehension is never first again this week (Edition 1 or Level E take over).
      expect(c.firstToday).not.toBe(0);
    });

    it("ignores Language Arts classes without a plan", () => {
      miaPathSync(kid, parsePathCourses([course("Vocabulary", "LanguageArts", id(3), "Practice", id(30), null)]));
      expect(miaChecklist(kid, "ela")!.parts.every((p) => p.upcoming.length === 0)).toBe(true);
    });

    it("counts the lesson before a unit assessment as a whole week, and keeps Level E going ahead", () => {
      const la = (n: number) => `https://miaplaza-content.s3.us-west-2.amazonaws.com/Language+Arts/LS4+(Revised+2026)/LS4+2.${n}.1+Student+PDF.pdf`;
      miaPathSync(kid, parsePathCourses([course(LAR, "LanguageArts", id(4), "Pdf", id(40), "Book Talk: Revising and Editing Student PDF")]));
      const lid = miaSetStudentPdf(kid, id(4), la(13))!;
      miaSetBigLesson(lid, 2);
      miaSetParseState(lid, "ready", buildItems([{ title: "Video and Guided Notes", kind: "notes", pages: [2], supplies: [] }, { title: "Quiz", kind: "quiz", pages: [], supplies: [] }], "ela", "Book Talk", LAR));
      expect(miaChecklist(kid, "ela")!.parts.find((p) => p.name === "Language Arts")).toMatchObject({ bigLesson: true, doneThisWeek: 0, target: 2 });
      miaPathSync(kid, parsePathCourses([course(LAR, "LanguageArts", id(4), "Assessment", id(41), null)]));
      miaFinishItem(kid, lid, "complete-the-guided-notes");
      // Quiz done (Miacademy moved on): the 4-day lesson fills the week. The next PDF is guessed by number.
      const toRead = miaPathSync(kid, parsePathCourses([course(LAR, "LanguageArts", id(5), "Pdf", id(50), "Unit 2 Assessment Student PDF")]));
      expect(miaChecklist(kid, "ela")!.parts.find((p) => p.name === "Language Arts")).toMatchObject({ doneThisWeek: 2 });
      expect(miaLesson(kid, toRead[0])!.studentPdf).toBe(la(14));
    });
  });
});
