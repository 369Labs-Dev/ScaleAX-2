// The GCC Planner engine — the reference design's calculator
// (site-hazel-gamma-44.vercel.app/gcc-planner) with ScaleAX adaptations:
// the engagement models are ScaleAX's three (BOT / Assisted set-up /
// Managed seats), GIFT City joins the city set, and the home-market side
// runs on an editable "cost per employee at home" benchmark instead of a
// fixed table lookup. All math is in USD; the UI converts for display.

import { convertCurrency, type CurrencyCode } from './calculator-data';

export type FunctionKey = 'tech' | 'ops' | 'ent' | 'rnd';
export type SeniorityKey = 'lean' | 'balanced' | 'senior';
export type ModelKey = 'bot' | 'assisted' | 'managed';

export interface PlannerState {
  hq: HqMarket;
  seats: number;
  ramp: number; // months to full strength
  mix: Record<FunctionKey, number>;
  seniority: SeniorityKey;
  model: ModelKey;
  city: string | 'auto';
  /** Fully-loaded annual cost per person at home, USD. Prefilled from the
   *  HQ market benchmark (suggestHomeCostUsd), editable by the visitor. */
  homeCostUsd: number;
}

export type HqMarket = keyof typeof HQ;

/** Fully-loaded annual cost per person in the home market, by function (USD). */
export const HQ = {
  'United States': { tech: 175_000, ops: 88_000, ent: 120_000, rnd: 190_000 },
  'United Kingdom': { tech: 118_000, ops: 66_000, ent: 92_000, rnd: 130_000 },
  'Western Europe': { tech: 126_000, ops: 72_000, ent: 98_000, rnd: 138_000 },
  Australia: { tech: 132_000, ops: 74_000, ent: 100_000, rnd: 142_000 },
  Japan: { tech: 124_000, ops: 70_000, ent: 96_000, rnd: 134_000 },
} as const;

/** The reporting currency each HQ market defaults to (changeable). */
export const HQ_DEFAULT_CURRENCY: Record<HqMarket, CurrencyCode> = {
  'United States': 'USD',
  'United Kingdom': 'GBP',
  'Western Europe': 'EUR',
  Australia: 'AUD',
  Japan: 'JPY',
};

export const GROUPS: [FunctionKey, string][] = [
  ['tech', 'Digital & technology'],
  ['ops', 'Business operations'],
  ['ent', 'Enterprise functions'],
  ['rnd', 'Innovation & R&D'],
];

/** India base annual cost per person, by function, USD (before seniority/city). */
export const INDIA = { tech: 42_000, ops: 20_000, ent: 28_000, rnd: 48_000 } as const;

export const SENIORITY: Record<SeniorityKey, [label: string, multiplier: number]> = {
  lean: ['Lean', 0.85],
  balanced: ['Balanced', 1],
  senior: ['Senior-heavy', 1.25],
};

export interface EngagementModel {
  name: string;
  /** ScaleAX fee as a share of the India people cost. */
  fee: number;
  /** How long the fee applies, in months from kick-off. */
  feeMonths: number;
  /** One-time set-up cost, charged in year one (USD). */
  setup: number;
  /** Whether the model stands up your own entity (vs. operated seats). */
  entity: boolean;
}

// ScaleAX's three engagement models on the reference fee mechanics: BOT and
// Assisted set-up keep the reference's BOT/Assisted parameters; Managed
// seats needs no entity — a higher all-in fee, a small onboarding cost and
// the fastest start.
export const MODELS: Record<ModelKey, EngagementModel> = {
  bot: { name: 'Build-Operate-Transfer', fee: 0.09, feeMonths: 36, setup: 60_000, entity: true },
  assisted: { name: 'Assisted set-up', fee: 0.04, feeMonths: 12, setup: 180_000, entity: true },
  managed: { name: 'Managed seats', fee: 0.12, feeMonths: 36, setup: 40_000, entity: false },
};

export interface PlannerCity {
  name: string;
  /** India people-cost multiplier for the city. */
  cost: number;
  /** Rent, USD per sq ft per year. */
  rent: number;
  /** 0–5 scores per dimension. */
  s: { talent: number; cost: number; eco: number; retention: number; conn: number };
  why: string;
}

