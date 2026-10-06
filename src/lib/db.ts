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

-- Guided (off-screen) blocks of the 2-hour day. A parent approves them, which logs the minutes.
CREATE TABLE IF NOT EXISTS block_log (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  block_id TEXT NOT NULL,
  day TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'declined')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (kid_id, block_id, day)
);

-- A kid's long-term goal: finish a grade of math by a date.
CREATE TABLE IF NOT EXISTS goals (
  kid_id INTEGER PRIMARY KEY REFERENCES kids(id),
  grade INTEGER NOT NULL,
  target_day TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Math-fact speed drills.
CREATE TABLE IF NOT EXISTS drill_results (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  day TEXT NOT NULL,
  op TEXT NOT NULL,
  correct INTEGER NOT NULL,
  wrong INTEGER NOT NULL,
  seconds INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Outside standardized test results (e.g. NWEA MAP), entered by a parent.
CREATE TABLE IF NOT EXISTS test_scores (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  test_day TEXT NOT NULL,
  test TEXT NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  achievement_pct INTEGER,
  growth_pct INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Phase 3 courses: one row per kid per lesson.
-- task_status: none | done (written work submitted) | pending (waiting for a parent) | approved | declined
CREATE TABLE IF NOT EXISTS lesson_progress (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  check_best INTEGER NOT NULL DEFAULT 0,
  check_total INTEGER NOT NULL DEFAULT 0,
  check_passed INTEGER NOT NULL DEFAULT 0,
  task_status TEXT NOT NULL DEFAULT 'none',
  task_response TEXT NOT NULL DEFAULT '',
  task_feedback TEXT NOT NULL DEFAULT '',
  completed_day TEXT,
  minutes INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (kid_id, course_id, lesson_id)
);
CREATE INDEX IF NOT EXISTS lesson_progress_day ON lesson_progress (kid_id, completed_day);

-- Every answered item, for the learner model (Phase 3c). subject = course id or "math".
CREATE TABLE IF NOT EXISTS learning_events (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  subject TEXT NOT NULL,
  concept TEXT NOT NULL,
  first_try INTEGER NOT NULL,
  score REAL NOT NULL,
  ms INTEGER NOT NULL,
  expected_ms INTEGER NOT NULL,
  helped INTEGER NOT NULL,
  source TEXT NOT NULL,
  day TEXT NOT NULL,
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS learning_events_kid ON learning_events (kid_id, subject, at);

-- Photos found on Wikimedia for lesson slides (see lib/media.ts). json is NULL when none was found.
CREATE TABLE IF NOT EXISTS media_cache (
  ref TEXT PRIMARY KEY,
  json TEXT,
  fetched_at INTEGER NOT NULL
);

-- Story mini-games (docs/GAME.md): each kid's best stars per game level.
CREATE TABLE IF NOT EXISTS minigame_progress (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  game TEXT NOT NULL,
  level TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 0,
  best REAL,
  plays INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (kid_id, game, level)
);

-- Grades K-5 explore worlds (docs/WORLDS.md): where the hero stands and what they found, per world (JSON).
CREATE TABLE IF NOT EXISTS explore_state (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  world TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (kid_id, world)
);

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
  // For the waste meter: when each question was answered and whether it was right.
  { table: "issued_questions", column: "answered_at", ddl: "ALTER TABLE issued_questions ADD COLUMN answered_at INTEGER" },
  { table: "issued_questions", column: "correct", ddl: "ALTER TABLE issued_questions ADD COLUMN correct INTEGER" },
  // Teaching-model progress and struggle tracking (JSON TeachState, see lib/teaching.ts).
  { table: "lesson_progress", column: "support", ddl: "ALTER TABLE lesson_progress ADD COLUMN support TEXT" },
  // The game (docs/GAME.md): each kid's pixel hero (JSON) and coins.
  { table: "kids", column: "hero", ddl: "ALTER TABLE kids ADD COLUMN hero TEXT" },
  { table: "kids", column: "coins", ddl: "ALTER TABLE kids ADD COLUMN coins INTEGER NOT NULL DEFAULT 0" },
  // Grades K-5 (docs/WORLDS.md): electives switched off (JSON list like ["span"]) and unlocked hero styles (JSON list of ids).
  { table: "kids", column: "electives_off", ddl: "ALTER TABLE kids ADD COLUMN electives_off TEXT" },
  { table: "kids", column: "unlocks", ddl: "ALTER TABLE kids ADD COLUMN unlocks TEXT" },
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
