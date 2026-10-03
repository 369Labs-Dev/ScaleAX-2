// W7 — motion system, framework-free core.
//
// The site animates with CSS keyframes gated on `html.sx-motion`. That class
// is set by `bootMotion` — inlined into <head> so it runs before first paint
// — and ONLY when the visitor has not asked for reduced motion and the
// browser has IntersectionObserver. If the React bundle never hydrates
// (blocked script, runtime error), a failsafe removes the class again so
// nothing stays at opacity 0. No JavaScript at all => the class is never
// set => everything renders fully visible.

export const MOTION_CLASS = 'sx-motion';
export const NAVIGATED_CLASS = 'sx-nav';
export const MOTION_READY_FLAG = '__sxMotionReady';
export const MOTION_FAILSAFE_MS = 4000;

export interface MotionWindow {
  document: Document;
  matchMedia?: (query: string) => MediaQueryList;
  IntersectionObserver?: unknown;
  setTimeout: (handler: () => void, ms: number) => unknown;
  [MOTION_READY_FLAG]?: boolean;
}

/**
 * Decide whether to enable motion. Self-contained on purpose: it is
 * serialised with Function#toString into an inline <head> script, so it may
 * not reference anything outside its own body (constants are inlined).
 */
export function bootMotion(win: MotionWindow): boolean {
  try {
    const root = win.document.documentElement;
    if (!win.IntersectionObserver) return false;
    if (win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    root.classList.add('sx-motion');
    win.setTimeout(() => {
      if (!win.__sxMotionReady) root.classList.remove('sx-motion');
    }, 4000);
    return true;
  } catch {
    return false;
  }
}

export const MOTION_BOOT_SCRIPT = `(${bootMotion.toString()})(window);`;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function motionEnabled(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains(MOTION_CLASS) && !prefersReducedMotion();
}

// --- One shared IntersectionObserver for every reveal on the page. ---

type Callback = () => void;
let sharedObserver: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();

/**
 * Run `onEnter` once, the first time `el` scrolls into view. Returns a
 * cleanup. Falls back to calling `onEnter` immediately when
 * IntersectionObserver is unavailable (jsdom, very old browsers).
 */
export function observeOnce(el: Element, onEnter: Callback): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    onEnter();
    return () => {};
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      },
      // threshold 0 so elements taller than the viewport still trigger; the
      // bottom margin makes reveals start just inside the fold.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
  }
  callbacks.set(el, onEnter);
  sharedObserver.observe(el);
  return () => {
    callbacks.delete(el);
    sharedObserver?.unobserve(el);
  };
}

// --- Number roll-up parsing for stat figures like "1.5M+", "2,117", "25+". ---

export interface ParsedFigure {
  prefix: string;
  value: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
}

const FIGURE_RE = /^(\D*?)(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\D*)$/;

/** Parse a figure with exactly one number in it; ranges etc. return null. */
export function parseFigure(figure: string): ParsedFigure | null {
  const match = FIGURE_RE.exec(figure.trim());
  if (!match) return null;
  const [, prefix, raw, suffix] = match;
  const grouped = raw.includes(',');
  const clean = raw.replace(/,/g, '');
  const value = Number(clean);
  if (!Number.isFinite(value) || value <= 0) return null;
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0;
  return { prefix, value, decimals, grouped, suffix };
}

export function formatFigure(parsed: ParsedFigure, current: number): string {
  const n = current.toFixed(parsed.decimals);
  const body = parsed.grouped
    ? Number(n).toLocaleString('en-US', {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })
    : n;
  return `${parsed.prefix}${body}${parsed.suffix}`;
}

/** Expo-out, matching the reference's counter feel. */
export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
