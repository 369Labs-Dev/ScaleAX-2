import type { ComponentPropsWithoutRef, ElementType } from 'react';

type RevealVariant = 'up' | 'fade' | 'zoom' | 'draw';

type RevealProps<T extends ElementType> = {
  as?: T;
  /** `draw` marks a hairline that draws itself in on scroll. */
  variant?: RevealVariant;
  /** Kept for the data hook; children are not animated one by one. */
  stagger?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

// W9: blocks of content no longer fade in on scroll, so this is now a plain
// wrapper that only leaves a data hook behind. Scroll motion lives in
// components/motion/scroll-fx.tsx: headline lines, media and hairlines.
export function Reveal<T extends ElementType = 'div'>({
  as,
  variant = 'up',
  stagger = false,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  const hook = stagger
    ? { 'data-reveal-stagger': '' }
    : { 'data-reveal': variant === 'up' ? '' : variant };

  return <Tag {...hook} {...rest} />;
}
