'use client';

import { useEffect, useRef } from 'react';
import { easeOutExpo, formatFigure, motionEnabled, observeOnce, parseFigure } from '@/lib/motion';

const DURATION_MS = 1600;
// Part C6 "In numbers": figures must render their final value on load and
// never show "0". The server renders the final string; the roll-up is a
// progressive enhancement that starts from a fraction of the target (never
// zero) and always lands on the exact original string.
const START_FRACTION = 0.3;

// W7 — stat counter. Only figures with exactly one number ("1.5M+",
// "2,117", "25+ years") roll up; anything else ("12–16 weeks") renders as
// is. No motion (reduced motion, no JS, not yet hydrated) => final value.
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parsed = parseFigure(value);
    if (!el || !parsed || !motionEnabled()) return;

    let frame = 0;
    const stop = observeOnce(el, () => {
      const from = parsed.value * START_FRACTION;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        if (t >= 1) {
          el.textContent = value;
          return;
        }
        el.textContent = formatFigure(parsed, from + (parsed.value - from) * easeOutExpo(t));
        frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });

    return () => {
      stop();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
