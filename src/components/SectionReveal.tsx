// src/components/SectionReveal.tsx

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

type Props = PropsWithChildren<{
  id?: string;
  className?: string;

  // Tuning knobs (optional)
  y?: number; // how far it rises from
  blur?: number; // blur px at start
  start?: number; // where animation starts relative to viewport (0..1)
  end?: number; // where animation ends relative to viewport (0..1)
}>;

// start/end correspond to viewport offsets via Framer's offset strings
// start=0.85 means "when section top hits 85% viewport height"
// end=0.25 means "when section top hits 25% viewport height"
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export default function SectionReveal({
  id,
  className = "",
  children,
  y = 14,
  blur = 2,
  start = 0.95,
  end = 0.15,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const s = clamp01(start);
  const e = clamp01(end);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${s}`, `start ${e}`],
  });

  // Raw transforms (0 -> 1 as section enters)
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [y, 0]);
  const blurRaw = useTransform(scrollYProgress, [0, 1], [blur, 0]);

  // Spring smoothing (this is a big part of the "Hunchtan" feel)
  const opacity = useSpring(opacityRaw, { stiffness: 140, damping: 28, mass: 0.6 });
  const translateY = useSpring(yRaw, { stiffness: 140, damping: 28, mass: 0.6 });
  const blurPx = useSpring(blurRaw, { stiffness: 140, damping: 28, mass: 0.6 });

  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section id={id} ref={ref as any} className={`relative ${className}`}>
      <motion.div
        style={{
          opacity,
          y: translateY,
          filter,
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
