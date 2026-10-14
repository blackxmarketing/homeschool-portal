import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { avatarFor } from "@/content/avatars";
import { teacherFor, TEACHERS } from "@/content/teachers";
import { ALL_CHOMPER_LEVELS, GAME_COACH, chompersInfo } from "@/lib/minigames/chompers";

/**
 * The coach in XP Rush: Math reads the skill out before a level and answers
 * questions from the Stuck? button.
 *
 * Two things can go quietly wrong with that. He can render as a blank face if
 * the teacher id stops resolving, and he can be handed the board - which would
 * turn the help button into an answer key for a game whose whole scoring model
 * assumes the browser never learns which squares are right.
 */

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), "utf8");
const aiSource = read("src/lib/ai.ts");
const routeSource = read("src/app/api/gamecoach/route.ts");
const briefSource = read("src/components/minigames/TeacherBrief.tsx");

describe("the coach", () => {
  it("is a real teacher from the lessons, not an id that stopped resolving", () => {
    const coach = teacherFor(GAME_COACH);
    expect(coach, `GAME_COACH "${GAME_COACH}" should name a strand in TEACHERS`).toBeTruthy();
    expect(Object.values(TEACHERS)).toContain(coach);
    expect(coach.name.length).toBeGreaterThan(2);
  });

  it("has a face and a voice, so he is never a blank square reading silently", () => {
    const look = avatarFor(teacherFor(GAME_COACH).id);
    expect(look).toBeTruthy();
    // avatarFor falls back to a look picked from the name, so the real check is
    // that this teacher has an entry of his own with a voice on it.
    expect(look.voice === "male" || look.voice === "female").toBe(true);
    expect(look.skin).toBeTruthy();
  });

  it("has something to read out on every level", () => {
    for (const l of ALL_CHOMPER_LEVELS) {
      expect(l.intro, `${l.id} has no intro for the coach to read`).toBeTruthy();
      expect(l.intro.length, `${l.id}: "${l.intro}" is too short to be worth reading aloud`).toBeGreaterThan(20);
    }
  });

  it("says the level's intro himself, so the chrome does not print it twice", () => {
    expect(chompersInfo.ownIntro).toBe(true);
    expect(read("src/components/minigames/GameHost.tsx")).toMatch(/ownIntro.*game-intro/s);
  });
});

describe("the coach speaks in one voice", () => {
  const gameSource = read("src/components/minigames/ChompersGame.tsx");

  it("wraps the whole game in his voice, so nothing falls back to the default", () => {
    // The default teacher voice is female and Coach Forge is male. Without
    // this provider the directions were read by one voice and the count-in
    // by another, which is exactly what it sounded like.
    expect(gameSource).toContain("<TeacherVoice kind={coachLook.voice}>");
    expect(gameSource).toContain("</TeacherVoice>");
  });

  it("never names a voice by hand, which is how they drift apart", () => {
    for (const src of [gameSource, briefSource]) {
      expect(src).not.toContain(`kind: "male"`);
      expect(src).not.toContain(`kind: "female"`);
      expect(src).not.toContain("kind: look.voice");
    }
  });
});

describe("the level does not run until the kid says go", () => {
  const gameSource = read("src/components/minigames/ChompersGame.tsx");

  it("holds the clock and the kid while the coach is talking or answering", () => {
    expect(gameSource).toContain("const frozen = !ready || count !== null || asking;");
    // The clock bails out...
    expect(gameSource).toContain("if (over || st.over || st.cleared || frozen) return;");
    // ...and so does a move, read off a ref because the keyboard holds on to
    // act() and would otherwise see a stale frozen.
    expect(gameSource).toContain("if (frozenRef.current) return;");
  });
});

describe("what the coach is allowed to know", () => {
  it("is told it cannot see the board", () => {
    const ask = aiSource.slice(aiSource.indexOf("export async function gameAsk"));
    expect(ask).toContain("CANNOT see their board");
    expect(ask).toMatch(/never say a number is or is not on their board/i);
  });

  it("is never handed a square", () => {
    const ask = aiSource.slice(aiSource.indexOf("export async function gameAsk"));
    // The input type is the whole contract: a rule, a title, an intro, a grade
    // and the question. No cells, no board, no answers.
    const input = ask.slice(ask.indexOf("input: {"), ask.indexOf("}): Promise"));
    expect(input).not.toMatch(/\bcells\b|\banswers?\b|\bright\b|\byes\b/i);
    expect(input).toContain("rule: string");
  });

  it("reads the rule off a board this server built, not off one the browser sent", () => {
    // The browser picks which board, but the words come from buildBoard here.
    expect(routeSource).toMatch(/buildBoard\(level\.boards\[bi\], bi, seed\)\.label/);
    // Nothing may walk the cells in the route: the moment it does, a square
    // can reach the model.
    expect(routeSource).not.toMatch(/\.cells/);
  });

  it("checks the level exists before building anything from what was sent", () => {
    expect(routeSource).toMatch(/levelById\(b\.levelId\)/);
    expect(routeSource).toMatch(/if \(!level\) return/);
    // Board index and seed are clamped, not trusted.
    expect(routeSource).toMatch(/Math\.min\(Math\.max\(n, 0\), level\.boards\.length - 1\)/);
  });

  it("is switched off, rather than failing oddly, when the AI is not available", () => {
    expect(routeSource).toMatch(/!features\(\)\.aiTeachers \|\| !aiEnabled\(\)/);
    // And the ask button hides itself rather than offering what cannot answer.
    expect(briefSource).toContain("canAsk &&");
  });

  it("caps what a kid can send and counts it against their daily messages", () => {
    expect(routeSource).toMatch(/slice\(0, 300\)/);
    expect(routeSource).toMatch(/tutorMessagesToday\(kid\.id\) >= aiLimits\(\)\.messagesPerKidPerDay/);
    expect(routeSource).toMatch(/logTutor/);
  });
});
