import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Circuit Builder (K-5 sci, grade 4). A workbench in the railroad town of the
 * Canyon of Echoes. The board is a small grid of screw terminals; every gap
 * between two neighboring terminals is a slot that can hold one part (a
 * wire, battery, switch, bulb, buzzer, motor, heating coil, or a junk-drawer
 * item like a coin or a rubber band).
 *
 * The board is solved like a real circuit (nodal analysis: batteries are
 * 1.5 V cells with a little inside resistance, wires and metal items conduct,
 * loads have resistance, insulators and open switches leave a gap). So:
 *   - a load only works on a complete loop from + back to -,
 *   - a wire straight across the battery is a short circuit (huge current:
 *     the battery runs down and the wire gets hot), which never counts,
 *   - two batteries in a row facing the same way push harder (brighter bulb,
 *     faster motor), facing opposite ways they cancel,
 *   - loads in a row share the push (dimmer), side by side each gets it all.
 *
 * Round kinds: build (meet a goal), sort (test items: conductor or
 * insulator), send / receive (a light-and-buzzer Morse code telegraph).
 * Each round allows 3 tests; the first success earns 3, then 2, then 1.
 *
 * Pure (no randomness), so the server replays the kid's moves exactly.
 */

export const circuitBuilderInfo = {
  id: "circuit",
  title: "Circuit Builder",
  icon: "💡",
  land: "science" as const,
  subject: "sci" as const,
  grades: [4],
  blurb: "Connect batteries, wires and switches to light the lanterns.",
};

// ---------------- Parts ----------------

export type LoadKind = "bulb" | "buzzer" | "motor" | "heater";
export type ItemKind = "coin" | "nail" | "clip" | "band" | "stick" | "spoon";
export type Kind = "wire" | "battery" | "switch" | LoadKind | ItemKind;

export const KINDS: Kind[] = ["wire", "battery", "switch", "bulb", "buzzer", "motor", "heater", "coin", "nail", "clip", "band", "stick", "spoon"];
export const LOADS: LoadKind[] = ["bulb", "buzzer", "motor", "heater"];
const CONDUCTORS: Kind[] = ["wire", "coin", "nail", "clip"];
const INSULATORS: Kind[] = ["band", "stick", "spoon"];

export const isLoad = (k: Kind): k is LoadKind => (LOADS as Kind[]).includes(k);
export const conducts = (k: Kind) => CONDUCTORS.includes(k);

export const NAMES: Record<Kind, string> = {
  wire: "wire",
  battery: "battery",
  switch: "switch",
  bulb: "light bulb",
  buzzer: "buzzer",
  motor: "motor",
  heater: "heating coil",
  coin: "copper coin",
  nail: "iron nail",
  clip: "paper clip",
  band: "rubber band",
  stick: "wooden stick",
  spoon: "plastic spoon",
};

export const EMOJI: Record<Kind, string> = {
  wire: "〰️",
  battery: "🔋",
  switch: "🔘",
  bulb: "💡",
  buzzer: "🔔",
  motor: "⚙️",
  heater: "🔥",
  coin: "🪙",
  nail: "🔩",
  clip: "📎",
  band: "➰",
  stick: "🪵",
  spoon: "🥄",
};

/** What each load changes electrical energy into. */
export const ENERGY: Record<LoadKind, string> = { bulb: "light (and a little heat)", buzzer: "sound", motor: "motion", heater: "heat" };
export const ENERGY_SHORT: Record<LoadKind, string> = { bulb: "light", buzzer: "sound", motor: "motion", heater: "heat" };

/** How strongly a load is working, 0-3, in words. */
export const LEVEL_WORDS: Record<LoadKind, string[]> = {
  bulb: ["dark", "dim", "bright", "very bright"],
  buzzer: ["silent", "quiet", "buzzing", "loud"],
  motor: ["still", "slow", "spinning", "fast"],
  heater: ["cold", "warm", "hot", "very hot"],
};

export interface Part {
  k: Kind;
  /** Battery turned around: + at the right/bottom end instead of the left/top. */
  flip?: boolean;
  /** Switch closed. */
  on?: boolean;
}
export type Board = Record<string, Part>;

// ---------------- The grid ----------------

/**
 * Slot ids: "h" + x + y joins terminal (x, y) to (x+1, y); "v" + x + y joins
 * (x, y) to (x, y+1). Terminal (0, 0) is top left.
 */
export function slotsOf(cols: number, rows: number): string[] {
  const out: string[] = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x + 1 < cols; x++) out.push(`h${x}${y}`);
  for (let y = 0; y + 1 < rows; y++) for (let x = 0; x < cols; x++) out.push(`v${x}${y}`);
  return out;
}

/** The two terminals a slot joins, as [x, y] pairs (left/top first). */
export function endsOf(slot: string): [[number, number], [number, number]] {
  const x = Number(slot[1]);
  const y = Number(slot[2]);
  return slot[0] === "h" ? [[x, y], [x + 1, y]] : [[x, y], [x, y + 1]];
}

// ---------------- Rounds and levels ----------------

export type Goal =
  /** With the switches as they are: at least `need` of each load working (and at least `min` level), no short; `all`: every load on the board works. */
  | { t: "work"; need: Partial<Record<LoadKind, number>>; min?: Partial<Record<LoadKind, number>>; all?: boolean }
  /** Checked for EVERY way the switches can be set: the loads (exactly `need`) are on exactly when the rule says. */
  | { t: "logic"; op: "one" | "and" | "or"; need: Partial<Record<LoadKind, number>>; switches: number; bright?: boolean; independent?: boolean }
  | { t: "sort" }
  | { t: "send"; word: string }
  | { t: "receive"; word: string };

export interface Try {
  /** Parts the kid placed on open slots. */
  parts?: [string, Kind][];
  /** Slots whose switch is closed. */
  on?: string[];
  /** Slots whose battery is turned around. */
  flip?: string[];
  /** Sort rounds: "c" (conductor) or "i" (insulator) per item. */
  sort?: string;
  /** Send rounds: "." and "-" with "|" between letters. Receive rounds: the letters. */
  code?: string;
}

