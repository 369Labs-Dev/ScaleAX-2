'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { observeOnce } from '@/lib/motion';

type RevealVariant = 'up' | 'fade' | 'zoom' | 'draw';

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Entrance style. `up` (default) rises 20px while fading in. */
  variant?: RevealVariant;
  /** Animate the direct children one after another instead of the wrapper. */
  stagger?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

// W7 — scroll-reveal primitive. Renders its element with a `data-reveal` (or
// `data-reveal-stagger`) hook; CSS in globals.css hides it ONLY while
// `html.sx-motion` is set and plays a transform/opacity keyframe once the
// shared IntersectionObserver marks it `data-revealed`. The attribute is
// written after hydration, so it never causes a hydration mismatch, and a
// re-render never removes it (React doesn't own the attribute).
export function Reveal<T extends ElementType = 'div'>({
  as,
  variant = 'up',
  stagger = false,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOnce(el, () => el.setAttribute('data-revealed', ''));
  }, []);

  const hook = stagger
    ? { 'data-reveal-stagger': '' }
    : { 'data-reveal': variant === 'up' ? '' : variant };

  return <Tag ref={ref} {...hook} {...rest} />;
}
