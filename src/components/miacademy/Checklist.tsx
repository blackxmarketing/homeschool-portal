"use client";

import { useEffect, useRef, useState } from "react";
import { itemMaterials, needsMaterials, type LessonItem } from "@/lib/miaLessons";
import type { MiaChecklist, MiaCourseChecklist } from "@/lib/store";
import { checkSound, primeSound } from "@/components/voice";
import { bridge, type MiaApi } from "./MiaHud";

/**
 * The step-by-step checklist under an open timer: the next three activities
 * of the kid's Miacademy lesson, the top one big and bright, the other two dim.
 * The kid taps the big box to check one off (a "ding"), it pops away, and the
 * next one slides up. Online activities light up once Miacademy has them done:
 * tapping one that isn't lit yet reads Miacademy again, and if it's done there it
 * checks itself off.
 */

const isOnline = (item: LessonItem) => item.check === "video" || item.check === "online" || item.check === "practice" || item.check === "quiz";
/** While the timer runs and the next activity is online, look at Miacademy again this often. */
const LOOK_EVERY_MS = 45_000;

/** A pencil for work in the packet, a computer for work in Miacademy. */
const PACKET = "✏️";
const COMPUTER = "💻";
const ICON: Record<LessonItem["check"], string> = { video: COMPUTER, practice: COMPUTER, quiz: COMPUTER, online: COMPUTER, self: PACKET, photo: PACKET, parent: PACKET };

type Entry = MiaCourseChecklist["upcoming"][number];