export interface CircuitRound {
  kind: "build" | "sort" | "send" | "receive";
  title: string;
  /** The story: what's needed in Echo Junction. */
  story: string;
  /** What to do, short. */
  ask: string;
  cols: number;
  rows: number;
  /** Parts screwed down (switches can still be flipped, batteries turned). */
  fixed: Board;
  /** Parts already on open slots at the start (the kid may move them). */
  start?: [string, Kind][];
  /** Parts in the tray (pieces on the board at the start count too). */
  tray: Partial<Record<Kind, number>>;
  goal: Goal;
  /** Sort rounds: the items to test, in order. */
  items?: ItemKind[];
  /** Sort rounds: the gap where items are tested. */
  gap?: string;
  /** A worked answer (shown after three misses; used by the tests). */
  solution: Try;
  /** A hint after a miss. */
  tip: string;
}

export interface CircuitLevel extends MiniLevel {
  grade: number;
  rounds: CircuitRound[];
}

export const MAX_TRIES = 3;

const B = (k: Kind, extra: Partial<Part> = {}): Part => ({ k, ...extra });

/** The basic lantern loop with a gap at the bottom (h01). */
const LOOP_GAP: Board = { v00: B("battery"), h00: B("wire"), h10: B("bulb"), v20: B("wire"), h11: B("wire") };

/** The station telegraph: a lamp key and a buzzer key, each on its own path. */
export const TELEGRAPH: Board = {
  v10: B("battery"),
  h00: B("switch"),
  v00: B("bulb"),
  h01: B("wire"),
  h10: B("switch"),
  v20: B("buzzer"),
  h11: B("wire"),
};
export const LAMP_KEY = "h00";
export const BUZZ_KEY = "h10";

/** Morse code, as railroad telegraphs used. Lamp flash = dot, buzz = dash. */
export const MORSE: Record<string, string> = { A: ".-", E: ".", G: "--.", I: "..", N: "-.", O: "---", R: ".-.", S: "...", T: "-" };
export const encode = (word: string) =>
  word
    .toUpperCase()
    .split("")
    .map((c) => MORSE[c] ?? "")
    .join("|");

