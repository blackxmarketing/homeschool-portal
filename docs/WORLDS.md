# Grades K–5: six worlds to explore

Agreed with the parents on 2026-10-05. Kids in kindergarten through 5th
grade get their own adventure: one world per grade, which the hero walks
around in freely. Grades 6–12 keep the Lumina map (`docs/GAME.md`) for now;
the upper grades get the same treatment later.

## The saga: The Lightkeeper's Journey

One story, one chapter per grade. The kid's hero (the same hero, kept from
year to year) is an apprentice Lightkeeper. Their guide is **Pip**, a small
glowing firefly who talks to them (read aloud). In every world the **Gloom**
has dimmed five lanterns, one for each subject. Learning relights them, and
the world's color comes back zone by zone. The story grows up with the kid:
short, gentle and read aloud in K; mysteries, choices and history by 5th.

| Grade | World | Chapter | Feel |
|---|---|---|---|
| K | Sunny Meadow | 1. The Sleepy Sun | Farm animals, flowers, a pond. The Gloom is a grumpy cloud that hid the sun. |
| 1 | Whisperwood Forest | 2. The Lost Songbirds | Tall trees, a mushroom village, a creek. Fog stole the birds' songs. |
| 2 | Riverbend Valley | 3. The River Mill | A river town with a mill, bridges and a market. The river has stopped. |
| 3 | Sky Islands | 4. Islands Adrift | Floating islands linked by bridges and balloons. The islands are drifting apart. |
| 4 | Canyon of Echoes | 5. Echoes of the Ancients | Red canyons, cliff dwellings, ancient ruins and a railroad town. |
| 5 | Starpeak Frontier | 6. The Starfall | Snowy peaks, an observatory and a frontier fort. The Gloom's secret, and the road on to Lumina. |

## Each world

- **Village hub** in the middle: Pip, the hero's home, the wardrobe (hero
  styles), signposts, villagers with stories and side quests.
- **Five zones**, one per subject, each with a lantern and a guide:
  Math, Reading & Writing, Science, Social Studies, and Spanish (an elective
  the parents can switch off per kid). Each zone holds that grade's lessons as
  quest stones along a path, in order, and an arcade of games.
- **Secrets**: treasure chests and glowing sparks hidden around the map,
  side quests from villagers (find the lost ducklings, deliver a letter),
  and paths that open as lanterns light.
- Kids can travel back to earlier worlds; later worlds open with their grade.

## Learning

- Standards: **Common Core** (math, English language arts), **NGSS**
  (science), the **C3 Framework** (social studies, plus common state topics:
  community, maps, U.S. history and civics) and **ACTFL** (Spanish).
  Standard lists are in `src/content/standards/`; every lesson lists the
  standards it teaches, and a test checks every math, ELA and science
  standard for each grade is covered.
- Courses: `src/content/courses/k5/<subject>-<grade>.ts`, ids like `math-k`,
  `ela-2`, `sci-4`, `soc-1`, `span-3`. Same interactive lesson format as the
  older grades: hook, short teaching parts with hands-on problems (no multiple
  choice), activity, explain it back, boss challenge, field mission.
- K–2: everything is read aloud, sentences are short, pictures and emoji do
  the work, lessons are 15–20 minutes.

## Games

Each world has its own arcade of games for that grade, with levels written
for that grade (harder every year). New games for K–3 (counting critters,
number-line hops, coin shop, array garden, word builder, sentence smith,
habitat rescue, sprout lab, map quest, palabras), plus the existing games
in grades 3–5.

## Hero styles

The hero stays the same; each world unlocks new colors, hair styles, hats
and pets. Kids earn them by lighting lanterns, opening treasure chests and
finishing side quests. Unlocks are checked on the server.

## Status

Built (Phase 6): worlds, story, lessons for all six grades and five subjects,
the new games and hero unlocks. Next: grades 6–12 get the same treatment, and
Lumina's Phase B (shop, real rewards, family quests) is still to come.

## Build order

1. Foundations: kindergarten as a grade, standards and course stubs, games
   with per-grade levels, unlockable styles.
2. The explore engine: a walkable pixel world (keyboard, tap-to-walk),
   villagers, quest stones, chests, saving, the six worlds and their story.
3. Lessons for all six grades and five subjects (helpers, in waves).
4. New games (helpers).
5. Check everything in the preview with the demo family, then ship.
