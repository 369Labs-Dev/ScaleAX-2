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
      ['1.5M+', 'sq. ft. managed'],
      ['10+', 'cities'],
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

  it('renders the network strip as a pausable marquee of enterprise logos', () => {
    render(<HomePage />);
    const strip = screen.getByRole('region', { name: 'Enterprise logos' });
    expect(within(strip).getAllByRole('img', { name: 'Bank of America' }).length).toBeGreaterThan(
      0,
    );
    expect(within(strip).getAllByRole('img', { name: 'Deloitte' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /pause scrolling/i })).toBeInTheDocument();
  });

  it('renders the dark claim band and the four-stat row', () => {
    render(<HomePage />);
    expect(
      screen.getByText('1,500 centres already run from India. Yours can be live in 90 days.'),
    ).toBeInTheDocument();
    for (const [figure, label] of [
      ['34+', 'Years of combined leadership experience'],
      ['0.8M+', 'Sq. ft. of workspace under management'],
      ['6+', 'Cities with an active presence'],
      ['140+', 'Enterprises served across the JV network'],
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

  it('renders "Why India" with its four figures', () => {
    render(<HomePage />);
    const section = sectionOf(/why india is the default answer/i);
    for (const figure of ['1,500+', '1.3M+', '90%', '63rd']) {
      expect(within(section).getByText(figure)).toBeInTheDocument();
    }
  });

  it('renders the three partner cards with their confirmed numbers and site links', () => {
    render(<HomePage />);
    const section = sectionOf(/three specialists/i);
    for (const name of ['Awfficacy Global', 'DevX', 'Savvy Group']) {
      expect(within(section).getByRole('heading', { name })).toBeInTheDocument();
      expect(within(section).getByRole('link', { name: `Visit ${name}` })).toHaveAttribute(
        'target',
        '_blank',
      );
    }
    expect(within(section).getByText('12,000+')).toBeInTheDocument();
    expect(within(section).getByText('5,000+')).toBeInTheDocument();
  });

  it('marks the testimonials as placeholders ("Client name") pending cleared quotes', () => {
    render(<HomePage />);
    const section = sectionOf(/what clients say once the centre is running/i);
    expect(section).toHaveAttribute('data-placeholder', 'testimonials');
    expect(within(section).getAllByText('Client name')).toHaveLength(3);
    expect(within(section).getByText(/sample quotes/i)).toBeInTheDocument();
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
    const band = screen.getByRole('heading', { name: "Don't just compete. Excel globally." })
      .parentElement as HTMLElement;
    expect(within(band).getByRole('link', { name: /plan your centre/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});
