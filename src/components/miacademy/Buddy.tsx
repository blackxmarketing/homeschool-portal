import type { BuddyId } from "@/content/miacademy";

/**
 * A kid's animal buddy, drawn in code, facing right with walking legs
 * (the .mia-leg animation lives in miacademy.css).
 */
export default function Buddy({ kind, className }: { kind: BuddyId; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 130" aria-hidden="true">
      {kind === "wolf" ? <Wolf /> : <Panda />}
    </svg>
  );
}

function Legs({ front, back }: { front: string; back: string }) {
  return (
    <>
      <rect className="mia-leg l1" x="70" y="84" width="13" height="32" rx="6" fill={front} />
      <rect className="mia-leg l2" x="86" y="84" width="13" height="32" rx="6" fill={back} />
      <rect className="mia-leg l3" x="128" y="84" width="13" height="32" rx="6" fill={front} />
      <rect className="mia-leg l4" x="144" y="84" width="13" height="32" rx="6" fill={back} />
    </>
  );
}

function Panda() {
  return (
    <>
      <circle cx="60" cy="64" r="8" fill="#f7f7f4" stroke="#d9d9d4" />
      <Legs front="#262626" back="#1a1a1a" />
      <ellipse cx="112" cy="72" rx="54" ry="32" fill="#f7f7f4" stroke="#d9d9d4" />
      {/* the black band over the shoulders */}
      <ellipse cx="138" cy="72" rx="15" ry="31" fill="#262626" />
      <circle cx="150" cy="28" r="11" fill="#262626" />
      <circle cx="186" cy="26" r="11" fill="#262626" />
      <circle cx="168" cy="52" r="28" fill="#f7f7f4" stroke="#d9d9d4" />
      <ellipse cx="160" cy="51" rx="7" ry="9.5" fill="#262626" transform="rotate(-20 160 51)" />
      <ellipse cx="181" cy="51" rx="7" ry="9.5" fill="#262626" transform="rotate(20 181 51)" />
      <circle cx="161" cy="50" r="2.6" fill="#fff" />
      <circle cx="180" cy="50" r="2.6" fill="#fff" />
      <ellipse cx="189" cy="64" rx="10" ry="7.5" fill="#efefea" />
      <ellipse cx="196" cy="61" rx="4.5" ry="3.2" fill="#222" />
      <path d="M184 69 q6 5 12 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  );
}

function Wolf() {
  return (
    <>
      <g transform="rotate(18 48 70)">
        <ellipse cx="44" cy="70" rx="32" ry="12" fill="#6f747c" />
        <ellipse cx="18" cy="70" rx="10" ry="8" fill="#d9dce0" />
      </g>
      <Legs front="#5a5f67" back="#4b5058" />
      <ellipse cx="110" cy="70" rx="54" ry="28" fill="#8a9099" />
      <ellipse cx="116" cy="84" rx="36" ry="12" fill="#d9dce0" />
      <polygon points="146,40 150,10 166,32" fill="#6f747c" />
      <polygon points="151,34 153,18 161,31" fill="#e0c9c0" />
      <polygon points="168,30 182,6 188,34" fill="#6f747c" />
      <polygon points="173,29 181,14 184,31" fill="#e0c9c0" />
      <circle cx="165" cy="50" r="24" fill="#8a9099" />
      <ellipse cx="164" cy="62" rx="13" ry="8" fill="#d9dce0" />
      <path d="M174 48 L206 57 Q209 64 201 67 L170 67 Z" fill="#d9dce0" />
      <circle cx="205" cy="59" r="4.5" fill="#222" />
      <circle cx="167" cy="46" r="3.6" fill="#f2b134" />
      <circle cx="168" cy="46" r="1.8" fill="#111" />
      <path d="M186 66 q7 4 14 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  );
}
