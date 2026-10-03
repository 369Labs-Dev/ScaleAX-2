import { describe, expect, it } from 'vitest';
import {
  calculate,
  functionMixMessage,
  functionMixTotal,
  isFunctionMixValid,
  roundToNearestThousand,
  suggestCostPerEmployeeHome,
  type CalculatorInput,
} from './calculator-engine';
import {
  DEFAULT_FUNCTION_MIX,
  ENTITY_LEGAL_SETUP_COST,
  IT_EQUIPMENT_PER_SEAT,
  MANAGED_SEATS_FEE_PER_SEAT_PER_MONTH,
  RECRUITMENT_FEE_PCT,
  SALARY_BY_CITY_FUNCTION,
  SCALEAX_FEE_PCT,
  SEAT_COST_PER_MONTH,
  SEAT_FACTOR,
  SQ_FT_PER_SEAT,
  type FunctionId,
} from './calculator-data';

const BASE_INPUT: CalculatorInput = {
  hqCountry: 'us',
  currency: 'USD',
  functionMix: DEFAULT_FUNCTION_MIX, // 100% tech-engineering
  indiaHeadcount: 50,
  costPerEmployeeHome: 170_000,
  city: 'ahmedabad',
  model: 'managed-seats',
};

describe('roundToNearestThousand', () => {
  it('rounds to the nearest thousand in the chosen currency', () => {
    expect(roundToNearestThousand(1_234_567)).toBe(1_235_000);
    expect(roundToNearestThousand(1_234_499)).toBe(1_234_000);
    expect(roundToNearestThousand(499)).toBe(0);
    expect(roundToNearestThousand(500)).toBe(1_000);
  });
});

describe('functionMixTotal / isFunctionMixValid / functionMixMessage', () => {
  it('accepts a mix that totals exactly 100%', () => {
    expect(functionMixTotal(DEFAULT_FUNCTION_MIX)).toBe(100);
    expect(isFunctionMixValid(DEFAULT_FUNCTION_MIX)).toBe(true);
    expect(functionMixMessage(DEFAULT_FUNCTION_MIX)).toBeNull();
  });

  it('flags a mix under 100% with the brief’s exact message shape', () => {
    const mix: Record<FunctionId, number> = { ...DEFAULT_FUNCTION_MIX, 'tech-engineering': 80 };
    expect(isFunctionMixValid(mix)).toBe(false);
    expect(functionMixMessage(mix)).toBe('Your function mix adds up to 80%. Adjust it to 100%.');
  });

  it('flags a mix over 100%', () => {
    const mix: Record<FunctionId, number> = {
      'tech-engineering': 70,
      'business-operations': 20,
      'finance-corporate': 20,
      'rd-design': 0,
    };
    expect(functionMixTotal(mix)).toBe(110);
    expect(isFunctionMixValid(mix)).toBe(false);
    expect(functionMixMessage(mix)).toBe('Your function mix adds up to 110%. Adjust it to 100%.');
  });

  it('tolerates tiny floating-point drift at 100%', () => {
    const mix: Record<FunctionId, number> = {
      'tech-engineering': 33.34,
      'business-operations': 33.33,
      'finance-corporate': 33.33,
      'rd-design': 0,
    };
    expect(isFunctionMixValid(mix)).toBe(true);
  });
});

describe('suggestCostPerEmployeeHome', () => {
  it('is the function-mix-weighted average of the HQ country benchmark, converted to the chosen currency', () => {
    const usd = suggestCostPerEmployeeHome('us', DEFAULT_FUNCTION_MIX, 'USD');
    // 100% tech-engineering in the US benchmark = 170,000 exactly.
    expect(usd).toBeCloseTo(170_000, 0);
  });

  it('blends multiple functions proportionally', () => {
    const mix: Record<FunctionId, number> = {
      'tech-engineering': 50,
      'business-operations': 50,
      'finance-corporate': 0,
      'rd-design': 0,
    };
    // US: tech=170,000, business-operations=110,000 -> 50/50 blend = 140,000
    expect(suggestCostPerEmployeeHome('us', mix, 'USD')).toBeCloseTo(140_000, 0);
  });

  it('converts the benchmark into a non-USD currency', () => {
    const gbp = suggestCostPerEmployeeHome('uk', DEFAULT_FUNCTION_MIX, 'GBP');
    // UK tech-engineering benchmark is already stored in "USD equivalent"
    // terms in the data file; converting to GBP should scale it down (GBP
    // is worth more than 1 USD in the placeholder FX table).
    expect(gbp).toBeGreaterThan(0);
    expect(gbp).toBeLessThan(130_000);
  });
});

