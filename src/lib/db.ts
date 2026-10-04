import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

/**
 * SQLite storage. One file, easy to back up (copy data/learning.db).
 *
 * Every row hangs off a family_id so the portal can later host more than one
 * family without a data migration.
 */

const SCHEMA = `
CREATE TABLE IF NOT EXISTS families (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  school_year_start TEXT NOT NULL DEFAULT '08-01',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS parents (
  id INTEGER PRIMARY KEY,
  family_id INTEGER NOT NULL REFERENCES families(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS kids (
  id INTEGER PRIMARY KEY,
  family_id INTEGER NOT NULL REFERENCES families(id),
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🦊',
  grade INTEGER NOT NULL,
  pin_hash TEXT NOT NULL,
  daily_goal_minutes INTEGER NOT NULL DEFAULT 30,
  xp INTEGER NOT NULL DEFAULT 0,
  placement_state TEXT,
  placement_done INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS kid_skills (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  skill_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('learning', 'mastered')),
  source TEXT NOT NULL DEFAULT 'practice',
  mastered_at TEXT,
  review_stage INTEGER NOT NULL DEFAULT 0,
  next_review TEXT,
  review_answered INTEGER NOT NULL DEFAULT 0,
  review_correct INTEGER NOT NULL DEFAULT 0,
  -- Mastery only counts practice attempts after this id (reset after a failed review).
  counting_after INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (kid_id, skill_id)
);

CREATE TABLE IF NOT EXISTS issued_questions (
  id TEXT PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  skill_id TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('learn', 'review', 'placement')),
  payload TEXT NOT NULL,
  issued_at INTEGER NOT NULL,
  hint_used INTEGER NOT NULL DEFAULT 0,
  answered INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS attempts (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  skill_id TEXT NOT NULL,
  mode TEXT NOT NULL,
  correct INTEGER NOT NULL,
  used_hint INTEGER NOT NULL,
  response_ms INTEGER NOT NULL,
  answer TEXT NOT NULL,
  day TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS attempts_kid_skill ON attempts (kid_id, skill_id, id);
CREATE INDEX IF NOT EXISTS attempts_kid_day ON attempts (kid_id, day);

CREATE TABLE IF NOT EXISTS daily_plans (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  day TEXT NOT NULL,
  plan TEXT NOT NULL,
  PRIMARY KEY (kid_id, day)
);

-- Offline learning a parent logs (reading, science projects, field trips, ...).
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  day TEXT NOT NULL,
  subject TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS activity_kid_day ON activity_log (kid_id, day);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Side quests. Brain benders and creative challenges finish right away;
-- real-world missions wait for a parent to approve them.
CREATE TABLE IF NOT EXISTS quest_log (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  quest_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('done', 'pending', 'approved', 'declined')),
  response TEXT NOT NULL DEFAULT '',
  day TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS quest_log_kid ON quest_log (kid_id, day);

-- Conversations with AI teachers. Parents can read every message.
CREATE TABLE IF NOT EXISTS tutor_messages (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  question_id TEXT,
  skill_id TEXT NOT NULL,
  teacher_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('chat', 'lesson', 'why')),
  role TEXT NOT NULL CHECK (role IN ('kid', 'teacher')),
  content TEXT NOT NULL,
  day TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS tutor_messages_kid ON tutor_messages (kid_id, day);
CREATE INDEX IF NOT EXISTS tutor_messages_question ON tutor_messages (question_id, id);

-- Finished focus sprints (Pomodoro-style work blocks).
CREATE TABLE IF NOT EXISTS sprint_log (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  day TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

/** Columns added after the first release. Existing databases get them on startup. */
const ADDED_COLUMNS: { table: string; column: string; ddl: string }[] = [
  // JSON FocusProfile (see lib/focus.ts). NULL means defaults.
  { table: "kids", column: "focus", ddl: "ALTER TABLE kids ADD COLUMN focus TEXT" },
];

function migrate(conn: Database.Database): void {
  for (const c of ADDED_COLUMNS) {
    const cols = conn.prepare(`PRAGMA table_info(${c.table})`).all() as { name: string }[];
    if (!cols.some((x) => x.name === c.column)) conn.exec(c.ddl);
  }
}

let db: Database.Database | null = null;

export function openDb(file?: string): Database.Database {
  const target = file ?? path.join(process.env.DATA_DIR ?? path.join(process.cwd(), "data"), "learning.db");
  if (target !== ":memory:") fs.mkdirSync(path.dirname(target), { recursive: true });
  const conn = new Database(target);
  conn.pragma("journal_mode = WAL");
  conn.pragma("foreign_keys = ON");
  conn.exec(SCHEMA);
  migrate(conn);
  return conn;
}

export function getDb(): Database.Database {
  if (!db) db = openDb();
  return db;
}

/** For tests: swap in an in-memory database. */
export function setDb(conn: Database.Database): void {
  db = conn;
}
