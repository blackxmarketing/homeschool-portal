// Re-issues the demo family's signed sessions without touching their data.
//
//   node scripts/demo-sessions.mjs
//
// seed-demo.mjs writes these too, but it only runs against an empty database.
// The sessions it writes last 12 hours, so after a night away the tokens are
// dead while the demo family is perfectly fine - this re-signs them in place.
//
// Local development only: it reads SESSION_SECRET from .env.local and refuses
// to run against a database holding anyone but the demo family.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

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

const dataDir = path.resolve(root, env.DATA_DIR || "./data");
const db = new DatabaseSync(path.join(dataDir, "learning.db"));

const families = db.prepare("SELECT id, name FROM families").all();
if (families.length !== 1) throw new Error(`Expected one family, found ${families.length}. Not touching this database.`);
const fam = families[0].id;

const kids = db.prepare("SELECT id, name FROM kids WHERE family_id = ? ORDER BY id").all(fam);
const parent = db.prepare("SELECT id FROM parents WHERE family_id = ? ORDER BY id").get(fam);
if (!parent) throw new Error("No parent in this family.");

const session = (s) => {
  const payload = Buffer.from(JSON.stringify({ ...s, exp: Date.now() + 12 * 3600e3 })).toString("base64url");
  return `${payload}.${crypto.createHmac("sha256", env.SESSION_SECRET).update(payload).digest("base64url")}`;
};

const out = { parent: session({ role: "parent", parentId: Number(parent.id), familyId: Number(fam) }) };
for (const k of kids) out[String(k.name).toLowerCase()] = session({ role: "kid", kidId: Number(k.id), familyId: Number(fam) });

const file = path.join(dataDir, "demo-sessions.json");
fs.writeFileSync(file, JSON.stringify(out, null, 2));
console.log(`Fresh 12-hour sessions for ${kids.map((k) => k.name).join(", ")} in ${file}`);
