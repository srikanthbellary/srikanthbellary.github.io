#!/usr/bin/env node
// Regenerates the static mockup pages from the live site's content file.
//   node mockups-2026-11/build.mjs
// Output is plain HTML; the pages themselves need no build step to view.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const directions = [
  { dir: "a-screening-room", template: "./src/a.mjs" },
  { dir: "b-signal-path", template: "./src/b.mjs" },
  { dir: "c-multitrack", template: "./src/c.mjs" },
];

const only = process.argv.slice(2);

for (const { dir, template } of directions) {
  if (only.length && !only.some((key) => dir.startsWith(key))) continue;
  const { render } = await import(template);
  const out = join(here, dir, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render());
  console.log(`wrote ${dir}/index.html`);
}
