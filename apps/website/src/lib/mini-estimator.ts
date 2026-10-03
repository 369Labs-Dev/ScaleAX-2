// W8 — homepage mini-estimator ("What would your centre cost in India?").
//
// A THIN ADAPTER over the tested Part D2 engine (calculator-engine.ts): it
// only translates the reference design's four simple controls into a full
// CalculatorInput and picks the outputs the result card shows. No cost math
// lives here — every number comes from calculate() and
// suggestCostPerEmployeeHome(), so the homepage and /calculator can never
// disagree for the same inputs.

import {
  ENGAGEMENT_MODELS,
  FUNCTIONS,
  type CalculatorCityId,
  type EngagementModelId,
  type FunctionId,
  type HqCountryId,
} from './calculator-data';
import { calculate, suggestCostPerEmployeeHome, type CalculatorInput } from './calculator-engine';

export type MiniRegionId = 'us' | 'uk' | 'western-europe' | 'australia';

export interface MiniRegion {
  id: MiniRegionId;
  label: string;
  /** How the result sentence names it: "lower than running the same team in {comparedWith}". */
  comparedWith: string;
  /** The engine HQ country whose home-cost benchmark stands in for the region. */
  hqCountry: HqCountryId;
}

// Reference toggle: United States / United Kingdom / Western Europe /
// Australia. "Western Europe" has no single benchmark row in Appendix 1, so
// it uses Germany's — the region's largest economy and a mid-range row among
// the engine's Western European benchmarks (NL/SE/DK/NO/FI sit within ±10%).
export const MINI_REGIONS: MiniRegion[] = [
  { id: 'us', label: 'United States', comparedWith: 'the US', hqCountry: 'us' },
  { id: 'uk', label: 'United Kingdom', comparedWith: 'the UK', hqCountry: 'uk' },
  {
    id: 'western-europe',
    label: 'Western Europe',
    comparedWith: 'Western Europe',
    hqCountry: 'germany',
  },
  { id: 'australia', label: 'Australia', comparedWith: 'Australia', hqCountry: 'australia' },
];

export type MiniFunctionId = 'engineering' | 'finance' | 'operations';

export interface MiniFunction {
  id: MiniFunctionId;
  label: string;
  /** The engine function the chip maps onto (100% of the mix). */
  functionId: FunctionId;
}

// Reference chips, each mapped to the closest D2 function column.
export const MINI_FUNCTIONS: MiniFunction[] = [
  { id: 'engineering', label: 'Engineering & product', functionId: 'tech-engineering' },
  {
    id: 'finance',
    label: 'Finance, analytics & shared services',
    functionId: 'finance-corporate',
  },
  { id: 'operations', label: 'Customer & business operations', functionId: 'business-operations' },
];

/** The engine's own models (EOR has no Appendix 1 benchmarks, so it is not offered here). */
export const MINI_MODELS: { id: EngagementModelId; label: string }[] = ENGAGEMENT_MODELS;

export const MINI_TEAM_RANGE = { min: 10, max: 500 } as const;

/** Every estimate is for the city ScaleAX sets up in first. */
export const MINI_CITY: CalculatorCityId = 'ahmedabad';
export const MINI_CURRENCY = 'USD' as const;

export interface MiniEstimatorState {
  region: MiniRegionId;
  teamSize: number;
  primaryFunction: MiniFunctionId;
  model: EngagementModelId;
}

// Reference defaults: United States, 80 people, Engineering & product, BOT.
export const MINI_DEFAULTS: MiniEstimatorState = {
  region: 'us',
  teamSize: 80,
  primaryFunction: 'engineering',
  model: 'bot',
};

export function clampTeamSize(n: number): number {
  if (!Number.isFinite(n)) return MINI_DEFAULTS.teamSize;
  return Math.min(MINI_TEAM_RANGE.max, Math.max(MINI_TEAM_RANGE.min, Math.round(n)));
}

function regionOf(id: MiniRegionId): MiniRegion {
  return MINI_REGIONS.find((r) => r.id === id) ?? MINI_REGIONS[0];
}

/** Translates the four homepage controls into a complete engine input. */
export function toCalculatorInput(state: MiniEstimatorState): CalculatorInput {
  const fn = MINI_FUNCTIONS.find((f) => f.id === state.primaryFunction) ?? MINI_FUNCTIONS[0];
  const functionMix = Object.fromEntries(
    FUNCTIONS.map((f) => [f.id, f.id === fn.functionId ? 100 : 0]),
  ) as Record<FunctionId, number>;
  const { hqCountry } = regionOf(state.region);

  return {
    hqCountry,
    currency: MINI_CURRENCY,
    functionMix,
    indiaHeadcount: clampTeamSize(state.teamSize),
    costPerEmployeeHome: suggestCostPerEmployeeHome(hqCountry, functionMix, MINI_CURRENCY),
    city: MINI_CITY,
    model: state.model,
  };
}

export interface MiniEstimate {
  annualSaving: number;
  annualSavingPct: number;
  indiaAnnualCost: number;
  homeAnnualCost: number;
  workspaceSqFt: number;
  timeToFirstHires: string;
  comparedWith: string;
}

export function estimateMini(state: MiniEstimatorState): MiniEstimate {
  const result = calculate(toCalculatorInput(state));
  return {
    annualSaving: result.annualSaving,
    annualSavingPct: result.annualSavingPct,
    indiaAnnualCost: result.indiaAnnualCost,
    homeAnnualCost: result.homeAnnualCost,
    workspaceSqFt: result.officeSpaceNeededSqFt,
    timeToFirstHires: result.timeToFirstHires,
    comparedWith: regionOf(state.region).comparedWith,
  };
}

/** "$10.1M", "$850K", "$4,000" — the result card's compact USD figures. */
export function formatUsdCompact(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(amount);
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 10_000) return `${sign}$${Math.round(abs / 1_000)}K`;
  return `${sign}$${Math.round(abs).toLocaleString('en-US')}`;
}

export function formatSqFt(sqFt: number): string {
  return `${Math.round(sqFt).toLocaleString('en-US')} sq ft`;
}
