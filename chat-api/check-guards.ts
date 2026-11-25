import handler, {
  allowedOrigin,
  DAILY_MAX,
  globalDailyLimited,
  loadSystemPrompt,
  promptPackForOrigin,
  RATE_MAX,
  RATE_WINDOW_MS,
  rateLimited,
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
  ["", false],
  ["null", false],
  ["https://srikanthbellary.com/", false],
  ["http://srikanthbellary.com", false],
  ["https://evil.srikanthbellary.com", false],
  ["https://sunrisegenai.com.evil.example", false],
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
if (!sunrise.includes("Florida, United States")) {
  failed += 1;
  console.error("sunrise context prompt was not concatenated");
}
if (sunrise.includes("I only answer questions about Srikanth Bellary's work and profile.")) {
  failed += 1;
  console.error("sunrise pack leaked the profile voice");
}
if (sunrise.includes("West Palm Beach")) {
  failed += 1;
  console.error("sunrise pack must not contain West Palm Beach");
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

function corsHeaders(res: FakeRes, origin: string): boolean {
  return (
    res.headers["Access-Control-Allow-Origin"] === origin &&
    res.headers["Access-Control-Allow-Methods"] === "POST, OPTIONS" &&
    res.headers["Access-Control-Allow-Headers"] === "Content-Type" &&
    res.headers.Vary === "Origin" &&
    res.headers["Access-Control-Max-Age"] === "86400"
  );
}

const question = { messages: [{ role: "user", content: "What do you build?" }] };

delete process.env.NOVITA_API_KEY;

const realFetch = globalThis.fetch;
let upstreamCalls = 0;
globalThis.fetch = async () => {
  upstreamCalls += 1;
  return Response.json({ choices: [{ message: { content: "should-not-run" } }] });
};

const rejected = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://evil.example" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  },
  rejected,
);
if (rejected.code !== 403 || rejected.headers["Access-Control-Allow-Origin"]) {
  failed += 1;
  console.error(`expected 403 for foreign origin, got ${rejected.code}`);
}

const missingOrigin = fakeRes();
await handler({ method: "POST", headers: {}, body: question }, missingOrigin);
if (missingOrigin.code !== 403 || missingOrigin.headers["Access-Control-Allow-Origin"]) {
  failed += 1;
  console.error(`expected 403 for missing origin, got ${missingOrigin.code}`, missingOrigin.body);
}

for (let i = 0; i < DAILY_MAX; i += 1) {
  const flooded = fakeRes();
  await handler({ method: "POST", headers: {}, body: question }, flooded);
  if (flooded.code !== 403) {
    failed += 1;
    console.error(`missing-origin flood request ${i} returned ${flooded.code}`);
    break;
  }
}

const blankOrigin = fakeRes();
await handler({ method: "POST", headers: { origin: "   " }, body: question }, blankOrigin);
if (blankOrigin.code !== 403) {
  failed += 1;
  console.error(`expected 403 for blank origin, got ${blankOrigin.code}`);
}

const nullOrigin = fakeRes();
await handler({ method: "OPTIONS", headers: { origin: "null" } }, nullOrigin);
if (nullOrigin.code !== 403) {
  failed += 1;
  console.error(`expected 403 for Origin null, got ${nullOrigin.code}`);
}

const missingPreflight = fakeRes();
await handler({ method: "OPTIONS", headers: {} }, missingPreflight);
if (missingPreflight.code !== 403) {
  failed += 1;
  console.error(`expected 403 for preflight without origin, got ${missingPreflight.code}`);
}

const foreignPreflight = fakeRes();
await handler({ method: "OPTIONS", headers: { origin: "https://evil.example" } }, foreignPreflight);
if (foreignPreflight.code !== 403 || foreignPreflight.headers["Access-Control-Allow-Origin"]) {
  failed += 1;
  console.error(`expected 403 for foreign preflight, got ${foreignPreflight.code}`);
}

if (upstreamCalls !== 0) {
  failed += 1;
  console.error(`rejected origins called upstream ${upstreamCalls} times`);
}

for (const origin of [
  "https://srikanthbellary.com",
  "https://www.srikanthbellary.com",
  "https://srikanthbellary.github.io",
  "https://sunrisegenai.com",
  "https://www.sunrisegenai.com",
  "http://127.0.0.1:3456",
  "http://localhost:3456",
  "http://localhost:3000",
]) {
  const preflight = fakeRes();
  await handler({ method: "OPTIONS", headers: { origin } }, preflight);
  if (preflight.code !== 204 || !corsHeaders(preflight, origin)) {
    failed += 1;
    console.error("preflight failed", origin, preflight.code, preflight.headers);
  }
}

const unconfigured = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "http://localhost:3000" },
    body: question,
  },
  unconfigured,
);
if (unconfigured.code !== 503 || !corsHeaders(unconfigured, "http://localhost:3000")) {
  failed += 1;
  console.error(`expected 503 without key, got ${unconfigured.code}`, unconfigured.body);
}

const devUnconfigured = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "http://127.0.0.1:3456" },
    body: question,
  },
  devUnconfigured,
);
if (devUnconfigured.code !== 503) {
  failed += 1;
  console.error(`expected 503 for dev origin without key, got ${devUnconfigured.code}`);
}

process.env.NOVITA_API_KEY = "unit-test-not-a-secret";
globalThis.fetch = async (input, init) => {
  upstreamCalls += 1;
  const auth = new Headers(init?.headers).get("authorization") ?? "";
  if (auth !== `Bearer ${process.env.NOVITA_API_KEY}`) {
    throw new Error("authorization header did not use the env key");
  }
  if (String(input) !== "https://api.novita.ai/openai/v1/chat/completions") {
    throw new Error(`unexpected upstream ${String(input)}`);
  }
  const body = JSON.parse(String(init?.body)) as { messages?: { content?: string }[] };
  const system = body.messages?.[0]?.content ?? "";
  const reply = system.includes("We only answer questions about what Sunrise Gen AI builds.")
    ? "sunrise-ok"
    : "profile-ok";
  return Response.json({ choices: [{ message: { content: reply } }] });
};