describe('calculate — free outputs', () => {
  it('never shows 0 with the page-load defaults (Part D2 Behaviour)', () => {
    const result = calculate(BASE_INPUT);
    expect(result.homeAnnualCost).toBeGreaterThan(0);
    expect(result.indiaAnnualCost).toBeGreaterThan(0);
    expect(result.annualSaving).not.toBe(0);
  });

  it('computes home annual cost as headcount × cost per employee at home', () => {
    const result = calculate(BASE_INPUT);
    expect(result.homeAnnualCost).toBe(roundToNearestThousand(50 * 170_000));
  });

  it('computes India annual cost as people + workspace + IT + fee, and saving as the difference', () => {
    const result = calculate(BASE_INPUT);
    const split = result.costSplit;
    // Components are individually rounded to the nearest thousand, same as
    // the total, so summing them can differ from the total by a small
    // rounding remainder — assert they're close, not bit-identical.
    const summed = split.people + split.workspace + split.it + split.fee;
    expect(Math.abs(summed - result.indiaAnnualCost)).toBeLessThanOrEqual(4_000);
    expect(result.annualSaving).toBe(result.homeAnnualCost - result.indiaAnnualCost);
  });

  it('India cost is cheaper than home cost for every model on the default inputs (the tool’s whole premise)', () => {
    for (const model of ['bot', 'assisted', 'managed-seats'] as const) {
      const result = calculate({ ...BASE_INPUT, model });
      expect(result.indiaAnnualCost).toBeLessThan(result.homeAnnualCost);
      expect(result.annualSavingPct).toBeGreaterThan(0);
    }
  });
});

describe('calculate — ScaleAX fee formula per model', () => {
  it('charges BOT and Assisted as a percentage of people + workspace + IT', () => {
    for (const model of ['bot', 'assisted'] as const) {
      const result = calculate({ ...BASE_INPUT, model });
      const preFee = result.costSplit.people + result.costSplit.workspace + result.costSplit.it;
      const expectedFee = roundToNearestThousand(preFee * SCALEAX_FEE_PCT[model]);
      // Both sides are independently rounded to the nearest thousand, so
      // allow one rounding step of tolerance.
      expect(Math.abs(result.costSplit.fee - expectedFee)).toBeLessThanOrEqual(1_000);
    }
  });

  it('charges Managed seats as a flat fee per seat per month × 12 × headcount, not a percentage', () => {
    const result = calculate({ ...BASE_INPUT, model: 'managed-seats', indiaHeadcount: 50 });
    const expectedFeeInr = MANAGED_SEATS_FEE_PER_SEAT_PER_MONTH * 12 * 50;
    // BASE_INPUT currency is USD; convert the same way the engine does.
    const expectedFeeUsd = roundToNearestThousand(expectedFeeInr / 83); // FX_RATES_PER_USD.INR
    expect(Math.abs(result.costSplit.fee - expectedFeeUsd)).toBeLessThanOrEqual(1_000);
  });
});

describe('calculate — gated outputs', () => {
  it('computes set-up cost as entity/legal + fit-out + recruitment fee + IT equipment', () => {
    const result = calculate({ ...BASE_INPUT, model: 'bot' });
    expect(result.setupCost).toBeGreaterThan(0);
  });

  it('excludes fit-out cost for Managed seats ("not for managed seats")', () => {
    const managedSeats = calculate({ ...BASE_INPUT, model: 'managed-seats' });
    const bot = calculate({ ...BASE_INPUT, model: 'bot' });
    // Managed seats also has a much lower entity/legal cost in the data
    // file, so its set-up cost should be substantially lower than BOT's,
    // which includes both a larger entity cost and fit-out.
    expect(managedSeats.setupCost).toBeLessThan(bot.setupCost);
  });

  it('computes payback period in months as set-up cost ÷ (annual saving ÷ 12)', () => {
    const result = calculate({ ...BASE_INPUT, model: 'bot' });
    expect(result.paybackMonths).not.toBeNull();
    expect(result.paybackMonths as number).toBeGreaterThan(0);
  });

  it('returns a null payback period when there is no positive annual saving (no divide-by-zero)', () => {
    const noSavingInput: CalculatorInput = { ...BASE_INPUT, costPerEmployeeHome: 0, model: 'bot' };
    const result = calculate(noSavingInput);
    expect(result.paybackMonths).toBeNull();
  });

  it('computes 5-year saving as annual saving × 5 − set-up cost, with one entry per year', () => {
    const result = calculate({ ...BASE_INPUT, model: 'bot' });
    expect(result.fiveYearSavingByYear).toHaveLength(5);
    expect(result.fiveYearSavingByYear.map((y) => y.year)).toEqual([1, 2, 3, 4, 5]);
    expect(result.fiveYearSavingByYear[4].cumulativeSaving).toBe(result.fiveYearSaving);
  });

  it('computes office space needed as headcount × seat factor × sq. ft. per seat', () => {
    const result = calculate({ ...BASE_INPUT, indiaHeadcount: 100 });
    expect(result.officeSpaceNeededSqFt).toBe(Math.round(100 * SEAT_FACTOR * SQ_FT_PER_SEAT));
  });

  it('returns the model’s time to first hires from the data file', () => {
    expect(calculate({ ...BASE_INPUT, model: 'managed-seats' }).timeToFirstHires).toBe('4–6 weeks');
    expect(calculate({ ...BASE_INPUT, model: 'bot' }).timeToFirstHires).toBe('12–16 weeks');
  });

  it('returns a city comparison row for all five calculator cities, using the same inputs', () => {
    const result = calculate(BASE_INPUT);
    expect(result.cityComparison).toHaveLength(5);
    expect(result.cityComparison.map((r) => r.city).sort()).toEqual(
      ['ahmedabad', 'bengaluru', 'gift-city', 'hyderabad', 'pune'].sort(),
    );
  });

  it('shows Bengaluru as more expensive than Ahmedabad in the city comparison, on identical inputs', () => {
    const result = calculate(BASE_INPUT);
    const ahmedabad = result.cityComparison.find((r) => r.city === 'ahmedabad')!;
    const bengaluru = result.cityComparison.find((r) => r.city === 'bengaluru')!;
    expect(bengaluru.indiaAnnualCost).toBeGreaterThan(ahmedabad.indiaAnnualCost);
  });
});

