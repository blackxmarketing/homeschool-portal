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

-- Where a kid was placed on a drill game's ladder by its sit-down assessment,
-- so an older kid skips the facts they already have instead of counting dots.
-- Coins a kid has collected in a game and not yet spent. Kept here rather
-- than in the browser so the monster at the end of a set cannot be paid in
-- coins nobody earned.
CREATE TABLE IF NOT EXISTS game_coins (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  game TEXT NOT NULL,
  coins INTEGER NOT NULL DEFAULT 0,
  at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (kid_id, game)
);

CREATE TABLE IF NOT EXISTS game_placement (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  game TEXT NOT NULL,
  rung INTEGER NOT NULL,
  at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (kid_id, game)
);

-- Grades K-5 explore worlds (docs/WORLDS.md): where the hero stands and what they found, per world (JSON).
CREATE TABLE IF NOT EXISTS explore_state (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  world TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (kid_id, world)
);

-- The hidden mastery meter (lib/masteryMeter.ts): one row per idea a kid has met.
-- The angles column is a JSON list of the angles they have answered it from correctly.
CREATE TABLE IF NOT EXISTS concept_mastery (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  subject TEXT NOT NULL,
  concept TEXT NOT NULL,
  p REAL NOT NULL DEFAULT 0.3,
  angles TEXT NOT NULL DEFAULT '[]',
  taught INTEGER NOT NULL DEFAULT 0,
  last_seen INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (kid_id, concept)
);

-- Miacademy timers (docs/MIACADEMY.md): one row per kid, day and subject. state is a JSON MiaTimerState (lib/miaTimer.ts).
CREATE TABLE IF NOT EXISTS mia_timers (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  day TEXT NOT NULL,
  subject TEXT NOT NULL,
  state TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (kid_id, day, subject)
);

-- Miacademy lessons on a kid's step-by-step checklist (lib/miaLessons.ts). mia_key is
-- Miacademy's lesson id. items = JSON LessonItem[] read off the Student PDF;
-- states = JSON {itemId: ItemState}. done_day is when the last item was finished.
CREATE TABLE IF NOT EXISTS mia_lessons (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  subject TEXT NOT NULL,
  mia_key TEXT NOT NULL,
  title TEXT NOT NULL,
  student_pdf TEXT,
  items TEXT,
  parse_state TEXT NOT NULL DEFAULT 'waiting',
  states TEXT NOT NULL DEFAULT '{}',
  started_at INTEGER NOT NULL,
  done_day TEXT,
  UNIQUE (kid_id, subject, mia_key)
);

-- The parent's Miacademy calendar (lib/miaPlan.ts), read by Focus Buddy's parent mode:
-- every marked (assigned) task, with its day, lesson, type, status and PDF.
CREATE TABLE IF NOT EXISTS mia_plan_tasks (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  task_id TEXT NOT NULL,
  day TEXT NOT NULL,
  unit_title TEXT NOT NULL,
  course TEXT NOT NULL,
  subject TEXT NOT NULL,
  lesson_title TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  pdf_url TEXT,
  sort INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (kid_id, task_id)
);

-- Miacademy students seen on the parent's calendar, and which portal kid each one is.
CREATE TABLE IF NOT EXISTS mia_children (
  family_id INTEGER NOT NULL REFERENCES families(id),
  child TEXT NOT NULL,
  name TEXT NOT NULL,
  kid_id INTEGER REFERENCES kids(id),
  seen_at INTEGER NOT NULL,
  PRIMARY KEY (family_id, child)
);

-- Where each kid is in each Miacademy class right now (the task their assignments page shows next).
CREATE TABLE IF NOT EXISTS mia_path (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  course TEXT NOT NULL,
  task_id TEXT NOT NULL,
  task_type TEXT,
  at INTEGER NOT NULL,
  PRIMARY KEY (kid_id, course)
);

-- Parents' computers connected to Focus Buddy (parent mode: reads the Miacademy calendar).
CREATE TABLE IF NOT EXISTS mia_parent_devices (
  id INTEGER PRIMARY KEY,
  family_id INTEGER NOT NULL REFERENCES families(id),
  token_hash TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS mia_parent_codes (
  code TEXT PRIMARY KEY,
  family_id INTEGER NOT NULL REFERENCES families(id),
  expires_at INTEGER NOT NULL
);

-- Money earned in the weekly rings (one row per kid, week and ring), for the buddy bank.
CREATE TABLE IF NOT EXISTS mia_bank (
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  week TEXT NOT NULL,
  ring TEXT NOT NULL,
  cents INTEGER NOT NULL,
  at INTEGER NOT NULL,
  PRIMARY KEY (kid_id, week, ring)
);

-- Kids' computers connected to the Miacademy Chrome extension. The extension keeps the token; we keep its hash.
CREATE TABLE IF NOT EXISTS mia_devices (
  id INTEGER PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  token_hash TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL
);

-- Short-lived codes a parent makes to connect a kid's extension.
CREATE TABLE IF NOT EXISTS mia_pair_codes (
  code TEXT PRIMARY KEY,
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  expires_at INTEGER NOT NULL
);

-- Things a parent should know about now (a kid needs help, is late back from a break, ...).
CREATE TABLE IF NOT EXISTS parent_alerts (
  id INTEGER PRIMARY KEY,
  family_id INTEGER NOT NULL REFERENCES families(id),
  kid_id INTEGER NOT NULL REFERENCES kids(id),
  kind TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  at INTEGER NOT NULL,
  seen INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS parent_alerts_family ON parent_alerts (family_id, seen, at);

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
  // A level mastered: finished with no wrong answers and no stopping to work
  // one out. More than three stars, and it only ever happens once.
  { table: "minigame_progress", column: "mastered", ddl: "ALTER TABLE minigame_progress ADD COLUMN mastered TEXT" },
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
  // Miacademy timers: each kid's settings (JSON MiaSettings, NULL = defaults) and the family's parent PIN.
  { table: "kids", column: "mia", ddl: "ALTER TABLE kids ADD COLUMN mia TEXT" },
  { table: "families", column: "parent_pin_hash", ddl: "ALTER TABLE families ADD COLUMN parent_pin_hash TEXT" },
  // Miacademy's task the kid was on last (id and type), to count practice levels as they're finished.
  { table: "mia_lessons", column: "last_task", ddl: "ALTER TABLE mia_lessons ADD COLUMN last_task TEXT" },
  { table: "mia_lessons", column: "last_type", ddl: "ALTER TABLE mia_lessons ADD COLUMN last_type TEXT" },
  // The Miacademy course a lesson belongs to ("U.S. Geography" has its own rules, see miaLessonRules).
  { table: "mia_lessons", column: "course", ddl: "ALTER TABLE mia_lessons ADD COLUMN course TEXT" },
  // 2 for the lesson before a unit assessment: it gets 4 school days and counts as a whole week of lessons.
  { table: "mia_lessons", column: "weight", ddl: "ALTER TABLE mia_lessons ADD COLUMN weight INTEGER NOT NULL DEFAULT 1" },
  // What Claude read off the lesson's Student PDF (JSON ParsedActivity[]), for lessons built from the parent's calendar.
  { table: "mia_lessons", column: "pdf_parsed", ddl: "ALTER TABLE mia_lessons ADD COLUMN pdf_parsed TEXT" },
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
