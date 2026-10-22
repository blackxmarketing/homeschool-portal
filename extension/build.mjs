// Builds the Focus Buddy Chrome extension into extension/dist.
//   node extension/build.mjs          -> for the live portal (what goes to the Chrome Web Store)
//   node extension/build.mjs --dev    -> also allows the local preview (http://localhost:3100)
// MIA_PORTAL=https://... overrides the portal address.
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const out = path.join(here, "dist");
const dev = process.argv.includes("--dev");
const portal = (process.env.MIA_PORTAL ?? "https://lvluplearningacademy.com").replace(/\/+$/, "");
const version = JSON.parse(fs.readFileSync(path.join(here, "version.json"), "utf8")).version;

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "icons"), { recursive: true });
fs.mkdirSync(path.join(out, "fonts"), { recursive: true });

await build({
  entryPoints: {
    background: path.join(here, "src/background.ts"),
    content: path.join(here, "src/content.tsx"),
    "page-hook": path.join(here, "src/page-hook.ts"),
    parent: path.join(here, "src/parent.ts"),
    offscreen: path.join(here, "src/offscreen.ts"),
    popup: path.join(here, "src/popup.ts"),
  },
  outdir: out,
  bundle: true,
  format: "iife",
  target: "chrome116",
  minify: !dev,
  sourcemap: dev ? "inline" : false,
  jsx: "automatic",
  loader: { ".css": "text" },
  tsconfig: path.join(root, "tsconfig.json"),
  define: { "process.env.NODE_ENV": '"production"', __PORTAL__: JSON.stringify(portal) },
  logLevel: "warning",
});

for (const f of fs.readdirSync(path.join(here, "static"))) fs.copyFileSync(path.join(here, "static", f), path.join(out, f));
for (const w of [500, 600, 700])
  fs.copyFileSync(
    path.join(root, `node_modules/@fontsource/fredoka/files/fredoka-latin-${w}-normal.woff2`),
    path.join(out, `fonts/fredoka-${w}.woff2`),
  );
// The pixel font for titles and buttons (matches the portal's pixel game).
fs.copyFileSync(
  path.join(root, "node_modules/@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff2"),
  path.join(out, "fonts/press-start-2p.woff2"),
);

// Students work on miacademy.co; parents.miacademy.co is the parent site and gets no timers.
const MIACADEMY = ["https://miacademy.co/*", "https://www.miacademy.co/*"];
const manifest = {
  manifest_version: 3,
  name: "Focus Buddy",
  short_name: "Focus Buddy",
  version,
  description: "Kid-friendly 30-minute learning timers on the side of Miacademy, for our family's homeschool portal.",
  icons: { 16: "icons/icon-16.png", 32: "icons/icon-32.png", 48: "icons/icon-48.png", 128: "icons/icon-128.png" },
  action: { default_popup: "popup.html", default_title: "Focus Buddy", default_icon: { 16: "icons/icon-16.png", 32: "icons/icon-32.png" } },
  background: { service_worker: "background.js" },
  permissions: ["storage", "offscreen", "tts"],
  host_permissions: [`${portal}/*`, ...(dev ? ["http://localhost:3100/*"] : [])],
  content_scripts: [
    // Sees the data Miacademy's pages load (read-only), see src/page-hook.ts.
    { matches: MIACADEMY, js: ["page-hook.js"], run_at: "document_start", world: "MAIN" },
    { matches: MIACADEMY, js: ["content.js"], run_at: "document_idle" },
    // Parent mode: reads the calendar on the parent's Miacademy pages (src/parent.ts).
    { matches: ["https://parents.miacademy.co/*"], js: ["parent.js"], run_at: "document_idle" },
  ],
  web_accessible_resources: [{ resources: ["fonts/*.woff2"], matches: MIACADEMY }],
};
fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 2));

// ---- Icons: a little timer (royal blue ring, white face, red wedge), drawn here so there are no image files to keep ----
function crc32(buf) {
  let c,
    crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(size, rgba) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}
function icon(size) {
  const ss = 4;
  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (let sy = 0; sy < ss; sy++)
        for (let sx = 0; sx < ss; sx++) {
          const u = ((x + (sx + 0.5) / ss) / size) * 2 - 1;
          const v = ((y + (sy + 0.5) / ss) / size) * 2 - 1;
          const d = Math.hypot(u, v);
          // Angle from 12 o'clock, going counter-clockwise (like the timer's disk).
          const ang = (Math.atan2(-u, -v) + 2 * Math.PI) % (2 * Math.PI);
          let c = null;
          if (d <= 1) c = [35, 64, 255];
          if (d <= 0.78) c = [255, 255, 255];
          if (d <= 0.66 && ang <= Math.PI * 1.5) c = [242, 84, 91];
          if (d <= 0.12) c = [255, 255, 255];
          if (c) {
            r += c[0];
            g += c[1];
            b += c[2];
            a += 255;
          }
        }
      const n = ss * ss;
      const i = (y * size + x) * 4;
      const cov = a / 255;
      px[i] = cov ? r / cov : 0;
      px[i + 1] = cov ? g / cov : 0;
      px[i + 2] = cov ? b / cov : 0;
      px[i + 3] = a / n;
    }
  return png(size, px);
}
for (const s of [16, 32, 48, 128]) fs.writeFileSync(path.join(out, `icons/icon-${s}.png`), icon(s));

console.log(`Focus Buddy ${version} built in extension/dist for ${portal}${dev ? " (+ localhost preview)" : ""}`);
