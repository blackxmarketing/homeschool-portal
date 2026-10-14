import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { avatarFor } from "@/content/avatars";
import { teacherFor, TEACHERS } from "@/content/teachers";
import { ALL_CHOMPER_LEVELS, GAME_COACH, chompersInfo, workedExample } from "@/lib/minigames/chompers";

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

  it("hands a voice to every speak(), which is the only way they come out right", () => {
    // speak() is a plain function: it cannot read the provider, and with no
    // kind it talks in the default voice, which is female. That is how the
    // count-in ended up sounding like a different person to the directions.
    for (const [name, src] of [
      ["ChompersGame.tsx", gameSource],
      ["TeacherBrief.tsx", briefSource],
    ] as const) {
      for (const call of src.match(/\bspeak\([^;]*?\);/gs) ?? []) {
        expect(call, `${name}: this speak() has no voice on it - ${call}`).toContain("kind");
      }
    }
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

describe("the worked example", () => {
  it("gives every level one, on any seed", () => {
    for (const l of ALL_CHOMPER_LEVELS) {
      for (let i = 0; i < l.boards.length; i++) {
        for (const seed of [1, 7, 12345, 2 ** 31 - 2]) {
          const ex = workedExample(l.boards[i], i, seed);
          expect(ex, `${l.id} board ${i} seed ${seed} has no example to show`).toBeTruthy();
        }
      }
    }
  });

  it("shows one square that fits and one that does not", () => {
    for (const l of ALL_CHOMPER_LEVELS) {
      const ex = workedExample(l.boards[0], 0, 99)!;
      expect(ex.yes.ok, `${l.id}: the "eat it" square does not fit the rule`).toBe(true);
      expect(ex.no.ok, `${l.id}: the "leave it" square fits the rule`).toBe(false);
    }
  });

  it("is built off a seed nowhere near the kid's, so it is never a peek at their board", () => {
    // Same spec, same board index, their seed - and the example must not be
    // reading the board they are about to play.
    const src = fs.readFileSync(path.join(process.cwd(), "src/lib/minigames/chompers.ts"), "utf8");
    const fn = src.slice(src.indexOf("export function workedExample"));
    expect(fn.slice(0, 400)).toMatch(/buildBoard\(spec, boardIndex, \(\(seed >>> 0\) \* 104729 \+ 31\)/);
  });

  it("says something a kid can follow, with nothing missing from it", () => {
    for (const l of ALL_CHOMPER_LEVELS) {
      const ex = workedExample(l.boards[0], 0, 4242)!;
      expect(ex.say).toContain(ex.rule);
      expect(ex.say).toContain("eat that one");
      expect(ex.say).toContain("leave it");
      // A gap in the wording shows up as one of these rather than as a crash.
      expect(ex.say, `${l.id}: "${ex.say}"`).not.toMatch(/undefined|NaN|\[object/);
      // It is read out loud, so it starts like a sentence.
      expect(ex.say[0]).toBe(ex.say[0].toUpperCase());
    }
  });

  it("keeps the family rule, same as every other word in the game", () => {
    const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;
    for (const l of ALL_CHOMPER_LEVELS) {
      for (const seed of [1, 500, 9999]) {
        expect(workedExample(l.boards[0], 0, seed)!.say).not.toMatch(BANNED);
      }
    }
  });
});
