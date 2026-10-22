import { describe, expect, it } from "vitest";
import { miaCoursePlan, miaLessonWeight } from "@/content/miacademy";

describe("Language Arts class plans", () => {
  it("tells each Language Arts class apart", () => {
    expect(miaCoursePlan("ela", "Reading Comprehension: Level G")?.name).toBe("Reading Comprehension");
    expect(miaCoursePlan("ela", "Language Arts: Level E (Edition 1)")?.name).toBe("Writing (Edition 1)");
    expect(miaCoursePlan("ela", "Language Arts: Level E (Revised 2026)")?.bigLessonBeforeUnitTest).toBe(true);
    const levelG = miaCoursePlan("ela", "Language Arts: Level G");
    expect(levelG?.name).toBe("Language Arts");
    expect(levelG?.lessonsPerWeek).toBe(2);
    expect(levelG?.stopWhenDone).toBe(false);
    expect(levelG?.bigLessonBeforeUnitTest).toBeFalsy();
  });

  it("Level G's project or portfolio lesson counts as the whole week", () => {
    expect(miaLessonWeight("ela", "Language Arts: Level G", "Unit 3 Project: My Travel Brochure")).toBe(2);
    expect(miaLessonWeight("ela", "Language Arts: Level G", "Writing Portfolio")).toBe(2);
    expect(miaLessonWeight("ela", "Language Arts: Level G", "Commas in a Series")).toBe(1);
    // Other classes keep what was stored (Level E Revised: the lesson before a unit assessment).
    expect(miaLessonWeight("ela", "Language Arts: Level E (Revised 2026)", "Project Planning", 1)).toBe(1);
    expect(miaLessonWeight("ela", "Language Arts: Level E (Revised 2026)", "Persuasive Essays", 2)).toBe(2);
  });
});