export const CITIES: PlannerCity[] = [
  {
    name: 'Ahmedabad',
    cost: 0.86,
    rent: 9.6,
    s: { talent: 3.5, cost: 4.8, eco: 3.3, retention: 4.5, conn: 3.9 },
    why: 'The lowest attrition of the eight and rents under half of Bengaluru.',
  },
  {
    name: 'GIFT City',
    cost: 0.88,
    rent: 10.5,
    s: { talent: 3.4, cost: 4.7, eco: 3.5, retention: 4.3, conn: 3.8 },
    why: 'IFSC incentives in a purpose-built zone, with Ahmedabad’s talent pool next door.',
  },
  {
    name: 'Bengaluru',
    cost: 1.05,
    rent: 15.5,
    s: { talent: 4.8, cost: 3.2, eco: 4.9, retention: 3.0, conn: 4.4 },
    why: 'The deepest technology talent pool and peer GCC ecosystem in India.',
  },
  {
    name: 'Hyderabad',
    cost: 0.97,
    rent: 12.5,
    s: { talent: 4.3, cost: 4.0, eco: 4.4, retention: 3.5, conn: 4.1 },
    why: 'Large tech and pharma talent with better cost and retention than Bengaluru.',
  },
  {
    name: 'Chennai',
    cost: 0.95,
    rent: 12,
    s: { talent: 3.9, cost: 4.2, eco: 3.9, retention: 4.0, conn: 3.9 },
    why: 'Strong operating economics and stable teams, especially for shared services.',
  },
  {
    name: 'Gurugram',
    cost: 1.08,
    rent: 17,
    s: { talent: 4.0, cost: 3.4, eco: 4.2, retention: 3.2, conn: 4.6 },
    why: 'Best corporate access and international connectivity, at a higher cost.',
  },
  {
    name: 'Pune',
    cost: 0.96,
    rent: 13,
    s: { talent: 4.1, cost: 4.0, eco: 4.1, retention: 3.7, conn: 3.8 },
    why: 'Balanced engineering and automotive talent, strong for R&D centres.',
  },
  {
    name: 'Mumbai',
    cost: 1.15,
    rent: 24,
    s: { talent: 4.0, cost: 2.6, eco: 4.0, retention: 3.3, conn: 4.7 },
    why: 'Deep financial services talent and market access, with expensive real estate.',
  },
];

/** Workspace per person, sq ft. */
const SQFT_PER_SEAT = 70;
/** Weeks per month, for the timeline. */
const WEEKS_PER_MONTH = 4.33;
/** Space is committed ahead of hiring: at least 35% of target from day one. */
const MIN_SPACE_SHARE = 0.35;

export interface YearCost {
  home: number;
  india: number;
  people: number;
  space: number;
  fee: number;
  setup: number;
}

export interface TimelinePhase {
  label: string;
  /** [start, end] in weeks. */
  w: [number, number];
}

export interface PlanResult {
  /** Top three cities for this profile, best first. */
  cities: (PlannerCity & { score: number })[];
  /** The city the costs use — the pick, or the top recommendation. */
  city: PlannerCity & { score: number };
  years: YearCost[];
  /** Cumulative three-year saving (home − India), USD. */
  cum: number;
  /** Steady-state run-rate reduction, 0–1. */
  pct: number;
  steadyHome: number;
  steadyIndia: number;
  sqft: number;
  timeline: TimelinePhase[];
  weeks: number;
}

/** Blended home benchmark for the HQ market and mix, USD — the prefill for
 *  "Cost per employee at home". */
export function suggestHomeCostUsd(hq: HqMarket, mix: Record<FunctionKey, number>): number {
  const total = Object.values(mix).reduce((a, b) => a + b, 0) || 1;
  return GROUPS.reduce((sum, [k]) => sum + HQ[hq][k] * (mix[k] / total), 0);
}

/** Compact reference-style money: $41.8M / $950k / ₹3.5B, in `currency`. */
export function fmt(usd: number, currency: CurrencyCode = 'USD', symbol = '$'): string {
  const v = convertCurrency(usd, 'USD', currency);
  const sign = v < 0 ? '−' : '';
  const abs = Math.abs(v);
  if (abs >= 1_000_000_000) return `${sign}${symbol}${(abs / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${sign}${symbol}${(abs / 1_000_000).toFixed(1)}M`;
  return `${sign}${symbol}${Math.round(abs / 1000)}k`;
}

