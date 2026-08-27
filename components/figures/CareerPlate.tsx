import type { ReactNode } from "react";
import type { CareerFigure } from "@/lib/content";

const ink = "#0A0E14";
const field = "#F7F6F2";
const surface = "#EEECE6";
const midnight = "#0E1A2B";
const gold = "#A8893D";
const display = "Cormorant Garamond, serif";

function Frame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox="0 0 480 320" role="img" aria-label={label}>
      <rect width="480" height="320" fill={field} />
      <rect
        x="10"
        y="10"
        width="460"
        height="300"
        fill="none"
        stroke={gold}
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
      {children}
    </svg>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <text
      x="24"
      y="30"
      fill={gold}
      fontFamily={display}
      fontSize="11"
      letterSpacing="1.6"
    >
      {text}
    </text>
  );
}

function VerizonPlate() {
  const path =
    "M64 250 C118 250 136 198 172 164 C214 126 250 118 296 128 C340 138 362 168 396 88";
  return (
    <Frame label="SRE agents on telemetry, tickets, and a human last step">
      <Caption text="SRE · RAG · MCP · <6s" />
      <g stroke={ink} strokeOpacity="0.16" strokeWidth="1" fill="none">
        <path d="M64 250 L126 208 L172 164" />
        <path d="M126 208 L154 92" />
        <path d="M172 164 L236 214 L296 128" />
        <path d="M296 128 L352 172 L396 88" />
        <path d="M154 92 L228 60 L296 128" />
      </g>
      <path
        d={path}
        fill="none"
        stroke={gold}
        strokeWidth="1.35"
        className="draw"
      />
      <circle
        r="4"
        fill={midnight}
        className="travel"
        style={{ offsetPath: `path('${path}')` }}
      />
      {[
        [64, 250, "TEL"],
        [126, 208, "TIX"],
        [154, 92, "RB"],
        [172, 164, "MCP"],
        [236, 214, "λ"],
        [296, 128, "OS"],
        [352, 172, "EB"],
      ].map(([x, y, label]) => (
        <g key={String(label)}>
          <circle
            cx={x}
            cy={y}
            r="15"
            fill={surface}
            stroke={midnight}
            strokeWidth="0.9"
          />
          <text
            x={x}
            y={Number(y) + 3.5}
            textAnchor="middle"
            fill={ink}
            fontFamily={display}
            fontSize="8"
            letterSpacing="0.7"
          >
            {label}
          </text>
        </g>
      ))}
      <rect x="372" y="66" width="52" height="44" fill={midnight} />
      <text
        x="398"
        y="86"
        textAnchor="middle"
        fill={field}
        fontFamily={display}
        fontSize="9"
        letterSpacing="1.1"
      >
        HUMAN
      </text>
      <text
        x="398"
        y="100"
        textAnchor="middle"
        fill={gold}
        fontFamily={display}
        fontSize="8"
        letterSpacing="1"
      >
        LAST
      </text>
    </Frame>
  );
}

