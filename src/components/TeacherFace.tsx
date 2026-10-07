"use client";

import { useEffect, useRef, useState } from "react";
import PixelTeacher from "./pixel/PixelTeacher";
import type { AvatarLook } from "@/content/avatars";
import { BUST_SIZE } from "@/lib/pixel/teacher";
import { useVoiceSettings } from "./voice";

/** The teacher's voice, shown as a softly glowing circle with sound bars that move while they talk. */
export function VoiceOrb({ talking = false, size = 64 }: { talking?: boolean; size?: number }) {
  return (
    <div className={`voice-orb ${talking ? "talking" : ""}`} style={{ width: size, height: size }} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </div>
  );
}

/**
 * The teacher's face.
 *
 * By default this is the pixel character, so the teacher belongs to the same
 * world as everything else the kid sees. Turning on "Teacher faces" swaps in
 * the photo-real portraits in public/teachers/ instead, with a quiet
 * "listening" loop and a talking loop while the teacher reads aloud; small
 * faces and reduced-motion use the still photo.
 *
 * Pass `speakingId` and `text` where they are known and the pixel teacher's
 * mouth follows the actual audio rather than just flapping.
 */
export default function TeacherFace({
  look,
  talking = false,
  size = 150,
  still = false,
  speakingId,
  text,
  pointing,
}: {
  look: AvatarLook;
  talking?: boolean;
  size?: number;
  still?: boolean;
  speakingId?: string | null;
  text?: string;
  pointing?: boolean;
}) {
  const { faces } = useVoiceSettings();
  const [reduced, setReduced] = useState(false);
  // If the photo can't load, fall back to the drawn teacher.
  const [broken, setBroken] = useState(false);
  const talk = useRef<HTMLVideoElement>(null);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Start the talking clip from the top each time the teacher starts speaking.
  useEffect(() => {
    const v = talk.current;
    if (!v) return;
    if (talking) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else v.pause();
  }, [talking]);

  // The pixel teacher is the default. The photo-real portraits stay available
  // behind the "Teacher faces" switch for anyone who prefers them.
  if (!faces || !look.photo || broken) {
    return (
      <PixelTeacher
        look={look}
        talking={talking}
        speakingId={speakingId}
        text={text}
        pointing={pointing}
        scale={Math.max(2, Math.round(size / BUST_SIZE.h))}
      />
    );
  }
  const base = `/teachers/${look.photo}`;
  const moving = look.clips && !still && !reduced;
  return (
    <div className={`teacher-face ${talking ? "talking" : ""}`} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}.jpg`} alt="Your teacher" width={size} height={size} onError={() => setBroken(true)} />
      {moving && (
        <>
          <video className="tf-idle" src={`${base}-idle.mp4`} poster={`${base}.jpg`} autoPlay muted loop playsInline preload="auto" aria-hidden />
          <video ref={talk} className="tf-talk" src={`${base}-talk.mp4`} muted loop playsInline preload="auto" aria-hidden />
        </>
      )}
    </div>
  );
}