export function plan(state: PlannerState): PlanResult {
  const total = Object.values(state.mix).reduce((a, b) => a + b, 0) || 1;
  const share = (k: FunctionKey) => state.mix[k] / total;

  // City-fit weights follow the mix: tech/R&D favour talent and ecosystem,
  // ops/enterprise favour cost and retention; scale favours talent depth.
  const weights = {
    talent: 1 + share('tech') + 1.4 * share('rnd') + 0.6 * (state.seats > 500 ? 1 : 0),
    cost: 1 + 1.4 * share('ops') + 0.8 * share('ent'),
    eco: 0.8 + 0.8 * share('tech') + 0.6 * share('rnd'),
    retention: 0.8 + 1.2 * share('ops') + 0.6 * share('ent'),
    conn: 0.6 + 0.6 * share('ent'),
  };
  const weightSum = Object.values(weights).reduce((a, b) => a + b, 0);

  const ranked = CITIES.map((c) => ({
    ...c,
    score:
      (c.s.talent * weights.talent +
        c.s.cost * weights.cost +
        c.s.eco * weights.eco +
        c.s.retention * weights.retention +
        c.s.conn * weights.conn) /
      weightSum,
  })).sort((a, b) => b.score - a.score);

  const city =
    state.city === 'auto' ? ranked[0] : (ranked.find((c) => c.name === state.city) ?? ranked[0]);

  const seniority = SENIORITY[state.seniority][1];
  const model = MODELS[state.model];

  // Cost per person per year, USD: the visitor's home benchmark, and the
  // blended India cost for the mix, seniority and city.
  const homePerSeat = state.homeCostUsd;
  const indiaPerSeat =
    GROUPS.reduce((sum, [k]) => sum + INDIA[k] * share(k), 0) * seniority * city.cost;
  const spacePerSeat = SQFT_PER_SEAT * city.rent;

  // Month-by-month ramp: headcount grows linearly to full strength.
  const years: YearCost[] = [0, 1, 2].map((y) => {
    let home = 0;
    let people = 0;
    let space = 0;
    let fee = 0;
    for (let m = 12 * y + 1; m <= 12 * y + 12; m++) {
      const seated = state.seats * Math.min(1, m / state.ramp);
      home += (homePerSeat * seated) / 12;
      people += (indiaPerSeat * seated) / 12;
      space += (spacePerSeat * Math.max(seated, MIN_SPACE_SHARE * state.seats)) / 12;
      if (m <= model.feeMonths) fee += ((indiaPerSeat * seated) / 12) * model.fee;
    }
    const setup = y === 0 ? model.setup : 0;
    return { home, india: people + space + fee + setup, people, space, fee, setup };
  });

  const cum = years.reduce((sum, y) => sum + (y.home - y.india), 0);
  const steadyHome = homePerSeat * state.seats;
  const steadyIndia =
    indiaPerSeat * state.seats +
    spacePerSeat * state.seats +
    indiaPerSeat * state.seats * (model.feeMonths >= 36 ? model.fee : 0);

  const weeks = Math.round(WEEKS_PER_MONTH * state.ramp);
  const entityWindow: [number, number] | null = model.entity
    ? state.model === 'assisted'
      ? [2, 10]
      : [1, 8]
    : null;
  const timeline: TimelinePhase[] = [
    { label: 'Kick-off & design', w: [0, 3] },
    entityWindow
      ? { label: 'Entity & registrations', w: entityWindow }
      : { label: 'Managed seats ready', w: [1, 3] },
    { label: `Office in ${city.name}`, w: model.entity ? [3, 11] : [2, 8] },
    { label: 'Leadership hires', w: [2, 12] },
    {
      label: 'First 25% of team',
      w: [8, Math.max(14, Math.round(WEEKS_PER_MONTH * state.ramp * 0.25))],
    },
    {
      label: 'Steady state',
      w: [Math.round(WEEKS_PER_MONTH * state.ramp * 0.7), weeks],
    },
  ];

  return {
    cities: ranked.slice(0, 3),
    city,
    years,
    cum,
    pct: steadyHome > 0 ? 1 - steadyIndia / steadyHome : 0,
    steadyHome,
    steadyIndia,
    sqft: SQFT_PER_SEAT * state.seats,
    timeline,
    weeks,
  };
}

export const DEFAULT_MIX: Record<FunctionKey, number> = { tech: 50, ops: 20, ent: 20, rnd: 10 };

export const DEFAULT_STATE: PlannerState = {
  hq: 'United States',
  seats: 150,
  ramp: 12,
  mix: DEFAULT_MIX,
  seniority: 'balanced',
  model: 'bot',
  city: 'auto',
  homeCostUsd: suggestHomeCostUsd('United States', DEFAULT_MIX),
};
