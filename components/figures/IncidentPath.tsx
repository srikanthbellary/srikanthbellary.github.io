const path = "M72 248 C120 248 132 200 168 168 C210 128 248 118 292 128 C336 138 360 168 392 92";

export function IncidentPath() {
  return (
    <svg viewBox="0 0 480 320" role="img" aria-label="Service call graph with a human on the last step">
      <rect width="480" height="320" fill="#F7F6F2" />

      <g stroke="#0A0E14" strokeOpacity="0.18" strokeWidth="1" fill="none">
        <path d="M72 248 L128 210 L168 168" />
        <path d="M128 210 L154 96" />
        <path d="M168 168 L236 210 L292 128" />
        <path d="M236 210 L318 246" />
        <path d="M292 128 L348 168 L392 92" />
        <path d="M348 168 L408 210" />
        <path d="M154 96 L220 64 L292 128" />
      </g>

      <path d={path} fill="none" stroke="#A8893D" strokeWidth="1.35" className="draw" />
      <circle r="4" fill="#0E1A2B" className="travel" style={{ offsetPath: `path('${path}')` }} />

      {[
        [72, 248, "TEL"],
        [128, 210, "TIX"],
        [154, 96, "RB"],
        [168, 168, "MCP"],
        [236, 210, "REST"],
        [292, 128, "GRAPH"],
        [318, 246, "12"],
        [348, 168, "20"],
        [408, 210, "15"],
      ].map(([x, y, label]) => (
        <g key={String(label)}>
          <circle cx={x} cy={y} r="16" fill="#EEECE6" stroke="#0E1A2B" strokeWidth="0.9" />
          <text
            x={x}
            y={Number(y) + 3.5}
            textAnchor="middle"
            fill="#0A0E14"
            fontFamily="Cormorant Garamond, serif"
            fontSize="8"
            letterSpacing="0.8"
          >
            {label}
          </text>
        </g>
      ))}

      <g>
        <rect x="368" y="70" width="48" height="44" fill="#0E1A2B" />
        <text
          x="392"
          y="90"
          textAnchor="middle"
          fill="#F7F6F2"
          fontFamily="Cormorant Garamond, serif"
          fontSize="9"
          letterSpacing="1.2"
        >
          HUMAN
        </text>
        <text
          x="392"
          y="104"
          textAnchor="middle"
          fill="#A8893D"
          fontFamily="Cormorant Garamond, serif"
          fontSize="8"
          letterSpacing="1"
        >
          LAST
        </text>
      </g>

      <text
        x="24"
        y="28"
        fill="#A8893D"
        fontFamily="Cormorant Garamond, serif"
        fontSize="11"
        letterSpacing="1.6"
      >
        15 MCP · 20 REST · 12 HANDLERS
      </text>
    </svg>
  );
}