export const CIRCUIT_LEVELS: Record<number, CircuitLevel[]> = {
  4: [
    {
      grade: 4,
      id: "g4-1",
      title: "Closed and Open Circuits",
      intro:
        "Skill: closed and open circuits, switches, conductors and insulators (NGSS 4-PS3-2). Electricity only flows around a complete loop from the battery's + end back to its − end. Fix the lamps of Echo Junction!",
      rounds: [
        {
          kind: "build",
          title: "Close the Gap",
          story: "The station lamp is dark. Its loop has a gap in it.",
          ask: "Put a wire in the gap so the loop is closed.",
          cols: 3,
          rows: 2,
          fixed: LOOP_GAP,
          tray: { wire: 1 },
          goal: { t: "work", need: { bulb: 1 } },
          solution: { parts: [["h01", "wire"]] },
          tip: "Find the dashed gap in the loop and fill it with a wire.",
        },
        {
          kind: "build",
          title: "Build the Loop",
          story: "A new lamp for the ticket window. Only the battery and the bulb are screwed down.",
          ask: "Use wires to make one loop: from + through the bulb and back to −.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h10: B("bulb") },
          tray: { wire: 4 },
          goal: { t: "work", need: { bulb: 1 } },
          solution: {
            parts: [
              ["h00", "wire"],
              ["v20", "wire"],
              ["h11", "wire"],
              ["h01", "wire"],
            ],
          },
          tip: "Go around the outside: top wire to the bulb, down the right side, and back along the bottom.",
        },
        {
          kind: "build",
          title: "Add a Switch",
          story: "The lamp should shine at night and rest in the day.",
          ask: "Add a switch so the lamp turns on AND off.",
          cols: 3,
          rows: 2,
          fixed: LOOP_GAP,
          tray: { switch: 1, wire: 1 },
          goal: { t: "logic", op: "one", need: { bulb: 1 }, switches: 1 },
          solution: { parts: [["h01", "switch"]] },
          tip: "A switch is a gate in the loop: closed, electricity flows; open, there's a gap. Put it IN the loop.",
        },
        {
          kind: "sort",
          title: "Conductor Test",
          story: "The junk drawer is full of things. Which ones let electricity through?",
          ask: "Put each thing in the gap to test it. Then sort them all.",
          cols: 3,
          rows: 2,
          fixed: LOOP_GAP,
          tray: { coin: 1, band: 1, nail: 1, stick: 1, clip: 1, spoon: 1 },
          items: ["coin", "band", "nail", "stick", "clip", "spoon"],
          gap: "h01",
          goal: { t: "sort" },
          solution: { sort: "cicici" },
          tip: "If the bulb lights with the thing in the gap, it's a conductor. If it stays dark, it's an insulator.",
        },
        {
          kind: "build",
          title: "Junk Drawer Repair",
          story: "We're out of wires! Two gaps, and only junk-drawer things to fill them.",
          ask: "Fill both gaps so the lamp lights.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h10: B("bulb"), v20: B("wire"), h11: B("wire") },
          tray: { coin: 1, band: 1, stick: 1, nail: 1 },
          goal: { t: "work", need: { bulb: 1 } },
          solution: {
            parts: [
              ["h00", "coin"],
              ["h01", "nail"],
            ],
          },
          tip: "Metals are conductors. Rubber, wood and plastic are insulators.",
        },
        {
          kind: "build",
          title: "Danger: Shortcut!",
          story: "Someone wired the signal lamp wrong. The battery is getting hot!",
          ask: "Take away the shortcut wire so the lamp lights safely.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h00: B("wire"), h01: B("wire"), v20: B("bulb"), h11: B("wire") },
          start: [
            ["h10", "wire"],
            ["v10", "wire"],
          ],
          tray: { wire: 2 },
          goal: { t: "work", need: { bulb: 1 }, all: true },
          solution: { parts: [["h10", "wire"]] },
          tip: "Find the wire that lets electricity go from + back to − without passing through the bulb. Use 🧽 to take it off.",
        },
      ],
    },
    {
      grade: 4,
      id: "g4-2",
      title: "Energy on the Move",
      intro:
        "Skill: electricity carries energy from place to place and changes into light, sound, motion and heat; more batteries means more energy (NGSS 4-PS3-1, 4-PS3-2, 4-PS3-4). Power up the railroad town!",
      rounds: [
        {
          kind: "build",
          title: "Water Tower Pump",
          story: "The steam train needs water. The tower pump must turn.",
          ask: "Pick the part that changes electricity into MOTION.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h00: B("wire"), v20: B("wire"), h11: B("wire"), h01: B("wire") },
          tray: { bulb: 1, buzzer: 1, motor: 1, heater: 1 },
          goal: { t: "work", need: { motor: 1 } },
          solution: { parts: [["h10", "motor"]] },
          tip: "Motion means something moves. Which part spins?",
        },
        {
          kind: "build",
          title: "Crossing Bell",
          story: "Wagons cross the tracks. People need a warning they can HEAR.",
          ask: "Pick the part that changes electricity into SOUND.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h00: B("wire"), h10: B("wire"), h11: B("wire"), h01: B("wire") },
          tray: { bulb: 1, buzzer: 1, motor: 1, heater: 1 },
          goal: { t: "work", need: { buzzer: 1 } },
          solution: { parts: [["v20", "buzzer"]] },
          tip: "A buzzer shakes back and forth very fast. That shaking makes sound.",
        },
        {
          kind: "build",
          title: "Cold Night Cocoa",
          story: "The night guard's cocoa is cold. The cocoa pot needs HEAT.",
          ask: "Pick the part that changes electricity into heat.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h00: B("wire"), h10: B("wire"), v20: B("wire"), h11: B("wire") },
          tray: { bulb: 1, buzzer: 1, motor: 1, heater: 1 },
          goal: { t: "work", need: { heater: 1 } },
          solution: { parts: [["h01", "heater"]] },
          tip: "A heating coil is a thin wire that gets hot when electricity flows through it, like in a toaster.",
        },
        {
          kind: "build",
          title: "Brighter Lantern",
          story: "Fog rolls into the canyon. The lantern must shine VERY bright.",
          ask: "Add a second battery to push more energy through the bulb.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h10: B("bulb"), v20: B("wire"), h11: B("wire") },
          tray: { battery: 1, wire: 2 },
          goal: { t: "work", need: { bulb: 1 }, min: { bulb: 3 } },
          solution: {
            parts: [
              ["h00", "battery"],
              ["h01", "wire"],
            ],
            flip: ["h00"],
          },
          tip: "Batteries in a row must face the same way: the + of one touches the − of the next. Tap a battery with ✋ to turn it around.",
        },
        {
          kind: "build",
          title: "Faster Pump",
          story: "The train is late! The pump must spin faster to fill the tank.",
          ask: "Give the motor more energy so it spins fast.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery"), h10: B("wire"), v20: B("motor"), h11: B("wire") },
          tray: { battery: 1, wire: 2 },
          goal: { t: "work", need: { motor: 1 }, min: { motor: 3 } },
          solution: {
            parts: [
              ["h00", "wire"],
              ["h01", "battery"],
            ],
          },
          tip: "Two batteries facing the same way (+ to −) give the motor more energy, so it spins faster.",
        },
        {
          kind: "build",
          title: "Light and Sound",
          story: "The station needs a signal you can see AND hear.",
          ask: "Build one circuit where the bulb lights and the buzzer buzzes.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery") },
          tray: { bulb: 1, buzzer: 1, wire: 4 },
          goal: { t: "work", need: { bulb: 1, buzzer: 1 }, all: true },
          solution: {
            parts: [
              ["h00", "wire"],
              ["h10", "bulb"],
              ["v20", "buzzer"],
              ["h11", "wire"],
              ["h01", "wire"],
            ],
          },
          tip: "Make one loop around the outside and put the bulb and the buzzer in it.",
        },
        {
          kind: "build",
          title: "Signal Tower",
          story: "The new signal tower flashes, rings AND turns its flag.",
          ask: "Make light, sound and motion all at once.",
          cols: 4,
          rows: 2,
          fixed: { v00: B("battery") },
          tray: { battery: 1, bulb: 1, buzzer: 1, motor: 1, wire: 5 },
          goal: { t: "work", need: { bulb: 1, buzzer: 1, motor: 1 }, all: true },
          solution: {
            parts: [
              ["h00", "wire"],
              ["h10", "bulb"],
              ["h20", "buzzer"],
              ["v30", "motor"],
              ["h21", "wire"],
              ["h11", "wire"],
              ["h01", "wire"],
            ],
          },
          tip: "One big loop works: + → bulb → buzzer → motor → back to −. Every part must be IN the loop.",
        },
      ],
    },
    {
      grade: 4,
      id: "g4-3",
      title: "Design Challenges",
      intro:
        "Skill: design a circuit to meet rules and limits, and send a message with a light-and-sound code (NGSS 4-PS3-2, 4-PS4-3). Engineer the station's lights, bells and telegraph!",
      rounds: [
        {
          kind: "build",
          title: "Two Lanterns, One Switch",
          story: "The platform has two lanterns. The station master wants ONE switch for both.",
          ask: "One switch turns both lanterns on and off.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery") },
          tray: { bulb: 2, switch: 1, wire: 4 },
          goal: { t: "logic", op: "one", need: { bulb: 2 }, switches: 1 },
          solution: {
            parts: [
              ["h00", "switch"],
              ["h10", "bulb"],
              ["v20", "bulb"],
              ["h11", "wire"],
              ["h01", "wire"],
            ],
          },
          tip: "Put the switch where ALL the electricity has to pass, right next to the battery.",
        },
        {
          kind: "build",
          title: "Both Lanterns Bright",
          story: "Two lanterns in a row share the battery's push, so they're dim. Make both shine bright with just one battery.",
          ask: "One switch, two BRIGHT lanterns, one battery.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery") },
          tray: { bulb: 2, switch: 1, wire: 4 },
          goal: { t: "logic", op: "one", need: { bulb: 2 }, switches: 1, bright: true },
          solution: {
            parts: [
              ["h00", "switch"],
              ["v10", "bulb"],
              ["h10", "wire"],
              ["v20", "bulb"],
              ["h11", "wire"],
              ["h01", "wire"],
            ],
          },
          tip: "Give each lantern its own path (side by side, called parallel). Then each one gets the battery's full push.",
        },
        {
          kind: "build",
          title: "Never Go Dark",
          story: "The crossing signal has a lamp and a bell. If one breaks, the other must keep warning people.",
          ask: "One switch runs both, and each works even if the other breaks.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery") },
          tray: { bulb: 1, buzzer: 1, switch: 1, wire: 4 },
          goal: { t: "logic", op: "one", need: { bulb: 1, buzzer: 1 }, switches: 1, independent: true },
          solution: {
            parts: [
              ["h00", "switch"],
              ["v10", "bulb"],
              ["h10", "wire"],
              ["v20", "buzzer"],
              ["h11", "wire"],
              ["h01", "wire"],
            ],
          },
          tip: "In one single loop, a broken part makes a gap for everything. Give the lamp and the bell separate paths.",
        },
        {
          kind: "build",
          title: "Two-Key Safety Bell",
          story: "The big depot bell should ring ONLY when the station master AND the engineer both press their switches.",
          ask: "The bell rings only when BOTH switches are on.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery") },
          tray: { buzzer: 1, switch: 2, wire: 4 },
          goal: { t: "logic", op: "and", need: { buzzer: 1 }, switches: 2 },
          solution: {
            parts: [
              ["h00", "switch"],
              ["h10", "switch"],
              ["v20", "buzzer"],
              ["h11", "wire"],
              ["h01", "wire"],
            ],
          },
          tip: "Put the two switches one after the other in the same path (in series). Then both gates must be closed.",
        },
        {
          kind: "build",
          title: "Front or Back Doorbell",
          story: "The hotel has a front door and a back door. A visitor at EITHER door should ring the bell.",
          ask: "The bell rings when switch A OR switch B is on.",
          cols: 3,
          rows: 2,
          fixed: { v00: B("battery") },
          tray: { buzzer: 1, switch: 2, wire: 4 },
          goal: { t: "logic", op: "or", need: { buzzer: 1 }, switches: 2 },
          solution: {
            parts: [
              ["h00", "wire"],
              ["v10", "switch"],
              ["h10", "switch"],
              ["v20", "wire"],
              ["h11", "wire"],
              ["h01", "buzzer"],
            ],
          },
          tip: "Give each switch its own path around to the bell (side by side). Then either one can close a loop.",
        },
        {
          kind: "send",
          title: "Send a Message",
          story: "A train is stuck in the canyon! Use the telegraph to send the help signal SOS.",
          ask: "Send SOS: tap the lamp key for a dot (•), the buzzer key for a dash (—).",
          cols: 3,
          rows: 2,
          fixed: TELEGRAPH,
          tray: {},
          goal: { t: "send", word: "SOS" },
          solution: { code: encode("SOS") },
          tip: "Look up each letter on the code card. Tap ‘Next letter’ between letters.",
        },
        {
          kind: "receive",
          title: "Read a Message",
          story: "A message comes back over the wire from the next station!",
          ask: "Watch the lamp and listen to the buzzer. Use the code card to read the word.",
          cols: 3,
          rows: 2,
          fixed: TELEGRAPH,
          tray: {},
          goal: { t: "receive", word: "TRAIN" },
          solution: { code: "TRAIN" },
          tip: "Take one letter at a time. Flash = dot (•), buzz = dash (—).",
        },
      ],
    },
  ],
};

