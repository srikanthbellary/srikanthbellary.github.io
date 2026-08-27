import { allowedOrigin, loadSystemPrompt, validateMessages } from "./api/chat.ts";

const cases: [string, boolean][] = [
  ["https://srikanthbellary.com", true],
  ["https://www.srikanthbellary.com", true],
  ["https://srikanthbellary.github.io", true],
  ["http://127.0.0.1:3456", true],
  ["http://localhost:3456", true],
  ["http://localhost:3000", true],
  ["https://evil.example", false],
  ["http://localhost:8080", false],
];

let failed = 0;

for (const [origin, expect] of cases) {
  const got = allowedOrigin(origin);
  if (got !== expect) {
    failed += 1;
    console.error(`origin ${origin}: expected ${expect}, got ${got}`);
  }
}

const tooLong = "x".repeat(801);
const checks: [string, unknown, boolean][] = [
  ["ok pair", { messages: [{ role: "user", content: "What do you build?" }] }, true],
  ["empty", { messages: [] }, false],
  ["too many", { messages: Array.from({ length: 9 }, () => ({ role: "user", content: "hi" })) }, false],
  ["long user", { messages: [{ role: "user", content: tooLong }] }, false],
  ["last assistant", { messages: [{ role: "assistant", content: "Hello." }] }, false],
];

for (const [label, body, ok] of checks) {
  const result = validateMessages(body);
  const passed = ok ? Array.isArray(result) : typeof result === "string";
  if (!passed) {
    failed += 1;
    console.error(`validate ${label}: unexpected`, result);
  }
}

const prompt = loadSystemPrompt();
if (!prompt.includes("I only answer questions about Srikanth Bellary's work and profile.")) {
  failed += 1;
  console.error("system prompt was not loaded");
}
if (!prompt.includes("Wellington, FL")) {
  failed += 1;
  console.error("context prompt was not concatenated");
}
if (prompt.includes("NOVITA") || /sk-[a-zA-Z0-9]{10,}/.test(prompt)) {
  failed += 1;
  console.error("prompt files must not contain keys");
}

if (failed) {
  console.error(`Guard check failed (${failed}).`);
  process.exit(1);
}

console.log("Guard check passed.");
