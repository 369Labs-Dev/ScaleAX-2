'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motionEnabled } from '@/lib/motion';

// W7 — subtle scroll depth for decorative layers (the hero backdrop). Moves
// its element with the GPU-composited `translate` property at `speed` × the
// parent's scroll offset, only while on screen, at most one rAF per frame,
// passive listener. Decorative only (aria-hidden); off under reduced motion.
export function Parallax({
  speed = 0.15,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || !motionEnabled()) return;

    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      const top = parent.getBoundingClientRect().top;
      el.style.translate = `0 ${(-top * speed).toFixed(1)}px`;
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(parent);
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {children}
    </div>
  );
}