const profileChat = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://srikanthbellary.com", "x-forwarded-for": "203.0.113.10" },
    body: question,
  },
  profileChat,
);
const profileReply = (profileChat.body as { reply?: string } | null)?.reply;
if (profileChat.code !== 200 || profileReply !== "profile-ok" || !corsHeaders(profileChat, "https://srikanthbellary.com")) {
  failed += 1;
  console.error(`expected profile chat 200, got ${profileChat.code}`, profileReply);
}

const sunriseChat = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://www.sunrisegenai.com", "x-forwarded-for": "203.0.113.11" },
    body: question,
  },
  sunriseChat,
);
const sunriseReply = (sunriseChat.body as { reply?: string } | null)?.reply;
if (sunriseChat.code !== 200 || sunriseReply !== "sunrise-ok" || !corsHeaders(sunriseChat, "https://www.sunrisegenai.com")) {
  failed += 1;
  console.error(`expected sunrise chat 200, got ${sunriseChat.code}`, sunriseReply);
}

const beforeCaps = upstreamCalls;
const blockedIp = "203.0.113.20";
for (let i = 0; i < RATE_MAX; i += 1) {
  if (rateLimited(blockedIp)) {
    failed += 1;
    console.error(`per-IP slot ${i} was refused early`);
    break;
  }
}
const ipLimited = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://srikanthbellary.com", "x-forwarded-for": blockedIp },
    body: question,
  },
  ipLimited,
);
if (ipLimited.code !== 429 || upstreamCalls !== beforeCaps) {
  failed += 1;
  console.error(`expected 429 from per-IP cap without upstream, got ${ipLimited.code}, calls ${upstreamCalls}`);
}

const stillOpen = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://srikanthbellary.github.io", "x-forwarded-for": "203.0.113.21" },
    body: question,
  },
  stillOpen,
);
if (stillOpen.code !== 200 || upstreamCalls !== beforeCaps + 1) {
  failed += 1;
  console.error(`a different IP should still reach chat, got ${stillOpen.code}`);
}

let dailyOpened = 0;
while (dailyOpened < DAILY_MAX + 5 && !globalDailyLimited()) dailyOpened += 1;
const dailyLimited = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://sunrisegenai.com", "x-forwarded-for": "203.0.113.30" },
    body: question,
  },
  dailyLimited,
);
if (dailyLimited.code !== 429 || upstreamCalls !== beforeCaps + 1) {
  failed += 1;
  console.error(`expected 429 from daily cap without upstream, got ${dailyLimited.code}, calls ${upstreamCalls}`);
}
if (!globalDailyLimited()) {
  failed += 1;
  console.error("daily cap must keep refusing once it is exceeded");
}

globalThis.fetch = realFetch;
delete process.env.NOVITA_API_KEY;

if (RATE_MAX !== 8 || RATE_WINDOW_MS !== 60 * 60 * 1000) {
  failed += 1;
  console.error(`per-IP cap should be 8/hour, got ${RATE_MAX} per ${RATE_WINDOW_MS}ms`);
}
if (DAILY_MAX !== 100) {
  failed += 1;
  console.error(`daily cap should be 100, got ${DAILY_MAX}`);
}

const rateIp = "203.0.113.40";
const rateStart = Date.UTC(2026, 0, 1, 12);
let rateAllowed = 0;
while (rateAllowed < RATE_MAX + 5 && !rateLimited(rateIp, rateStart)) rateAllowed += 1;
if (rateAllowed !== RATE_MAX || !rateLimited(rateIp, rateStart + 1)) {
  failed += 1;
  console.error(`per-IP window allowed ${rateAllowed}, expected ${RATE_MAX}`);
}
if (rateLimited("203.0.113.41", rateStart)) {
  failed += 1;
  console.error("per-IP buckets leaked across addresses");
}
if (rateLimited(rateIp, rateStart + RATE_WINDOW_MS)) {
  failed += 1;
  console.error("per-IP window did not reopen after an hour");
}
if (!rateLimited(rateIp, Number.NaN)) {
  failed += 1;
  console.error("per-IP cap must refuse a non-finite clock");
}

const dayCounter = { dayStart: Number.NaN, count: 0 };
const noon = Date.UTC(2026, 10, 18, 12);
let dayAllowed = 0;
while (dayAllowed < DAILY_MAX + 5 && !globalDailyLimited(noon, dayCounter)) dayAllowed += 1;
if (dayAllowed !== DAILY_MAX || dayCounter.count !== DAILY_MAX || !globalDailyLimited(noon, dayCounter)) {
  failed += 1;
  console.error(`daily cap allowed ${dayAllowed}, count ${dayCounter.count}`);
}
if (globalDailyLimited(noon + 24 * 60 * 60 * 1000, dayCounter)) {
  failed += 1;
  console.error("daily cap did not reset on the next UTC day");
}
const corrupt = { dayStart: Math.floor(noon / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000), count: Number.NaN };
if (!globalDailyLimited(noon, corrupt)) {
  failed += 1;
  console.error("daily cap must refuse a corrupt counter");
}
if (!globalDailyLimited(Number.POSITIVE_INFINITY, { dayStart: Number.NaN, count: 0 })) {
  failed += 1;
  console.error("daily cap must refuse a non-finite clock");
}

if (failed) {
  console.error(`Guard check failed (${failed}).`);
  process.exit(1);
}

console.log("Guard check passed.");
