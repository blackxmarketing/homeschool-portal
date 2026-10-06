// Fills a LOCAL development database with a demo family, so you can try the
// portal without touching real kids' progress.
//
//   1. Run the app once (npm run dev) so the database file exists.
//   2. node scripts/seed-demo.mjs
//
// Demo logins (local only): parent demo@example.test / demo1234,
// kids Ava (PIN 1111), Leo (PIN 2222) and Mia (grade 1, PIN 3333).
// Signed sessions are also written to <DATA_DIR>/demo-sessions.json so an AI
// assistant can open kid pages directly (cookie name: lp_session).
//
// Safety: it refuses to run if the database has any family other than the
// demo family (pass --wipe only if you really mean to erase it).
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const envFile = path.join(root, ".env.local");
if (!fs.existsSync(envFile)) throw new Error("Make .env.local first (copy .env.example and set SESSION_SECRET).");
const env = Object.fromEntries(
  fs
    .readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => l.split(/=(.*)/s).slice(0, 2).map((x) => x.trim())),
);
if (!env.SESSION_SECRET) throw new Error("Set SESSION_SECRET in .env.local first.");
if (process.env.NODE_ENV === "production") throw new Error("This is for local development only.");

const dataDir = path.resolve(root, env.DATA_DIR || "./data");
const dbFile = path.join(dataDir, "learning.db");
if (!fs.existsSync(dbFile)) throw new Error(`No database at ${dbFile}. Run "npm run dev" once, open the site, then run this again.`);
const db = new DatabaseSync(dbFile);

const families = db.prepare("SELECT name FROM families").all();
if (families.some((f) => f.name !== "Demo Family") && !process.argv.includes("--wipe")) {
  throw new Error("This database has a real family in it. Not touching it. (Use a separate DATA_DIR for demos.)");
}

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver" }).format(new Date());
db.exec(
  [
    "explore_state", "minigame_progress", "learning_events", "lesson_progress", "block_log", "goals", "drill_results", "test_scores", "tutor_messages", "issued_questions",
    "activity_log", "quest_log", "sprint_log", "attempts", "kid_skills", "daily_plans", "kids", "parents", "families",
  ]
    .map((t) => `DELETE FROM ${t};`)
    .join(" ") + " DELETE FROM settings WHERE key LIKE 'content:%';",
);

const fam = db.prepare("INSERT INTO families (name) VALUES ('Demo Family')").run().lastInsertRowid;
const parent = db
  .prepare("INSERT INTO parents (family_id, name, email, password_hash) VALUES (?, 'Demo Parent', 'demo@example.test', ?)")
  .run(fam, bcrypt.hashSync("demo1234", 10)).lastInsertRowid;

const focusYes = JSON.stringify({ attention: "yes", sprintMinutes: 10, breakMinutes: 3, sideQuestEvery: 5, dailyCapMinutes: 45 });
const focusNo = JSON.stringify({ attention: "no", sprintMinutes: 20, breakMinutes: 5, sideQuestEvery: 8, dailyCapMinutes: 75 });
const addKid = db.prepare(
  "INSERT INTO kids (family_id, name, avatar, grade, pin_hash, xp, placement_done, focus) VALUES (?, ?, ?, ?, ?, ?, 1, ?)",
);
const ava = addKid.run(fam, "Ava", "🚀", 7, bcrypt.hashSync("1111", 10), 1840, focusYes).lastInsertRowid;
const leo = addKid.run(fam, "Leo", "🐉", 6, bcrypt.hashSync("2222", 10), 320, focusNo).lastInsertRowid;
// A younger kid for the K-5 explore worlds (docs/WORLDS.md). Change her grade (0 = K) to visit other worlds.
const mia = addKid.run(fam, "Mia", "🦋", 1, bcrypt.hashSync("3333", 10), 60, focusNo).lastInsertRowid;
db.prepare("UPDATE kids SET hero = ? WHERE id = ?").run(JSON.stringify({ skin: 2, hair: "curly", hairColor: 3, outfit: 6, hat: "none", pet: "cat" }), mia);

// Mastered skills: everything through grade 5 plus a few grade 6 ones for Ava.
const mastered = [
  "g3.mult-facts", "g3.div-facts", "g3.round", "g3.add-sub-1000", "g3.mult-tens", "g3.two-step", "g3.unit-fractions",
  "g3.equiv-fractions", "g3.compare-fractions", "g3.area-perimeter", "g3.elapsed-time", "g4.round-multidigit",
  "g4.add-sub-multidigit", "g4.mult-multidigit", "g4.long-division", "g4.factors-primes", "g4.patterns", "g4.equiv-fractions",
  "g4.compare-fractions", "g4.add-sub-fractions", "g4.mult-fraction-whole", "g4.decimal-fractions", "g4.compare-decimals",
  "g4.unit-conversion", "g4.angles", "g4.area-perimeter-missing", "g5.powers-of-ten", "g5.mult-multidigit", "g5.divide-2digit",
  "g5.decimal-add-sub", "g5.decimal-mult-div", "g5.order-of-operations", "g5.add-sub-unlike", "g5.mult-fractions",
  "g5.divide-unit-fractions", "g5.volume", "g5.coordinate-plane", "g6.ratios", "g6.exponents", "g6.integers",
];
const ins = db.prepare(
  "INSERT INTO kid_skills (kid_id, skill_id, status, source, mastered_at, review_stage, next_review) VALUES (?, ?, 'mastered', 'placement', ?, 1, ?)",
);
for (const s of mastered) ins.run(ava, s, today, "2026-12-01");
for (const s of mastered.slice(0, 30)) ins.run(leo, s, today, "2026-12-01");
db.prepare("INSERT INTO kid_skills (kid_id, skill_id, status) VALUES (?, 'g6.percent', 'learning')").run(ava);

for (let i = 0; i < 6; i++) db.prepare("INSERT INTO sprint_log (kid_id, day) VALUES (?, ?)").run(ava, today);
const quest = db.prepare("INSERT INTO quest_log (kid_id, quest_id, kind, status, response, day) VALUES (?, ?, ?, ?, ?, ?)");
quest.run(ava, "b.compound", "brain", "done", "", today);
quest.run(ava, "c.pitch", "create", "done", "A backpack with a built-in solar charger so you never run out of battery on field trips.", today);
quest.run(leo, "m.build", "mission", "pending", "", today);

const session = (s) => {
  const payload = Buffer.from(JSON.stringify({ ...s, exp: Date.now() + 12 * 3600e3 })).toString("base64url");
  return `${payload}.${crypto.createHmac("sha256", env.SESSION_SECRET).update(payload).digest("base64url")}`;
};
fs.writeFileSync(
  path.join(dataDir, "demo-sessions.json"),
  JSON.stringify(
    {
      parent: session({ role: "parent", parentId: Number(parent), familyId: Number(fam) }),
      ava: session({ role: "kid", kidId: Number(ava), familyId: Number(fam) }),
      leo: session({ role: "kid", kidId: Number(leo), familyId: Number(fam) }),
      mia: session({ role: "kid", kidId: Number(mia), familyId: Number(fam) }),
    },
    null,
    2,
  ),
);
console.log("Demo family ready: parent demo@example.test / demo1234, Ava PIN 1111, Leo PIN 2222, Mia (grade 1) PIN 3333.");
console.log(`Sessions (12 hours) in ${path.join(dataDir, "demo-sessions.json")}`);
