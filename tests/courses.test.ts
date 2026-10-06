import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import { formatQuestions, parseQuestions, sanitizeCourses } from "@/lib/courseContent";
import { SUBJECTS } from "@/lib/compliance";
import { DEFAULTS, sanitize } from "@/lib/content";

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

describe("course content", () => {
  it("has unique course and lesson ids", () => {
    expect(new Set(COURSES.map((c) => c.id)).size).toBe(COURSES.length);
    const lessonIds = COURSES.flatMap((c) => c.lessons.map((l) => l.id));
    expect(new Set(lessonIds).size).toBe(lessonIds.length);
  });

  it("covers academics and afternoon life skills", () => {
    expect(COURSES.some((c) => c.track === "academic")).toBe(true);
    expect(COURSES.some((c) => c.track === "life")).toBe(true);
  });

  for (const course of COURSES) {
    describe(course.title, () => {
      it("has a teacher and valid subject", () => {
        expect(course.teacher.name.length).toBeGreaterThan(0);
        expect(SUBJECTS as readonly string[]).toContain(course.subject);
        expect(course.lessons.length).toBeGreaterThanOrEqual(4);
      });

      for (const lesson of course.lessons) {
        it(`${lesson.id} is complete and gradeable`, () => {
          const n = words(lesson.read);
          // Grades K-2 read shorter lessons.
          expect(n, "reading length").toBeGreaterThanOrEqual(course.grade !== undefined && course.grade <= 2 ? 80 : 180);
          expect(n, "reading length").toBeLessThanOrEqual(450);
          expect(lesson.read).not.toMatch(/[#*]{2,}|^\s*[-•]\s/m); // plain paragraphs, no markdown
          expect(lesson.keyIdeas.length).toBeGreaterThanOrEqual(2);
          expect(lesson.check.length).toBeGreaterThanOrEqual(4);
          for (const q of lesson.check) {
            expect(q.choices.length, q.q).toBeGreaterThanOrEqual(3);
            expect(q.answer, q.q).toBeGreaterThanOrEqual(0);
            expect(q.answer, q.q).toBeLessThan(q.choices.length);
            expect(new Set(q.choices).size, q.q).toBe(q.choices.length);
            expect(q.why.length, q.q).toBeGreaterThan(0);
          }
          if (lesson.subject) expect(SUBJECTS as readonly string[]).toContain(lesson.subject);
          if (lesson.task) {
            expect(lesson.task.prompt.length).toBeGreaterThan(20);
            expect(lesson.task.rubric.length).toBeGreaterThanOrEqual(3);
          }
        });
      }

      it("doesn't always put the right answer in the same spot", () => {
        const spots = new Set(course.lessons.flatMap((l) => l.check.map((q) => q.answer)));
        expect(spots.size).toBeGreaterThan(1);
      });
    });
  }
});

describe("course editing", () => {
  it("passes the default courses through unchanged", () => {
    expect(sanitizeCourses(COURSES, COURSES)).toEqual(COURSES);
    expect(sanitize("courses", DEFAULTS.courses)).toEqual(DEFAULTS.courses);
  });

  it("falls back to defaults on garbage and repairs bad pieces", () => {
    expect(sanitizeCourses(null, COURSES)).toBe(COURSES);
    const out = sanitizeCourses(
      [
        {
          title: "Spanish",
          subject: "Nope",
          lessons: [
            { title: "Greetings", read: "Hola means hello.", check: [{ q: "Hello?", choices: ["Hola", "Adiós"], answer: 9 }], task: { kind: "dance", prompt: "Say hola" } },
            { title: "", read: "no title" },
          ],
        },
      ],
      COURSES,
    );
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ id: "spanish", subject: "Other", track: "academic" });
    expect(out[0].lessons).toHaveLength(1);
    expect(out[0].lessons[0].check[0].answer).toBe(1);
    expect(out[0].lessons[0].task?.kind).toBe("write");
  });

  it("round-trips quiz questions through the plain-text format", () => {
    for (const c of COURSES) for (const l of c.lessons) expect(parseQuestions(formatQuestions(l.check))).toEqual(l.check);
    expect(parseQuestions("Q: 2+2?\n- 3\n* 4\nWhy: math\n\nnot a question")).toEqual([{ q: "2+2?", choices: ["3", "4"], answer: 1, why: "math" }]);
  });
});
