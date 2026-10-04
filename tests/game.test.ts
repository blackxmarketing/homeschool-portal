import { describe, expect, it } from "vitest";
import { badges, levelInfo, rankFor, WORLDS, xpForLevel } from "@/lib/game";
import { clampProfile, defaultProfile, parseProfile, PRESETS } from "@/lib/focus";
import { pickQuest, QUESTS } from "@/lib/quests";
import { SUBJECTS } from "@/lib/compliance";
import { SKILLS, STRANDS } from "@/lib/curriculum/skills";
import { seededRng } from "@/lib/curriculum/math";

describe("levels and ranks", () => {
  it("needs more XP for each level", () => {
    expect(xpForLevel(1)).toBe(0);
    for (let l = 1; l < 80; l++) expect(xpForLevel(l + 1) - xpForLevel(l)).toBeGreaterThan(xpForLevel(l) - xpForLevel(Math.max(1, l - 1)) - 1);
  });

  it("puts XP into the right level", () => {
    expect(levelInfo(0)).toMatchObject({ level: 1, into: 0 });
    expect(levelInfo(xpForLevel(5)).level).toBe(5);
    expect(levelInfo(xpForLevel(5) - 1).level).toBe(4);
    const l = levelInfo(xpForLevel(7) + 10);
    expect(l.pct).toBeGreaterThanOrEqual(0);
    expect(l.pct).toBeLessThan(100);
  });

  it("gives a rank at every level", () => {
    expect(rankFor(1).title).toBe("Apprentice");
    expect(rankFor(10).title).toBe("Strategist");
    expect(rankFor(999).title).toBe("Legend");
  });

  it("has a world for every strand", () => {
    for (const s of STRANDS) expect(WORLDS[s.id]).toBeDefined();
  });

  it("awards badges from stats", () => {
    const none = badges({ mastered: 0, streak: 0, reviewsPassed: 0, questsDone: 0, missionsApproved: 0, sprintsDone: 0, level: 1, worldsComplete: 0 });
    expect(none.every((b) => !b.earned)).toBe(true);
    const some = badges({ mastered: 1, streak: 3, reviewsPassed: 0, questsDone: 0, missionsApproved: 0, sprintsDone: 0, level: 1, worldsComplete: 0 });
    expect(some.filter((b) => b.earned).map((b) => b.id)).toEqual(["first-mastery", "streak-3"]);
  });
});

describe("focus profile", () => {
  it("gives shorter sprints and more breaks for attention challenges", () => {
    expect(PRESETS.yes.sprintMinutes).toBeLessThan(PRESETS.no.sprintMinutes);
    expect(PRESETS.yes.sideQuestEvery).toBeLessThan(PRESETS.no.sideQuestEvery);
    expect(PRESETS.yes.dailyCapMinutes).toBeLessThanOrEqual(PRESETS.no.dailyCapMinutes);
  });

  it("clamps bad values and survives bad JSON", () => {
    expect(clampProfile({ attention: "yes", sprintMinutes: 999, breakMinutes: 0, sideQuestEvery: NaN, dailyCapMinutes: 5 })).toEqual({
      attention: "yes",
      sprintMinutes: 45,
      breakMinutes: 1,
      sideQuestEvery: 3,
      dailyCapMinutes: 15,
    });
    expect(parseProfile("not json")).toEqual(defaultProfile());
    expect(parseProfile(null)).toEqual(defaultProfile());
    expect(parseProfile(JSON.stringify({ attention: "yes" }))).toEqual(defaultProfile("yes"));
  });
});

describe("side quests", () => {
  it("are complete and well-formed", () => {
    expect(new Set(QUESTS.map((q) => q.id)).size).toBe(QUESTS.length);
    for (const q of QUESTS) {
      expect(q.title.length, q.id).toBeGreaterThan(0);
      expect(q.xp, q.id).toBeGreaterThan(0);
      if (q.kind === "brain") expect(q.reveal, q.id).toBeTruthy();
      if (q.kind === "mission") {
        expect(q.minutes, q.id).toBeGreaterThan(0);
        expect(SUBJECTS as readonly string[], q.id).toContain(q.subject);
      }
    }
    for (const kind of ["brain", "create", "mission"] as const) expect(QUESTS.filter((q) => q.kind === kind).length).toBeGreaterThanOrEqual(8);
  });

  it("avoids recently done quests until it runs out", () => {
    const brains = QUESTS.filter((q) => q.kind === "brain");
    const recent = new Set(brains.slice(1).map((q) => q.id));
    for (let i = 0; i < 20; i++) expect(pickQuest(recent, ["brain"]).id).toBe(brains[0].id);
    const all = new Set(brains.map((q) => q.id));
    expect(pickQuest(all, ["brain"]).kind).toBe("brain");
  });
});

describe("question visuals", () => {
  const withVisuals = SKILLS.filter((s) => s.generate(seededRng(1)).visual || s.generate(seededRng(2)).visual);

  it("cover the grade 6-8 skills", () => {
    const upper = SKILLS.filter((s) => s.grade >= 6);
    expect(withVisuals.filter((s) => s.grade >= 6).length).toBeGreaterThanOrEqual(Math.floor(upper.length * 0.7));
  });

  for (const skill of withVisuals) {
    it(`${skill.id} draws from clean numbers and never shows the answer as a label`, () => {
      const r = seededRng(skill.id.length * 31);
      for (let i = 0; i < 200; i++) {
        const q = skill.generate(r);
        if (!q.visual) continue;
        const json = JSON.stringify(q.visual);
        expect(json, `${skill.id}: ${json}`).not.toMatch(/NaN|undefined|Infinity|null/);
        // Shape and triangle pictures label the given sides; the unknown is always "?".
        if (q.visual.type === "right-triangle") {
          expect([q.visual.a, q.visual.b, q.visual.c]).toContain("?");
          expect([q.visual.a, q.visual.b, q.visual.c]).not.toContain(q.answer);
        }
        // A balance only redraws the equation that's already in the question.
        if (q.visual.type === "balance") {
          expect(q.prompt.replace(/\s+/g, ""), json).toContain(q.visual.left.replace(/\s+/g, ""));
          expect(q.prompt.replace(/\s+/g, ""), json).toContain(q.visual.right.replace(/\s+/g, ""));
        }
      }
    });
  }
});
