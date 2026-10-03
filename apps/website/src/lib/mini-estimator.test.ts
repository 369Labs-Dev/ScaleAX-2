import { describe, expect, it } from 'vitest';
import { calculate, suggestCostPerEmployeeHome } from './calculator-engine';
import {
  MINI_DEFAULTS,
  MINI_FUNCTIONS,
  MINI_MODELS,
  MINI_REGIONS,
  MINI_TEAM_RANGE,
  clampTeamSize,
  estimateMini,
  formatSqFt,
  formatUsdCompact,
  toCalculatorInput,
} from './mini-estimator';

// W8 — the homepage mini-estimator must be a pure view over the Part D2
// engine: same inputs, same numbers as /calculator, no math of its own.
describe('mini-estimator adapter', () => {
  it('maps the defaults (US, 80 people, engineering, BOT) to a full engine input in USD', () => {
    const input = toCalculatorInput(MINI_DEFAULTS);
    expect(input).toMatchObject({
      hqCountry: 'us',
      currency: 'USD',
      indiaHeadcount: 80,
      city: 'ahmedabad',
      model: 'bot',
    });
    expect(input.functionMix).toEqual({
      'tech-engineering': 100,
      'business-operations': 0,
      'finance-corporate': 0,
      'rd-design': 0,
    });
    expect(input.costPerEmployeeHome).toBe(
      suggestCostPerEmployeeHome('us', input.functionMix, 'USD'),
    );
  });

  it('returns exactly the engine outputs for every control combination', () => {
    for (const region of MINI_REGIONS) {
      for (const fn of MINI_FUNCTIONS) {
        for (const model of MINI_MODELS) {
          const state = {
            region: region.id,
            teamSize: 120,
            primaryFunction: fn.id,
            model: model.id,
          };
          const engine = calculate(toCalculatorInput(state));
          const mini = estimateMini(state);
          expect(mini.annualSaving).toBe(engine.annualSaving);
          expect(mini.annualSavingPct).toBe(engine.annualSavingPct);
          expect(mini.indiaAnnualCost).toBe(engine.indiaAnnualCost);
          expect(mini.homeAnnualCost).toBe(engine.homeAnnualCost);
          expect(mini.workspaceSqFt).toBe(engine.officeSpaceNeededSqFt);
          expect(mini.timeToFirstHires).toBe(engine.timeToFirstHires);
          expect(mini.comparedWith).toBe(region.comparedWith);
        }
      }
    }
  });

  it('maps each primary-function chip onto one engine function at 100%', () => {
    const expected = {
      engineering: 'tech-engineering',
      finance: 'finance-corporate',
      operations: 'business-operations',
    } as const;
    for (const fn of MINI_FUNCTIONS) {
      const mix = toCalculatorInput({ ...MINI_DEFAULTS, primaryFunction: fn.id }).functionMix;
      expect(mix[expected[fn.id]]).toBe(100);
      expect(Object.values(mix).reduce((a, b) => a + b, 0)).toBe(100);
    }
  });

  it('benchmarks Western Europe against the German home-cost row', () => {
    const input = toCalculatorInput({ ...MINI_DEFAULTS, region: 'western-europe' });
    expect(input.hqCountry).toBe('germany');
    expect(estimateMini({ ...MINI_DEFAULTS, region: 'western-europe' }).comparedWith).toBe(
      'Western Europe',
    );
  });

  it('offers the engine models only (no EOR benchmarks exist yet)', () => {
    expect(MINI_MODELS.map((m) => m.id)).toEqual(['bot', 'assisted', 'managed-seats']);
  });

  it('shows a real saving for the defaults, never zero', () => {
    const est = estimateMini(MINI_DEFAULTS);
    expect(est.annualSaving).toBeGreaterThan(0);
    expect(est.annualSavingPct).toBeGreaterThan(0);
    expect(est.annualSavingPct).toBeLessThan(100);
    expect(est.homeAnnualCost).toBeGreaterThan(est.indiaAnnualCost);
  });

  it('clamps team size to the slider range', () => {
    expect(clampTeamSize(2)).toBe(MINI_TEAM_RANGE.min);
    expect(clampTeamSize(9_999)).toBe(MINI_TEAM_RANGE.max);
    expect(clampTeamSize(80.4)).toBe(80);
    expect(clampTeamSize(Number.NaN)).toBe(MINI_DEFAULTS.teamSize);
  });

  it('formats compact USD and square footage for the result card', () => {
    expect(formatUsdCompact(10_120_000)).toBe('$10.1M');
    expect(formatUsdCompact(850_000)).toBe('$850K');
    expect(formatUsdCompact(4_000)).toBe('$4,000');
    expect(formatUsdCompact(-1_500_000)).toBe('-$1.5M');
    expect(formatSqFt(9200)).toBe('9,200 sq ft');
  });
});
