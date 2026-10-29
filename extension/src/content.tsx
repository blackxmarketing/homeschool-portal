import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import MiaHud, { type Checklists, type MiaApi, type MiaBankView, type Timers } from "@/components/miacademy/MiaHud";
import type { MiaRing, MiaVocab } from "@/lib/store";
import type { MiaSettings } from "@/content/miacademy";
import hudCss from "@/app/miacademy.css";
import { send, type ApiReply } from "./messages";

/**
 * Runs on Miacademy pages: draws the timer strip down the right side (in a
 * shadow root, so Miacademy's styles and ours never mix) and pushes the page
 * over to make room.
 */

const WIDTH = 360;
/** The tab left on the edge when the timers slide away. */
const TAB_WIDTH = 64;
const FONT = "Focus Buddy Fredoka";
const PIXEL_FONT = "Focus Buddy Pixel";

const api: MiaApi = async (body, path = "/api/mia") => {
  const r = await send<ApiReply>({ type: "api", method: "POST", path, body });
  return { ok: r.ok, data: r.data as Awaited<ReturnType<MiaApi>>["data"] };
};
const say = (text: string) => void send({ type: "say", text });

type Loaded = { kidName: string; settings: MiaSettings; timers: Timers; checklists: Checklists; rings: MiaRing[]; bank: MiaBankView; vocab: MiaVocab | null; serverNow: number };

// ---- What Miacademy's own pages load (page-hook.ts), passed on to the portal ----

let checklistListener: ((c: Checklists) => void) | null = null;
async function report(body: Record<string, unknown>) {
  const r = await send<ApiReply<{ checklists?: Checklists }>>({ type: "api", method: "POST", path: "/api/mia/path", body });
  if (r.ok && r.data.checklists) checklistListener?.(r.data.checklists);
}
const sentPdfs = new Set<string>();
function reportPdfs(urls: string[]) {
  // Only on a lesson page, so the PDF belongs to the lesson in the address bar.
  if (!/Content\.Lesson/i.test(location.href)) return;
  const fresh = urls.filter((u) => !sentPdfs.has(u));
  if (!fresh.length) return;
  fresh.forEach((u) => sentPdfs.add(u));
  void report({ page: location.href, pdfs: fresh });
}
// How Miacademy asks for the assignments list (and the page that does), kept so any Miacademy page can read it again.
const PATH_REQUEST = "pathRequest";
const PATH_PAGE = "pathPage";
/** Each Miacademy task's page (taskAssignment id -> address), to send a kid back to it. */
const TASK_PAGES = "taskPages";
let pathRequest: unknown = null;
let pathPage: string | null = null;
let taskPages: Record<string, string> = {};
void chrome.storage.local.get([PATH_REQUEST, PATH_PAGE, TASK_PAGES]).then((v) => {
  pathRequest ??= v[PATH_REQUEST] ?? null;
  pathPage ??= (v[PATH_PAGE] as string | undefined) ?? null;
  taskPages = { ...((v[TASK_PAGES] as Record<string, string> | undefined) ?? {}), ...taskPages };
});
/** Read the kid's assignments again (the answer comes back as a "path" message). The request goes along: a lesson page never loads it. */
function refreshPath(): boolean {
  if (!pathRequest) return false;
  window.postMessage({ __focusBuddy: true, kind: "refreshPath", data: pathRequest }, location.origin);
  return true;
}
/** Back to a task in Miacademy (or the assignments page when its address isn't known). */
function openTask(taskKey: string | null): boolean {
  const to = (taskKey && taskPages[taskKey]) || pathPage;
  if (!to) return false;
  if (to !== location.href) location.href = to;
  return true;
}
function rememberTaskPage(taskKey: string, href: string) {
  if (taskPages[taskKey] === href) return;
  const entries = Object.entries({ ...taskPages, [taskKey]: href }).slice(-60);
  taskPages = Object.fromEntries(entries);
  void chrome.storage.local.set({ [TASK_PAGES]: taskPages });
}

window.addEventListener("message", (e) => {
  if (e.source !== window || !e.data?.__focusBuddy) return;
  if (e.data.kind === "pathRequest" && e.data.data?.url) {
    pathRequest = e.data.data;
    pathPage = location.href;
    void chrome.storage.local.set({ [PATH_REQUEST]: e.data.data, [PATH_PAGE]: location.href });
  }
  if (e.data.kind === "path") void report({ courses: e.data.data });
  if (e.data.kind === "pdfs" && Array.isArray(e.data.data)) reportPdfs(e.data.data);
});
// PDF links can also just be on the page (a link or an embedded viewer).
function scanPdfs() {
  const urls = [...document.querySelectorAll<HTMLElement>("a[href], iframe[src], embed[src], object[data]")]
    .map((el) => el.getAttribute("href") ?? el.getAttribute("src") ?? el.getAttribute("data") ?? "")
    .filter((u) => /miaplaza-content\.s3[\w.-]*\.amazonaws\.com\/.+\.pdf/i.test(u));
  if (urls.length) reportPdfs(urls);
}

