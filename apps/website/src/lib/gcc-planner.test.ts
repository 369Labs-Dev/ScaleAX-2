import { describe, expect, it } from 'vitest';
import { CITIES, DEFAULT_STATE, MODELS, fmt, plan, suggestHomeCostUsd } from './gcc-planner';

// The engine is the reference design's /gcc-planner with ScaleAX
// adaptations. The default profile (US HQ at the benchmark home cost, 150
// seats, 12-month ramp, 50/20/20/10 mix, Balanced, BOT, recommended city)
// still reproduces the reference page's own server-rendered outputs, which
// pins the port; the ScaleAX changes (models, GIFT City, editable home
// cost) are covered separately below.
describe('plan — reference vectors', () => {
  const m = plan(DEFAULT_STATE);

  it('recommends the reference city ranking with the same scores', () => {
    expect(m.cities.map((c) => `${c.name} ${c.score.toFixed(2)}`)).toEqual([
      'Hyderabad 4.08',
      'Bengaluru 4.07',
      'Ahmedabad 3.99',
    ]);
    expect(m.city.name).toBe('Hyderabad');
  });

  it('reproduces the reference three-year cost curve', () => {
    expect(m.years.map((y) => `${fmt(y.india)} vs ${fmt(y.home)}`)).toEqual([
      '$3.2M vs $12.0M',
      '$5.7M vs $22.2M',
      '$5.7M vs $22.2M',
    ]);
    expect(fmt(m.cum)).toBe('$41.8M');
  });

  it('reproduces the reference steady-state figures', () => {
    expect(fmt(m.steadyIndia)).toBe('$5.7M');
    expect(fmt(m.steadyHome)).toBe('$22.2M');
    expect(Math.round(m.pct * 100)).toBe(74);
    expect(m.sqft).toBe(10_500);
    expect(m.weeks).toBe(52);
  });

  it('lays out the reference launch timeline for an entity model', () => {
    expect(m.timeline.map((t) => [t.label, ...t.w])).toEqual([
      ['Kick-off & design', 0, 3],
      ['Entity & registrations', 1, 8],
      ['Office in Hyderabad', 3, 11],
      ['Leadership hires', 2, 12],
      ['First 25% of team', 8, 14],
      ['Steady state', 36, 52],
    ]);
  });
});

describe('plan — ScaleAX adaptations', () => {
  it('offers exactly the three ScaleAX models and the eight cities incl. GIFT City', () => {
    expect(Object.values(MODELS).map((m) => m.name)).toEqual([
      'Build-Operate-Transfer',
      'Assisted set-up',
      'Managed seats',
    ]);
    expect(CITIES.map((c) => c.name)).toEqual([
      'Ahmedabad',
      'GIFT City',
      'Bengaluru',
      'Hyderabad',
      'Chennai',
      'Gurugram',
      'Pune',
      'Mumbai',
    ]);
  });

  it('the home side runs on the editable benchmark', () => {
    const cheapHome = plan({ ...DEFAULT_STATE, homeCostUsd: 50_000 });
    expect(cheapHome.steadyHome).toBe(50_000 * 150);
    expect(cheapHome.cum).toBeLessThan(plan(DEFAULT_STATE).cum);
  });

  it('suggestHomeCostUsd blends the HQ table by the mix', () => {
    // US, 50/20/20/10: 175k*.5 + 88k*.2 + 120k*.2 + 190k*.1 = 148,100.
    expect(suggestHomeCostUsd('United States', DEFAULT_STATE.mix)).toBeCloseTo(148_100, 0);
  });

  it('GIFT City is costed on its own multipliers when chosen', () => {
    const m = plan({ ...DEFAULT_STATE, city: 'GIFT City' });
    expect(m.city.name).toBe('GIFT City');
    // Cheaper people (0.88) and rent than the Hyderabad recommendation.
    expect(m.steadyIndia).toBeLessThan(plan(DEFAULT_STATE).steadyIndia);
  });

  it('Managed seats skips the entity phase, has the smallest set-up and the fastest start', () => {
    const m = plan({ ...DEFAULT_STATE, model: 'managed' });
    expect(m.years[0].setup).toBe(40_000);
    expect(m.timeline.map((t) => t.label)).toContain('Managed seats ready');
    expect(m.timeline.map((t) => t.label)).not.toContain('Entity & registrations');
  });

  it('Assisted set-up stops charging the fee after month 12', () => {
    const m = plan({ ...DEFAULT_STATE, model: 'assisted' });
    expect(m.years[0].fee).toBeGreaterThan(0);
    expect(m.years[1].fee).toBe(0);
    expect(m.steadyIndia).toBeLessThan(plan(DEFAULT_STATE).steadyIndia);
  });

  it('charges the set-up cost in year one only', () => {
    const m = plan(DEFAULT_STATE);
    expect(m.years[0].setup).toBe(MODELS.bot.setup);
    expect(m.years[1].setup).toBe(0);
  });

  it('normalises the function mix and survives an all-zero mix', () => {
    const skewed = plan({ ...DEFAULT_STATE, mix: { tech: 100, ops: 40, ent: 40, rnd: 20 } });
    expect(skewed.steadyIndia).toBeCloseTo(plan(DEFAULT_STATE).steadyIndia, 6);
    const zero = plan({ ...DEFAULT_STATE, mix: { tech: 0, ops: 0, ent: 0, rnd: 0 } });
    expect(Number.isFinite(zero.cum)).toBe(true);
  });

  it('uses the chosen city for costs even when another scores higher', () => {
    const m = plan({ ...DEFAULT_STATE, city: 'Mumbai' });
    expect(m.city.name).toBe('Mumbai');
    expect(m.cities[0].name).toBe('Hyderabad');
    expect(m.steadyIndia).toBeGreaterThan(plan(DEFAULT_STATE).steadyIndia);
  });

  it('formats in the reporting currency', () => {
    expect(fmt(41_800_000)).toBe('$41.8M');
    expect(fmt(950_000)).toBe('$950k');
    expect(fmt(41_800_000, 'GBP', '£')).toBe('£33.0M');
    // JPY crosses into billions.
    expect(fmt(41_800_000, 'JPY', '¥')).toBe('¥6.4B');
  });
});
