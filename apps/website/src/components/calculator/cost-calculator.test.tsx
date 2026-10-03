import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CostCalculator } from './cost-calculator';

// W9 — component-level coverage for the GCC Planner's interactive
// behaviour; the calculation logic is pinned to the reference in
// gcc-planner.test.ts.
describe('CostCalculator (GCC Planner)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the reference default result on load', () => {
    render(<CostCalculator />);
    expect(screen.getByText('Three-year saving vs. home market')).toBeInTheDocument();
    expect(screen.getByText('$41.8M')).toBeInTheDocument();
    expect(screen.getByText(/74% lower run-rate/)).toBeInTheDocument();
    expect(screen.getByText(/at steady state in\s+Hyderabad/)).toBeInTheDocument();
    expect(screen.getByText('10,500 sq ft')).toBeInTheDocument();
    expect(screen.getByText('52 weeks')).toBeInTheDocument();
  });

  it('offers 5 HQ markets, 11 currencies, a sector list, 3 models and 9 city chips', () => {
    render(<CostCalculator />);
    const hqGroup = screen.getByRole('group', { name: 'Headquarters market' });
    expect(within(hqGroup).getAllByRole('button')).toHaveLength(5);
    expect(within(screen.getByLabelText('Currency')).getAllByRole('option')).toHaveLength(11);
    expect(screen.getByLabelText('Sector')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Build-Operate-Transfer' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Assisted set-up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Managed seats' })).toBeInTheDocument();
    const cityGroup = screen.getByRole('group', { name: 'City in India' });
    // "Recommend for me" + the 8 cities.
    expect(within(cityGroup).getAllByRole('button')).toHaveLength(9);
    expect(within(cityGroup).getByRole('button', { name: 'GIFT City' })).toBeInTheDocument();
  });

  it('the HQ market sets the currency and converts the displayed result', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);

    await user.click(screen.getByRole('button', { name: 'United Kingdom' }));
    expect(screen.getByLabelText('Currency')).toHaveValue('GBP');
    // Money now renders with the pound symbol.
    expect(screen.getAllByText(/£/).length).toBeGreaterThan(0);

    await user.selectOptions(screen.getByLabelText('Currency'), 'EUR');
    expect(screen.getByLabelText('Currency')).toHaveValue('EUR');
  });

  it('prefills the home cost from the HQ benchmark and honours an edit', () => {
    render(<CostCalculator />);
    const field = screen.getByLabelText('Cost per employee at home');
    // US benchmark for the 50/20/20/10 mix.
    expect(field).toHaveValue(148100);

    fireEvent.change(field, { target: { value: '90000' } });
    expect(field).toHaveValue(90000);
    // A cheaper home team shrinks the saving: not the default $41.8M any more.
    expect(screen.queryByText('$41.8M')).not.toBeInTheDocument();
  });

  it('normalises the function-mix shares in the display', () => {
    render(<CostCalculator />);
    expect(screen.getByText('50%')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Digital & technology'), { target: { value: '100' } });
    // 100/20/20/10 → tech share 100/150 ≈ 67%.
    expect(screen.getByText('67%')).toBeInTheDocument();
    expect(screen.getByText('Shares normalise automatically.')).toBeInTheDocument();
  });

  it('recommends a city by default and honours an explicit pick with a note', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);

    expect(screen.getByRole('button', { name: 'Recommend for me' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await user.click(screen.getByRole('button', { name: 'Mumbai' }));
    expect(
      screen.getByText(/You chose Mumbai\. Costs above use it\. Hyderabad scores higher/),
    ).toBeInTheDocument();
    expect(screen.getByText(/at steady state in\s+Mumbai/)).toBeInTheDocument();
  });

  it('switching to Managed seats changes the timeline phases', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);

    expect(screen.getByText('Entity & registrations')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Managed seats' }));
    expect(screen.getByText('Managed seats ready')).toBeInTheDocument();
    expect(screen.queryByText('Entity & registrations')).not.toBeInTheDocument();
  });

  it('the ramp slider drives the full-strength weeks', () => {
    render(<CostCalculator />);
    fireEvent.change(screen.getByLabelText('Ramp months'), { target: { value: '24' } });
    // round(4.33 × 24) = 104.
    expect(screen.getByText('104 weeks')).toBeInTheDocument();
    expect(screen.getByText('Week 104')).toBeInTheDocument();
  });

  it('the plan form requires full name, work email and company', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);

    await user.click(screen.getByRole('button', { name: /send me the full plan/i }));

    expect(await screen.findByText('Full name is required.')).toBeInTheDocument();
    expect(screen.getByText('Work email is required.')).toBeInTheDocument();
    expect(screen.getByText('Company is required.')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/work email/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /send me the full plan/i }));
    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('a valid plan request posts the profile and shows the confirmation', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Managed seats' }));

    await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Work email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Company'), 'Example Co');
    await user.click(screen.getByRole('button', { name: /send me the full plan/i }));

    expect(await screen.findByText('Thank you — your plan is on its way.')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/calculator-lead', expect.any(Object));
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string) as {
      fullName: string;
      inputs: Record<string, unknown>;
    };
    expect(body.fullName).toBe('Ada Lovelace');
    expect(body.inputs.seats).toBe(150);
    expect(body.inputs.model).toBe('Managed seats');
    expect(String(body.inputs.summary)).toContain('150 seats over 12 months from United States');
  });
});