export default function Checklist({
  checklist,
  part,
  color,
  running,
  api,
  say,
  onChecklists,
  onSupplies,
}: {
  checklist: MiaCourseChecklist;
  /** Which of the subject's classes this is (to find it again in new checklists). */
  part: number;
  color: string;
  /** The subject's timer is running (activities can be checked off). */
  running: boolean;
  api: MiaApi;
  say: (text: string) => void;
  onChecklists: (c: Record<string, MiaChecklist | null>) => void;
  /** Pause the timer to gather supplies for this activity. */
  onSupplies: (lessonId: number, itemId: string) => void;
}) {
  const [photoFor, setPhotoFor] = useState<Entry | null>(null);
  const [leaving, setLeaving] = useState<string | null>(null);
  const [checking, setChecking] = useState<string | null>(null);
  /** The online activity the kid tapped before Miacademy showed it done: we're reading Miacademy again. */
  const [looking, setLooking] = useState<string | null>(null);
  /** Looked, and Miacademy doesn't show it done yet: offer to go back to it. */
  const [notYet, setNotYet] = useState<string | null>(null);

  const waiting = checklist.upcoming.filter((e) => e.state.waitingForParent);
  const todo = checklist.upcoming.filter((e) => !e.state.waitingForParent);
  const top = todo[0];

  const topKey = top ? `${top.lessonId}:${top.item.id}` : null;
  const topWaits = !!top && isOnline(top.item) && !top.state.ready;

  // The kid tapped it and Miacademy now says it's done: check it off for them.
  useEffect(() => {
    if (looking && looking === topKey && top?.state.ready) {
      setLooking(null);
      setNotYet(null);
      void done(top);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [looking, topKey, top?.state.ready]);

  // Still not done after a few seconds: say what to do.
  useEffect(() => {
    if (!looking) return;
    const t = setTimeout(() => {
      setNotYet(looking);
      setLooking(null);
      say("Miacademy doesn't show that one finished yet. Let's go back to it.");
    }, 8000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [looking]);

  // While the timer runs, keep an eye on Miacademy so the box lights up on its own.
  useEffect(() => {
    if (!running || !topWaits) return;
    const t = setInterval(() => bridge()?.refreshPath?.(), LOOK_EVERY_MS);
    return () => clearInterval(t);
  }, [running, topWaits]);

  function lookAgain(entry: Entry) {
    primeSound();
    if (!bridge()?.refreshPath?.()) {
      say("Go to your Miacademy assignments page for a moment, so I can see it's done. Then tap the box.");
      return;
    }
    setLooking(`${entry.lessonId}:${entry.item.id}`);
  }

  // Hands-on activities: do it now (the timer pauses while supplies are gathered with a grown-up) or save it for later.
  function doNow(entry: Entry) {
    onSupplies(entry.lessonId, entry.item.id);
    say(`Time to gather your supplies for ${entry.item.title}. Your timer is paused, and a grown-up will help.`);
  }
  async function saveForLater(entry: Entry) {
    const { ok, data } = await api({ lessonId: entry.lessonId, itemId: entry.item.id, later: true }, "/api/mia/item");
    const next = (data as { checklists?: Record<string, MiaChecklist | null> }).checklists;
    if (!ok || !next) return;
    say(`Saved for later: ${entry.item.title}. ${nextLine(next[checklist.subject]?.parts[part]).replace(/^Nice! /, "")}`);
    onChecklists(next);
  }

  // Pop the finished activity away, then show the new list.
  async function finished(entry: Entry, next: Record<string, MiaChecklist | null>) {
    checkSound();
    setChecking(null);
    setLeaving(`${entry.lessonId}:${entry.item.id}`);
    say(nextLine(next[checklist.subject]?.parts[part]));
    await new Promise((r) => setTimeout(r, 650));
    setLeaving(null);
    onChecklists(next);
  }

  async function done(entry: Entry) {
    primeSound();
    setChecking(`${entry.lessonId}:${entry.item.id}`);
    const { ok, data } = await api({ lessonId: entry.lessonId, itemId: entry.item.id }, "/api/mia/item");
    const next = (data as { checklists?: Record<string, MiaChecklist | null> }).checklists;
    if (ok && next) await finished(entry, next);
    else setChecking(null);
  }

  const week = (
    <div className="mia-week">
      <div className="mia-week-row">
        <span>This week</span>
        <span>
          {Math.min(checklist.doneThisWeek, checklist.target)} of {checklist.target} lesson{checklist.target > 1 ? "s" : ""}
          {checklist.doneThisWeek >= checklist.target ? " ✓" : ""}
          {checklist.doneThisWeek > checklist.target ? ` (+${checklist.doneThisWeek - checklist.target} ahead!)` : ""}
        </span>
      </div>
      <div className="mia-bar">
        <i style={{ width: `${Math.min(100, (checklist.doneThisWeek / checklist.target) * 100)}%` }} />
      </div>
    </div>
  );

  let body: React.ReactNode;
  if (checklist.weekDone) body = <div className="mia-cl-note">✅ Done for this week! Great job.</div>;
  else if (checklist.onlineOnly && !top) body = <div className="mia-cl-note">💻 Open your next {checklist.name ?? "lesson"} activity in Miacademy.</div>;
  else if (checklist.needsPdf)
    body = <div className="mia-cl-note">📄 Open your Student PDF in Miacademy, and your checklist will show up here.</div>;
  else if (checklist.reading && !top) body = <div className="mia-cl-note">⏳ Getting your checklist ready…</div>;
  else if (checklist.failed && !top)
    body = <div className="mia-cl-note">😕 I couldn&apos;t load this lesson&apos;s checklist. Open your Student PDF in Miacademy again, or ask a grown-up.</div>;
  else if (!top && !waiting.length && !checklist.later.length)
    body = <div className="mia-cl-note">🎉 You finished every activity! Pick your next lesson in Miacademy.</div>;
  else
    body = (
      <div className="mia-tasks">
        {todo.map((e, i) => {
          const key = `${e.lessonId}:${e.item.id}`;
          if (i > 0)
            return (
              <div key={key} className="mia-task dim">
                <span>{ICON[e.item.check]}</span> {e.item.title}
              </div>
            );
          return (
            <div key={key} className={`mia-task top ${leaving === key ? "poof" : ""}`} style={{ ["--c" as string]: color }}>
              <TopTask
                entry={e}
                running={running}
                checked={checking === key || leaving === key}
                looking={looking === key}
                notYet={notYet === key && !e.state.ready}
                onBack={() => {
                  setNotYet(null);
                  if (!bridge()?.openTask?.(/^task-([0-9a-f-]{36})$/.exec(e.item.id)?.[1] ?? null))
                    say("Open it in Miacademy, finish it, then tap the box again.");
                }}
                onPhoto={() => setPhotoFor(e)}
                onCheck={() => void done(e)}
                onLook={() => lookAgain(e)}
                onNow={() => doNow(e)}
                onLater={() => void saveForLater(e)}
              />
            </div>
          );
        })}
        {waiting.map((e) => (
          <div key={`w${e.lessonId}:${e.item.id}`} className="mia-task waiting">
            ⏳ {e.item.title}: waiting for a grown-up to approve
          </div>
        ))}
        {checklist.later.length > 0 && (
          <div className="mia-later">
            <div className="mia-later-head">⏭️ Saved for later</div>
            {checklist.later.map((e) => (
              <div key={`l${e.lessonId}:${e.item.id}`} className="mia-later-row">
                <span>
                  {PACKET} {e.item.title}
                  {e.lessonTitle !== checklist.lessonTitle && <span className="mia-later-lesson"> · {e.lessonTitle}</span>}
                </span>
                {e.state.waitingForParent ? (
                  <span className="mia-later-wait">⏳ Grown-up checking</span>
                ) : (
                  <button className="mia-btn mia-later-btn" onClick={() => setPhotoFor(e)}>
                    📷 I did it!
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );

  return (
    <div className="mia-checklist" style={{ ["--c" as string]: color }}>
      <div className="mia-cl-head">
        <span>
          {checklist.name && <span className="mia-cl-class">{checklist.name}</span>}
          {checklist.lessonTitle && checklist.lessonTitle !== checklist.name && <>📝 {checklist.lessonTitle}</>}
        </span>
        {checklist.left > 0 && <span className="mia-cl-left">{checklist.left} to go</span>}
      </div>
      {checklist.bigLesson && <div className="mia-cl-big">🗓️ This lesson gets 4 days. Take your time and do it well!</div>}
      {body}
      {week}
      {photoFor && (
        <PhotoCheck
          entry={photoFor}
          color={color}
          api={api}
          say={say}
          onClose={() => setPhotoFor(null)}
          onDone={async (next, fixed) => {
            setPhotoFor(null);
            if (fixed) await done(photoFor);
            else if (next) onChecklists(next);
          }}
        />
      )}
    </div>
  );
}

function nextLine(next: MiaCourseChecklist | null | undefined): string {
  const top = next?.upcoming.find((e) => !e.state.waitingForParent);
  return top ? `Nice! Next up: ${top.item.title}.` : "Nice! You finished every activity in this lesson!";
}

function TopTask({
  entry,
  running,
  checked,
  looking,
  notYet,
  onBack,
  onPhoto,
  onCheck,
  onLook,
  onNow,
  onLater,
}: {
  entry: Entry;
  running: boolean;
  checked: boolean;
  /** Reading Miacademy again to see if it's done. */
  looking: boolean;
  /** Not lit yet: read Miacademy again. */
  onLook: () => void;
  /** Miacademy doesn't show it done yet. */
  notYet: boolean;
  /** Go back to it in Miacademy. */
  onBack: () => void;
  onPhoto: () => void;
  onCheck: () => void;
  /** Hands-on: gather the supplies now (pauses the timer). */
  onNow: () => void;
  /** Hands-on: save it for later. */
  onLater: () => void;
}) {
  const { item, state } = entry;
  const pages = item.pages.length ? ` · page${item.pages.length > 1 ? "s" : ""} ${item.pages[0]}${item.pages.length > 1 ? `-${item.pages.at(-1)}` : ""}` : "";
  const kind = `${ICON[item.check]} ${
    item.check === "video" || item.check === "online"
      ? "Online in Miacademy"
      : item.check === "practice"
        ? "Online practice in Miacademy"
        : item.check === "quiz"
          ? "Online quiz"
          : item.check === "parent"
            ? `Hands-on in your packet${pages}`
            : item.check === "self"
              ? `Guided notes in your packet${pages}`
              : `In your packet${pages}`
  }`;
  const online = isOnline(item);
  // What the box does, and the hint under the activity.
  let canCheck = running;
  let hint: React.ReactNode;
  // Not lit yet: while the timer runs, the box asks Miacademy again.
  const look = online && !state.ready && running;
  if (online && !state.ready) {
    canCheck = running;
    hint = looking
      ? "🔎 Checking Miacademy…"
      : item.check === "video"
        ? "Watch it in Miacademy. Then tap the box!"
        : item.check === "practice"
          ? "Play this level in Miacademy. Then tap the box!"
          : item.check === "quiz"
            ? "Take the quiz in Miacademy. Then tap the box!"
            : "Do it in Miacademy. Then tap the box!";
    if (!running) hint = "Press Start to work on this.";
    else if (notYet)
      hint = (
        <>
          Miacademy doesn&apos;t show it finished yet.
          <div className="mia-row">
            <button className="mia-btn" onClick={onBack}>
              ↩️ Go back to it in Miacademy
            </button>
          </div>
        </>
      );
  } else if (needsMaterials(item) && !state.suppliesReady) {
    // Only the activity that needs materials: do it now, or save just this one for later.
    canCheck = false;
    hint = (
      <>
        <b>Needs:</b> {itemMaterials(item).join(", ")}
        <div className="mia-row mia-now-later">
          <button className="mia-btn" onClick={onNow} disabled={!running} title={running ? undefined : "Press Start first"}>
            🧰 Do it now
          </button>
          <button className="mia-btn ghost" onClick={onLater}>
            ⏭️ Save for later
          </button>
        </div>
      </>
    );
  } else if (!running) hint = "Press Start to work on this.";
  else if (online) hint = <b>Done in Miacademy! Check it off ✓</b>;
  else if (item.check === "self") hint = "Tap the box when you're done.";
  else if (item.check === "parent") hint = "Tap the box when you're done, then take a photo for a grown-up.";
  else hint = "Tap the box when you're done, then take a photo to check your work.";
  const tap = () => {
    primeSound();
    if (look) onLook();
    else if (item.check === "photo" || item.check === "parent") onPhoto();
    else onCheck();
  };
  return (
    <div className="mia-task-row">
      <button
        className={`mia-check ${checked ? "on" : ""} ${canCheck && online ? "ready" : ""}`}
        onClick={tap}
        disabled={!canCheck || checked || looking}
        aria-label={`Check off: ${item.title}`}
      >
        {checked ? "✓" : ""}
      </button>
      <div className="mia-task-text">
        <div className="mia-kind">{kind}</div>
        <div className="mia-task-title">{item.title}</div>
        <div className="mia-hint">{hint}</div>
      </div>
    </div>
  );
}

/**
 * Photos of the work. A worksheet goes page by page: a photo of the top half and
 * one of the bottom half (close enough to read), checked right away against that
 * page of the answer key. Anything to fix is explained, and the page is checked
 * again before the next one. After three tries a grown-up takes a look.
 * A hands-on activity is one photo for a grown-up.
 */
function PhotoCheck({
  entry,
  color,
  api,
  say,
  onClose,
  onDone,
}: {
  entry: Entry;
  color: string;
  api: MiaApi;
  say: (text: string) => void;
  onClose: () => void;
  onDone: (next: Record<string, MiaChecklist | null> | null, fixed: boolean) => void;
}) {
  type Result = { right: number; total: number; wrong: { question: string; answer: string }[]; message: string };
  const worksheet = entry.item.check === "photo";
  const pages = worksheet && entry.item.pages.length ? entry.item.pages : [0];
  const firstLeft = Math.max(0, pages.findIndex((pg) => !entry.state.pagesDone?.includes(pg)));
  const [pageIdx, setPageIdx] = useState(firstLeft);
  const [halves, setHalves] = useState<string[]>([]);
  const [step, setStep] = useState<"camera" | "checking" | "result" | "sent" | "unreadable" | "grownUp">("camera");
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState("");
  const [camError, setCamError] = useState(false);
  const [next, setNext] = useState<Record<string, MiaChecklist | null> | null>(null);
  const [tries, setTries] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);

  const page = pages[pageIdx];
  const pageName = page ? `page ${page}` : "your page";
  const half = worksheet ? (halves.length === 0 ? "top" : "bottom") : null;
  const lastPage = pageIdx >= pages.length - 1;

  useEffect(() => {
    if (step !== "camera") return;
    let cancelled = false;
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 } } })
      .then((st) => {
        if (cancelled) return st.getTracks().forEach((t) => t.stop());
        stream.current = st;
        if (video.current) video.current.srcObject = st;
      })
      .catch(() => setCamError(true));
    if (!navigator.mediaDevices) setCamError(true);
    return () => {
      cancelled = true;
      stream.current?.getTracks().forEach((t) => t.stop());
      stream.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, pageIdx]);

  // Say what to photograph next.
  useEffect(() => {
    if (step !== "camera") return;
    if (!worksheet) say("Show your work to the camera and take a photo for a grown-up.");
    else if (halves.length === 0) say(`Take a photo of the top half of ${pageName}. Hold it close so I can read it.`);
    else say(`Now the bottom half of ${pageName}.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, pageIdx, halves.length]);

  /** A photo was taken: a worksheet needs both halves of the page before it's checked. */
  function took(dataUrl: string) {
    if (worksheet && halves.length === 0) {
      setHalves([dataUrl]);
      return;
    }
    void send(worksheet ? [...halves, dataUrl] : [dataUrl]);
  }

  async function send(shots: string[]) {
    setHalves(shots);
    setStep("checking");
    stream.current?.getTracks().forEach((t) => t.stop());
    const images = shots.map((url) => {
      const [head, data] = url.split(",");
      return { image: data, mediaType: /image\/(png|webp)/.exec(head)?.[0] ?? "image/jpeg" };
    });
    const { ok, data: res } = await api({ lessonId: entry.lessonId, itemId: entry.item.id, images, page }, "/api/mia/photo");
    const r = res as Partial<Result> & { readable?: boolean; waitingForParent?: boolean; error?: string; checklists?: Record<string, MiaChecklist | null> };
    if (r.checklists) setNext(r.checklists);
    if (!ok) {
      setMessage(r.error ?? "That didn't work. Try again.");
      setStep("unreadable");
    } else if (r.waitingForParent) {
      setStep("sent");
      say("Sent to a grown-up! Great work.");
    } else if (r.readable === false) {
      setMessage(r.message ?? "I couldn't read that. Hold the page closer and take the two photos again.");
      setStep("unreadable");
      say(r.message ?? "I couldn't read that. Let's take the photos again, a little closer.");
    } else {
      setResult(r as Result);
      setTries((t) => t + 1);
      setStep("result");
      say(
        (r.message ? `${r.message} ` : "") +
          (r.wrong?.length
            ? `Grab your pen and fix ${r.wrong.map((w) => w.question).join(", ")}. Then take the two photos again so I can check.`
            : lastPage
              ? "Every answer is right! Great job."
              : `${pageName} is all right! On to the next page.`),
      );
    }
  }

  function again() {
    setHalves([]);
    setStep("camera");
  }

  function nextPage() {
    setPageIdx((i) => i + 1);
    setTries(0);
    setResult(null);
    setHalves([]);
    setStep("camera");
  }

  async function askGrownUp() {
    await api({ lessonId: entry.lessonId, itemId: entry.item.id, grownUp: true }, "/api/mia/item");
    setStep("grownUp");
    say("Okay! A grown-up will come take a look with you.");
  }

  function snap() {
    const v = video.current;
    if (!v || !v.videoWidth) return;
    const scale = Math.min(1, 1600 / Math.max(v.videoWidth, v.videoHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(v.videoWidth * scale);
    c.height = Math.round(v.videoHeight * scale);
    c.getContext("2d")!.drawImage(v, 0, 0, c.width, c.height);
    took(c.toDataURL("image/jpeg", 0.85));
  }

  function pickFile(f: File | undefined) {
    if (!f) return;
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      took(c.toDataURL("image/jpeg", 0.85));
    };
    img.src = URL.createObjectURL(f);
  }

  const progress =
    worksheet && pages.length > 1 ? (
      <div className="mia-photo-pages">
        Page {pageIdx + 1} of {pages.length}
      </div>
    ) : null;

  let inner: React.ReactNode;
  if (step === "camera")
    inner = (
      <>
        <h2>📸 {entry.item.title}</h2>
        {progress}
        {worksheet && (
          <div className="mia-photo-half">
            <span className={half === "top" ? "on" : "done"}>{half === "top" ? "▶" : "✓"} Top half</span>
            <span className={half === "bottom" ? "on" : ""}>{half === "bottom" ? "▶ " : ""}Bottom half</span>
          </div>
        )}
        <p className="mia-cl-note">
          {worksheet ? (
            <>
              Take a photo of the <b>{half} half</b> of {pageName}. Hold it close so every answer shows.
            </>
          ) : (
            "Show your work to the camera."
          )}
        </p>
        {!camError ? (
          <video ref={video} className="mia-cam" autoPlay playsInline muted />
        ) : (
          <p className="mia-cl-note">The camera isn&apos;t working, so pick a photo instead.</p>
        )}
        <div className="mia-row">
          {!camError && (
            <button className="mia-btn big" onClick={snap}>
              {worksheet ? `Take the ${half} half` : "Take the photo"}
            </button>
          )}
          <label className="mia-btn ghost">
            Choose a photo
            <input type="file" accept="image/*" hidden onChange={(e) => pickFile(e.target.files?.[0])} />
          </label>
        </div>
        <button className="mia-link" onClick={onClose}>
          Not yet
        </button>
      </>
    );
  else if (step === "checking")
    inner = (
      <>
        <div className="mia-photo-shots">
          {halves.map((h, i) => (
            <img key={i} className="mia-shot small" src={h} alt={i === 0 ? "Top half" : "Bottom half"} />
          ))}
        </div>
        <h2>Checking {pageName}…</h2>
        <div className="mia-spinner" />
      </>
    );
  else if (step === "sent")
    inner = (
      <>
        <h2>⏳ Sent to a grown-up!</h2>
        <p>They&apos;ll take a look and check it off. Keep going with the next activity.</p>
        <button className="mia-btn big" onClick={() => onDone(next, false)}>
          OK!
        </button>
      </>
    );
  else if (step === "grownUp")
    inner = (
      <>
        <h2>🙋 A grown-up is coming</h2>
        <p>They&apos;ll look at it with you and check it off when it&apos;s fixed.</p>
        <button className="mia-btn big" onClick={() => onDone(next, false)}>
          OK!
        </button>
      </>
    );
  else if (step === "unreadable")
    inner = (
      <>
        <h2>Let&apos;s try that again</h2>
        <p>{message}</p>
        <div className="mia-row">
          <button className="mia-btn" onClick={again}>
            📸 Take the photos again
          </button>
          <button className="mia-link" onClick={onClose}>
            Not yet
          </button>
        </div>
      </>
    );
  else if (result)
    inner = (
      <>
        {progress}
        <h2>
          {result.wrong.length
            ? tries > 1
              ? "Almost there!"
              : `You got ${result.right} of ${result.total} right on ${pageName}!`
            : tries > 1
              ? `${pageName[0].toUpperCase()}${pageName.slice(1)} is all fixed!`
              : `Every answer on ${pageName} is right!`}
        </h2>
        {result.wrong.length ? (
          <>
            <p>🖊️ Grab a pen or marker and fix {tries > 1 ? "these ones still" : "these"}:</p>
            <div className="mia-fixes">
              {result.wrong.map((w, i) => (
                <div key={i} className="mia-fix">
                  <b>{w.question}</b> → {w.answer}
                </div>
              ))}
            </div>
            <button className="mia-btn big" onClick={again}>
              📸 I fixed them. Check {pageName} again!
            </button>
            {tries >= 3 && (
              <button className="mia-link" onClick={() => void askGrownUp()}>
                Still stuck? Get a grown-up
              </button>
            )}
          </>
        ) : lastPage ? (
          <>
            <p>🎉 {tries > 1 ? "You fixed everything!" : "Great work!"}</p>
            <button className="mia-btn big" onClick={() => onDone(next, true)}>
              Done ✓
            </button>
          </>
        ) : (
          <>
            <p>🎉 On to the next page.</p>
            <button className="mia-btn big" onClick={nextPage}>
              Next page →
            </button>
          </>
        )}
      </>
    );

  return (
    <div className="mia-scrim" style={{ ["--c" as string]: color }}>
      <div className="mia-chooser">{inner}</div>
    </div>
  );
}
