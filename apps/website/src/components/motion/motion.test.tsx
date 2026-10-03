import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from './reveal';
import { CountUp } from './count-up';
import { Marquee } from './marquee';
import { InNumbers } from '../in-numbers';
import { MOTION_CLASS, bootMotion } from '@/lib/motion';

// W7 — reduced motion must leave every piece of content visible: the
// hidden "before" states in globals.css only exist under html.sx-motion,
// which bootMotion refuses to set for prefers-reduced-motion; counters
// render their final value; the marquee's duplicate copy is hidden from
// assistive tech.
function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn((query: string) => ({
    matches: reduce && query.includes('reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

describe('motion primitives under prefers-reduced-motion', () => {
  beforeEach(() => {
    // An IntersectionObserver that never fires: the reduced-motion setting
    // alone must be what keeps content visible (nothing gets "revealed").
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    mockReducedMotion(true);
    bootMotion(window as unknown as Parameters<typeof bootMotion>[0]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove(MOTION_CLASS);
  });

  it('does not arm the motion gate, so no reveal can start hidden', () => {
    expect(document.documentElement.classList.contains(MOTION_CLASS)).toBe(false);
  });

  it('renders Reveal content visible, with no inline opacity or transform', () => {
    render(
      <Reveal stagger data-testid="grid">
        <p>First tile</p>
        <p>Second tile</p>
      </Reveal>,
    );
    const grid = screen.getByTestId('grid');
    expect(screen.getByText('First tile')).toBeVisible();
    expect(screen.getByText('Second tile')).toBeVisible();
    expect(grid.getAttribute('style')).toBeNull();
    expect(grid).toHaveAttribute('data-reveal-stagger');
  });

  it('renders stat figures at their final value (never 0, never mid-count)', () => {
    render(
      <InNumbers
        stats={[
          { figure: '2,117', label: 'Centres', line: 'In India' },
          { figure: '12–16 weeks', label: 'To first hires', line: 'Typical' },
        ]}
      />,
    );
    expect(screen.getByText('2,117')).toBeVisible();
    expect(screen.getByText('12–16 weeks')).toBeVisible();
  });

  it('keeps CountUp static at its final value', () => {
    render(<CountUp value="1.5M+ sq. ft. managed" />);
    expect(screen.getByText('1.5M+ sq. ft. managed')).toBeVisible();
  });

  it('exposes the marquee items once to assistive tech and offers a pause control', () => {
    render(
      <Marquee
        label="Partner firm numbers"
        items={[
          { key: 'a', node: <span>25+ years</span> },
          { key: 'b', node: <span>70+ clients</span> },
        ]}
      />,
    );
    const region = screen.getByRole('region', { name: 'Partner firm numbers' });
    const lists = region.querySelectorAll('ul');
    expect(lists).toHaveLength(2);
    expect(lists[1]).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button', { name: /pause scrolling/i })).toBeInTheDocument();
  });
});
