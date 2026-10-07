import type Lenis from 'lenis';

// Lenis owns the scroll position on mouse and trackpad devices, so a native
// scrollIntoView gets overridden on its next frame. ScrollFx registers its
// instance here and components scroll through it, falling back to the
// browser where Lenis is not running (touch, reduced motion).
let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToElement(el: HTMLElement, offset = -96) {
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 0.9 });
    return;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
}
