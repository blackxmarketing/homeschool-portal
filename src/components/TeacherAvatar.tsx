"use client";

import { useEffect, useState } from "react";
import type { AvatarLook } from "@/content/avatars";

/**
 * An illustrated teacher. Blinks on its own, and the mouth moves while
 * `talking` is true (the teacher is reading aloud).
 */
export default function TeacherAvatar({ look, talking = false, size = 150 }: { look: AvatarLook; talking?: boolean; size?: number }) {
  const [blink, setBlink] = useState(false);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2500 + Math.random() * 2500);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  // A simple talking rhythm: the mouth opens and closes at speech-like speed.
  useEffect(() => {
    if (!talking) {
      setOpen(0);
      return;
    }
    const t = setInterval(() => setOpen(Math.random() * 0.8 + 0.2), 110);
    return () => clearInterval(t);
  }, [talking]);

  const { skin, hair, hairColor, beard, glasses, hat, outfit, collar, bg } = look;
  const shade = "rgba(0,0,0,.12)";
  const mouthH = 3 + open * 11;

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label="Your teacher">
      <circle cx={100} cy={100} r={100} fill={bg} />
      {/* Shoulders and outfit */}
      <path d="M30 200 C34 152 62 136 100 136 C138 136 166 152 170 200 Z" fill={outfit} />
      <path d="M82 138 L100 166 L118 138 Z" fill={collar} />
      <rect x={90} y={118} width={20} height={22} rx={8} fill={skin} />
      {/* Long hair sits behind the head */}
      {(hair === "long" || hair === "ponytail") && <path d="M52 82 C50 128 60 150 74 156 L126 156 C140 150 150 128 148 82 Z" fill={hairColor} />}
      {hair === "ponytail" && <ellipse cx={150} cy={104} rx={12} ry={26} fill={hairColor} />}
      {/* Head */}
      <ellipse cx={58} cy={92} rx={8} ry={11} fill={skin} />
      <ellipse cx={142} cy={92} rx={8} ry={11} fill={skin} />
      <ellipse cx={100} cy={86} rx={42} ry={48} fill={skin} />
      <ellipse cx={74} cy={104} rx={7} ry={4.5} fill="#ff8f8f" opacity={0.35} />
      <ellipse cx={126} cy={104} rx={7} ry={4.5} fill="#ff8f8f" opacity={0.35} />
      {/* Hair on top */}
      {hair === "short" && <path d="M58 76 C58 44 80 34 100 34 C122 34 142 44 142 76 C134 60 118 54 100 54 C82 54 66 60 58 76 Z" fill={hairColor} />}
      {hair === "wavy" && <path d="M56 84 C50 54 70 32 100 32 C130 32 150 54 144 84 C140 72 136 64 128 60 C122 66 112 58 104 62 C96 56 86 64 78 58 C70 64 62 70 56 84 Z" fill={hairColor} />}
      {hair === "curly" && (
        <g fill={hairColor}>
          {[60, 72, 86, 100, 114, 128, 140].map((x, i) => (
            <circle key={i} cx={x} cy={i % 2 ? 44 : 50} r={14} />
          ))}
          <circle cx={58} cy={68} r={10} />
          <circle cx={142} cy={68} r={10} />
        </g>
      )}
      {(hair === "long" || hair === "ponytail") && <path d="M58 80 C56 48 78 34 100 34 C124 34 144 48 142 80 C130 62 112 58 100 58 C86 58 70 64 58 80 Z" fill={hairColor} />}
      {hair === "bun" && (
        <g fill={hairColor}>
          <circle cx={100} cy={30} r={16} />
          <path d="M58 80 C56 50 78 38 100 38 C124 38 144 50 142 80 C132 62 114 56 100 56 C86 56 68 62 58 80 Z" />
        </g>
      )}
      {hair === "bald" && <path d="M60 78 C62 70 66 66 70 64 M140 78 C138 70 134 66 130 64" stroke={hairColor} strokeWidth={5} strokeLinecap="round" />}
      {/* Eyes */}
      <g>
        {[82, 118].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy={84} rx={7} ry={blink ? 0.8 : 8} fill="#fff" />
            {!blink && <circle cx={x + 1} cy={86} r={4} fill="#2b1d14" />}
            {!blink && <circle cx={x + 2.5} cy={84} r={1.3} fill="#fff" />}
          </g>
        ))}
        <path d="M73 70 Q82 64 91 70" stroke={hairColor === "#cfc7bd" || hairColor === "#d9d4cc" || hairColor === "#e8e2d8" ? "#8a7f72" : hairColor} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        <path d="M109 70 Q118 64 127 70" stroke={hairColor === "#cfc7bd" || hairColor === "#d9d4cc" || hairColor === "#e8e2d8" ? "#8a7f72" : hairColor} strokeWidth={3.5} fill="none" strokeLinecap="round" />
      </g>
      {glasses && (
        <g stroke="#26324f" strokeWidth={3} fill="rgba(255,255,255,.15)">
          <circle cx={82} cy={85} r={12} />
          <circle cx={118} cy={85} r={12} />
          <line x1={94} y1={85} x2={106} y2={85} />
        </g>
      )}
      {/* Nose */}
      <path d="M100 90 Q96 100 101 102" stroke={shade} strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* Beard sits under the mouth */}
      {beard === "full" && <path d="M62 98 C64 132 82 142 100 142 C118 142 136 132 138 98 C130 112 118 116 100 116 C82 116 70 112 62 98 Z" fill={hairColor} />}
      {beard === "chin" && <path d="M84 120 C88 134 112 134 116 120 C110 126 90 126 84 120 Z" fill={hairColor} />}
      {/* Mouth: a smile at rest, open while talking */}
      {open > 0 ? (
        <g>
          <ellipse cx={100} cy={115} rx={9} ry={mouthH / 2 + 1} fill="#7a2b2b" />
          <ellipse cx={100} cy={115 + mouthH / 4} rx={5} ry={mouthH / 5 + 0.5} fill="#e36d6d" />
        </g>
      ) : (
        <path d="M88 112 Q100 122 112 112" stroke="#7a2b2b" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      )}
      {beard === "mustache" && <path d="M84 108 C90 102 98 104 100 108 C102 104 110 102 116 108 C110 112 104 110 100 108 C96 110 90 112 84 108 Z" fill={hairColor} />}
      {beard === "full" && <path d="M84 107 C90 101 98 103 100 107 C102 103 110 101 116 107 C110 111 104 109 100 107 C96 109 90 111 84 107 Z" fill={hairColor} />}
      {/* Hats */}
      {hat === "tophat" && (
        <g>
          <rect x={64} y={36} width={72} height={8} rx={3} fill="#1b1b24" />
          <rect x={76} y={4} width={48} height={36} rx={4} fill="#1b1b24" />
          <rect x={76} y={30} width={48} height={6} fill="#a3245a" />
        </g>
      )}
      {hat === "captain" && (
        <g>
          <path d="M60 50 C64 26 136 26 140 50 Z" fill="#ffffff" />
          <rect x={58} y={46} width={84} height={10} rx={4} fill="#16325c" />
          <circle cx={100} cy={42} r={6} fill="#f5d76e" />
        </g>
      )}
      {hat === "cap" && <path d="M60 58 C60 30 140 30 140 58 L160 62 C150 66 140 64 136 62 Z" fill={outfit} />}
      {hat === "laurel" && (
        <g fill="#5d9a4a">
          {[-1, 1].map((d) =>
            [0, 1, 2, 3].map((i) => <ellipse key={`${d}${i}`} cx={100 + d * (18 + i * 9)} cy={44 + i * 5} rx={7} ry={4} transform={`rotate(${d * (20 + i * 10)} ${100 + d * (18 + i * 9)} ${44 + i * 5})`} />),
          )}
        </g>
      )}
      {hat === "beret" && <ellipse cx={92} cy={40} rx={40} ry={14} fill={outfit} />}
    </svg>
  );
}
