import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { TEACHING_METHOD } from "@/content/teachers";
import { sanitize } from "@/lib/content";

/**
 * The AI layer fails quietly by design: every error path returns null and the
 * authored text is used instead. That is the right behaviour for a kid mid-lesson,
 * but it means a broken model id or a missing rule shows up nowhere. These tests
 * are the tripwire.
 */

const aiSource = fs.readFileSync(path.join(process.cwd(), "src/lib/ai.ts"), "utf8");

/** Model ids that exist. Adding one here is a deliberate act, not a typo. */
const REAL_MODELS = ["claude-opus-5", "claude-opus-4-8", "claude-sonnet-5", "claude-haiku-4-5"];

describe("the model we ask for", () => {
  it("is a real one", () => {
    const m = aiSource.match(/^const MODEL = "([^"]+)";/m);
    expect(m, "ai.ts should declare a MODEL constant").toBeTruthy();
    // A made-up id 404s, the error is swallowed, and every AI feature silently
    // turns into authored text while the parent page still says AI is on.
    expect(REAL_MODELS).toContain(m![1]);
  });

  it("is the one CLAUDE.md tells the next person we use", () => {
    const model = aiSource.match(/^const MODEL = "([^"]+)";/m)![1];
    const notes = fs.readFileSync(path.join(process.cwd(), "CLAUDE.md"), "utf8");
    expect(notes).toContain(model);
    expect(notes).not.toContain("claude-opus-5-5");
  });
});

describe("the family's content rule reaches the actual prompts", () => {
  it("is part of the teaching method, which both system prompts interpolate", () => {
    for (const phrase of ["DEI", "gender identity", "present-day politics"]) {
      expect(TEACHING_METHOD, phrase).toContain(phrase);
    }
    expect(aiSource.match(/\$\{teachingMethod\(\)\}/g)?.length ?? 0).toBeGreaterThanOrEqual(2);
  });

  it("says what to teach, not only what to avoid", () => {
    for (const phrase of ["money", "business", "leadership", "character", "science", "history"]) {
      expect(TEACHING_METHOD.toLowerCase(), phrase).toContain(phrase);
    }
  });

  it("survives a parent editing the teaching method, or falls back to the default", () => {
    expect(sanitize("teachingMethod", "")).toBe(TEACHING_METHOD);
    expect(sanitize("teachingMethod", null)).toBe(TEACHING_METHOD);
    // A parent may genuinely want to reword it; that is their call and it is kept.
    expect(sanitize("teachingMethod", "Be kind.")).toBe("Be kind.");
  });

  it("fits inside the limit the sanitizer allows, so nothing is cut off mid-rule", () => {
    expect(TEACHING_METHOD.length).toBeLessThan(5000);
    expect(sanitize("teachingMethod", TEACHING_METHOD)).toBe(TEACHING_METHOD);
  });
});
