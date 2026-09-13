import handler, {
  allowedOrigin,
  loadSystemPrompt,
  promptPackForOrigin,
  validateMessages,
} from "./api/chat.ts";

type FakeRes = {
  code: number;
  body: unknown;
  headers: Record<string, string>;
  setHeader: (name: string, value: string) => void;
  status: (code: number) => FakeRes;
  json: (body: unknown) => void;
  end: () => void;
};

function fakeRes(): FakeRes {
  const res: FakeRes = {
    code: 0,
    body: null,
    headers: {},
    setHeader(name, value) {
      res.headers[name] = value;
    },
    status(code) {
      res.code = code;
      return res;
    },
    json(body) {
      res.body = body;
    },
    end() {},
  };
  return res;
}

const cases: [string, boolean][] = [
  ["https://srikanthbellary.com", true],
  ["https://www.srikanthbellary.com", true],
  ["https://srikanthbellary.github.io", true],
  ["http://127.0.0.1:3456", true],
  ["http://localhost:3456", true],
  ["http://localhost:3000", true],
  ["https://sunrisegenai.com", true],
  ["https://www.sunrisegenai.com", true],
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

const packCases: [string, "profile" | "sunrise"][] = [
  ["https://srikanthbellary.com", "profile"],
  ["https://www.srikanthbellary.com", "profile"],
  ["https://srikanthbellary.github.io", "profile"],
  ["http://127.0.0.1:3456", "profile"],
  ["http://localhost:3456", "profile"],
  ["http://localhost:3000", "profile"],
  ["https://sunrisegenai.com", "sunrise"],
  ["https://www.sunrisegenai.com", "sunrise"],
  ["", "profile"],
];

for (const [origin, expect] of packCases) {
  const got = promptPackForOrigin(origin);
  if (got !== expect) {
    failed += 1;
    console.error(`pack ${origin || "(empty)"}: expected ${expect}, got ${got}`);
  }
}

const profile = loadSystemPrompt("https://srikanthbellary.com");
if (!profile.includes("I only answer questions about Srikanth Bellary's work and profile.")) {
  failed += 1;
  console.error("profile system prompt was not loaded");
}
if (!profile.includes("Wellington, FL")) {
  failed += 1;
  console.error("profile context prompt was not concatenated");
}
if (profile.includes("We only answer questions about what Sunrise Gen AI builds.")) {
  failed += 1;
  console.error("profile pack leaked the firm voice");
}
if (profile.includes("NOVITA") || /sk-[a-zA-Z0-9]{10,}/.test(profile)) {
  failed += 1;
  console.error("profile prompt files must not contain keys");
}

const localhostProfile = loadSystemPrompt("http://localhost:3000");
if (localhostProfile !== profile || loadSystemPrompt() !== profile) {
  failed += 1;
  console.error("localhost and default load must keep the profile pack");
}

const sunrise = loadSystemPrompt("https://sunrisegenai.com");
if (!sunrise.includes("We only answer questions about what Sunrise Gen AI builds.")) {
  failed += 1;
  console.error("sunrise system prompt was not loaded");
}
if (!sunrise.includes("West Palm Beach, FL")) {
  failed += 1;
  console.error("sunrise context prompt was not concatenated");
}
if (sunrise.includes("I only answer questions about Srikanth Bellary's work and profile.")) {
  failed += 1;
  console.error("sunrise pack leaked the profile voice");
}
if (sunrise.includes("Wellington")) {
  failed += 1;
  console.error("sunrise pack must not contain Wellington");
}
if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(sunrise)) {
  failed += 1;
  console.error("sunrise pack must not contain a mailbox");
}
if (/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/.test(sunrise)) {
  failed += 1;
  console.error("sunrise pack must not contain a phone");
}
if (sunrise.includes("NOVITA") || /sk-[a-zA-Z0-9]{10,}/.test(sunrise)) {
  failed += 1;
  console.error("sunrise prompt files must not contain keys");
}

const profileAgain = loadSystemPrompt("https://www.srikanthbellary.com");
if (profileAgain !== profile || profileAgain === sunrise) {
  failed += 1;
  console.error("prompt cache leaked across packs");
}

delete process.env.NOVITA_API_KEY;

const rejected = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://evil.example" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  },
  rejected,
);
if (rejected.code !== 403) {
  failed += 1;
  console.error(`expected 403 for foreign origin, got ${rejected.code}`);
}

const preflight = fakeRes();
await handler(
  {
    method: "OPTIONS",
    headers: { origin: "https://srikanthbellary.com" },
  },
  preflight,
);
if (preflight.code !== 204 || preflight.headers["Access-Control-Allow-Origin"] !== "https://srikanthbellary.com") {
  failed += 1;
  console.error("preflight failed", preflight);
}

const sunrisePreflight = fakeRes();
await handler(
  {
    method: "OPTIONS",
    headers: { origin: "https://sunrisegenai.com" },
  },
  sunrisePreflight,
);
if (
  sunrisePreflight.code !== 204 ||
  sunrisePreflight.headers["Access-Control-Allow-Origin"] !== "https://sunrisegenai.com"
) {
  failed += 1;
  console.error("sunrise preflight failed", sunrisePreflight);
}

const unconfigured = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "http://localhost:3000" },
    body: { messages: [{ role: "user", content: "What do you build?" }] },
  },
  unconfigured,
);
if (unconfigured.code !== 503) {
  failed += 1;
  console.error(`expected 503 without key, got ${unconfigured.code}`, unconfigured.body);
}

if (failed) {
  console.error(`Guard check failed (${failed}).`);
  process.exit(1);
}

console.log("Guard check passed.");
