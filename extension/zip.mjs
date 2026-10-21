// Packs extension/dist into extension/focus-buddy-<version>.zip for the Chrome Web Store.
//   npm run ext:zip   (builds the live version first)
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "dist");
const { version } = JSON.parse(fs.readFileSync(path.join(dist, "manifest.json"), "utf8"));
if (JSON.parse(fs.readFileSync(path.join(dist, "manifest.json"), "utf8")).host_permissions.some((h) => h.includes("localhost")))
  throw new Error("dist is a --dev build. Run node extension/build.mjs first.");

const table = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

function files(dir, base = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name), `${base}${e.name}/`) : [[`${base}${e.name}`, path.join(dir, e.name)]],
  );
}

const locals = [];
const centrals = [];
let offset = 0;
for (const [name, full] of files(dist)) {
  const data = fs.readFileSync(full);
  const packed = zlib.deflateRawSync(data, { level: 9 });
  const nameBuf = Buffer.from(name);
  const crc = crc32(data);
  const head = Buffer.alloc(30);
  head.writeUInt32LE(0x04034b50, 0);
  head.writeUInt16LE(20, 4);
  head.writeUInt16LE(8, 8);
  head.writeUInt32LE(crc, 14);
  head.writeUInt32LE(packed.length, 18);
  head.writeUInt32LE(data.length, 22);
  head.writeUInt16LE(nameBuf.length, 26);
  locals.push(head, nameBuf, packed);
  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0);
  cen.writeUInt16LE(20, 4);
  cen.writeUInt16LE(20, 6);
  cen.writeUInt16LE(8, 10);
  cen.writeUInt32LE(crc, 16);
  cen.writeUInt32LE(packed.length, 20);
  cen.writeUInt32LE(data.length, 24);
  cen.writeUInt16LE(nameBuf.length, 28);
  cen.writeUInt32LE(offset, 42);
  centrals.push(cen, nameBuf);
  offset += head.length + nameBuf.length + packed.length;
}
const central = Buffer.concat(centrals);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(centrals.length / 2, 8);
end.writeUInt16LE(centrals.length / 2, 10);
end.writeUInt32LE(central.length, 12);
end.writeUInt32LE(offset, 16);
const out = path.join(here, `focus-buddy-${version}.zip`);
fs.writeFileSync(out, Buffer.concat([...locals, central, end]));
console.log(`Packed ${centrals.length / 2} files into ${path.relative(process.cwd(), out)}`);
