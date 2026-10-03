import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationFinder } from './location-finder';
import { MAX_ROLES_SELECTABLE } from '@/lib/location-data';

// Part D1 — component-level coverage for the interactive behaviour the
// calculation-logic unit tests (location-engine.test.ts) don't reach:
// weight validation gating the result, the role cap, and the report gate.
describe('LocationFinder', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a shortlist on load with the default (valid, 100%) weights', () => {
    render(<LocationFinder />);
    expect(screen.getByText(/total weight: 100%/i)).toBeInTheDocument();
    expect(screen.getByText('Best fit')).toBeInTheDocument();
    expect(screen.getByText('Strong alternative')).toBeInTheDocument();
    expect(screen.getByText('Worth considering')).toBeInTheDocument();
  });

  it('hides the shortlist and shows a prompt when the weights no longer total 100%', async () => {
    render(<LocationFinder />);

    const talentSlider = screen.getByRole('slider', { name: /talent weight/i });
    fireEvent.change(talentSlider, { target: { value: '0' } });

    expect(
      await screen.findByText(/set your priority weights to total 100% to see your shortlist/i),
    ).toBeInTheDocument();
  });

  it('caps role selection at the maximum and disables further checkboxes', async () => {
    const user = userEvent.setup();
    render(<LocationFinder />);

    // "Software engineering" is checked by default.
    await user.click(screen.getByLabelText('Data and AI'));
    await user.click(screen.getByLabelText('Chip design and verification'));

    const checked = screen
      .getAllByRole('checkbox')
      .filter((el) => (el as HTMLInputElement).checked);
    expect(checked).toHaveLength(MAX_ROLES_SELECTABLE);

    const nextBox = screen.getByLabelText('Finance and accounting') as HTMLInputElement;
    expect(nextBox.disabled).toBe(true);
  });

  it('validates the report-gate form and does not submit with missing fields', async () => {
    const user = userEvent.setup();
    render(<LocationFinder />);

    await user.click(screen.getByRole('button', { name: /email me the report/i }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits the report gate to /api/location-lead and unlocks on success', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    const user = userEvent.setup();
    render(<LocationFinder />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/work email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/company/i), 'Acme Inc');
    await user.click(screen.getByRole('button', { name: /email me the report/i }));

    expect(
      await screen.findByText(/we.ll email your full comparison shortly/i),
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/location-lead', expect.any(Object));
  });
});
