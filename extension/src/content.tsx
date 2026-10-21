import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import MiaHud, { type MiaApi, type Timers } from "@/components/miacademy/MiaHud";
import type { MiaSettings } from "@/content/miacademy";
import hudCss from "@/app/miacademy.css";
import { send, type ApiReply } from "./messages";

/**
 * Runs on Miacademy pages: draws the timer strip down the right side (in a
 * shadow root, so Miacademy's styles and ours never mix) and pushes the page
 * over to make room.
 */

const WIDTH = 360;
const FONT = "Focus Buddy Fredoka";

const api: MiaApi = async (body) => {
  const r = await send<ApiReply>({ type: "api", method: "POST", path: "/api/mia", body });
  return { ok: r.ok, data: r.data as Awaited<ReturnType<MiaApi>>["data"] };
};
const say = (text: string) => void send({ type: "say", text });

type Loaded = { kidName: string; settings: MiaSettings; timers: Timers; serverNow: number };

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
  return <MiaHud kidName={state.kidName} settings={state.settings} initialTimers={state.timers} serverNow={state.serverNow} demo={false} api={api} say={say} />;
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
    .join("");
  document.head.appendChild(fonts);

  const host = document.createElement("div");
  host.id = "focus-buddy-host";
  host.style.cssText = `position:fixed;top:0;right:0;bottom:0;width:${WIDTH}px;z-index:2147483647;`;
  document.documentElement.appendChild(host);
  document.documentElement.style.setProperty("margin-right", `${WIDTH}px`, "important");

  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; --font-fun: "${FONT}"; }
    ${hudCss}
    .mia-hud { height: 100vh; min-height: 0; max-width: none; overflow-y: auto; font-size: 16px; line-height: 1.3; }
  `;
  shadow.appendChild(style);
  const root = document.createElement("div");
  shadow.appendChild(root);

  // What the strip asks of its host: this page *is* Miacademy, so it's open.
  (window as unknown as { miaHud: object }).miaHud = {
    onMiacademy: (cb: (open: boolean) => void) => cb(true),
    setFullscreen: () => {
      // The break screen already covers the whole page.
    },
  };
  createRoot(root).render(<App />);
}

mount();