/** A Miacademy lesson task page's task id (taskAssignment), or null anywhere else. */
function taskKeyFromAddress(href: string): string | null {
  if (!/Content\.Lesson/i.test(href)) return null;
  const m = /taskAssignment=(?:%22|")?([0-9a-f-]{36})/i.exec(href);
  return m ? m[1].toLowerCase() : null;
}

function App() {
  const [state, setState] = useState<"loading" | "unpaired" | "offline" | Loaded>("loading");

  useEffect(() => {
    const load = async () => {
      const r = await send<ApiReply<Loaded>>({ type: "api", method: "GET", path: "/api/mia" });
      setState(r.ok ? r.data : r.status === 401 ? "unpaired" : "offline");
    };
    void load();
    // Reload when a parent connects or disconnects this computer.
    const onChange = (changes: Record<string, chrome.storage.StorageChange>) => {
      if ("token" in changes) {
        setState("loading");
        void load();
      }
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => chrome.storage.onChanged.removeListener(onChange);
  }, []);

  if (state === "loading") return <Note emoji="⏳" text="Getting your timers ready…" />;
  if (state === "unpaired")
    return <Note emoji="🔌" text="Ask a grown-up to connect your timers. They click the Focus Buddy icon at the top of Chrome." />;
  if (state === "offline") return <Note emoji="📡" text="Can't reach your timers right now. Check the internet, then reload the page." />;
  return (
    <MiaHud
      kidName={state.kidName}
      settings={state.settings}
      initialTimers={state.timers}
      initialChecklists={state.checklists}
      initialRings={state.rings}
      initialBank={state.bank}
      initialVocab={state.vocab}
      serverNow={state.serverNow}
      demo={false}
      api={api}
      say={say}
    />
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="mia-hud">
      <div className="mia-checklist-soon" style={{ marginTop: 20 }}>
        <div style={{ fontSize: 40 }}>{emoji}</div>
        {text}
      </div>
    </div>
  );
}

function mount() {
  if (window.top !== window || document.getElementById("focus-buddy-host")) return;

  // Fonts have to be declared on the page itself; shadow roots ignore @font-face.
  const fonts = document.createElement("style");
  fonts.textContent = [500, 600, 700]
    .map((w) => `@font-face{font-family:"${FONT}";font-weight:${w};font-display:swap;src:url("${chrome.runtime.getURL(`fonts/fredoka-${w}.woff2`)}") format("woff2");}`)
    .join("") +
    `@font-face{font-family:"${PIXEL_FONT}";font-weight:400;font-display:swap;src:url("${chrome.runtime.getURL("fonts/press-start-2p.woff2")}") format("woff2");}`;
  document.head.appendChild(fonts);

  const host = document.createElement("div");
  host.id = "focus-buddy-host";
  host.style.cssText = `position:fixed;top:0;right:0;bottom:0;width:${WIDTH}px;z-index:2147483647;`;
  document.documentElement.appendChild(host);
  document.documentElement.style.setProperty("margin-right", `${WIDTH}px`, "important");

  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; --font-fun: "${FONT}"; --font-pixel: "${PIXEL_FONT}"; }
    ${hudCss}
    .mia-hud { height: 100vh; min-height: 0; max-width: none; overflow-y: auto; font-size: 16px; line-height: 1.3; }
  `;
  shadow.appendChild(style);
  const root = document.createElement("div");
  shadow.appendChild(root);

  // What the strip asks of its host: this page *is* Miacademy, so it's open.
  (window as unknown as { miaHud: object }).miaHud = {
    onMiacademy: (cb: (open: boolean) => void) => cb(true),
    onChecklists: (cb: (c: Checklists) => void) => {
      checklistListener = cb;
    },
    setFullscreen: () => {
      // The break screen already covers the whole page.
    },
    // Done for the day: just a small tab on the edge, and Miacademy gets the whole screen back.
    setCollapsed: (on: boolean) => {
      host.style.width = `${on ? TAB_WIDTH : WIDTH}px`;
      document.documentElement.style.setProperty("margin-right", on ? "0px" : `${WIDTH}px`, "important");
    },
    refreshPath,
    openTask,
    // The task (video, practice, quiz) open in Miacademy, from the address: lets a kid finish it when time runs out.
    onTask: (cb: (taskKey: string | null) => void) => {
      let last: string | null | undefined;
      const check = () => {
        const key = taskKeyFromAddress(location.href);
        if (key) rememberTaskPage(key, location.href);
        if (key !== last) {
          // Left a task (video, practice, quiz): Miacademy has just marked it, so look again.
          if (last) setTimeout(refreshPath, 2500);
          cb((last = key));
        }
      };
      check();
      setInterval(check, 1000);
    },
  };
  createRoot(root).render(<App />);

  scanPdfs();
  new MutationObserver(() => scanPdfs()).observe(document.documentElement, { childList: true, subtree: true });
}

// A parent's computer (parent mode) gets no kid timers.
void send<{ kind?: string; connected?: boolean }>({ type: "status" }).then((s) => {
  if (!(s.connected && s.kind === "parent")) mount();
});
