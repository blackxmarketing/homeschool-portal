// A pretend Miacademy page for checking the extension without installing it:
//   node extension/build.mjs --dev && node extension/dev/serve.mjs
//   open http://localhost:3200 (the portal preview must be running on :3100)
// It runs the real content script with a stand-in for Chrome's extension APIs
// (dev/shim.js) and passes /api/* through to the portal.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "..", "dist");
const PORTAL = "http://localhost:3100";
const TYPES = { ".js": "text/javascript", ".html": "text/html", ".woff2": "font/woff2", ".png": "image/png", ".json": "application/json" };

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname.startsWith("/api/")) {
      const body = ["GET", "HEAD"].includes(req.method) ? undefined : await new Promise((r) => {
        const parts = [];
        req.on("data", (c) => parts.push(c));
        req.on("end", () => r(Buffer.concat(parts)));
      });
      const headers = { "content-type": req.headers["content-type"] ?? "application/json" };
      if (req.headers.authorization) headers.authorization = req.headers.authorization;
      const r = await fetch(PORTAL + url.pathname + url.search, { method: req.method, headers, body });
      res.writeHead(r.status, { "content-type": r.headers.get("content-type") ?? "application/octet-stream" });
      res.end(Buffer.from(await r.arrayBuffer()));
      return;
    }
    const file =
      url.pathname === "/" ? path.join(here, "miacademy.html") : url.pathname === "/shim.js" ? path.join(here, "shim.js") : path.join(dist, url.pathname.replace(/^\/dist\//, ""));
    if (!file.startsWith(here) && !file.startsWith(dist)) return res.writeHead(403).end();
    if (!fs.existsSync(file)) return res.writeHead(404).end("not found");
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
    res.end(fs.readFileSync(file));
  })
  .listen(3200, () => console.log("Pretend Miacademy on http://localhost:3200"));
