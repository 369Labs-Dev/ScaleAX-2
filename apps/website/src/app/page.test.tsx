import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './page';
import { estimateMini, formatUsdCompact, MINI_DEFAULTS } from '@/lib/mini-estimator';

// W8 — the homepage rebuilt in the approved reference's section order and
// copy: hero + proof tiles, partner strip, claim band, stat row, six pillars,
// embedded mini-estimator on the D2 engine, four models (incl. Employer of
// Record), why India, three specialists, placeholder testimonials, insights
// and the closing band.
function sectionOf(headingName: RegExp) {
  return screen.getByRole('heading', { name: headingName }).closest('section') as HTMLElement;
}

describe('HomePage', () => {
  it('renders the hero, both CTAs and the three proof tiles', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Your Global Capability Centre in India, operational in 30 to 90 days.',
      }),
    ).toBeInTheDocument();
    const hero = sectionOf(/your global capability centre in india/i);
    expect(within(hero).getByRole('link', { name: /plan your centre/i })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(within(hero).getByRole('link', { name: 'Estimate your cost' })).toHaveAttribute(
      'href',
      '/calculator',
    );
    for (const [figure, label] of [
      ['60M+', 'Workspace Ecosystem'],
      ['14+', 'Cities'],
      ['30 to 90', 'days to operational'],
    ]) {
      expect(within(hero).getByText(figure)).toBeInTheDocument();
      expect(within(hero).getByText(label)).toBeInTheDocument();
    }
  });

  it('has exactly one "Estimate your cost" link (the e2e journey clicks it)', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('link', { name: 'Estimate your cost' })).toHaveLength(1);
  });

  it("shows each partner's enterprise logos as a pausable marquee under that partner", () => {
    render(<HomePage />);
    const savvy = screen.getByRole('region', { name: 'Enterprises served by Savvy Group' });
    expect(within(savvy).getAllByRole('img', { name: 'Bank of America' }).length).toBeGreaterThan(
      0,
    );
    const devx = screen.getByRole('region', { name: 'Enterprises served by DevX' });
    expect(within(devx).getAllByRole('img', { name: 'Savills' }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('region', { name: 'Enterprises served by Awfficacy Global' }),
    ).toBeInTheDocument();
    // Dev IT has no client logos yet, so it gets no strip.
    expect(
      screen.queryByRole('region', { name: 'Enterprises served by Dev IT' }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /pause scrolling/i })).toHaveLength(3);
  });

  it('renders the dark claim band and the four-stat row', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Over 2,500 centres already run from India. Yours can be live in 90 days.'),
    ).toBeInTheDocument();
    for (const [figure, label] of [
      ['34+', 'Years of combined leadership experience'],
      ['60M+', 'Sq. ft. of workspace under management'],
      ['14+', 'Cities with an active presence'],
      ['350+', 'Enterprises served across the JV network'],
    ]) {
      const row = screen.getByText(label).parentElement as HTMLElement;
      expect(within(row).getByText(figure)).toBeInTheDocument();
    }
  });

  it('renders the six pillars as a lifecycle with every page link visible, no click needed', () => {
    render(<HomePage />);
    const section = sectionOf(/every function a centre needs, delivered by one team/i);
    for (const title of [
      'Advisory & Location Strategy',
      'Enablement & Compliance',
      'Talent',
      'Workspace & IT',
      'Delivery Incubation',
      'Transformation',
    ]) {
      expect(within(section).getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
    }
    expect(
      within(section).getByRole('link', { name: /real estate and workspace/i }),
    ).toHaveAttribute('href', '/solutions/real-estate');
    expect(within(section).getByRole('link', { name: /^gift city/i })).toHaveAttribute(
      'href',
      '/gift-city',
    );
    expect(
      within(section).getByRole('link', { name: /explore what we offer/i }),
    ).toBeInTheDocument();
  });

  it('embeds the mini-estimator at #calculator with a live result from the D2 engine', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const section = document.getElementById('calculator') as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole('heading', { name: 'What would your centre cost in India?' }),
    ).toBeInTheDocument();

    for (const group of ['Where is the team today?', 'Primary function', 'Engagement model']) {
      expect(within(section).getByRole('group', { name: group })).toBeInTheDocument();
    }
    expect(within(section).getByRole('slider', { name: /team size/i })).toHaveValue('80');

    // Default result equals the engine's result for the defaults, in USD.
    const defaults = estimateMini(MINI_DEFAULTS);
    expect(within(section).getByText(formatUsdCompact(defaults.annualSaving))).toBeInTheDocument();
    expect(
      within(section).getByText(/lower than running the same team in the US/),
    ).toBeInTheDocument();

    await user.click(within(section).getByRole('button', { name: 'United Kingdom' }));
    expect(within(section).getByRole('button', { name: 'United Kingdom' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    const uk = estimateMini({ ...MINI_DEFAULTS, region: 'uk' });
    expect(within(section).getByText(formatUsdCompact(uk.annualSaving))).toBeInTheDocument();
    expect(
      within(section).getByText(/lower than running the same team in the UK/),
    ).toBeInTheDocument();

    expect(
      within(section).getByRole('link', { name: /open the full calculator/i }),
    ).toHaveAttribute('href', '/calculator');
    expect(within(section).getByText(/indicative only/i)).toBeInTheDocument();
  });

  it('renders four engagement model cards including Employer of Record', () => {
    render(<HomePage />);
    const section = sectionOf(/four ways to work with us/i);
    const cards = within(section).getAllByRole('listitem');
    expect(cards).toHaveLength(4);
    expect(
      within(section).getByRole('heading', { name: 'Employer of Record' }),
    ).toBeInTheDocument();
    expect(within(section).getByRole('link', { name: /employer of record/i })).toHaveAttribute(
      'href',
      '/models#eor',
    );
    for (const name of ['Assisted set-up', 'Build-Operate-Transfer', 'Managed seats']) {
      expect(within(section).getByRole('heading', { name })).toBeInTheDocument();
    }
    expect(within(section).getByRole('link', { name: /compare the models/i })).toHaveAttribute(
      'href',
      '/models',
    );
  });

  it('no longer renders the "Why India" section', () => {
    render(<HomePage />);
    expect(screen.queryByRole('heading', { name: /why india/i })).not.toBeInTheDocument();
  });

  it('renders the four partner cards with their confirmed numbers and site links', () => {
    render(<HomePage />);
    const section = sectionOf(/three specialists/i);
    for (const name of ['Awfficacy Global', 'DevX', 'Dev IT', 'Savvy Group']) {
      expect(within(section).getByRole('heading', { name })).toBeInTheDocument();
      expect(within(section).getByRole('link', { name: `Visit ${name}` })).toHaveAttribute(
        'target',
        '_blank',
      );
    }
    expect(within(section).getByText('25k+')).toBeInTheDocument();
    expect(within(section).getByText('5,000+')).toBeInTheDocument();
  });

  it('keeps the placeholder testimonials off the public page for now', () => {
    render(<HomePage />);
    expect(
      screen.queryByRole('heading', { name: /what clients say once the centre is running/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Client name')).not.toBeInTheDocument();
  });

  it('lists the feature and three teaser insights, each with an image slot', () => {
    render(<HomePage />);
    const section = sectionOf(/thinking on talent, workspace and scale/i);
    expect(within(section).getAllByRole('link', { name: /read insight/i })).toHaveLength(4);
    // Each card has an image slot named after its article; until that file
    // exists in public/images the slot renders a labelled placeholder.
    expect(section.querySelectorAll('[data-image-slot^="insight-"]')).toHaveLength(4);
  });

  it('closes with the dark CTA band', () => {
    render(<HomePage />);
    const band = screen.getByRole('heading', { name: 'Tell us what you want to run from India.' })
      .parentElement as HTMLElement;
    expect(within(band).getByRole('link', { name: /plan your centre/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});
