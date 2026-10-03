import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  MOTION_BOOT_SCRIPT,
  MOTION_CLASS,
  bootMotion,
  formatFigure,
  parseFigure,
  type MotionWindow,
} from './motion';

function fakeWindow({
  reduce,
  io = true,
}: {
  reduce: boolean;
  io?: boolean;
}): MotionWindow & { timers: (() => void)[] } {
  const timers: (() => void)[] = [];
  return {
    document,
    matchMedia: ((query: string) => ({
      matches: reduce && query.includes('reduce'),
    })) as unknown as MotionWindow['matchMedia'],
    IntersectionObserver: io ? function IntersectionObserver() {} : undefined,
    setTimeout: (handler: () => void) => {
      timers.push(handler);
      return 0;
    },
    timers,
  };
}

afterEach(() => {
  document.documentElement.classList.remove(MOTION_CLASS);
});

describe('bootMotion (the <head> gate for every hidden "before" state)', () => {
  it('never enables motion when the visitor prefers reduced motion', () => {
    const win = fakeWindow({ reduce: true });
    expect(bootMotion(win)).toBe(false);
    expect(document.documentElement.classList.contains(MOTION_CLASS)).toBe(false);
  });

  it('never enables motion without IntersectionObserver (nothing could reveal it)', () => {
    const win = fakeWindow({ reduce: false, io: false });
    expect(bootMotion(win)).toBe(false);
    expect(document.documentElement.classList.contains(MOTION_CLASS)).toBe(false);
  });

  it('enables motion otherwise, and the failsafe removes it if the app never hydrates', () => {
    const win = fakeWindow({ reduce: false });
    expect(bootMotion(win)).toBe(true);
    expect(document.documentElement.classList.contains(MOTION_CLASS)).toBe(true);

    win.timers.forEach((run) => run());
    expect(document.documentElement.classList.contains(MOTION_CLASS)).toBe(false);
  });

  it('keeps motion on once the app reports it hydrated', () => {
    const win = fakeWindow({ reduce: false });
    bootMotion(win);
    win.__sxMotionReady = true;
    win.timers.forEach((run) => run());
    expect(document.documentElement.classList.contains(MOTION_CLASS)).toBe(true);
  });

  it('serialises into a self-contained inline script', () => {
    const matchMedia = vi.fn(() => ({ matches: true }));
    // Evaluate the exact string the layout inlines, against a stub window.
    new Function('window', MOTION_BOOT_SCRIPT)({
      document,
      matchMedia,
      IntersectionObserver: function IntersectionObserver() {},
      setTimeout: () => 0,
    });
    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    expect(document.documentElement.classList.contains(MOTION_CLASS)).toBe(false);
  });
});

describe('parseFigure / formatFigure (stat roll-ups)', () => {
  it.each([
    [
      '1.5M+ sq. ft. managed',
      { prefix: '', value: 1.5, decimals: 1, suffix: 'M+ sq. ft. managed' },
    ],
    [
      '12,000+ professionals',
      { prefix: '', value: 12000, grouped: true, suffix: '+ professionals' },
    ],
    ['25+ years', { value: 25, decimals: 0, suffix: '+ years' }],
    ['₹45L', { prefix: '₹', value: 45, suffix: 'L' }],
  ])('parses %s', (figure, expected) => {
    expect(parseFigure(figure)).toMatchObject(expected);
  });

  it.each(['12–16 weeks', '2 to 3 years', 'One contract', '0'])(
    'leaves %s static (not exactly one positive number)',
    (figure) => {
      expect(parseFigure(figure)).toBeNull();
    },
  );

  it('formats back to the exact original string at the target value', () => {
    for (const figure of ['1.5M+ sq. ft. managed', '12,000+ professionals', '2,117', '25+ years']) {
      const parsed = parseFigure(figure)!;
      expect(formatFigure(parsed, parsed.value)).toBe(figure);
    }
  });
});
