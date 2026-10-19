"use client";

import { useEffect, useId, useRef, useState } from "react";

const RIBBONS = [
  { grad: "gold", width: 8, phase: 0 },
  { grad: "red", width: 6, phase: (2 * Math.PI) / 3 },
  { grad: "green", width: 4, phase: (4 * Math.PI) / 3 },
] as const;

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

type Props = {
  text?: string;
  padPx?: number; // gap between where the ribbons meet and the letters
  className?: string; // text size / font classes
};

export default function WaveDivider({
  text = "ჩვენი კოლექცია",
  padPx = 8,
  className = "text-base sm:text-3xl md:text-5xl",
}: Props) {
  const id = useId().replace(/:/g, "");
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [m, setM] = useState({ w: 0, h: 0, tw: 0 });

  useEffect(() => {
    const update = () => {
      const box = boxRef.current;
      const t = textRef.current;
      if (!box || !t) return;
      setM({
        w: box.clientWidth,
        h: box.clientHeight,
        tw: t.getBoundingClientRect().width,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    if (boxRef.current) ro.observe(boxRef.current);
    if (textRef.current) ro.observe(textRef.current);
    document.fonts?.ready.then(update); // re-measure after the web font loads
    return () => ro.disconnect();
  }, [text]);

  const { w, h, tw } = m;
  const cx = w / 2;
  const mid = h / 2;
  const gap = tw / 2 + padPx;
  const L = Math.max(cx - gap, 0); // length of each side

  // Everything below scales with the available space
  const strokeScale = clamp(w / 900, 0.55, 1);
  const amp = Math.min(h * 0.2, L * 0.3); // wave height
  const wl = clamp(L * 0.9, 110, 420); // wavelength: about one full twist per side on mobile
  const ramp = Math.max(L * 0.4, 1); // distance over which the ribbons spread out

  // d = distance from the text edge. The wave height is 0 at d = 0, so all ribbons meet there.
  const y = (d: number, phase: number) => {
    const env = smooth(Math.min(d / ramp, 1));
    return mid + amp * env * Math.sin((2 * Math.PI * d) / wl + phase);
  };

  const side = (phase: number, dir: "left" | "right") => {
    const x0 = dir === "left" ? cx - gap : cx + gap;
    const sign = dir === "left" ? -1 : 1;
    let p = `M${x0.toFixed(1)} ${mid.toFixed(2)} `;
    for (let d = 3; d <= L; d += 3) {
      p += `L${(x0 + sign * d).toFixed(1)} ${y(d, phase).toFixed(2)} `;
    }
    return p;
  };

  return (
    <div
      ref={boxRef}
      className="relative top-0 md:top-[0px] block w-full h-[80px] sm:h-[100px] md:h-[120px] pointer-events-none"
    >
      {w > 0 && (
        <svg
          aria-hidden="true"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="absolute inset-0 block"
        >
          <defs>
            {/* Metallic gold */}
            <linearGradient id={`${id}-gold`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2="0">
              <stop offset="0" stopColor="#6F4B12" />
              <stop offset="0.25" stopColor="#C99A33" />
              <stop offset="0.5" stopColor="#F6E2A0" />
              <stop offset="0.75" stopColor="#E3BE5E" />
              <stop offset="1" stopColor="#9A6F1F" />
            </linearGradient>

            {/* Ruby red */}
            <linearGradient id={`${id}-red`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2="0">
              <stop offset="0" stopColor="#7A0B12" />
              <stop offset="0.35" stopColor="#B3141C" />
              <stop offset="0.7" stopColor="#E5473F" />
              <stop offset="1" stopColor="#7A0B12" />
            </linearGradient>

            {/* Emerald green */}
            <linearGradient id={`${id}-green`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2="0">
              <stop offset="0" stopColor="#04211A" />
              <stop offset="0.4" stopColor="#14513A" />
              <stop offset="0.7" stopColor="#2E7A55" />
              <stop offset="1" stopColor="#0A3A28" />
            </linearGradient>
          </defs>

          {RIBBONS.map((r) => (
            <g
              key={r.grad}
              fill="none"
              stroke={`url(#${id}-${r.grad})`}
              strokeWidth={r.width * strokeScale}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={side(r.phase, "left")} />
              <path d={side(r.phase, "right")} />
            </g>
          ))}
        </svg>
      )}

      {/* Straight text in the middle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          ref={textRef}
          className={`inline-block whitespace-nowrap font-semibold bg-clip-text text-transparent ${className}`}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #C99A33 0%, #F6E2A0 50%, #E3BE5E 100%)",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}