function CircanaPlate() {
  const left = ["cat_id", "attr_nm", "uom_cd", "brand", "promo"];
  const right = ["item_key", "facet", "unit", "maker", "offer"];
  return (
    <Frame label="Retail attribute mapping with a review queue">
      <Caption text="1400+ CAT · 30K+ ATTR · 60% / 3×" />
      {left.map((name, i) => {
        const y = 72 + i * 42;
        const mapped = i !== 3;
        return (
          <g key={name}>
            <rect
              x="36"
              y={y - 14}
              width="108"
              height="28"
              fill={surface}
              stroke={midnight}
              strokeWidth="0.8"
            />
            <text x="48" y={y + 4} fill={ink} fontFamily={display} fontSize="12">
              {name}
            </text>
            <path
              d={`M144 ${y} C 210 ${y}, 270 ${y}, 336 ${y}`}
              fill="none"
              stroke={mapped ? gold : ink}
              strokeOpacity={mapped ? 1 : 0.28}
              strokeWidth={mapped ? 1.2 : 1}
              strokeDasharray={mapped ? "0" : "3 4"}
            />
            <rect
              x="336"
              y={y - 14}
              width="108"
              height="28"
              fill={mapped ? midnight : surface}
              stroke={gold}
              strokeWidth="0.8"
            />
            <text
              x="348"
              y={y + 4}
              fill={mapped ? field : ink}
              fontFamily={display}
              fontSize="12"
            >
              {right[i]}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

function ThermoPlate() {
  const layers = [
    { y: 70, label: "AZURE ENTITIES", note: "RECONCILE", dark: true },
    { y: 128, label: "COBOL → SQL", note: "IDA", dark: false },
    { y: 186, label: "VSAM / ISAM", note: "LINEAGE", dark: true },
    { y: 244, label: "MAINFRAME", note: "SOURCE", dark: false },
  ];
  return (
    <Frame label="Mainframe-to-Azure extract with lineage">
      <Caption text="VSAM · ISAM · COBOL-TO-SQL" />
      {layers.map((layer) => (
        <g key={layer.label}>
          <rect
            x="40"
            y={layer.y - 22}
            width="400"
            height="44"
            fill={layer.dark ? midnight : surface}
            stroke={gold}
            strokeWidth="0.8"
          />
          <text
            x="56"
            y={layer.y + 4}
            fill={layer.dark ? field : ink}
            fontFamily={display}
            fontSize="13"
            letterSpacing="1.3"
          >
            {layer.label}
          </text>
          <text
            x="424"
            y={layer.y + 4}
            textAnchor="end"
            fill={gold}
            fontFamily={display}
            fontSize="12"
            letterSpacing="1.1"
          >
            {layer.note}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function CvsPlate() {
  return (
    <Frame label="Pharmacy-claims ML with OCR and NER">
      <Caption text="RPHAI · CLAIMS · OCR / NER" />
      <rect
        x="48"
        y="64"
        width="160"
        height="200"
        fill={surface}
        stroke={midnight}
        strokeWidth="0.9"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="64"
          y={84 + i * 28}
          width={i === 2 ? 96 : 128}
          height="8"
          fill={i === 2 || i === 4 ? gold : midnight}
          opacity={i === 2 || i === 4 ? 1 : 0.18}
        />
      ))}
      <path
        d="M208 164 H268"
        stroke={gold}
        strokeWidth="1.2"
        className="draw"
      />
      <circle cx="288" cy="164" r="36" fill={midnight} stroke={gold} />
      <text
        x="288"
        y="160"
        textAnchor="middle"
        fill={field}
        fontFamily={display}
        fontSize="11"
        letterSpacing="1"
      >
        OCR
      </text>
      <text
        x="288"
        y="176"
        textAnchor="middle"
        fill={gold}
        fontFamily={display}
        fontSize="10"
        letterSpacing="1"
      >
        NER
      </text>
      <rect x="340" y="96" width="92" height="136" fill={midnight} />
      {["NDC", "QTY", "PAY", "REJ"].map((label, i) => (
        <text
          key={label}
          x="386"
          y={128 + i * 26}
          textAnchor="middle"
          fill={i === 0 ? gold : field}
          fontFamily={display}
          fontSize="12"
          letterSpacing="1.2"
        >
          {label}
        </text>
      ))}
    </Frame>
  );
}

function ChangePlate() {
  return (
    <Frame label="IHDP with EDI 837 and 835 on a graph">
      <Caption text="IHDP · EDI 837 / 835 · NEO4J" />
      <circle
        cx="240"
        cy="176"
        r="78"
        fill="none"
        stroke={gold}
        strokeDasharray="3 5"
        className="pulse"
      />
      {[
        [240, 176, "IHDP", true],
        [140, 100, "837", false],
        [340, 100, "835", false],
        [120, 220, "CLIN", false],
        [360, 220, "OPS", false],
        [240, 268, "GLUE", true],
      ].map(([x, y, label, dark]) => (
        <g key={String(label)}>
          <circle
            cx={x}
            cy={y}
            r={label === "IHDP" ? 28 : 18}
            fill={dark ? midnight : surface}
            stroke={gold}
            strokeWidth="0.9"
          />
          <text
            x={x}
            y={Number(y) + 3.5}
            textAnchor="middle"
            fill={dark ? field : ink}
            fontFamily={display}
            fontSize="9"
            letterSpacing="0.8"
          >
            {label}
          </text>
        </g>
      ))}
      <g stroke={ink} strokeOpacity="0.2" strokeWidth="1">
        <line x1="240" y1="176" x2="140" y2="100" />
        <line x1="240" y1="176" x2="340" y2="100" />
        <line x1="240" y1="176" x2="120" y2="220" />
        <line x1="240" y1="176" x2="360" y2="220" />
        <line x1="240" y1="176" x2="240" y2="268" />
      </g>
    </Frame>
  );
}

function CarsPlate() {
  return (
    <Frame label="Production Spark ML ensembles with CI/CD">
      <Caption text="SPARK ML · ENSEMBLES · CI/CD" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x={48 + i * 84}
            y="86"
            width="68"
            height="148"
            fill={i === 2 ? midnight : surface}
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x={62 + i * 84}
            y={200 - (40 + i * 18)}
            width="40"
            height={40 + i * 18}
            fill={gold}
            opacity={0.35 + i * 0.12}
          />
          <text
            x={82 + i * 84}
            y="252"
            textAnchor="middle"
            fill={gold}
            fontFamily={display}
            fontSize="11"
            letterSpacing="1"
          >
            {["RF", "XGB", "ENS", "SVM", "REG"][i]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function McdonaldsPlate() {
  return (
    <Frame label="Global data lake and capability maturity">
      <Caption text="GLOBAL LAKE · CMM" />
      <ellipse
        cx="240"
        cy="188"
        rx="168"
        ry="64"
        fill="none"
        stroke={gold}
        strokeWidth="1.1"
        className="draw"
      />
      <ellipse
        cx="240"
        cy="188"
        rx="110"
        ry="40"
        fill={surface}
        stroke={midnight}
        strokeWidth="0.9"
      />
      <text
        x="240"
        y="184"
        textAnchor="middle"
        fill={ink}
        fontFamily={display}
        fontSize="14"
        letterSpacing="1.6"
      >
        DATA LAKE
      </text>
      <text
        x="240"
        y="204"
        textAnchor="middle"
        fill={gold}
        fontFamily={display}
        fontSize="11"
        letterSpacing="1.4"
      >
        CMM · ENABLEMENT
      </text>
      {["POS", "MENU", "SUPPLY", "LOYAL"].map((label, i) => (
        <text
          key={label}
          x={88 + i * 100}
          y="88"
          fill={midnight}
          fontFamily={display}
          fontSize="12"
          letterSpacing="1.2"
        >
          {label}
        </text>
      ))}
    </Frame>
  );
}

function NorthernPlate() {
  const path = "M72 220 C140 220 180 120 240 120 C300 120 340 220 408 220";
  return (
    <Frame label="CDH cluster feeding an S3 data lake">
      <Caption text="DERIVATIVES · ISO 20022 · CDH → S3" />
      <rect
        x="48"
        y="80"
        width="120"
        height="160"
        fill={surface}
        stroke={midnight}
        strokeWidth="0.9"
      />
      <text
        x="108"
        y="160"
        textAnchor="middle"
        fill={ink}
        fontFamily={display}
        fontSize="14"
        letterSpacing="1.4"
      >
        CDH
      </text>
      <path
        d={path}
        fill="none"
        stroke={gold}
        strokeWidth="1.3"
        className="draw"
      />
      <circle
        r="4"
        fill={midnight}
        className="travel"
        style={{ offsetPath: `path('${path}')` }}
      />
      <rect x="312" y="80" width="120" height="160" fill={midnight} />
      <text
        x="372"
        y="160"
        textAnchor="middle"
        fill={field}
        fontFamily={display}
        fontSize="14"
        letterSpacing="1.4"
      >
        S3
      </text>
    </Frame>
  );
}

function KeybankPlate() {
  const nodes = [
    [240, 168, true, "SFD"],
    [140, 96, false, "NN"],
    [340, 96, false, "DN"],
    [108, 200, false, "DN"],
    [372, 200, false, "DN"],
    [240, 256, false, "SPARK"],
  ] as const;
  return (
    <Frame label="Cloudera cluster and Spark pipelines">
      <Caption text="SFD · CLOUDERA · SPARK" />
      <circle
        cx="240"
        cy="168"
        r="88"
        fill="none"
        stroke={gold}
        strokeDasharray="3 5"
        className="pulse"
      />
      <g stroke={ink} strokeOpacity="0.2" strokeWidth="1">
        {nodes.slice(1).map(([x, y], i) => (
          <line key={i} x1="240" y1="168" x2={x} y2={y} />
        ))}
      </g>
      {nodes.map(([x, y, dark, label]) => (
        <g key={label}>
          <circle
            cx={x}
            cy={y}
            r={dark ? 26 : 18}
            fill={dark ? midnight : surface}
            stroke={gold}
            strokeWidth="0.9"
          />
          <text
            x={x}
            y={y + 3.5}
            textAnchor="middle"
            fill={dark ? field : ink}
            fontFamily={display}
            fontSize="8"
            letterSpacing="0.7"
          >
            {label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function WellsPlate() {
  return (
    <Frame label="Home-loan migration across fifty-plus web services">
      <Caption text="HOME LOAN · 50+ SERVICES" />
      <rect
        x="48"
        y="72"
        width="130"
        height="196"
        fill={surface}
        stroke={midnight}
        strokeWidth="0.9"
      />
      <text
        x="113"
        y="172"
        textAnchor="middle"
        fill={ink}
        fontFamily={display}
        fontSize="13"
        letterSpacing="1.2"
      >
        LOAN
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path
            d={`M178 ${96 + i * 36} H250`}
            stroke={gold}
            strokeWidth="1"
            className="draw"
          />
          <rect
            x="250"
            y={82 + i * 36}
            width="182"
            height="28"
            fill={i % 2 === 0 ? midnight : surface}
            stroke={gold}
            strokeWidth="0.7"
          />
          <text
            x="341"
            y={100 + i * 36}
            textAnchor="middle"
            fill={i % 2 === 0 ? field : ink}
            fontFamily={display}
            fontSize="11"
            letterSpacing="1.1"
          >
            {["JAVA", ".NET", "MOBILE", "SOA", "MSP"][i]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function PrudentialPlate() {
  return (
    <Frame label="BI reporting and ETL for policy administration">
      <Caption text="POLICY ADMIN · BI · ETL" />
      <rect
        x="56"
        y="200"
        width="368"
        height="56"
        fill={midnight}
        stroke={gold}
      />
      <text
        x="240"
        y="234"
        textAnchor="middle"
        fill={field}
        fontFamily={display}
        fontSize="14"
        letterSpacing="1.6"
      >
        POLICY ADMIN
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path
            d={`M${96 + i * 96} 200 V 132`}
            stroke={gold}
            strokeWidth="1"
          />
          <rect
            x={64 + i * 96}
            y="72"
            width="64"
            height="60"
            fill={surface}
            stroke={midnight}
            strokeWidth="0.8"
          />
          <text
            x={96 + i * 96}
            y="106"
            textAnchor="middle"
            fill={ink}
            fontFamily={display}
            fontSize="11"
            letterSpacing="1"
          >
            {["RPT", "KPI", "CUBE", "ETL"][i]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function CognizantPlate() {
  return (
    <Frame label="Kimball star schema warehouse">
      <Caption text="KIMBALL · STAR SCHEMA" />
      <rect x="188" y="128" width="104" height="72" fill={midnight} />
      <text
        x="240"
        y="170"
        textAnchor="middle"
        fill={field}
        fontFamily={display}
        fontSize="13"
        letterSpacing="1.3"
      >
        FACT
      </text>
      {[
        [80, 64],
        [296, 64],
        [80, 220],
        [296, 220],
      ].map(([x, y], i) => (
        <g key={i}>
          <line
            x1="240"
            y1="164"
            x2={x + 52}
            y2={y + 28}
            stroke={gold}
            strokeWidth="1"
          />
          <rect
            x={x}
            y={y}
            width="104"
            height="56"
            fill={surface}
            stroke={gold}
            strokeWidth="0.8"
          />
          <text
            x={x + 52}
            y={y + 32}
            textAnchor="middle"
            fill={ink}
            fontFamily={display}
            fontSize="12"
            letterSpacing="1.1"
          >
            {["DATE", "CUST", "PROD", "GEO"][i]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function CareerbuilderPlate() {
  return (
    <Frame label="ETL mappings and SQL procedures">
      <Caption text="ETL MAPPINGS · SQL" />
      {["EXTRACT", "TRANSFORM", "LOAD"].map((label, i) => (
        <g key={label}>
          <rect
            x={48 + i * 140}
            y="110"
            width="120"
            height="100"
            fill={i === 1 ? midnight : surface}
            stroke={gold}
            strokeWidth="0.9"
          />
          <text
            x={108 + i * 140}
            y="166"
            textAnchor="middle"
            fill={i === 1 ? field : ink}
            fontFamily={display}
            fontSize="12"
            letterSpacing="1.3"
          >
            {label}
          </text>
          {i < 2 ? (
            <path
              d={`M${168 + i * 140} 160 H${188 + i * 140}`}
              stroke={gold}
              strokeWidth="1.2"
            />
          ) : null}
        </g>
      ))}
    </Frame>
  );
}

function UiaPlate() {
  return (
    <Frame label="Early ETL requirements through mappings">
      <Caption text="EARLY ETL · HYDERABAD" />
      <path
        d="M72 220 C140 140 200 140 240 180 C280 220 340 220 408 120"
        fill="none"
        stroke={gold}
        strokeWidth="1.3"
        className="draw"
      />
      {[
        [72, 220, "NEED"],
        [240, 180, "SPEC"],
        [408, 120, "MAP"],
      ].map(([x, y, label]) => (
        <g key={String(label)}>
          <circle
            cx={x}
            cy={y}
            r="22"
            fill={label === "MAP" ? midnight : surface}
            stroke={gold}
          />
          <text
            x={x}
            y={Number(y) + 4}
            textAnchor="middle"
            fill={label === "MAP" ? field : ink}
            fontFamily={display}
            fontSize="10"
            letterSpacing="1"
          >
            {label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

const plates: Record<CareerFigure, () => ReactNode> = {
  verizon: VerizonPlate,
  circana: CircanaPlate,
  thermo: ThermoPlate,
  cvs: CvsPlate,
  change: ChangePlate,
  cars: CarsPlate,
  mcdonalds: McdonaldsPlate,
  northern: NorthernPlate,
  keybank: KeybankPlate,
  wells: WellsPlate,
  prudential: PrudentialPlate,
  cognizant: CognizantPlate,
  careerbuilder: CareerbuilderPlate,
  uia: UiaPlate,
};

export function CareerPlate({ kind }: { kind: CareerFigure }) {
  const Plate = plates[kind];
  return <Plate />;
}
