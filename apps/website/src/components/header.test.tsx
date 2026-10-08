import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './header';

// W8 — the reference's slim header: Who we are, What we offer (mega menu
// holding every How we work / Solutions / Engagement models route), Insights,
// GIFT City, GCC Calculator and the "Plan your centre" CTA. Covers the mega
// menu open/close behaviour from Part 0.2 / C6 (click, Escape, focus return).
describe('Header', () => {
  it('shows the reference nav items and the Plan your centre CTA', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(within(nav).getByRole('link', { name: 'Who we are' })).toHaveAttribute('href', '/about');
    expect(within(nav).getByRole('button', { name: /what we offer/i })).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: /insights/i })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'GCC Calculator' })).toHaveAttribute(
      'href',
      '/calculator',
    );
    expect(within(nav).getByRole('link', { name: 'GIFT City' })).toHaveAttribute(
      'href',
      '/gift-city',
    );
    expect(within(nav).getByRole('button', { name: /gift city sections/i })).toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'Careers' })).toBeNull();
    expect(within(nav).getByRole('link', { name: /plan your centre/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('opens the "What we offer" mega menu with every stage, solution and model', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole('button', { name: /what we offer/i }));

    const panel = screen.getByRole('menu', { name: /what we offer/i });
    for (const name of [/^plan\s*strategy/i, /^build\s*entity/i, /^run\s*day/i, /^grow\s*scale/i]) {
      expect(within(panel).getByRole('menuitem', { name })).toBeInTheDocument();
    }
    expect(within(panel).getAllByRole('menuitem', { name: /consulting/i }).length).toBeGreaterThan(
      0,
    );
    expect(
      within(panel).getByRole('menuitem', { name: /real estate and workspace/i }),
    ).toHaveAttribute('href', '/solutions/real-estate');
    expect(
      within(panel).getByRole('menuitem', { name: /build-operate-transfer/i }),
    ).toBeInTheDocument();
    expect(within(panel).getByRole('menuitem', { name: /employer of record/i })).toHaveAttribute(
      'href',
      '/models#eor',
    );
    expect(within(panel).getByText(/not sure where to start/i)).toBeInTheDocument();
    // GIFT City is a top-level link, no longer repeated inside this menu.
    expect(within(panel).queryByRole('menuitem', { name: /gift city/i })).not.toBeInTheDocument();
  });

  it('closes the menu on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const trigger = screen.getByRole('button', { name: /what we offer/i });
    await user.click(trigger);
    expect(screen.getByRole('menu', { name: /what we offer/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu', { name: /what we offer/i })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('lists each part of the GIFT City page under its dropdown', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole('button', { name: /gift city sections/i }));

    // The label itself links to the page, so the panel holds only its parts.
    expect(screen.queryByRole('menuitem', { name: /overview/i })).not.toBeInTheDocument();
    for (const [name, href] of [
      [/why gift city/i, '/gift-city/why'],
      [/ifsc set-up/i, '/gift-city/ifsc-set-up'],
      [/facilities/i, '/gift-city/facilities'],
      [/jobs/i, '/gift-city/jobs'],
      [/faq/i, '/gift-city/faq'],
    ] as const) {
      expect(screen.getByRole('menuitem', { name })).toHaveAttribute('href', href);
    }
  });

  it('keeps Articles and News under the Insights dropdown', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole('button', { name: /insights/i }));

    expect(screen.getByRole('menuitem', { name: /articles/i })).toHaveAttribute(
      'href',
      '/insights',
    );
    expect(screen.getByRole('menuitem', { name: /news/i })).toHaveAttribute('href', '/news');
  });
});
