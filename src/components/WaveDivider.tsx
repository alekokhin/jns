const W = 1440;
const MID = 90;
const AMP = 45;
const WAVELENGTH = 720;

const RIBBONS = [
  { key: "gold",  grad: "wave-gold",  width: 14, phase: 0 },
  { key: "red",   grad: "wave-red",   width: 10, phase: (2 * Math.PI) / 3 },
  { key: "green", grad: "wave-green", width: 5,  phase: (4 * Math.PI) / 3 },
];

function buildPath(phase: number) {
  let d = "";
  for (let x = -20; x <= W + 20; x += 4) {
    const y = MID + AMP * Math.sin((2 * Math.PI * x) / WAVELENGTH + phase);
    d += `${d ? "L" : "M"}${x} ${y.toFixed(2)} `;
  }
  return d;
}

function buildCrossings() {
  const out: { x: number; under: number; over: number }[] = [];
  for (let a = 0; a < RIBBONS.length; a++) {
    for (let b = a + 1; b < RIBBONS.length; b++) {
      const sum = RIBBONS[a].phase + RIBBONS[b].phase;
      const theta0 = (Math.PI - sum) / 2;
      for (let k = -4; k <= 8; k++) {
        const theta = theta0 + Math.PI * k;
        const x = (theta * WAVELENGTH) / (2 * Math.PI);
        if (x < -30 || x > W + 30) continue;
        out.push({
          x,
          under: k % 2 === 0 ? b : a,
          over: k % 2 === 0 ? a : b,
        });
      }
    }
  }
  return out;
}

const PATHS = RIBBONS.map((r) => buildPath(r.phase));
const CROSSINGS = buildCrossings();
const CLIP_HALF = 28;

export default function WaveDivider() {
  const ribbon = (i: number, key: string) => (
    <path
      key={key}
      d={PATHS[i]}
      fill="none"
      stroke={`url(#${RIBBONS[i].grad})`}
      strokeWidth={RIBBONS[i].width}
      strokeLinecap="butt"
      strokeLinejoin="round"
      filter="url(#wave-shadow)"
    />
  );

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      style={{
        display: "block",
        width: "100%",
        height: "240px",
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* Metallic gold (logo rim) */}
        <linearGradient id="wave-gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0"    stopColor="#6F4B12" />
          <stop offset="0.25" stopColor="#C99A33" />
          <stop offset="0.5"  stopColor="#F6E2A0" />
          <stop offset="0.75" stopColor="#E3BE5E" />
          <stop offset="1"    stopColor="#9A6F1F" />
        </linearGradient>

        {/* Ruby red (logo ribbon) */}
        <linearGradient id="wave-red" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0"    stopColor="#7A0B12" />
          <stop offset="0.35" stopColor="#B3141C" />
          <stop offset="0.7"  stopColor="#E5473F" />
          <stop offset="1"    stopColor="#7A0B12" />
        </linearGradient>

        {/* Emerald green (logo letters) */}
        <linearGradient id="wave-green" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0"    stopColor="#04211A" />
          <stop offset="0.4"  stopColor="#14513A" />
          <stop offset="0.7"  stopColor="#2E7A55" />
          <stop offset="1"    stopColor="#0A3A28" />
        </linearGradient>

        {/* Soft shadow so the over/under weave reads clearly */}
        <filter id="wave-shadow" x="-5%" y="-30%" width="110%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
        </filter>

        {/* One small clip window per crossing */}
        {CROSSINGS.map((c, i) => (
          <clipPath id={`wave-clip-${i}`} key={i}>
            <rect x={c.x - CLIP_HALF} y="0" width={CLIP_HALF * 2} height="180" />
          </clipPath>
        ))}
      </defs>

      {/* Base layer: all three ribbons */}
      {RIBBONS.map((_, i) => ribbon(i, `base-${i}`))}

      {/* Weave layer: at each crossing, redraw the "under" then "over" ribbon */}
      {CROSSINGS.map((c, i) => (
        <g key={`x-${i}`} clipPath={`url(#wave-clip-${i})`}>
          {ribbon(c.under, `u-${i}`)}
          {ribbon(c.over, `o-${i}`)}
        </g>
      ))}
    </svg>
  );
}
