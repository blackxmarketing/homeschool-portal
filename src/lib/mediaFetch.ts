/**
 * Finds real photos on Wikipedia / Wikimedia Commons. Only freely licensed
 * images are used, and each comes with its credit and license so it can be
 * shown under the photo.
 */

export interface Photo {
  src: string;
  width: number;
  height: number;
  /** Who made it, e.g. "NASA" or a photographer's name. */
  credit: string;
  license: string;
  /** The image's page on Wikimedia Commons (credit link). */
  link: string;
}

const UA = "HomeschoolLearningPortal/1.0 (family learning site; https://github.com/blackxmarketing/homeschool-portal)";
const WIDTH = 960;

/** Throws when Wikimedia can't be reached, so a network hiccup isn't mistaken for "no photo". */
async function getJson(url: string, ms = 6000): Promise<unknown> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const res = await fetch(url, { headers: { "user-agent": UA, "api-user-agent": UA }, signal: ctl.signal });
    if (res.status >= 500 || res.status === 429) throw new Error("Wikimedia is busy: " + res.status);
    if (!res.ok) return null;
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

const stripHtml = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Licenses that allow reuse with credit. */
function freeLicense(name: string): boolean {
  return /public domain|^pd|cc0|cc[- ]by|gfdl|attribution|no restrictions/i.test(name);
}

type ImageInfo = {
  thumburl?: string;
  thumbwidth?: number;
  thumbheight?: number;
  url?: string;
  width?: number;
  height?: number;
  descriptionurl?: string;
  extmetadata?: Record<string, { value?: string } | undefined>;
};

/** Size, credit and license for a file, from Commons (or English Wikipedia for local files). */
async function fileInfo(file: string): Promise<Photo | null> {
  const title = file.startsWith("File:") ? file : `File:${file}`;
  for (const host of ["commons.wikimedia.org", "en.wikipedia.org"]) {
    const data = (await getJson(
      `https://${host}/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=${WIDTH}&titles=${encodeURIComponent(title)}`,
    )) as { query?: { pages?: { missing?: boolean; imageinfo?: ImageInfo[] }[] } } | null;
    const page = data?.query?.pages?.[0];
    const info = page?.imageinfo?.[0];
    if (!info) continue;
    const meta = info.extmetadata ?? {};
    const license = stripHtml(meta.LicenseShortName?.value ?? "");
    if (!license || !freeLicense(license)) return null;
    const src = (info.thumburl ?? info.url)?.split("?")[0];
    if (!src) return null;
    const credit = stripHtml(meta.Artist?.value ?? meta.Credit?.value ?? "Wikimedia Commons").slice(0, 120) || "Wikimedia Commons";
    return {
      src,
      width: info.thumbwidth ?? info.width ?? WIDTH,
      height: info.thumbheight ?? info.height ?? Math.round(WIDTH * 0.66),
      credit,
      license,
      link: info.descriptionurl ?? `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}`,
    };
  }
  return null;
}

/**
 * A photo for a slide: a Wikipedia article title (its main freely licensed
 * image) or a Commons file name ("File:..."). Null means no free photo;
 * it throws when Wikimedia can't be reached.
 */
export async function resolvePhoto(ref: string): Promise<Photo | null> {
  const r = ref.trim();
  if (!r) return null;
  if (/^file:/i.test(r)) return fileInfo(`File:${r.slice(5)}`);
  const data = (await getJson(
    `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1&prop=pageimages&piprop=name&pilicense=free&titles=${encodeURIComponent(r)}`,
  )) as { query?: { pages?: { pageimage?: string }[] } } | null;
  const name = data?.query?.pages?.[0]?.pageimage;
  return name ? fileInfo(`File:${name}`) : null;
}
