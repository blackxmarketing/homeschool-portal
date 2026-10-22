import path from "node:path";

/** Where the Miacademy checklist photos are kept: DATA_DIR/mia-photos/<kidId>/<file>. */
export function miaPhotoDir(): string {
  return path.join(process.env.DATA_DIR ?? path.join(process.cwd(), "data"), "mia-photos");
}
