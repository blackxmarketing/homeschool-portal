import type { Subject } from "@/lib/compliance";
import type { Course, Lesson } from "../types";

/**
 * Grades K-5 (docs/WORLDS.md): five subjects per grade, each a course that
 * lives in that grade's explore world. Ids are "<subject>-<grade>", with
 * kindergarten as "k": math-k, ela-2, sci-4, soc-1, span-3.
 */

export const K5_SUBJECTS = ["math", "ela", "sci", "soc", "span"] as const;
export type K5Subject = (typeof K5_SUBJECTS)[number];

/** Kindergarten is grade 0. */
export const K5_GRADES = [0, 1, 2, 3, 4, 5] as const;

export const gradeKey = (grade: number) => (grade === 0 ? "k" : String(grade));
export const gradeName = (grade: number) => (grade === 0 ? "Kindergarten" : `Grade ${grade}`);
export const k5CourseId = (subject: K5Subject, grade: number) => `${subject}-${gradeKey(grade)}`;

interface SubjectInfo {
  title: string;
  icon: string;
  hue: number;
  subject: Subject;
  elective?: boolean;
  blurb: (grade: number) => string;
  teacher: Course["teacher"];
}

export const K5_SUBJECT_INFO: Record<K5Subject, SubjectInfo> = {
  math: {
    title: "Math",
    icon: "🔢",
    hue: 25,
    subject: "Math",
    blurb: (g) => `${gradeName(g)} math, following the Common Core standards, taught with hands-on problems.`,
    teacher: {
      name: "Professor Pascal",
      avatar: "🧮",
      inspiredBy: "Blaise Pascal, who built a counting machine as a teenager",
      voice: "Cheerful and patient. Loves counting things in the real world and says 'Let's figure it out together!'",
    },
  },
  ela: {
    title: "Reading & Writing",
    icon: "📚",
    hue: 280,
    subject: "Reading",
    blurb: (g) => `${gradeName(g)} reading, writing, speaking and listening, following the Common Core standards.`,
    teacher: {
      name: "Grandpa Aesop",
      avatar: "📖",
      inspiredBy: "Aesop, the ancient Greek teller of fables",
      voice: "A warm storyteller. Gentle, playful with words, and always finds the lesson in a story.",
    },
  },
  sci: {
    title: "Science",
    icon: "🔬",
    hue: 160,
    subject: "Science",
    blurb: (g) => `${gradeName(g)} science, following the Next Generation Science Standards, with experiments to try at home.`,
    teacher: {
      name: "Dr. Carver",
      avatar: "🌱",
      inspiredBy: "George Washington Carver, the plant scientist and inventor",
      voice: "Calm and curious. Loves plants, soil and asking 'What do you notice?'",
    },
  },
  soc: {
    title: "Social Studies",
    icon: "🗺️",
    hue: 210,
    subject: "History",
    blurb: (g) => `${gradeName(g)} social studies: maps, community, history and civics, following the C3 Framework.`,
    teacher: {
      name: "Ranger Clark",
      avatar: "🧭",
      inspiredBy: "William Clark, the mapmaker of the Lewis and Clark expedition",
      voice: "An outdoorsy explorer. Loves maps, true stories from history and good citizenship.",
    },
  },
  span: {
    title: "Spanish",
    icon: "🌎",
    hue: 45,
    subject: "Other",
    elective: true,
    blurb: (g) => `${gradeName(g)} Spanish (an elective): listening, speaking and everyday words, following the ACTFL standards.`,
    teacher: {
      name: "Señora Luz",
      avatar: "🌞",
      inspiredBy: "a cheerful Spanish teacher (an original character)",
      voice: "Bright and encouraging. Speaks slowly and clearly, repeats new words, and mixes Spanish and English.",
    },
  },
};

/** Builds a K-5 course from its subject, grade and lessons. */
export function k5Course(subject: K5Subject, grade: number, lessons: Lesson[]): Course {
  const info = K5_SUBJECT_INFO[subject];
  return {
    id: k5CourseId(subject, grade),
    title: `${info.title} ${grade === 0 ? "K" : grade}`,
    icon: info.icon,
    hue: info.hue,
    track: "academic",
    subject: info.subject,
    blurb: info.blurb(grade),
    teacher: info.teacher,
    grade,
    ...(info.elective ? { elective: true } : {}),
    lessons,
  };
}