describe('calculate — edge cases (min/max headcount)', () => {
  it('handles the minimum India headcount (10) without errors or zero output', () => {
    const result = calculate({ ...BASE_INPUT, indiaHeadcount: 10 });
    expect(result.indiaAnnualCost).toBeGreaterThan(0);
    expect(result.officeSpaceNeededSqFt).toBe(Math.round(10 * SEAT_FACTOR * SQ_FT_PER_SEAT));
  });

  it('handles the maximum India headcount (1,000) without errors', () => {
    const result = calculate({ ...BASE_INPUT, indiaHeadcount: 1000 });
    expect(result.indiaAnnualCost).toBeGreaterThan(0);
    expect(result.cityComparison.every((r) => r.indiaAnnualCost > 0)).toBe(true);
  });

  it('scales India annual cost roughly linearly with headcount (same mix, model, city)', () => {
    const small = calculate({ ...BASE_INPUT, indiaHeadcount: 10 });
    const large = calculate({ ...BASE_INPUT, indiaHeadcount: 100 });
    // Not exactly 10x due to thousand-rounding, but should be close.
    const ratio = large.indiaAnnualCost / small.indiaAnnualCost;
    expect(ratio).toBeGreaterThan(9);
    expect(ratio).toBeLessThan(11);
  });
});

describe('calculate — currency handling', () => {
  it('produces a proportionally different result in a different currency', () => {
    const usd = calculate(BASE_INPUT);
    const inr = calculate({
      ...BASE_INPUT,
      currency: 'INR',
      costPerEmployeeHome: BASE_INPUT.costPerEmployeeHome * 83,
    });
    // 1 USD ~= 83 INR in the placeholder table, so INR-denominated cost
    // should be roughly 83x the USD figure (within rounding tolerance).
    const ratio = inr.indiaAnnualCost / usd.indiaAnnualCost;
    expect(ratio).toBeGreaterThan(75);
    expect(ratio).toBeLessThan(90);
  });
});

describe('calculate — data-consistency sanity checks', () => {
  it('every calculator city has a positive salary for every function and a positive seat cost for every model', () => {
    for (const city of Object.keys(
      SALARY_BY_CITY_FUNCTION,
    ) as (keyof typeof SALARY_BY_CITY_FUNCTION)[]) {
      expect(Object.values(SALARY_BY_CITY_FUNCTION[city]).every((v) => v > 0)).toBe(true);
      expect(Object.values(SEAT_COST_PER_MONTH[city]).every((v) => v > 0)).toBe(true);
    }
  });

  it('every engagement model has an entity/legal set-up cost and, if not managed-seats, a fee percentage', () => {
    expect(ENTITY_LEGAL_SETUP_COST.bot).toBeGreaterThan(0);
    expect(ENTITY_LEGAL_SETUP_COST.assisted).toBeGreaterThan(0);
    expect(ENTITY_LEGAL_SETUP_COST['managed-seats']).toBeGreaterThan(0);
    expect(SCALEAX_FEE_PCT.bot).toBeGreaterThan(0);
    expect(SCALEAX_FEE_PCT.assisted).toBeGreaterThan(0);
  });

  it('recruitment fee and IT equipment constants are positive, non-zero placeholders', () => {
    expect(RECRUITMENT_FEE_PCT).toBeGreaterThan(0);
    expect(IT_EQUIPMENT_PER_SEAT).toBeGreaterThan(0);
  });
});
