'use client';

import { useEffect, useRef } from 'react';

// Marks the header as scrolled (solid) and hides it while the visitor scrolls
// down, bringing it back the moment they scroll up. Attributes are written
// straight to the DOM node, so scrolling never re-renders React. A plain
// scroll listener, evaluated once on mount, so a reload that restores the
// scroll position still lands in the right state.
export function HeaderScroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = ref.current?.closest('header');
    if (!header) return;
    let last = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      header.toggleAttribute('data-scrolled', y > 24);
      if (y <= 160 || header.matches(':hover')) header.removeAttribute('data-hidden');
      else if (y > last + 4) header.setAttribute('data-hidden', '');
      else if (y < last - 4) header.removeAttribute('data-hidden');
      last = y;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <span ref={ref} hidden />;
}
