export function BlastRadius() {
  const nodes = [
    [240, 160, true, "SVC"],
    [240, 52, false, "UI"],
    [348, 88, true, "API"],
    [400, 168, true, "AUTH"],
    [336, 248, false, "Q"],
    [240, 272, true, "DB"],
    [132, 248, false, "ETL"],
    [80, 160, true, "BUS"],
    [140, 80, false, "EXT"],
  ] as const;

  return (
    <svg viewBox="0 0 480 320" role="img" aria-label="Graph Architecture blast radius on a service estate">
      <rect width="480" height="320" fill="#F7F6F2" />
      <circle
        cx="240"
        cy="160"
        r="92"
        fill="none"
        stroke="#A8893D"
        strokeWidth="1"
        strokeDasharray="3 5"
        className="pulse"
      />
      <circle cx="240" cy="160" r="128" fill="none" stroke="#0A0E14" strokeOpacity="0.12" />

      <g stroke="#0A0E14" strokeOpacity="0.2" strokeWidth="1">
        {nodes.slice(1).map(([x, y], i) => (
          <line key={i} x1="240" y1="160" x2={x} y2={y} />
        ))}
        <line x1="348" y1="88" x2="400" y2="168" />
        <line x1="80" y1="160" x2="140" y2="80" />
        <line x1="336" y1="248" x2="240" y2="272" />
      </g>

      {nodes.map(([x, y, inside, label]) => (
        <g key={label}>
          <circle
            cx={x}
            cy={y}
            r={label === "SVC" ? 22 : 15}
            fill={inside ? "#0E1A2B" : "#EEECE6"}
            stroke="#A8893D"
            strokeWidth={inside ? 1.1 : 0.8}
          />
          <text
            x={x}
            y={y + 3.5}
            textAnchor="middle"
            fill={inside ? "#F7F6F2" : "#0A0E14"}
            fontFamily="Cormorant Garamond, serif"
            fontSize="8"
            letterSpacing="0.7"
          >
            {label}
          </text>
        </g>
      ))}

      <text
        x="24"
        y="28"
        fill="#A8893D"
        fontFamily="Cormorant Garamond, serif"
        fontSize="11"
        letterSpacing="1.6"
      >
        88.9% EDGE RESOLUTION
      </text>
    </svg>
  );
}
