#!/usr/bin/env node
/**
 * Builds public/media/ from the web-sized asset delivery (the folder that holds manifest.md).
 *
 *   node scripts/prepare-media.mjs <path-to-assets-web>
 *
 * Not part of the site build: run it only when the delivery changes, and commit the result.
 * Needs ffmpeg on the PATH. sharp comes with Next.js.
 *
 * What it writes:
 *   - images at the widths the pages ask for, as WebP with a JPEG fallback
 *   - the silent loops, copied as delivered (H.264, 406x720, under 300 KB each), with a still of the first frame
 *   - two rain tiles for the storm
 *
 * File names in public/media/ are neutral (album id + track number). The mapping from the delivery's
 * file names is below and follows manifest.md, not the numbers in those file names.
 *
 * The delivered Shorts are left out on purpose: they carry lyric lines as burned-in captions.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = process.argv[2];
if (!source || !existsSync(join(source, "manifest.md"))) {
  console.error("Pass the folder of the asset delivery (the one that holds manifest.md).");
  process.exit(1);
}

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "media");
rmSync(out, { recursive: true, force: true });

const TE = "telugu/song_covers";
const HI = "hindi/song_art";
const teluguCover = "telugu/album_cover/ALBUM_COVER_Inkaa_Kadha_Migilundhi_3000_v3_side.jpg";

const images = [
  { from: "telugu/banner/SPOTIFY_HEADER_A_rampart_headroom_3840x1646.jpg", to: "storm/banner", widths: [800, 1280, 2000] },
  { from: teluguCover, to: "albums/ikm-cover", widths: [320, 640, 1200] },
  { from: "hindi/album_cover/EP_COVER_Abhi_Kahani_Baaki_Hai_3000.jpg", to: "albums/akbh-cover", widths: [320, 640, 1200] },
  { from: "her-mood-swings/HER_MOOD_SWINGS_COVER_3000.jpg", to: "albums/hms-cover", widths: [320, 640] },
  { from: "her-mood-swings/HER_MOOD_SWINGS_COVER_16x9.jpg", to: "albums/hms-wide", widths: [800, 1280, 2000] },
  { from: "telugu/poster/POSTER_Inkaa_Kadha_Migilundhi.jpg", to: "video/ikm-poster", widths: [640, 960, 1600] },
  { from: "film/Apocalyptic_Roulette_YT_Poster.jpg", to: "films/apocalyptic-roulette", widths: [640, 1280] },
  { from: "film/No_Planet_for_Humans_Poster_With_Title_1.jpg", to: "films/no-planet-for-humans", widths: [640, 1280] },
  { from: "film/Arcane_Legacy_poster_resized.jpg", to: "films/arcane-legacy", widths: [640, 1280] },
];

// One row per track, in album order: [square cover, loop].
// The Telugu title track has no cover of its own; the album cover stands in.
const tracks = {
  ikm: [
    [teluguCover, "telugu/canvas/01_Inkaa_Kadha_Migilundhi"],
    [`${TE}/05_Nuvvu_Cheppina_Maatale_ORIGINAL_COVER_3000.jpg`, "telugu/canvas/02_Nuvvu_Cheppina_Maatale"],
    [`${TE}/07_Mounanga_Unnaa_ORIGINAL_COVER_3000.jpg`, "telugu/canvas/03_Mounamga_Unna"],
    [`${TE}/02_Inkaa_Kadha_Migilundhi_ELECTRIC_COVER_3000.jpg`, "telugu/canvas/04_Electric"],
    [`${TE}/04_Ennaallaina_Marchipolenu_ALT_COVER_3000.jpg`, "telugu/canvas/05_Ennaallaina_Marchipolenu"],
    [`${TE}/01_Inkaa_Kadha_Migilundhi_BEATS_COVER_3000.jpg`, "telugu/canvas/06_Beats"],
    [`${TE}/06_Nuvvu_Cheppina_Maatale_MASHUP_COVER_3000.jpg`, "telugu/canvas/07_Mashup"],
    [`${TE}/03_Inkaa_Kadha_Migilundhi_EXTENDED_COVER_3000.jpg`, "telugu/canvas/08_Extended"],
    [`${TE}/10_Tum_Samjhe_Main_Bhool_Gayi_HER_RESPONSE_COVER_3000.jpg`, "telugu/canvas/09_Tum_Samjhe_Main_Bhool_Gayi_Her_Response"],
    [`${TE}/08_Inkaa_Kadha_Migilundhi_HER_VERSION_COVER_3000.jpg`, "telugu/canvas/10_Her_Version"],
  ],
  akbh: [
    [`${HI}/01_Abhi_Kahani_Baaki_Hai_COVER_3000.jpg`, "hindi/canvas/01_Abhi_Kahani_Baaki_Hai"],
    [`${HI}/02_Sach_Saamne_Aa_Jaayega_COVER_3000.jpg`, "hindi/canvas/02_Sach_Saamne_Aa_Jaayega"],
    [`${HI}/03_Bhool_Nahi_Paaya_COVER_3000.jpg`, "hindi/canvas/03_Bhool_Nahi_Paaya"],
    [`${HI}/04_Teri_Baatein_COVER_3000.jpg`, "hindi/canvas/04_Teri_Baatein"],
    [`${HI}/05_Tum_Samjhe_Main_Bhool_Gayi_HER_RESPONSE_COVER_3000.jpg`, "hindi/canvas/05_Tum_Samjhe_Main_Bhool_Gayi_Her_Response"],
    [`${HI}/06_Abhi_Kahani_Baaki_Hai_HER_VERSION_COVER_3000.jpg`, "hindi/canvas/06_Abhi_Kahani_Baaki_Hai_Her_Version"],
    [`${HI}/07_Abhi_Kahani_Baaki_Hai_ACOUSTIC_COVER_3000.jpg`, "hindi/canvas/07_Abhi_Kahani_Baaki_Hai_Acoustic"],
    [`${HI}/08_Tum_Samjhe_Main_Bhool_Gayi_ACOUSTIC_COVER_3000.jpg`, "hindi/canvas/08_Tum_Samjhe_Main_Bhool_Gayi_Acoustic"],
  ],
};

const THUMB = 128; // track art is shown at 42 px

const ensure = (file) => mkdirSync(dirname(file), { recursive: true });
const pad = (n) => String(n).padStart(2, "0");
let bytes = 0;
const count = (file) => {
  bytes += statSync(file).size;
};

async function writeImage(from, to, width) {
  const base = join(out, `${to}-${width}`);
  ensure(base);
  const pipeline = sharp(join(source, from)).resize({ width, withoutEnlargement: true });
  await pipeline.clone().webp({ quality: 78, effort: 6 }).toFile(`${base}.webp`);
  await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`);
  count(`${base}.webp`);
  count(`${base}.jpg`);
}

for (const { from, to, widths } of images) {
  for (const width of widths) await writeImage(from, to, width);
}

for (const [album, rows] of Object.entries(tracks)) {
  for (const [index, [cover, loop]] of rows.entries()) {
    const n = pad(index + 1);

    const thumb = join(out, "tracks", `${album}-${n}`);
    ensure(thumb);
    const art = sharp(join(source, cover)).resize({ width: THUMB, height: THUMB, fit: "cover" });
    await art.clone().webp({ quality: 80 }).toFile(`${thumb}.webp`);
    await art.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${thumb}.jpg`);
    count(`${thumb}.webp`);
    count(`${thumb}.jpg`);

    const video = join(out, "loops", `${album}-${n}.mp4`);
    ensure(video);
    copyFileSync(join(source, `${loop}.mp4`), video);
    count(video);

    // The still is the loop's first frame, so nothing jumps when the loop starts.
    const frame = join(out, "loops", `${album}-${n}.png`);
    execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", video, "-frames:v", "1", frame]);
    await sharp(frame).jpeg({ quality: 74, mozjpeg: true }).toFile(video.replace(/\.mp4$/, ".jpg"));
    rmSync(frame);
    count(video.replace(/\.mp4$/, ".jpg"));
  }
}

/* Rain: two tiles of short streaks, drawn once with a fixed seed. */

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rainTile(seed, { size, count: streaks, min, max, slant = 0.2, color = "#dfe6f0" }) {
  const r = rng(seed);
  const lines = Array.from({ length: streaks }, () => {
    const x = r() * size;
    const y = r() * size;
    const len = min + r() * (max - min);
    const o = 0.14 + r() * 0.5;
    return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - len * slant).toFixed(1)}" y2="${(y + len).toFixed(1)}" stroke-opacity="${o.toFixed(2)}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><g stroke="${color}" stroke-width="1" stroke-linecap="round">${lines}</g></svg>\n`;
}

writeFileSync(join(out, "rain-near.svg"), rainTile(11, { size: 420, count: 26, min: 26, max: 64 }));
writeFileSync(join(out, "rain-far.svg"), rainTile(23, { size: 300, count: 40, min: 10, max: 26 }));
count(join(out, "rain-near.svg"));
count(join(out, "rain-far.svg"));

console.log(`public/media written: ${(bytes / 1048576).toFixed(1)} MB`);
