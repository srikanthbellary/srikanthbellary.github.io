export const person = {
  name: "Srikanth Bellary",
  title: "Sr. Gen AI Solution Architect · Forward Deployment",
  location: "Wellington, FL",
  email: "srikanthbellary01@gmail.com",
  phone: "(440) 340-8383",
  phoneHref: "tel:+14403408383",
  linkedin: "https://www.linkedin.com/in/srikanth-bellary",
  github: "https://github.com/srikanthbellary",
  medium: "https://medium.com/@srikanthbellary01",
  site: "https://srikanthbellary.com",
  years: "15+",
  degree: "MS Software Engineering",
  cert: "GCP Professional Data Engineer",
} as const;

export const clients = [
  "Verizon",
  "Circana",
  "Thermo Fisher",
  "CVS",
  "Change Healthcare",
  "Cars.com",
  "McDonald’s",
  "Northern Trust",
  "KeyBank",
  "Wells Fargo",
  "Prudential",
  "CareerBuilder",
] as const;

export type Offer = {
  id: string;
  num: string;
  title: string;
  lede: string;
  body: string[];
  metrics: { value: string; label: string }[];
  figure: "harness" | "incident" | "graph" | "mapping" | "estate";
  plate: string;
  plateKicker: string;
};

export const offers: Offer[] = [
  {
    id: "agents",
    num: "01",
    title: "Autonomous agents",
    lede: "Harness and loop engineering that finishes the job.",
    body: [
      "I write workflow-specific harnesses — not a generic chatbot — in front of an in-network model gateway. Agents I ship gather, act, and verify. A test gate sits in front of done.",
      "An in-network coding agent I built is a single-file Python program, about 1,100 lines, standard library only: file operations, atomic multi-edit, diff preview, git, memory, skill packs, and session save and resume.",
      "A 12-step LLM pipeline I designed rewrites a Java/Spring service — about 12,000 lines of change across POMs, security configuration, controllers, permission evaluators, properties, Maven, and git — in about 2.5 minutes against about 7.5 hours by hand.",
    ],
    metrics: [
      { value: "12-step", label: "Java/Spring rewrite pipeline" },
      { value: "2.5 min", label: "versus about 7.5 hours by hand" },
      { value: "~1,100", label: "lines, stdlib coding agent" },
    ],
    figure: "harness",
    plate: "gather · act · verify",
    plateKicker: "Fig. 01 — Harness loop",
  },
  {
    id: "multiagent",
    num: "02",
    title: "Agents and multi-agent systems",
    lede: "Incident intelligence, then a human on the last step.",
    body: [
      "I put multi-agent systems on the telemetry, tickets, and runbooks already in the network — and on the service call graph — then I keep a person on the last step.",
      "At Verizon I built incident intelligence that reads those sources together and hands the on-call a ranked hypothesis with MCP-guided remediation and the evidence attached. Failure detection sits under six seconds. Manual dashboard monitoring dropped about 80%.",
      "The graph-intelligence layer: 15 MCP tools and 20 REST endpoints over a call graph, with multi-turn session tracking, entity extraction, and intent routing to 12 handlers. I do not run production operations fully unsupervised.",
    ],
    metrics: [
      { value: "<6 s", label: "failure detection" },
      { value: "80%", label: "less manual dashboard watching" },
      { value: "15 / 20", label: "MCP tools · REST endpoints" },
    ],
    figure: "incident",
    plate: "call graph · human last",
    plateKicker: "Fig. 02 — Incident path",
  },
  {
    id: "rag",
    num: "03",
    title: "RAG and LLM architecture",
    lede: "A citation — and a refusal when there is none.",
    body: [
      "I design grounded retrieval so an answer carries a citation, and a refusal when the source will not support it. Context graphs and Graph Architecture hold the relationships. Evaluation harnesses measure whether the system stays honest.",
      "RAG and GraphRAG over the knowledge a team actually wrote — tickets, documents, runbooks — with a confidence signal on the way out.",
      "A graph and LLM pipeline I built writes wiki-ready API documentation and migration-eligibility assessments per service, including token-scheme classification checked against ground truth. Evaluation, guardrails, and regression suites are product surface, not a slide.",
    ],
    metrics: [
      { value: "GraphRAG", label: "grounded retrieval with refusal" },
      { value: "Eval", label: "harnesses as product surface" },
    ],
    figure: "graph",
    plate: "blast radius · context graph",
    plateKicker: "Fig. 03 — Graph Architecture",
  },
  {
    id: "data",
    num: "04",
    title: "Data processing with AI",
    lede: "Schema, mapping, inventory, and warehouse rules.",
    body: [
      "I replace the mapping grind and the warehouse-rule grind with pipelines that propose, score, and explain — and I inventory the estate so the work has a map.",
      "Schema and attribute mapping with confidence scoring and a review queue — work from my Circana-era programs — up to 60% less time on that work, and 3× throughput on attribute mapping.",
      "AST inventory of a Java/Spring estate: 63 services, 236 controllers, 506 REST endpoints. A manifest-driven rule engine: 118 externalized SQL detection rules against a 432-table warehouse, SHA-256 hash-locked, fail-closed, UUID5 idempotency.",
    ],
    metrics: [
      { value: "60% / 3×", label: "mapping time · throughput" },
      { value: "63 / 236 / 506", label: "services · controllers · endpoints" },
      { value: "118 / 432", label: "SQL rules · warehouse tables" },
    ],
    figure: "mapping",
    plate: "propose · score · review",
    plateKicker: "Fig. 04 — Attribute mapping",
  },
  {
    id: "platforms",
    num: "05",
    title: "Platforms and delivery",
    lede: "Lakes, migration, regulated quality, production serving.",
    body: [
      "The rest of the system I own: Graph Architecture for blast-radius and scoping, legacy-to-cloud extracts with lineage, serving-layer RBAC, and review-ready validation writing — on AWS, Azure, and Google Cloud.",
      "Static-analysis Graph Architecture: 75 Java microservices and 504 endpoints into Neo4j, 88.9% edge resolution, used for blast-radius, migration scoping, and security review.",
      "Mainframe-class extracts with lineage preserved. Serving-layer RBAC — 5 capability modules, 11 role grants. Sixteen immutable DDL releases. GAMP Category 5 validation writing as a capability: URS, system specification, architecture, and configuration — not a product case study. I designed and built the Ingre apps for Android and iOS: camera scan, label parse, and the harmful-ingredient call for food and beauty labels.",
    ],
    metrics: [
      { value: "88.9%", label: "edge resolution in Neo4j" },
      { value: "5 / 11", label: "RBAC modules · grants" },
      { value: "16", label: "immutable DDL releases" },
    ],
    figure: "estate",
    plate: "estate · lineage · serving",
    plateKicker: "Fig. 05 — Delivery stack",
  },
];

