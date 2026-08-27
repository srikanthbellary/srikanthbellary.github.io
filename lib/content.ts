export const person = {
  name: "Srikanth Bellary",
  title: "Sr. Gen AI Solution Architect / Forward Deployment",
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

export type Lane = {
  id: string;
  title: string;
  line: string;
  metric?: { value: string; label: string };
};

export const lanes: Lane[] = [
  {
    id: "agents",
    title: "Agents",
    line: "Workflow harnesses and multi-agent systems with a person on the last step.",
    metric: { value: "15 / 20", label: "MCP tools · REST" },
  },
  {
    id: "rag",
    title: "RAG",
    line: "Grounded retrieval with a citation — and a refusal when the source will not hold.",
    metric: { value: "12-step", label: "2.5 min vs 7.5 hours" },
  },
  {
    id: "platforms",
    title: "Data platforms",
    line: "Lakes, graphs, and serving on AWS, Azure, and Google Cloud.",
    metric: { value: "88.9%", label: "graph edge resolution" },
  },
  {
    id: "mapping",
    title: "Mapping",
    line: "Schema and attribute maps with confidence scoring and a review queue.",
    metric: { value: "60% / 3×", label: "time · throughput" },
  },
  {
    id: "quality",
    title: "Regulated quality",
    line: "Hash-locked rules, fail-closed artifacts, and GAMP writing as a capability.",
    metric: { value: "118 / 432", label: "SQL rules · tables" },
  },
];

export const stack = [
  "Python",
  "SQL",
  "Scala",
  "Java / Spring",
  "Spark",
  "AWS",
  "GCP / Vertex",
  "Azure",
  "Snowflake",
  "Kafka",
  "Neo4j",
  "MCP",
  "OpenSearch",
  "Hadoop / Cloudera",
  "OCR / NER",
] as const;

export const projects = [
  {
    num: "01",
    name: "OpenStinger",
    kicker: "Open source",
    lede: "Portable MCP agent memory.",
    body: "Agents I put on a job forget the moment the session closes. I built OpenStinger so memory can travel: written once, recalled from any MCP client. Entities, decisions, threads, and artifacts land in a store I host.",
    hrefs: [
      { label: "openstinger.com", href: "https://openstinger.com" },
      { label: "GitHub", href: "https://github.com/srikanthbellary/openstinger" },
    ],
    tags: ["MCP native", "Self-hosted", "Open source"],
  },
  {
    num: "02",
    name: "Ingre",
    kicker: "Pitch",
    lede: "Scan food and beauty labels.",
    body: "I designed Ingre so a phone camera can read a label in the aisle: parse the list, resolve the aliases, and make the harmful-ingredient call — with the evidence behind it. Android and iOS.",
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

export type CareerFigure =
  | "verizon"
  | "circana"
  | "thermo"
  | "cvs"
  | "change"
  | "cars"
  | "mcdonalds"
  | "northern"
  | "keybank"
  | "wells"
  | "prudential"
  | "cognizant"
  | "careerbuilder"
  | "uia";

export type CareerChapter = {
  id: string;
  client: string;
  tick: string;
  year: string;
  dates: string;
  via?: string;
  city?: string;
  role: string;
  program: string;
  bullets: string[];
  metrics?: { value: string; label: string }[];
  env: string;
  figure: CareerFigure;
  plate: string;
  plateKicker: string;
};

export const career: CareerChapter[] = [
  {
    id: "verizon",
    client: "Verizon",
    tick: "VZ",
    year: "2025",
    dates: "Mar 2025–present",
    via: "Cognizant",
    role: "Sr. Gen AI Agentic Architect",
    program: "SRE multi-agent incident intelligence.",
    bullets: [
      "I put agents on telemetry, tickets, runbooks, and the service call graph, then I keep a person on the last step.",
      "I retrieve from tickets with RAG, and I guide remediation over MCP with the evidence attached.",
      "The stack I run here is OpenSearch, Lambda, and EventBridge.",
      "Failure detection sits under six seconds. Manual dashboard watching dropped about 80%.",
      "Agents I shipped: SRE Recommendation, Remediation Insights MCP, Auto Failover, Correction of Errors, and Confluence.",
    ],
    metrics: [
      { value: "<6 s", label: "failure detection" },
      { value: "80%", label: "less dashboard watching" },
      { value: "15 / 20", label: "MCP · REST" },
    ],
    env: "SRE platforms · MCP · OpenSearch · Lambda · EventBridge",
    figure: "verizon",
    plate: "telemetry · tickets · human last",
    plateKicker: "Fig. VZ — Incident path",
  },
  {
    id: "circana",
    client: "Circana",
    tick: "CIR",
    year: "2024",
    dates: "Apr 2024–Mar 2025",
    via: "Interas Labs",
    role: "Sr. AI/ML Advisor / Product Owner",
    program: "Retail schema and attribute mapping.",
    bullets: [
      "I owned the mapping program across 1400+ categories and 30K+ attributes.",
      "I put confidence scoring and a review queue in front of every proposed map.",
      "I ran the work on Vertex on GCP.",
      "Mapping time dropped up to 60%. Attribute-mapping throughput rose 3×.",
    ],
    metrics: [
      { value: "1400+ / 30K+", label: "categories · attributes" },
      { value: "60% / 3×", label: "time · throughput" },
    ],
    env: "Vertex · GCP · review queue",
    figure: "circana",
    plate: "propose · score · review",
    plateKicker: "Fig. CIR — Attribute map",
  },
  {
    id: "thermo",
    client: "Thermo Fisher",
    tick: "TMO",
    year: "2023",
    dates: "May 2023–Apr 2024",
    via: "Persistent",
    city: "Pittsburgh",
    role: "Solution architect",
    program: "Mainframe-to-Azure extracts with lineage.",
    bullets: [
      "I designed the move from mainframe sources onto Azure business entities.",
      "I extracted from VSAM and ISAM and kept lineage on the way out.",
      "I rewrote COBOL data access as SQL, with IDA in the design path.",
      "I reconciled the landed sets so the target could be trusted.",
    ],
    env: "Azure · VSAM / ISAM · COBOL-to-SQL · IDA",
    figure: "thermo",
    plate: "mainframe → azure · lineage",
    plateKicker: "Fig. TMO — Extract",
  },
  {
    id: "cvs",
    client: "CVS Health",
    tick: "CVS",
    year: "2019",
    dates: "Aug 2019–Apr 2023",
    city: "Woonsocket",
    role: "Data engineering lead",
    program: "RPhAI — pharmacy-claims machine learning.",
    bullets: [
      "I led data engineering on RPhAI, the pharmacy-claims ML program for pharmacy workflow.",
      "I put OCR and NER on the documents that program had to read.",
      "I ran the pipes across GCP and Azure, with Snowflake as the warehouse and Kafka on the stream.",
    ],
    env: "GCP · Azure · Snowflake · Kafka · OCR / NER",
    figure: "cvs",
    plate: "claims · ocr · ner",
    plateKicker: "Fig. CVS — RPhAI",
  },
  {
    id: "change",
    client: "Change Healthcare",
    tick: "CHNG",
    year: "2017",
    dates: "Aug 2017–Aug 2019",
    city: "Chicago",
    role: "Sr. cloud data engineer",
    program: "Intelligent Healthcare Data Platform (IHDP).",
    bullets: [
      "I built on IHDP — healthcare, financial, clinical, and operational data on one platform.",
      "I worked the EDI 837 and 835 interchange that the claims traffic actually uses.",
      "I put graph work on Neo4j and Neptune, and I landed the pipes in Glue.",
    ],
    env: "IHDP · EDI 837 / 835 · Neo4j · Neptune · Glue",
    figure: "change",
    plate: "claims interchange · graph",
    plateKicker: "Fig. CHNG — IHDP",
  },
  {
    id: "cars",
    client: "Cars.com",
    tick: "CARS",
    year: "2017",
    dates: "Mar 2017–Aug 2017",
    city: "Chicago",
    role: "Machine learning engineer",
    program: "Production Spark ML.",
    bullets: [
      "I developed and deployed production Spark ML pipelines in Scala and Python.",
      "I trained ensembles and tuned them against labeled, feature-engineered sets.",
      "I put CI/CD around periodic training so the models could be retrained on a schedule.",
    ],
    env: "Spark · Scala · Python · CI/CD",
    figure: "cars",
    plate: "ensembles · periodic train",
    plateKicker: "Fig. CARS — Spark ML",
  },
  {
    id: "mcdonalds",
    client: "McDonald’s",
    tick: "MCD",
    year: "2016",
    dates: "Nov 2016–Mar 2017",
    via: "Sapient Razorfish",
    city: "Chicago",
    role: "Sr. big data consultant",
    program: "Strategic enablement for a global data lake.",
    bullets: [
      "I worked strategic enablement on the enterprise cloud-migration program.",
      "I led the big-data track toward a global data lake and off a monolithic core.",
      "I captured the Capability Maturity Model for the customer and global data platforms.",
    ],
    env: "Global data lake · CMM · cloud migration",
    figure: "mcdonalds",
    plate: "lake · maturity · enablement",
    plateKicker: "Fig. MCD — Lake",
  },
  {
    id: "northern",
    client: "Northern Trust",
    tick: "NTRS",
    year: "2015",
    dates: "Apr 2015–Nov 2016",
    city: "Chicago",
    role: "Sr. big data consultant",
    program: "Derivatives data and ISO 20022.",
    bullets: [
      "I consulted on the derivatives transformation program as the exchange format moved to ISO 20022.",
      "I integrated Hadoop with the enterprise applications and the data-layer engine.",
      "I engineered the pipeline from the production CDH cluster into the central S3 data lake.",
    ],
    env: "Derivatives · ISO 20022 · CDH · S3",
    figure: "northern",
    plate: "cdh → s3 · iso 20022",
    plateKicker: "Fig. NTRS — Lake feed",
  },
  {
    id: "keybank",
    client: "KeyBank",
    tick: "KEY",
    year: "2014",
    dates: "Sep 2014–Apr 2015",
    city: "Cleveland",
    role: "Senior consultant / big data architect",
    program: "Shared Foundation Data.",
    bullets: [
      "I served as data architect on the Shared Foundation Data program.",
      "I configured Cloudera Manager for the staging and test clusters.",
      "I wrote Spark pipelines in Python and Scala.",
    ],
    env: "Cloudera · Spark · Python · Scala",
    figure: "keybank",
    plate: "cluster · spark · foundation",
    plateKicker: "Fig. KEY — SFD",
  },
  {
    id: "wells",
    client: "Wells Fargo",
    tick: "WFC",
    year: "2013",
    dates: "2013–2014",
    city: "Des Moines",
    role: "Data migration consultant",
    program: "Home-loan data onto the mortgage servicing platform.",
    bullets: [
      "I led the home-loan data migration onto the mortgage servicing platform.",
      "I managed 50+ web services consumed by Java, .NET, and mobile clients in the SOA estate.",
    ],
    env: "Home loans · 50+ web services · SOA",
    figure: "wells",
    plate: "migrate · 50+ services",
    plateKicker: "Fig. WFC — Servicing",
  },
  {
    id: "prudential",
    client: "Prudential",
    tick: "PRU",
    year: "2011",
    dates: "2011–2013",
    city: "Shelton, CT",
    role: "Business intelligence consultant",
    program: "BI and ETL for policy administration.",
    bullets: [
      "I designed BI reporting around the policy administration platform.",
      "I implemented the ETL that fed those reports.",
    ],
    env: "BI · ETL · policy admin",
    figure: "prudential",
    plate: "policy · report · etl",
    plateKicker: "Fig. PRU — Policy BI",
  },
  {
    id: "cognizant",
    client: "Cognizant",
    tick: "CTSH",
    year: "2009",
    dates: "2009–2011",
    city: "Minneapolis",
    role: "Associate business systems analyst",
    program: "Kimball / star-schema data warehouse.",
    bullets: [
      "I built warehousing solutions on Kimball methods.",
      "I designed the star schemas the reports actually queried.",
    ],
    env: "Kimball · star schema · DW",
    figure: "cognizant",
    plate: "fact · dimension · grain",
    plateKicker: "Fig. CTSH — Star",
  },
  {
    id: "careerbuilder",
    client: "CareerBuilder",
    tick: "CB",
    year: "2008",
    dates: "2008–2009",
    city: "Reston",
    role: "ETL analyst",
    program: "Enterprise ETL mappings.",
    bullets: [
      "I developed ETL mappings for the enterprise data systems.",
      "I wrote the SQL procedures and the transformation logic those mappings called.",
    ],
    env: "ETL · SQL · transformations",
    figure: "careerbuilder",
    plate: "map · transform · load",
    plateKicker: "Fig. CB — Mappings",
  },
  {
    id: "uia",
    client: "UIA R&D",
    tick: "UIA",
    year: "2006",
    dates: "2006–2007",
    city: "Hyderabad",
    role: "ETL analyst",
    program: "Early ETL.",
    bullets: [
      "I worked the early ETL on that R&D floor — requirements through delivery.",
      "I sat with the business stakeholders and turned what they needed into mappings.",
    ],
    env: "ETL · SDLC · Hyderabad",
    figure: "uia",
    plate: "requirements → mappings",
    plateKicker: "Fig. UIA — Early ETL",
  },
];
