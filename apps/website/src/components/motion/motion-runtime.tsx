'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MOTION_READY_FLAG, NAVIGATED_CLASS } from '@/lib/motion';

// W7 — mounted once in the root layout. Tells the <head> failsafe that the
// app hydrated (so `html.sx-motion` may stay), and marks the document after
// the first client-side navigation so the route entrance in app/template.tsx
// only plays on navigations, never on first load.
export function MotionRuntime() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    (window as unknown as Record<string, unknown>)[MOTION_READY_FLAG] = true;
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    document.documentElement.classList.add(NAVIGATED_CLASS);
  }, [pathname]);

  return null;
}
