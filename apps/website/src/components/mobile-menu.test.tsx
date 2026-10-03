import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileMenu } from './mobile-menu';

// Covers Part 0.2 "Mobile" (W8 restyle): full-screen accordion menu with
// the reference's nav items and the "Plan your centre" CTA fixed at the
// bottom, open/close and accordion toggling.
describe('MobileMenu', () => {
  it('opens the full-screen menu with the nav items and the fixed Plan your centre CTA', async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));

    const dialog = screen.getByRole('dialog', { name: /site menu/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Who we are' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'GCC Calculator' })).toHaveAttribute(
      'href',
      '/calculator',
    );
    for (const l of screen.getAllByRole('link', { name: 'GIFT City' }))
      expect(l).toHaveAttribute('href', '/gift-city');
    expect(screen.queryByRole('link', { name: 'Careers' })).toBeNull();
    expect(screen.getByRole('link', { name: /plan your centre/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('expands a group as an accordion to reveal its links', async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    const groupButton = screen.getByRole('button', { name: /^how we work$/i });
    expect(groupButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(groupButton);

    expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('link', { name: /strategy, location and business case/i }),
    ).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('dialog', { name: /site menu/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog', { name: /site menu/i })).not.toBeInTheDocument();
  });
});
