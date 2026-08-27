#!/usr/bin/env node
/**
 * Fails if this personal profile picks up forbidden names or
 * invented company-site metrics that belong only on the firm site.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const skipDirs = new Set([
  "node_modules",
  ".git",
  "out",
  ".next",
  "public/fonts",
  "chat-api",
]);

const skipFiles = new Set(["package-lock.json", "scripts/check-forbidden.mjs"]);

const patterns = [
  [/\bFidelity\b/, "Fidelity"],
  [/Fidelity Charitable/, "Fidelity Charitable"],
  [/\bTakeda\b/, "Takeda"],
  [/\bBioLife\b/, "BioLife"],
  [/\bOneSourceQA\b/, "OneSourceQA"],
  [/\bDAF\b/, "DAF"],
  [/\biDAF\b/, "iDAF"],
  [/\bPES\b/, "PES"],
  [/\bSAGE\b/, "SAGE"],
  [/\bSupercoder\b/, "Supercoder"],
  [/\bLabelSaber\b/, "LabelSaber"],
  [/Play testing/i, "Play testing"],
  [/\bFlutter\b/, "Flutter"],
  [/Mac Studio/, "Mac Studio"],
  [/in development/i, "in development"],
  [/Job Book/, "Job Book"],
  [/\bSwaram\b/, "Swaram"],
  [/\bLensort\b/, "Lensort"],
  [/Palm Beach Lounge/, "Palm Beach Lounge"],
  [/75%\s*(MTTR|mean time)/i, "75% MTTR"],
  [/75%\s*mapping/i, "75% mapping"],
  [/42%\s*token/i, "42% token"],
  [/2\.4\s*[×x]/, "2.4×"],
  [/68%\s*(prompt-)?cache/i, "68% cache"],
  [/81%/, "81%"],
  [/774\s*h/i, "774h"],
  [/\$116K/, "$116K"],
  [/wired-disk/i, "wired-disk"],
  [/\bsystem-ui\b/, "system-ui"],
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const rel = relative(root, abs);
    if (skipDirs.has(entry) || skipDirs.has(rel.split("/")[0])) continue;
    if (rel.startsWith("public/fonts")) continue;
    const st = statSync(abs);
    if (st.isDirectory()) {
      walk(abs, files);
      continue;
    }
    if (skipFiles.has(rel)) continue;
    if (/\.(png|woff2|woff|jpg|jpeg|webp|ico)$/i.test(entry)) continue;
    files.push(abs);
  }
  return files;
}

let failed = false;
for (const file of walk(root)) {
  const text = readFileSync(file, "utf8");
  for (const [pattern, label] of patterns) {
    if (pattern.test(text)) {
      failed = true;
      console.error(`Forbidden “${label}” in ${relative(root, file)}`);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("Voice check passed.");
