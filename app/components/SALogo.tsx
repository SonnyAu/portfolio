type SALogoProps = {
  className?: string;
};

const STROKE = 3;
const BR_LEN = 28;

export default function SALogo({ className }: SALogoProps) {
  return (
    <svg
      viewBox="0 0 360 180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SA"
      className={className}
      style={{ overflow: "visible" }}
    >
      <path
        className="sa-bracket-tr"
        d={`M${340 - BR_LEN} 24 H340 V${24 + BR_LEN}`}
        stroke="#e10600"
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="square"
      />

      <path
        className="sa-bracket-bl"
        d={`M20 ${156 - BR_LEN} V156 H${20 + BR_LEN}`}
        stroke="#e10600"
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="square"
      />

      <text
        x={180}
        y={120}
        textAnchor="middle"
        fontFamily="var(--font-f1-bold), system-ui, sans-serif"
        fontSize={128}
        letterSpacing="0.02em"
        fill="#e10600"
        transform="skewX(-4)"
        style={{ transformOrigin: "180px 120px" }}
      >
        SA
      </text>

      <rect
        className="sa-underline"
        x={46}
        y={140}
        width={250}
        height={4}
        fill="#e10600"
        style={{
          transformBox: "fill-box",
          transformOrigin: "left center",
        }}
      />

      <path
        className="sa-underline-tip"
        d="M296 138 L312 142 L296 146 Z"
        fill="#e10600"
        style={{
          transformBox: "fill-box",
          transformOrigin: "left center",
        }}
      />

      <rect
        className="sa-underline-glow"
        x={46}
        y={139}
        width={266}
        height={6}
        fill="#e10600"
        opacity={0.35}
        style={{
          filter: "blur(6px)",
          transformBox: "fill-box",
          transformOrigin: "left center",
        }}
      />
    </svg>
  );
}
