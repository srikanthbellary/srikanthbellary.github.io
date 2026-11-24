// Small helpers shared by the three templates.

export const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const pad = (n, size = 2) => String(n).padStart(size, "0");

// Deterministic PRNG so every build draws the same waveforms and stills.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Amplitudes in 0..1 shaped like a mastered track: phrases, swells, a quiet intro and tail.
export function waveform(seed, count) {
  const r = rng(seed);
  const phase = [r() * 6.28, r() * 6.28, r() * 6.28];
  const speed = [2 + r() * 2.5, 5 + r() * 4, 11 + r() * 9];
  const out = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const envelope = Math.min(1, t * 9) * Math.min(1, (1 - t) * 7);
    const body =
      0.5 +
      0.24 * Math.sin(phase[0] + t * speed[0] * 6.28) +
      0.16 * Math.sin(phase[1] + t * speed[1] * 6.28) +
      0.1 * Math.sin(phase[2] + t * speed[2] * 6.28);
    const grit = 0.62 + r() * 0.38;
    out.push(Math.max(0.06, Math.min(1, body * grit * (0.35 + envelope * 0.65) * 1.25)));
  }
  return out;
}

// Mirrored bar waveform as one SVG. Bars pick up `currentColor`.
export function waveSvg(seed, count, { height = 48, gap = 0.42, cls = "wave", round = true } = {}) {
  const amps = waveform(seed, count);
  const bar = 1 - gap;
  const rects = amps
    .map((a, i) => {
      const h = Math.max(1.5, a * height);
      const y = (height - h) / 2;
      const rx = round ? Math.min(bar / 2, 0.5) : 0;
      return `<rect x="${(i + gap / 2).toFixed(2)}" y="${y.toFixed(2)}" width="${bar.toFixed(2)}" height="${h.toFixed(2)}" rx="${rx}"/>`;
    })
    .join("");
  return `<svg class="${cls}" viewBox="0 0 ${count} ${height}" preserveAspectRatio="none" aria-hidden="true" focusable="false">${rects}</svg>`;
}

export const portrait = ({ sizes, cls = "", alt = "Srikanth Bellary", base = "../assets/portrait" }) => `<picture>
  <source type="image/webp" srcset="${base}/srikanth-bellary.webp 512w, ${base}/srikanth-bellary-2x.webp 1024w" sizes="${sizes}">
  <img${cls ? ` class="${cls}"` : ""} src="${base}/srikanth-bellary.jpg" srcset="${base}/srikanth-bellary.jpg 512w, ${base}/srikanth-bellary-2x.jpg 1024w" sizes="${sizes}" width="1024" height="1024" alt="${esc(alt)}" decoding="async">
</picture>`;

const svg = (body, { size = 24, viewBox = "0 0 24 24", cls = "ico" } = {}) =>
  `<svg class="${cls}" width="${size}" height="${size}" viewBox="${viewBox}" fill="none" aria-hidden="true" focusable="false">${body}</svg>`;

