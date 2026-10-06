import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import { STANDARDS } from "@/content/standards";

/** Grades K-5: every lesson names its standards, and every required standard is taught. */
describe("K-5 standards", () => {
  const k5 = COURSES.filter((c) => c.grade !== undefined && c.grade <= 5);

  for (const course of k5) {
    describe(course.id, () => {
      const list = STANDARDS[course.id] ?? [];
      const codes = new Set(list.map((s) => s.code));

      it("has a list of standards with unique codes", () => {
        expect(list.length, `${course.id}: write src/content/standards/${course.id}.ts`).toBeGreaterThan(0);
        expect(codes.size).toBe(list.length);
        for (const s of list) expect(s.text.length, s.code).toBeGreaterThan(10);
      });

      it("every lesson names real standards", () => {
        for (const l of course.lessons) {
          expect(l.standards?.length ?? 0, `${l.id}: list its standards`).toBeGreaterThan(0);
          for (const code of l.standards ?? []) expect(codes.has(code), `${l.id}: unknown standard ${code}`).toBe(true);
        }
      });

      it("teaches every required standard", () => {
        const taught = new Set(course.lessons.flatMap((l) => l.standards ?? []));
        const missing = list.filter((s) => s.required && !taught.has(s.code)).map((s) => s.code);
        expect(missing, `${course.id}: standards no lesson teaches yet`).toEqual([]);
      });
    });
  }
});