export const ALL_CIRCUIT_LEVELS = Object.values(CIRCUIT_LEVELS).flat();
export const levelById = (id: string): CircuitLevel | undefined => ALL_CIRCUIT_LEVELS.find((l) => l.id === id);

// ---------------- Building a board from a try ----------------

const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

/** The board a try makes: the fixed parts, plus the kid's parts on open slots (checked against the tray). */
export function boardFor(round: CircuitRound, t: Try): Board {
  const slots = slotsOf(round.cols, round.rows);
  const board: Board = {};
  for (const [s, p] of Object.entries(round.fixed)) board[s] = { k: p.k };
  const used: Partial<Record<Kind, number>> = {};
  for (const [s, k] of t.parts ?? []) {
    if (!slots.includes(s) || has(board, s) || !KINDS.includes(k)) continue;
    const n = used[k] ?? 0;
    if (n >= (round.tray[k] ?? 0)) continue;
    used[k] = n + 1;
    board[s] = { k };
  }
  for (const s of t.on ?? []) if (has(board, s) && board[s].k === "switch") board[s].on = true;
  for (const s of t.flip ?? []) if (has(board, s) && board[s].k === "battery") board[s].flip = true;
  return board;
}

// ---------------- The circuit solver ----------------

const G_WIRE = 100; // wires and metal: 0.01 ohm
const G_LOAD = 1; // a bulb, buzzer, motor or coil: 1 ohm
const G_CELL = 10; // a battery's own resistance: 0.1 ohm
const VOLTS = 1.5;
const SHORT_AMPS = 5;
const FLOW = 0.05;

export interface Sim {
  /** Current through each slot, from its left/top end to its right/bottom end. */
  cur: Record<string, number>;
  /** Each load's level: 0 off, 1 dim/slow, 2 bright, 3 very bright/fast. */
  level: Record<string, number>;
  /** A battery is shorted (a path with almost no resistance). */
  short: boolean;
  /** Current each battery pushes out of its + end. */
  batt: Record<string, number>;
}

const levelOf = (amps: number) => (amps < 0.3 ? 0 : amps < 1 ? 1 : amps < 2 ? 2 : 3);

function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-15) continue;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      if (f) for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, i) => (Math.abs(row[i]) < 1e-15 ? 0 : row[n] / row[i]));
}

