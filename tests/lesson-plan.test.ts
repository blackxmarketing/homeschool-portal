import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import type { Lesson, Scene } from "@/content/courses/types";
import { lessonObjectives, lessonPlan, partMinutes, planMinutes, tickedPlan } from "@/lib/lessonPlan";
import { sanitizeScene, sanitizeTeaching } from "@/lib/courseContent";
import { slidePositions, beatAt } from "@/lib/storyboard";

const lesson = COURSES.find((c) => c.id === "science")!.lessons[0];
/** A lesson nobody has written scenes or objectives for yet, for the fallback cases. */
const plain = COURSES.flatMap((c) => c.lessons).find((l) => l.teach?.length && !l.objectives && !l.teach.some((s) => s.present?.length))!;

const scene = (over: Partial<Scene> = {}): Scene => ({
  heading: "Two forces, one book",
  say: "A book on a table is being pulled down by gravity and pushed up by the table. The two forces are equal, so the book stays put.",
  ...over,
});

describe("the lesson plan a kid can see", () => {
  it("lists the teaching parts, then what they do with it", () => {
    const plan = lessonPlan(lesson);
    const learn = plan.filter((p) => p.kind === "learn");
    expect(learn.length).toBe(lesson.teach!.length);
    expect(learn.map((p) => p.label)).toEqual(lesson.teach!.map((s) => s.title));
    expect(plan.map((p) => p.key)).toContain("boss");
  });

  it("gives every item a sensible time, and a total a kid would recognise", () => {
    const plan = lessonPlan(lesson);
    expect(plan.every((p) => p.minutes >= 1 && p.minutes <= 30)).toBe(true);
    const { teaching, doing, total } = planMinutes(plan);
    expect(teaching).toBeGreaterThan(0);
    expect(doing).toBeGreaterThan(0);
    expect(total).toBe(teaching + doing);
  });

  it("counts a presented part by what is actually said, not by the summary", () => {
    const seg = plain.teach![0];
    // A real scene is 40-140 words, and a part has several - so a presented
    // part is minutes of teaching where the summary alone was seconds.
    const full = scene({ say: Array.from({ length: 110 }, (_, i) => `word${i}`).join(" ") });
    const long = { ...seg, present: [full, full, full, full] };
    expect(partMinutes(long)).toBeGreaterThan(partMinutes(seg) + 1);
  });

  it("ticks items off from real progress", () => {
    const plan = lessonPlan(lesson);
    const ticked = tickedPlan(plan, {
      partsDone: [true, false, false, false],
      activityDone: false,
      explainDone: false,
      masteryPassed: false,
      taskDone: false,
    });
    expect(ticked[0].done).toBe(true);
    expect(ticked[1].done).toBe(false);
    expect(ticked.find((x) => x.item.key === "boss")!.done).toBe(false);
  });

  it("works for every lesson in the portal", () => {
    for (const course of COURSES) {
      for (const l of course.lessons) {
        const plan = lessonPlan(l);
        expect(plan.length, `${l.id} has a plan`).toBeGreaterThan(0);
        expect(new Set(plan.map((p) => p.key)).size, `${l.id} keys unique`).toBe(plan.length);
      }
    }
  });
});

describe("stating what a kid will be able to do", () => {
  it("uses the authored objectives when a lesson has them", () => {
    const l = { ...lesson, objectives: ["Tell a fair test from an unfair one"] } as Lesson;
    expect(lessonObjectives(l)).toEqual(["Tell a fair test from an unfair one"]);
  });

  it("falls back to the key ideas, so every lesson states its goals today", () => {
    expect(plain.objectives).toBeUndefined();
    expect(lessonObjectives(plain)).toEqual(plain.keyIdeas);
    for (const course of COURSES) {
      for (const l of course.lessons) expect(lessonObjectives(l).length, l.id).toBeGreaterThan(0);
    }
  });
});

describe("a presented scene", () => {
  it("keeps a good one exactly as written", () => {
    const sc = scene({ terms: [{ word: "force", meaning: "a push or a pull" }] });
    expect(sanitizeScene(sc)).toEqual(sc);
  });

  it("needs a heading and something to say", () => {
    expect(sanitizeScene({ heading: "", say: "words" })).toBeNull();
    expect(sanitizeScene({ heading: "Head", say: "   " })).toBeNull();
    expect(sanitizeScene("nonsense")).toBeNull();
  });

  it("drops a broken piece but keeps the scene playable", () => {
    const out = sanitizeScene({ ...scene(), check: { type: "number" }, terms: [{ word: "", meaning: "x" }] });
    expect(out).not.toBeNull();
    expect(out!.check).toBeUndefined();
    expect(out!.terms).toBeUndefined();
    expect(out!.say).toBe(scene().say);
  });
});

describe("a parent saving the lesson editor", () => {
  const presented = {
    objectives: ["Tell a fair test from an unfair one", "Name the one thing you change"],
    teach: [
      {
        title: "Fair tests",
        teach: "A fair test changes one thing and keeps everything else the same, so you know what caused the difference.",
        present: [scene(), scene({ heading: "One change" })],
        think: { q: "What is a fair test?", choices: ["One change", "Many changes"], answer: 0, why: "Only one thing changes.", hints: ["", "Think about what you change."] },
        approaches: {
          analogy: "It is like racing two bikes but only swapping the tyres on one of them.",
          example: "Water two identical plants, give one more sunlight, and keep everything else the same.",
          simpler: { q: "How many things change?", choices: ["One", "Two"], answer: 0, why: "Just one.", hints: ["", "Count them."] },
        },
      },
    ],
  };

  it("keeps the objectives and the scenes", () => {
    const out = sanitizeTeaching(presented);
    expect(out.objectives).toEqual(presented.objectives);
    expect(out.teach![0].present).toHaveLength(2);
    expect(out.teach![0].present![0].say).toBe(scene().say);
  });

  it("survives a full round trip, which is how the pilot content gets destroyed otherwise", () => {
    const once = sanitizeTeaching(presented);
    const twice = sanitizeTeaching(once as unknown as Record<string, unknown>);
    expect(twice).toEqual(once);
    expect(twice.teach![0].present).toHaveLength(2);
    expect(twice.objectives).toEqual(presented.objectives);
  });

  it("falls back to reading the summary when the scenes are all unusable", () => {
    const broken = { ...presented, teach: [{ ...presented.teach[0], present: [{ heading: "" }, "junk"] }] };
    const out = sanitizeTeaching(broken);
    expect(out.teach![0].present).toBeUndefined();
    expect(out.teach![0].teach).toBe(presented.teach[0].teach);
  });
});

describe("slides that belong to a scene", () => {
  const text = "One two three four five six seven eight nine ten.";

  it("spreads evenly when the author gave no cue words", () => {
    const pos = slidePositions(text, [{}, {}, {}]);
    expect(pos[0]).toBe(0);
    expect(pos[1]).toBeGreaterThan(pos[0]);
    expect(pos[2]).toBeGreaterThan(pos[1]);
    expect(pos[2]).toBeLessThan(text.length);
  });

  it("still honours exact cue words when they are given", () => {
    expect(slidePositions(text, [{}, { at: "seven" }])[1]).toBe(text.indexOf("seven"));
  });

  it("changes slide as the teacher reads, instead of collapsing them together", () => {
    const pos = slidePositions(text, [{}, {}, {}]);
    expect(beatAt(pos, 0)).toBe(0);
    expect(beatAt(pos, text.length - 1)).toBe(2);
  });

  it("copes with no slides at all", () => {
    expect(slidePositions(text, [])).toEqual([]);
  });
});
