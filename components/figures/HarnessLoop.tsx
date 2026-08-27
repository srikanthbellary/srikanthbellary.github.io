const loop =
  "M86 108 C86 78 132 58 188 58 C244 58 268 86 268 108 C268 132 244 154 188 154 H300 C356 154 394 176 394 208 C394 238 352 258 300 258 H188 C120 258 86 220 86 180 C86 150 86 132 86 108";

export function HarnessLoop() {
  return (
    <svg viewBox="0 0 480 320" role="img" aria-label="Gather, act, verify loop with a test gate">
      <rect width="480" height="320" fill="#F7F6F2" />
      <path
        d={loop}
        fill="none"
        stroke="#A8893D"
        strokeWidth="1.15"
        className="draw"
      />
      <circle
        r="4"
        fill="#0E1A2B"
        className="travel"
        style={{ offsetPath: `path('${loop}')` }}
      />

      <g>
        <circle cx="86" cy="108" r="28" fill="#EEECE6" stroke="#0E1A2B" strokeWidth="1.1" />
        <circle cx="240" cy="78" r="28" fill="#EEECE6" stroke="#0E1A2B" strokeWidth="1.1" />
        <circle cx="394" cy="208" r="28" fill="#0E1A2B" stroke="#A8893D" strokeWidth="1.1" />
      </g>

      <text x="86" y="112" textAnchor="middle" fill="#0A0E14" fontFamily="Cormorant Garamond, serif" fontSize="11" letterSpacing="1.4">
        01
      </text>
      <text x="240" y="82" textAnchor="middle" fill="#0A0E14" fontFamily="Cormorant Garamond, serif" fontSize="11" letterSpacing="1.4">
        02
      </text>
      <text x="394" y="212" textAnchor="middle" fill="#F7F6F2" fontFamily="Cormorant Garamond, serif" fontSize="11" letterSpacing="1.4">
        03
      </text>

      <text x="86" y="156" textAnchor="middle" fill="#A8893D" fontFamily="Cormorant Garamond, serif" fontSize="12" letterSpacing="1.6">
        GATHER
      </text>
      <text x="240" y="126" textAnchor="middle" fill="#A8893D" fontFamily="Cormorant Garamond, serif" fontSize="12" letterSpacing="1.6">
        ACT
      </text>
      <text x="394" y="256" textAnchor="middle" fill="#A8893D" fontFamily="Cormorant Garamond, serif" fontSize="12" letterSpacing="1.6">
        VERIFY
      </text>

      <rect x="168" y="236" width="128" height="28" fill="#0E1A2B" />
      <text x="232" y="254" textAnchor="middle" fill="#F7F6F2" fontFamily="Cormorant Garamond, serif" fontSize="11" letterSpacing="1.8">
        TEST GATE
      </text>
    </svg>
  );
}