/** Solves the board like a real circuit. */
export function simulate(cols: number, rows: number, board: Board): Sim {
  const n = cols * rows;
  const node = ([x, y]: [number, number]) => y * cols + x;
  const A = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  const I = new Array<number>(n).fill(0);
  for (let i = 0; i < n; i++) A[i][i] = 1e-6; // a tiny leak keeps loose pieces solvable
  const els: { s: string; a: number; b: number; g: number; src: number }[] = [];
  for (const [s, p] of Object.entries(board)) {
    const [ea, eb] = endsOf(s);
    const a = node(ea);
    const b = node(eb);
    let g = 0;
    let src = 0; // current pushed out of the a end (a battery with + at a)
    if (conducts(p.k) || (p.k === "switch" && p.on)) g = G_WIRE;
    else if (isLoad(p.k)) g = G_LOAD;
    else if (p.k === "battery") {
      g = G_CELL;
      src = (p.flip ? -1 : 1) * VOLTS * G_CELL;
    }
    if (!g) continue;
    A[a][a] += g;
    A[b][b] += g;
    A[a][b] -= g;
    A[b][a] -= g;
    I[a] += src;
    I[b] -= src;
    els.push({ s, a, b, g, src });
  }
  const v = solve(A, I);
  const sim: Sim = { cur: {}, level: {}, short: false, batt: {} };
  for (const e of els) {
    const i = e.g * (v[e.a] - v[e.b]) - e.src; // a→b through the part
    sim.cur[e.s] = i;
    const p = board[e.s];
    if (isLoad(p.k)) sim.level[e.s] = levelOf(Math.abs(i));
    if (p.k === "battery") {
      const out = p.flip ? i : -i; // out of + into the circuit
      sim.batt[e.s] = out;
      if (Math.abs(out) > SHORT_AMPS) sim.short = true;
    }
  }
  for (const [s, p] of Object.entries(board)) if (isLoad(p.k) && !(s in sim.level)) sim.level[s] = 0;
  return sim;
}

const slotsWith = (board: Board, pred: (p: Part) => boolean) =>
  Object.keys(board)
    .filter((s) => pred(board[s]))
    .sort();

/** Switches get letters A, B, C in slot order (the board shows the same letters). */
export const switchLetters = (board: Board): Record<string, string> =>
  Object.fromEntries(slotsWith(board, (p) => p.k === "switch").map((s, i) => [s, "ABCD"[i] ?? "?"]));

/**
 * The path electricity takes from the strongest battery's + end back to its
 * − end, as slots in order (following the current).
 */
export function pathOf(board: Board, sim: Sim, cols: number): string[] {
  let best = "";
  let amps = FLOW;
  for (const [s, a] of Object.entries(sim.batt))
    if (a > amps) {
      amps = a;
      best = s;
    }
  if (!best) return [];
  const id = ([x, y]: [number, number]) => y * cols + x;
  const [ea, eb] = endsOf(best);
  const plus = board[best].flip ? id(eb) : id(ea);
  const minus = board[best].flip ? id(ea) : id(eb);
  const out = new Map<number, { s: string; to: number; i: number }[]>();
  for (const [s, i] of Object.entries(sim.cur)) {
    if (s === best || Math.abs(i) < FLOW) continue;
    const [a, b] = endsOf(s);
    const from = i > 0 ? id(a) : id(b);
    const to = i > 0 ? id(b) : id(a);
    if (!out.has(from)) out.set(from, []);
    out.get(from)!.push({ s, to, i: Math.abs(i) });
  }
  const seen = new Set<number>([plus]);
  const walk = (at: number): string[] | null => {
    if (at === minus) return [];
    for (const e of [...(out.get(at) ?? [])].sort((x, y) => y.i - x.i)) {
      if (seen.has(e.to)) continue;
      seen.add(e.to);
      const rest = walk(e.to);
      if (rest) return [e.s, ...rest];
    }
    return null;
  };
  return walk(plus) ?? [];
}

const the = (k: Kind) => `the ${NAMES[k]}`;
const The = (k: Kind) => `The ${NAMES[k]}`;

