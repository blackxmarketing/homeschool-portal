/**
 * How each teacher looks. Friendly illustrated characters drawn in code
 * (components/TeacherAvatar.tsx). Keys are a course id (science, history...)
 * or a math teacher id (forge, hypatia...). Edit freely.
 */

export interface AvatarLook {
  skin: string;
  hair: "short" | "bun" | "long" | "curly" | "bald" | "wavy" | "ponytail";
  hairColor: string;
  beard?: "full" | "mustache" | "chin";
  glasses?: boolean;
  hat?: "tophat" | "captain" | "laurel" | "cap" | "beret";
  outfit: string;
  collar: string;
  /** Background circle color. */
  bg: string;
  /** Which kind of reading voice the teacher uses. */
  voice: "male" | "female";
  /** A photo-real portrait in public/teachers/<photo>.jpg (used instead of the drawing). */
  photo?: string;
  /** Also has looping clips: <photo>-idle.mp4 and <photo>-talk.mp4. */
  clips?: boolean;
}

export const AVATARS: Record<string, AvatarLook> = {
  // Course teachers
  writing: { skin: "#e8b48f", hair: "short", hairColor: "#2b1d14", beard: "chin", hat: "tophat", outfit: "#1f2a44", collar: "#ffffff", bg: "#dbe7ff", voice: "male", photo: "writing", clips: true },
  science: { skin: "#f1c6a2", hair: "wavy", hairColor: "#d9d4cc", outfit: "#ffffff", collar: "#2340ff", glasses: true, bg: "#dff3ff", voice: "male", photo: "science", clips: true },
  history: { skin: "#d9a57c", hair: "curly", hairColor: "#5a4632", beard: "full", hat: "laurel", outfit: "#7a3e9d", collar: "#f5d76e", bg: "#f3e6ff", voice: "male", photo: "history", clips: true },
  money: { skin: "#f0c09a", hair: "long", hairColor: "#cfc7bd", glasses: true, outfit: "#2f5d3a", collar: "#ffffff", bg: "#e2f6e8", voice: "male", photo: "money", clips: true },
  business: { skin: "#e6b38e", hair: "short", hairColor: "#3b2a20", outfit: "#2340ff", collar: "#ffffff", bg: "#fff1d6", voice: "male", photo: "business", clips: true },
  leadership: { skin: "#d8a27a", hair: "curly", hairColor: "#3a2c22", beard: "full", hat: "captain", outfit: "#16325c", collar: "#f5d76e", bg: "#e3ecff", voice: "male", photo: "leadership", clips: true },
  // Grades K-5 teachers (courses math-k, ela-2...)
  math: { skin: '#f0c8a0', hair: 'curly', hairColor: '#3a2416', glasses: true, outfit: '#e8692a', collar: '#ffffff', bg: '#fff1d6', voice: 'male' },
  ela: { skin: '#e2b08a', hair: 'short', hairColor: '#e8e2d8', beard: 'full', outfit: '#6b3fd4', collar: '#ffffff', bg: '#ece5ff', voice: 'male' },
  sci: { skin: '#8d5a37', hair: 'short', hairColor: '#2b1d14', beard: 'mustache', outfit: '#22a35a', collar: '#ffffff', bg: '#e2f6e8', voice: 'male' },
  soc: { skin: '#e3a985', hair: 'short', hairColor: '#9a5b2a', hat: 'captain', outfit: '#2f6fb0', collar: '#f5d76e', bg: '#dde9ff', voice: 'male' },
  span: { skin: '#e9b996', hair: 'long', hairColor: '#2b1d14', outfit: '#f2a516', collar: '#ffffff', bg: '#fff6d6', voice: 'female' },
  // Math world teachers
  forge: { skin: "#c98b62", hair: "bald", hairColor: "#2b1d14", beard: "full", hat: "cap", outfit: "#b2452f", collar: "#ffffff", bg: "#ffe3d6", voice: "male", photo: "forge", clips: true },
  hypatia: { skin: "#e9b996", hair: "bun", hairColor: "#3a2416", outfit: "#2f6fb0", collar: "#ffffff", bg: "#dcf2ff", voice: "female", photo: "hypatia", clips: true },
  captain: { skin: "#e3a985", hair: "short", hairColor: "#6b4a2f", beard: "mustache", hat: "captain", outfit: "#16325c", collar: "#f5d76e", bg: "#dde9ff", voice: "male", photo: "captain", clips: true },
  ben: { skin: "#f0c09a", hair: "long", hairColor: "#cfc7bd", glasses: true, hat: "tophat", outfit: "#2f5d3a", collar: "#ffffff", bg: "#e2f6e8", voice: "male", photo: "ben", clips: true },
  ada: { skin: "#f2c9a8", hair: "ponytail", hairColor: "#4a2f20", outfit: "#6b3fd4", collar: "#ffffff", bg: "#ece5ff", voice: "female", photo: "ada", clips: true },
  archie: { skin: "#d9a57c", hair: "curly", hairColor: "#e8e2d8", beard: "full", outfit: "#c77700", collar: "#ffffff", bg: "#fff1d6", voice: "male", photo: "archie", clips: true },
  nightingale: { skin: "#f2c9a8", hair: "bun", hairColor: "#2b1d14", outfit: "#a3245a", collar: "#ffffff", glasses: true, bg: "#ffe3ef", voice: "female", photo: "nightingale", clips: true },
};

/** A look for any key, falling back to a pleasant default picked from the name. */
export function avatarFor(key: string): AvatarLook {
  if (AVATARS[key]) return AVATARS[key];
  // Grade-band versions of a course ("science-45", "science-hs") keep the same teacher.
  const base = key.replace(/-(45|hs|k|[0-5])$/, "");
  if (AVATARS[base]) return AVATARS[base];
  const looks = Object.values(AVATARS);
  const h = [...key].reduce((a, c) => a + c.charCodeAt(0), 0);
  return looks[h % looks.length];
}
