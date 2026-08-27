const left = [
  ["order_ts", true],
  ["sku_id", true],
  ["store_cd", true],
  ["promo_flag", false],
  ["net_amt", true],
] as const;

const right = [
  ["event_time", true],
  ["item_key", true],
  ["location", true],
  ["offer_ind", false],
  ["amount", true],
] as const;

export function MappingFigure() {
  return (
    <svg viewBox="0 0 480 320" role="img" aria-label="Schema and attribute mapping with a review queue">
      <rect width="480" height="320" fill="#F7F6F2" />

      <text x="56" y="36" fill="#A8893D" fontFamily="Cormorant Garamond, serif" fontSize="11" letterSpacing="1.5">
        SOURCE
      </text>
      <text x="424" y="36" textAnchor="end" fill="#A8893D" fontFamily="Cormorant Garamond, serif" fontSize="11" letterSpacing="1.5">
        TARGET
      </text>

      {left.map((row, i) => {
        const y = 70 + i * 42;
        const mapped = row[1];
        return (
          <g key={row[0]}>
            <rect x="36" y={y - 14} width="112" height="28" fill="#EEECE6" stroke="#0E1A2B" strokeWidth="0.8" />
            <text x="48" y={y + 4} fill="#0A0E14" fontFamily="Source Serif 4, serif" fontSize="11">
              {row[0]}
            </text>
            <path
              d={`M148 ${y} C 210 ${y}, 270 ${y}, 332 ${y}`}
              fill="none"
              stroke={mapped ? "#A8893D" : "#0A0E14"}
              strokeOpacity={mapped ? 1 : 0.28}
              strokeWidth={mapped ? 1.2 : 1}
              strokeDasharray={mapped ? "0" : "3 4"}
            />
            <rect x="332" y={y - 14} width="112" height="28" fill={mapped ? "#0E1A2B" : "#EEECE6"} stroke="#A8893D" strokeWidth="0.8" />
            <text x="344" y={y + 4} fill={mapped ? "#F7F6F2" : "#0A0E14"} fontFamily="Source Serif 4, serif" fontSize="11">
              {right[i][0]}
            </text>
          </g>
        );
      })}

      <rect x="168" y="276" width="144" height="26" fill="#0E1A2B" />
      <text x="240" y="293" textAnchor="middle" fill="#F7F6F2" fontFamily="Cormorant Garamond, serif" fontSize="12" letterSpacing="1.4">
        60% · 3× · REVIEW
      </text>
    </svg>
  );
}