function listWords(words: string[]): string {
  if (words.length <= 1) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

/** "Electricity leaves the + end, flows through the switch and the bulb, and comes back to the − end." */
export function describePath(board: Board, sim: Sim, cols: number): string {
  const path = pathOf(board, sim, cols);
  if (!path.length) return "";
  const letters = switchLetters(board);
  const many = Object.keys(letters).length > 1;
  const seen = new Set<Kind>();
  const steps = path.filter((s) => board[s].k !== "wire");
  const parts = steps.map((s) => board[s].k);
  const names = steps.map((s) => {
    const k = board[s].k;
    if (k === "battery") return "the second battery";
    if (k === "switch" && many) return `switch ${letters[s]}`;
    const again = seen.has(k);
    seen.add(k);
    return again ? `the other ${NAMES[k]}` : the(k);
  });
  const working = Object.values(sim.level).filter((l) => l > 0).length;
  const onPath = parts.filter(isLoad).length;
  const split = working > onPath ? " Part of the electricity splits off onto another path, so more parts get it too." : "";
  return `Electricity leaves the battery's + end, flows${names.length ? ` through ${listWords(names)}` : " along the wires"}, and comes back into the − end.${split}`;
}

export const SHORT_NOTE =
  "Short circuit! A wire gives the electricity a shortcut from + straight back to − without going through any part. The battery drains fast and the wire gets hot, so it's unsafe. Find the shortcut and take it out.";

/** Why the loads are dark: open switch, insulator, backwards battery, or a gap. */
export function whyDark(round: CircuitRound, board: Board): string {
  const sim = simulate(round.cols, round.rows, board);
  if (sim.short) return SHORT_NOTE;
  const batteries = slotsWith(board, (p) => p.k === "battery");
  if (!batteries.length) return "There's no battery, so nothing pushes the electricity.";
  const loads = slotsWith(board, (p) => isLoad(p.k));
  if (!loads.length) return "Nothing on the board uses the electricity yet. Add a part that makes light, sound, motion or heat.";
  const lit = (b: Board) => {
    const s = simulate(round.cols, round.rows, b);
    return !s.short && Object.values(s.level).filter((l) => l > 0).length > Object.values(sim.level).filter((l) => l > 0).length;
  };
  if (batteries.length > 1)
    for (const s of batteries) if (lit({ ...board, [s]: { ...board[s], flip: !board[s].flip } }))
        return "The batteries face opposite ways, so their pushes cancel out. Turn one around so the + of one meets the − of the other.";
  const closed: Board = Object.fromEntries(Object.entries(board).map(([s, p]) => [s, p.k === "switch" ? { ...p, on: true } : p]));
  if (slotsWith(board, (p) => p.k === "switch" && !p.on).length && lit(closed))
    return "A switch is open, so there's a gap in the loop and electricity can't get across. Close it (tap it with ✋).";
  const ins = slotsWith(board, (p) => INSULATORS.includes(p.k));
  if (ins.length) {
    const asWire: Board = Object.fromEntries(Object.entries(board).map(([s, p]) => [s, INSULATORS.includes(p.k) ? { k: "wire" as Kind } : p]));
    if (lit(asWire)) return `${The(board[ins[0]].k)} is an insulator: it blocks electricity like a closed door. Try something made of metal.`;
  }
  return "The loop isn't complete. Electricity must travel from the + end, through the parts, all the way back to the − end. Look for a gap or a loose end.";
}

export interface Check {
  ok: boolean;
  note: string;
}

const energyLine = (board: Board, sim: Sim) => {
  const kinds = [...new Set(slotsWith(board, (p) => isLoad(p.k)).filter((s) => sim.level[s] > 0).map((s) => board[s].k as LoadKind))];
  return kinds.length ? ` Electrical energy changed into ${listWords(kinds.map((k) => ENERGY[k]))}.` : "";
};

function checkWork(round: CircuitRound, goal: Extract<Goal, { t: "work" }>, board: Board): Check {
  const sim = simulate(round.cols, round.rows, board);
  if (sim.short) return { ok: false, note: SHORT_NOTE };
  const working = (k: LoadKind) => slotsWith(board, (p) => p.k === k).filter((s) => sim.level[s] > 0);
  for (const [k, n] of Object.entries(goal.need) as [LoadKind, number][]) {
    if (working(k).length >= n) continue;
    const onBoard = slotsWith(board, (p) => p.k === k).length;
    const other = LOADS.filter((o) => o !== k && working(o).length);
    if (!onBoard && other.length)
      return {
        ok: false,
        note: `${The(other[0])} works: it changes electricity into ${ENERGY_SHORT[other[0]]}. But this job needs ${ENERGY_SHORT[k]}. Which part makes ${ENERGY_SHORT[k]}?`,
      };
    if (!onBoard) return { ok: false, note: `This job needs ${ENERGY_SHORT[k]}. Put ${the(k)} into the loop.` };
    return { ok: false, note: whyDark(round, board) };
  }
  if (goal.all) {
    const dark = slotsWith(board, (p) => isLoad(p.k)).filter((s) => !sim.level[s]);
    if (dark.length) return { ok: false, note: `${The(board[dark[0]].k)} isn't getting any electricity. Every part must be in a complete loop.` };
  }
  for (const [k, m] of Object.entries(goal.min ?? {}) as [LoadKind, number][]) {
    const best = Math.max(0, ...working(k).map((s) => sim.level[s]));
    if (best >= m) continue;
    return {
      ok: false,
      note: `${The(k)} is ${LEVEL_WORDS[k][best]}, but it needs to be ${LEVEL_WORDS[k][m]}. More batteries in a row, facing the same way, push more energy through it.`,
    };
  }
  return { ok: true, note: `${describePath(board, sim, round.cols)}${energyLine(board, sim)}` };
}

function stateWords(sw: string[], letters: Record<string, string>, on: boolean[]): string {
  if (sw.length === 1) return `the switch ${on[0] ? "on" : "off"}`;
  return listWords(sw.map((s, i) => `switch ${letters[s]} ${on[i] ? "on" : "off"}`));
}

const verbOn: Record<LoadKind, string> = { bulb: "lights up", buzzer: "rings", motor: "turns", heater: "heats" };
const verbBase: Record<LoadKind, string> = { bulb: "light up", buzzer: "ring", motor: "turn", heater: "heat up" };
const verbOff: Record<LoadKind, string> = { bulb: "stays dark", buzzer: "stays quiet", motor: "stays still", heater: "stays cold" };

function checkLogic(round: CircuitRound, goal: Extract<Goal, { t: "logic" }>, board: Board): Check {
  for (const k of LOADS) {
    const n = slotsWith(board, (p) => p.k === k).length;
    const want = goal.need[k] ?? 0;
    if (n !== want) return { ok: false, note: want ? `This design needs ${want} ${NAMES[k]}${want > 1 ? "s" : ""} on the board (you have ${n}).` : `This design doesn't use ${the(k)}. Take it off.` };
  }
  const sw = slotsWith(board, (p) => p.k === "switch");
  if (sw.length !== goal.switches) return { ok: false, note: `This design needs exactly ${goal.switches} switch${goal.switches > 1 ? "es" : ""} on the board (you have ${sw.length}).` };
  const letters = switchLetters(board);
  const loads = slotsWith(board, (p) => isLoad(p.k));
  const combos = 1 << Math.min(sw.length, 4);
  let allOnNote = "";
  for (let c = combos - 1; c >= 0; c--) {
    const on = sw.map((_, i) => !!(c & (1 << i)));
    const b: Board = { ...board };
    sw.forEach((s, i) => (b[s] = { ...board[s], on: on[i] }));
    const sim = simulate(round.cols, round.rows, b);
    const st = stateWords(sw, letters, on);
    if (sim.short) return { ok: false, note: `With ${st}: ${SHORT_NOTE}` };
    const expect = goal.op === "one" ? on[0] : goal.op === "and" ? on.every(Boolean) : on.some(Boolean);
    for (const s of loads) {
      const k = board[s].k as LoadKind;
      const isOn = sim.level[s] > 0;
      if (expect && !isOn) {
        const why = goal.op === "or" ? "Each switch needs its own path to the bell." : "";
        return { ok: false, note: [`With ${st}, ${the(k)} ${verbOff[k]}, but it should ${verbBase[k]}.`, c === combos - 1 ? whyDark(round, b) : "", why].filter(Boolean).join(" ") };
      }
      if (!expect && isOn) {
        const why =
          goal.op === "and"
            ? " Put the switches one after the other on the same path, so electricity must pass through both."
            : goal.op === "one"
              ? " The switch must be on the path that everything shares, so opening it cuts off every part."
              : "";
        return { ok: false, note: `With ${st}, ${the(k)} still ${verbOn[k]}, but it should be off.${why}` };
      }
    }
    if (expect && goal.bright) {
      const dim = loads.find((s) => board[s].k === "bulb" && sim.level[s] < 2);
      if (dim)
        return {
          ok: false,
          note: "The lanterns are dim. In one single path (in series) they share the battery's push. Give each lantern its own path (in parallel) so each gets the full push.",
        };
    }
    if (c === combos - 1) {
      if (goal.independent)
        for (const s of loads) {
          const broken: Board = { ...b };
          delete broken[s];
          const bs = simulate(round.cols, round.rows, broken);
          const out = loads.find((o) => o !== s && !(bs.level[o] > 0));
          if (out)
            return {
              ok: false,
              note: `If ${the(board[s].k)} breaks, ${the(board[out].k)} goes out too, because they share one single path. Give each its own path (in parallel).`,
            };
        }
      allOnNote = `${describePath(b, sim, round.cols)}${energyLine(b, sim)}`;
    }
  }
  const rule =
    goal.op === "one"
      ? "The switch controls everything: on, the loop is closed; off, there's a gap."
      : goal.op === "and"
        ? "The switches are in series: electricity has to pass through both, so both must be on."
        : "The switches are in parallel: each one gives electricity its own way to the bell.";
  return { ok: true, note: `${rule} ${allOnNote}`.trim() };
}

const ITEM_IS: Record<ItemKind, "c" | "i"> = { coin: "c", nail: "c", clip: "c", band: "i", stick: "i", spoon: "i" };
const ITEM_WHY: Record<ItemKind, string> = {
  coin: "It's metal (copper), and metals are conductors.",
  nail: "It's metal (iron), and metals are conductors.",
  clip: "It's metal (steel), and metals are conductors.",
  band: "Rubber is an insulator. That's why wires are covered in rubber or plastic.",
  stick: "Dry wood is an insulator.",
  spoon: "Plastic is an insulator.",
};
export const itemIs = (k: ItemKind) => ITEM_IS[k];
export const itemWhy = (k: ItemKind) => ITEM_WHY[k];

/** Cleans a sent code: dots, dashes and letter breaks only. */
export const cleanCode = (s: string) =>
  s
    .replace(/[^.\-|]/g, "")
    .replace(/\|+/g, "|")
    .replace(/^\||\|$/g, "");

export const showCode = (code: string) =>
  code
    .split("|")
    .map((l) => l.replace(/\./g, "•").replace(/-/g, "—"))
    .join("  /  ");

/** Checks one test of a round. */
export function checkTry(round: CircuitRound, t: Try): Check {
  const g = round.goal;
  if (g.t === "sort") {
    const items = round.items ?? [];
    const s = t.sort ?? "";
    const wrong = items.filter((k, i) => s[i] !== ITEM_IS[k]);
    if (!wrong.length) return { ok: true, note: "All sorted! Metals (coin, nail, paper clip) are conductors. Rubber, wood and plastic are insulators." };
    const k = wrong[0];
    const unsorted = items.filter((_, i) => s[i] !== "c" && s[i] !== "i").length;
    if (unsorted) return { ok: false, note: `Sort every item first (${unsorted} left). Test each one in the gap.` };
    return {
      ok: false,
      note: `${wrong.length} not right yet. Test the ${NAMES[k]} again: in the gap, the bulb ${ITEM_IS[k] === "c" ? "lights" : "stays dark"}, so it's ${ITEM_IS[k] === "c" ? "a conductor" : "an insulator"}.`,
    };
  }
  if (g.t === "send") {
    const want = encode(g.word).split("|");
    const got = cleanCode(t.code ?? "").split("|");
    if (got.join("|") === want.join("|")) return { ok: true, note: `Message sent: ${g.word} = ${showCode(encode(g.word))}. Light and sound carried the pattern all the way down the line!` };
    const i = want.findIndex((w, j) => got[j] !== w);
    if (i < 0) return { ok: false, note: `Too many letters. ${g.word} has ${want.length}.` };
    const letter = g.word[i];
    return {
      ok: false,
      note: `Letter ${i + 1} should be ${letter}: ${showCode(want[i])}. You sent ${got[i] ? showCode(got[i]) : "nothing"}.`,
    };
  }
  if (g.t === "receive") {
    const got = (t.code ?? "").toUpperCase().replace(/[^A-Z]/g, "");
    if (got === g.word) return { ok: true, note: `${g.word}! You decoded ${showCode(encode(g.word))}. Patterns of light and sound can carry words over long distances.` };
    const i = g.word.split("").findIndex((c, j) => got[j] !== c);
    if (i < 0) return { ok: false, note: `Too many letters: the message has ${g.word.length}.` };
    return { ok: false, note: `Look at letter ${i + 1}: ${showCode(MORSE[g.word[i]])}. Find that pattern on the code card.` };
  }
  const board = boardFor(round, t);
  return g.t === "work" ? checkWork(round, g, board) : checkLogic(round, g, board);
}

// ---------------- Moves and scoring ----------------

export interface RoundMove {
  tries: Try[];
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const strList = (v: unknown, max: number) => (Array.isArray(v) ? v.slice(0, max).filter((s): s is string => typeof s === "string" && s.length <= 4) : []);

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 10).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const tries = Array.isArray(o.tries) ? o.tries.slice(0, MAX_TRIES) : [];
    return {
      tries: tries.map((tr) => {
        const t = (tr && typeof tr === "object" ? tr : {}) as Record<string, unknown>;
        const parts = Array.isArray(t.parts)
          ? t.parts
              .slice(0, 30)
              .filter((p): p is [string, Kind] => Array.isArray(p) && typeof p[0] === "string" && p[0].length <= 4 && typeof p[1] === "string" && KINDS.includes(p[1] as Kind))
              .map(([s, k]) => [s, k] as [string, Kind])
          : [];
        return { parts, on: strList(t.on, 30), flip: strList(t.flip, 30), sort: str(t.sort, 12), code: str(t.code, 60) };
      }),
    };
  });
}