export const projects = [
  {
    num: "01",
    name: "OpenStinger",
    kicker: "Open source",
    lede: "Portable MCP agent memory.",
    body: "Agents I put on a job forget the moment the session closes, and every tool keeps its own private notebook. I built OpenStinger so memory can travel: written once, recalled from any MCP client I happen to be using tomorrow. Entities, decisions, threads, and artifacts land in a store I host. Context follows the work instead of the vendor.",
    hrefs: [
      { label: "openstinger.com", href: "https://openstinger.com" },
      { label: "GitHub", href: "https://github.com/srikanthbellary/openstinger" },
    ],
    tags: ["MCP native", "Self-hosted", "Open source"],
  },
  {
    num: "02",
    name: "Ingre",
    kicker: "Product",
    lede: "Scan food and beauty labels.",
    body: "Ingredient lists are written to be skipped. I designed Ingre so a phone camera can read them in the aisle: parse the label, resolve the aliases that hide the same compound under six names, and make the harmful-ingredient call — with the evidence behind it — before the thing goes in the basket. Android and iOS.",
    hrefs: [{ label: "ingre.ai", href: "https://ingre.ai" }],
    tags: ["Android", "iOS", "Food", "Beauty"],
  },
  {
    num: "03",
    name: "Sunrise Gen AI",
    kicker: "Practice",
    lede: "The firm I run.",
    body: "When the work is a firm engagement rather than a staffed role, I run it through Sunrise Gen AI. That site is the practice. This page is mine.",
    hrefs: [{ label: "sunrisegenai.com", href: "https://sunrisegenai.com" }],
    tags: ["Wellington, FL"],
  },
] as const;
