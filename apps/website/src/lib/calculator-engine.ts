// Cost Calculator engine — Website Brief v3, Part D2 "Formulas" and
// "Outputs". Pure functions only (no React), so every rule can be
// unit-tested directly against the brief's wording.

import {
  CALCULATOR_CITIES,
  ENTITY_LEGAL_SETUP_COST,
  FIT_OUT_COST_PER_SQFT,
  FUNCTIONS,
  HOME_COST_BY_COUNTRY_FUNCTION,
  IT_COST_PER_SEAT_PER_YEAR,
  IT_EQUIPMENT_PER_SEAT,
  MANAGED_SEATS_FEE_PER_SEAT_PER_MONTH,
  RECRUITMENT_FEE_PCT,
  SALARY_BY_CITY_FUNCTION,
  SCALEAX_FEE_PCT,
  SEAT_COST_PER_MONTH,
  SEAT_FACTOR,
  SQ_FT_PER_SEAT,
  TIME_TO_FIRST_HIRES,
  convertCurrency,
  type CalculatorCityId,
  type CurrencyCode,
  type EngagementModelId,
  type FunctionId,
  type HqCountryId,
} from './calculator-data';

export interface CalculatorInput {
  hqCountry: HqCountryId;
  currency: CurrencyCode;
  functionMix: Record<FunctionId, number>; // percent, should total 100
  indiaHeadcount: number;
  /** Fully-loaded annual cost per employee at home, in `currency`. Pre-filled by suggestCostPerEmployeeHome, editable. */
  costPerEmployeeHome: number;
  city: CalculatorCityId;
  model: EngagementModelId;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Rounds to the nearest thousand in the chosen currency (Part D2 "Rounding"). */
export function roundToNearestThousand(n: number): number {
  return Math.round(n / 1000) * 1000;
}

export function functionMixTotal(mix: Record<FunctionId, number>): number {
  return round2(FUNCTIONS.reduce((sum, f) => sum + (mix[f.id] ?? 0), 0));
}

export function isFunctionMixValid(mix: Record<FunctionId, number>): boolean {
  return Math.abs(functionMixTotal(mix) - 100) < 0.05;
}

export function functionMixMessage(mix: Record<FunctionId, number>): string | null {
  if (isFunctionMixValid(mix)) return null;
  const total = Math.round(functionMixTotal(mix));
  return `Your function mix adds up to ${total}%. Adjust it to 100%.`;
}

/** Pre-fills "Cost per employee at home" from the HQ country + function mix benchmark. */
export function suggestCostPerEmployeeHome(
  hqCountry: HqCountryId,
  functionMix: Record<FunctionId, number>,
  currency: CurrencyCode,
): number {
  const benchmark = HOME_COST_BY_COUNTRY_FUNCTION[hqCountry];
  const usdValue = FUNCTIONS.reduce(
    (sum, f) => sum + ((functionMix[f.id] ?? 0) / 100) * benchmark[f.id],
    0,
  );
  return convertCurrency(usdValue, 'USD', currency);
}

interface IndiaCostBreakdownInr {
  people: number;
  workspace: number;
  it: number;
  fee: number;
  total: number;
}

function officeAreaSqFt(headcount: number): number {
  return headcount * SEAT_FACTOR * SQ_FT_PER_SEAT;
}

/** All India cost components, in INR (converted to the target currency by the caller). */
function indiaCostBreakdownInr(
  headcount: number,
  functionMix: Record<FunctionId, number>,
  city: CalculatorCityId,
  model: EngagementModelId,
): IndiaCostBreakdownInr {
  const salaryTable = SALARY_BY_CITY_FUNCTION[city];
  const people =
    headcount *
    FUNCTIONS.reduce((sum, f) => sum + ((functionMix[f.id] ?? 0) / 100) * salaryTable[f.id], 0);

  const workspace = headcount * SEAT_FACTOR * SEAT_COST_PER_MONTH[city][model] * 12;

  const it = headcount * IT_COST_PER_SEAT_PER_YEAR;

  const fee =
    model === 'managed-seats'
      ? MANAGED_SEATS_FEE_PER_SEAT_PER_MONTH * 12 * headcount
      : SCALEAX_FEE_PCT[model] * (people + workspace + it);

  return { people, workspace, it, fee, total: people + workspace + it + fee };
}

/** One-time set-up cost, in INR (Part D2 "Set-up cost" formula). */
function setupCostInr(
  headcount: number,
  firstYearPeopleCostInr: number,
  city: CalculatorCityId,
  model: EngagementModelId,
): number {
  const entityLegal = ENTITY_LEGAL_SETUP_COST[model];
  const fitOut =
    model === 'managed-seats' ? 0 : FIT_OUT_COST_PER_SQFT[city] * officeAreaSqFt(headcount);
  const recruitment = RECRUITMENT_FEE_PCT * firstYearPeopleCostInr;
  const itEquipment = IT_EQUIPMENT_PER_SEAT * headcount;
  return entityLegal + fitOut + recruitment + itEquipment;
}

export interface CostSplit {
  people: number;
  workspace: number;
  it: number;
  fee: number;
}

export interface YearlySaving {
  year: number;
  cumulativeSaving: number;
}

export interface CityComparisonRow {
  city: CalculatorCityId;
  cityName: string;
  indiaAnnualCost: number;
  annualSaving: number;
}

export interface CalculatorResult {
  currency: CurrencyCode;
  // Free outputs
  homeAnnualCost: number;
  indiaAnnualCost: number;
  annualSaving: number;
  annualSavingPct: number;
  // Gated outputs (shown after email)
  setupCost: number;
  paybackMonths: number | null;
  fiveYearSaving: number;
  fiveYearSavingByYear: YearlySaving[];
  officeSpaceNeededSqFt: number;
  timeToFirstHires: string;
  cityComparison: CityComparisonRow[];
  costSplit: CostSplit;
}

/**
 * Computes every D2 output for the given inputs. Defaults always produce a
 * full result (Part D2 "Behaviour": "Defaults give a full result on page
 * load; never show '0'."); callers should still check isFunctionMixValid
 * first, since an invalid mix should grey out the result in the UI rather
 * than be silently computed here.
 */
export function calculate(input: CalculatorInput): CalculatorResult {
  // hqCountry only affects the *suggested* costPerEmployeeHome (see
  // suggestCostPerEmployeeHome) — once that field has a value, the
  // calculation itself only needs the value, not the country.
  const { currency, functionMix, indiaHeadcount, costPerEmployeeHome, city, model } = input;

  const breakdownInr = indiaCostBreakdownInr(indiaHeadcount, functionMix, city, model);
  const indiaAnnualCostRaw = convertCurrency(breakdownInr.total, 'INR', currency);
  const homeAnnualCostRaw = indiaHeadcount * costPerEmployeeHome;

  const indiaAnnualCost = roundToNearestThousand(indiaAnnualCostRaw);
  const homeAnnualCost = roundToNearestThousand(homeAnnualCostRaw);
  const annualSavingRaw = homeAnnualCostRaw - indiaAnnualCostRaw;
  const annualSaving = roundToNearestThousand(annualSavingRaw);
  const annualSavingPct =
    homeAnnualCostRaw > 0 ? round2((annualSavingRaw / homeAnnualCostRaw) * 100) : 0;

  const setupCostInrValue = setupCostInr(indiaHeadcount, breakdownInr.people, city, model);
  const setupCostRaw = convertCurrency(setupCostInrValue, 'INR', currency);
  const setupCost = roundToNearestThousand(setupCostRaw);

  const monthlySaving = annualSavingRaw / 12;
  const paybackMonths = monthlySaving > 0 ? round2(setupCostRaw / monthlySaving) : null;

  const fiveYearSavingRaw = annualSavingRaw * 5 - setupCostRaw;
  const fiveYearSaving = roundToNearestThousand(fiveYearSavingRaw);
  const fiveYearSavingByYear: YearlySaving[] = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const cumulative = annualSavingRaw * year - setupCostRaw;
    return { year, cumulativeSaving: roundToNearestThousand(cumulative) };
  });

  const officeSpaceNeededSqFt = Math.round(officeAreaSqFt(indiaHeadcount));

  const cityComparison: CityComparisonRow[] = CALCULATOR_CITIES.map((c) => {
    const cInr = indiaCostBreakdownInr(indiaHeadcount, functionMix, c.id, model);
    const cIndiaAnnual = convertCurrency(cInr.total, 'INR', currency);
    return {
      city: c.id,
      cityName: c.name,
      indiaAnnualCost: roundToNearestThousand(cIndiaAnnual),
      annualSaving: roundToNearestThousand(homeAnnualCostRaw - cIndiaAnnual),
    };
  });

  const costSplit: CostSplit = {
    people: roundToNearestThousand(convertCurrency(breakdownInr.people, 'INR', currency)),
    workspace: roundToNearestThousand(convertCurrency(breakdownInr.workspace, 'INR', currency)),
    it: roundToNearestThousand(convertCurrency(breakdownInr.it, 'INR', currency)),
    fee: roundToNearestThousand(convertCurrency(breakdownInr.fee, 'INR', currency)),
  };

  return {
    currency,
    homeAnnualCost,
    indiaAnnualCost,
    annualSaving,
    annualSavingPct,
    setupCost,
    paybackMonths,
    fiveYearSaving,
    fiveYearSavingByYear,
    officeSpaceNeededSqFt,
    timeToFirstHires: TIME_TO_FIRST_HIRES[model],
    cityComparison,
    costSplit,
  };
}