export const icon = {
  play: (o) => svg('<path d="M8 5.2v13.6a.6.6 0 0 0 .92.5l10.4-6.8a.6.6 0 0 0 0-1L8.92 4.7A.6.6 0 0 0 8 5.2Z" fill="currentColor"/>', o),
  pause: (o) => svg('<rect x="6.5" y="5" width="3.6" height="14" rx=".8" fill="currentColor"/><rect x="13.9" y="5" width="3.6" height="14" rx=".8" fill="currentColor"/>', o),
  prev: (o) => svg('<path d="M18 6.2v11.6a.5.5 0 0 1-.8.4L9 12.4a.5.5 0 0 1 0-.8l8.2-5.8a.5.5 0 0 1 .8.4Z" fill="currentColor"/><rect x="5.5" y="5.5" width="2" height="13" rx=".6" fill="currentColor"/>', o),
  next: (o) => svg('<path d="M6 6.2v11.6a.5.5 0 0 0 .8.4l8.2-5.8a.5.5 0 0 0 0-.8L6.8 5.8a.5.5 0 0 0-.8.4Z" fill="currentColor"/><rect x="16.5" y="5.5" width="2" height="13" rx=".6" fill="currentColor"/>', o),
  stop: (o) => svg('<rect x="6" y="6" width="12" height="12" rx="1.4" fill="currentColor"/>', o),
  arrowUpRight: (o) => svg('<path d="M7 17 17 7M8.5 7H17v8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', o),
  arrowRight: (o) => svg('<path d="M4.5 12h15M13.5 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', o),
  arrowDown: (o) => svg('<path d="M12 4.5v15M6 13.5l6 6 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', o),
  expand: (o) => svg('<path d="M5 9.5V5h4.5M19 9.5V5h-4.5M5 14.5V19h4.5M19 14.5V19h-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', o),
  volume: (o) => svg('<path d="M4.5 9.8v4.4h3.2l4.3 3.6V6.2L7.7 9.8H4.5Z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M17.9 6.6a7.6 7.6 0 0 1 0 10.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>', o),
  mail: (o) => svg('<rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m4.5 7.5 7.5 5.6 7.5-5.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>', o),
  plus: (o) => svg('<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>', o),
  spark: (o) => svg('<path d="M12 2.5c.5 5 4.5 9 9.5 9.5-5 .5-9 4.5-9.5 9.5-.5-5-4.5-9-9.5-9.5 5-.5 9-4.5 9.5-9.5Z" fill="currentColor"/>', o),
  send: (o) => svg('<path d="M5 12h13M12.5 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>', o),
};

export const viaLine = (chapter) =>
  [chapter.via ? `via ${chapter.via}` : "", chapter.city ?? ""].filter(Boolean).join(" · ");

export const head = ({ title, description, css, fonts, extra = "" }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="data:,">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${fonts.map((f) => `<link rel="preload" href="../assets/fonts/${f}" as="font" type="font/woff2" crossorigin>`).join("\n")}
<link rel="stylesheet" href="${css}">${extra ? `\n${extra}` : ""}
</head>`;

/* —— Media —— */

// A tile of short streaks, used as a moving background for rain.
export function rainTile(seed, { size = 360, count = 34, min = 16, max = 46, slant = 0.2, color = "#dfe6f0" } = {}) {
  const r = rng(seed);
  const lines = Array.from({ length: count }, () => {
    const x = r() * size;
    const y = r() * size;
    const len = min + r() * (max - min);
    const o = 0.14 + r() * 0.5;
    return `<line x1='${x.toFixed(1)}' y1='${y.toFixed(1)}' x2='${(x - len * slant).toFixed(1)}' y2='${(y + len).toFixed(1)}' stroke-opacity='${o.toFixed(2)}'/>`;
  }).join("");
  const svgText = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><g stroke='${color}' stroke-width='1' stroke-linecap='round'>${lines}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svgText).replace(/'/g, "%27")}")`;
}

// Corner marks plus a bracketed label: the house style for anything still to come.
export const slot = (label, { cls = "" } = {}) =>
  `<span class="slot${cls ? ` ${cls}` : ""}"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><b>${esc(label)}</b></span>`;

export const image = ({ src, alt, w, h, cls = "", eager = false }) =>
  `<img${cls ? ` class="${cls}"` : ""} src="${src}" alt="${esc(alt)}" width="${w}" height="${h}" decoding="async"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>`;

// Click-to-load YouTube embed. Nothing from YouTube loads until the visitor presses play.
export const ytLite = ({ id, title, poster, w = 1280, h = 720, cls = "", eager = false, play }) => `<div class="yt${cls ? ` ${cls}` : ""}" data-yt="${id}" data-title="${esc(title)}">
  ${image({ src: poster, alt: `${title}: video still`, w, h, eager })}
  <button class="yt-play" type="button" aria-label="Play ${esc(title)}">${play ?? icon.play({ size: 30 })}</button>
</div>`;

// A silent vertical loop. It shows its still until a script asks it to play.
export const loop = ({ src, still, label, cls = "", auto = false }) =>
  `<video class="loop${cls ? ` ${cls}` : ""}" ${auto ? `src="${src}" autoplay` : `data-src="${src}"`} poster="${still}" muted loop playsinline preload="none" aria-label="${esc(label)}"></video>`;