export interface RoundResult {
  /** Which test was right (0-based), or -1. */
  rightOn: number;
  points: number;
}

export function scoreRound(round: CircuitRound, move: RoundMove | undefined): RoundResult {
  const tries = move?.tries.slice(0, MAX_TRIES) ?? [];
  const rightOn = tries.findIndex((t) => checkTry(round, t).ok);
  return { rightOn, points: rightOn < 0 ? 0 : MAX_TRIES - rightOn };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.85) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

export function replay(level: CircuitLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * MAX_TRIES;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests). */
export const perfectMoves = (level: CircuitLevel): RoundMove[] => level.rounds.map((r) => ({ tries: [r.solution] }));

// ---------------- Pixel art ----------------

const OUT = "#1b1530";
const COPPER = "#d9822b";
const COPPER_DK = "#9a5418";
const STEEL = "#aeb7c4";
const STEEL_DK = "#6f7a8a";
const BLACK = "#2b2b38";
const WHITE = "#ffffff";

/**
 * A part, drawn sideways (left end = the slot's left/top terminal), 16×12.
 * `level` (0-3) lights bulbs and coils; `on` closes switches; `frame` animates.
 */
export function partGrid(k: Kind, opts: { level?: number; on?: boolean; frame?: number } = {}): Grid {
  const g = new Grid(16, 12);
  const lv = opts.level ?? 0;
  switch (k) {
    case "battery":
      g.rect(2, 3, 12, 6, BLACK).rect(2, 3, 4, 6, COPPER).rect(1, 5, 1, 2, STEEL).rect(2, 3, 12, 1, "#4a4a5e");
      // + on the copper end, − on the black end
      g.rect(3, 6, 3, 1, WHITE).rect(4, 5, 1, 3, WHITE).rect(10, 6, 3, 1, WHITE);
      break;
    case "bulb": {
      const glass = lv >= 3 ? "#fff7c2" : lv === 2 ? "#ffe066" : lv === 1 ? "#f5d97a" : "#dfe6ee";
      if (lv >= 2) g.disc(7.5, 5, 5.6, lv >= 3 ? "#fff3b0" : "#fff8d6");
      g.disc(7.5, 5, 4.2, glass);
      g.rect(6, 4, 4, 1, lv ? "#ff9f1c" : "#8a5a2b").rect(6, 5, 1, 2, lv ? "#ff9f1c" : "#8a5a2b").rect(9, 5, 1, 2, lv ? "#ff9f1c" : "#8a5a2b");
      g.set(6, 3, WHITE);
      g.rect(5, 9, 6, 1, STEEL).rect(6, 10, 4, 1, STEEL_DK).rect(5, 10, 1, 1, STEEL);
      break;
    }
    case "buzzer": {
      g.rect(3, 2, 10, 9, "#3c4a5c").disc(8, 6.5, 3, "#1f2733");
      g.set(7, 5, STEEL_DK).set(9, 5, STEEL_DK).set(8, 7, STEEL_DK).set(7, 8, STEEL_DK).set(9, 8, STEEL_DK);
      g.rect(3, 2, 10, 1, "#5a6c82");
      if (lv) {
        const w = (opts.frame ?? 0) ? 1 : 0;
        g.rect(0, 4 + w, 1, 4, "#ffcc33").rect(15, 4 + w, 1, 4, "#ffcc33");
      }
      break;
    }
    case "motor": {
      g.rect(2, 3, 9, 7, "#3f6fb5").rect(2, 3, 9, 1, "#6a95d6").rect(11, 6, 2, 1, STEEL);
      const f = lv ? (opts.frame ?? 0) : 0;
      if (f) g.rect(13, 3, 1, 7, "#e9ecf5").rect(13, 6, 2, 1, "#e9ecf5");
      else g.rect(13, 1, 2, 4, "#e9ecf5").rect(13, 8, 2, 3, "#e9ecf5").rect(13, 5, 2, 3, STEEL_DK);
      g.rect(4, 5, 5, 3, "#2c4f86");
      break;
    }
    case "heater": {
      const c = lv >= 2 ? "#ff5a1f" : lv === 1 ? "#e07a3f" : COPPER_DK;
      for (let x = 2; x <= 13; x++) g.set(x, 6 + (x % 4 === 0 ? -3 : x % 4 === 2 ? 3 : 0), c).set(x, 6 + (x % 4 === 1 ? -1 : x % 4 === 3 ? 1 : 0), c);
      for (let x = 2; x <= 13; x += 2) g.rect(x, 4, 1, 5, c);
      g.rect(0, 6, 2, 1, COPPER).rect(14, 6, 2, 1, COPPER);
      if (lv >= 2) g.rect(3, 1, 1, 1, "#ffcc33").rect(8, 0, 1, 1, "#ffcc33").rect(12, 1, 1, 1, "#ffcc33");
      break;
    }
    case "switch":
      g.rect(1, 9, 14, 2, "#a0703c").rect(2, 7, 2, 2, STEEL_DK).rect(12, 7, 2, 2, STEEL_DK);
      if (opts.on) g.rect(3, 6, 10, 1, COPPER).rect(12, 5, 1, 1, "#c0392b");
      else for (let i = 0; i < 8; i++) g.set(3 + i, 6 - Math.floor(i * 0.6), COPPER).set(10, 1, "#c0392b").set(11, 1, "#c0392b");
      break;
    case "coin":
      g.disc(7.5, 6, 4.6, COPPER).disc(7.5, 6, 3, "#e9a050").set(6, 3, "#ffd39a").set(5, 4, "#ffd39a");
      break;
    case "nail":
      g.rect(1, 3, 2, 6, STEEL_DK).rect(3, 5, 10, 2, STEEL).tri(14, 5, 6, 0, STEEL).set(14, 5, STEEL).set(14, 6, STEEL).rect(3, 5, 10, 1, "#d3dae3");
      break;
    case "clip":
      g.rect(1, 3, 13, 1, STEEL).rect(1, 8, 13, 1, STEEL).rect(0, 4, 1, 4, STEEL).rect(14, 4, 1, 4, STEEL);
      g.rect(3, 5, 10, 1, STEEL).rect(2, 5, 1, 2, STEEL).rect(3, 6, 1, 1, STEEL);
      break;
    case "band":
      for (let a = 0; a < 64; a++) {
        const t = (a / 64) * Math.PI * 2;
        g.set(Math.round(7.5 + Math.cos(t) * 6.5), Math.round(6 + Math.sin(t) * 3.6), "#d9534f");
      }
      break;
    case "stick":
      g.rect(1, 4, 14, 4, "#d6a25e").rect(1, 4, 14, 1, "#e8c08a").rect(4, 6, 3, 1, "#b98545").rect(10, 5, 2, 1, "#b98545");
      break;
    case "spoon":
      g.rect(1, 5, 8, 2, "#7fc8f8").disc(11.5, 6, 3.2, "#7fc8f8").disc(11.5, 6, 1.8, "#b9e2fc");
      break;
    case "wire":
      g.rect(0, 5, 16, 2, COPPER);
      break;
  }
  return g.outline(OUT);
}

export const circuitBuilder: MiniGame = {
  ...circuitBuilderInfo,
  levels: () => [],
  levelsForGrade: (grade) => (CIRCUIT_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      return { stars: r.stars, best: r.points };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
