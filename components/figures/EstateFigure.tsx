const layers = [
  { y: 52, label: "CLIENT · ANDROID / iOS", note: "INGRE" },
  { y: 108, label: "SERVING · RBAC 5 / 11", note: "GRANTS" },
  { y: 164, label: "GRAPH · 75 SVC / 504 EP", note: "88.9%" },
  { y: 220, label: "LAKE · LINEAGE", note: "ETL" },
  { y: 276, label: "MAINFRAME → CLOUD", note: "DDL ×16" },
] as const;

export function EstateFigure() {
  return (
    <svg viewBox="0 0 480 320" role="img" aria-label="Delivery stack from mainframe extracts to mobile clients">
      <rect width="480" height="320" fill="#F7F6F2" />
      {layers.map((layer, i) => (
        <g key={layer.label}>
          <rect
            x="36"
            y={layer.y - 22}
            width="408"
            height="44"
            fill={i % 2 === 0 ? "#0E1A2B" : "#EEECE6"}
            stroke="#A8893D"
            strokeWidth="0.8"
          />
          <text
            x="52"
            y={layer.y + 4}
            fill={i % 2 === 0 ? "#F7F6F2" : "#0A0E14"}
            fontFamily="Cormorant Garamond, serif"
            fontSize="13"
            letterSpacing="1.3"
          >
            {layer.label}
          </text>
          <text
            x="428"
            y={layer.y + 4}
            textAnchor="end"
            fill="#A8893D"
            fontFamily="Cormorant Garamond, serif"
            fontSize="12"
            letterSpacing="1.2"
          >
            {layer.note}
          </text>
        </g>
      ))}
    </svg>
  );
}
