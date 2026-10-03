// Cost Calculator data — Website Brief v3, Part D2 and Appendix 1. As with
// the Location Finder (see location-data.ts), the brief asks ScaleAX's
// internal teams for the real benchmark numbers (Appendix 1, items 1-8:
// salaries, home-country costs, seat costs, fit-out costs, IT costs, entity
// set-up costs, ScaleAX's fee structure, and time-to-first-hires — none of
// which exist in the brief itself). Every number below is an explicitly
// flagged PLACEHOLDER benchmark, not a real published rate; the UI surfaces
// this notice, and each table's comment names the Appendix 1 owner who
// needs to confirm it before launch.

export const CALCULATOR_DATA_NOTICE =
  'Cost benchmarks below are illustrative placeholders pending confirmed figures from ScaleAX’s finance, DevX, Savvy Group, IT and tax/legal partners (see Appendix 1, items 1-8). They are an estimate only, not a quote.';

export const FX_RATES_AS_OF = '2026-01-01';

export type CurrencyCode =
  | 'USD'
  | 'GBP'
  | 'EUR'
  | 'SEK'
  | 'DKK'
  | 'NOK'
  | 'JPY'
  | 'AUD'
  | 'SGD'
  | 'AED'
  | 'INR';

export const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'SEK', symbol: 'kr', label: 'Swedish Krona' },
  { code: 'DKK', symbol: 'kr', label: 'Danish Krone' },
  { code: 'NOK', symbol: 'kr', label: 'Norwegian Krone' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
  { code: 'AED', symbol: 'AED', label: 'UAE Dirham' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
];

// Units of currency per 1 USD. Placeholder rates — the brief asks for these
// to "update monthly in the data file, or connect to a rates service."
export const FX_RATES_PER_USD: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  SEK: 10.4,
  DKK: 6.85,
  NOK: 10.6,
  JPY: 152,
  AUD: 1.52,
  SGD: 1.34,
  AED: 3.67,
  INR: 83,
};

export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  const amountInUsd = amount / FX_RATES_PER_USD[from];
  return amountInUsd * FX_RATES_PER_USD[to];
}

export type HqCountryId =
  | 'us'
  | 'uk'
  | 'germany'
  | 'netherlands'
  | 'sweden'
  | 'denmark'
  | 'norway'
  | 'finland'
  | 'japan'
  | 'australia'
  | 'singapore'
  | 'uae'
  | 'other';

export const HQ_COUNTRIES: { id: HqCountryId; label: string; defaultCurrency: CurrencyCode }[] = [
  { id: 'us', label: 'US', defaultCurrency: 'USD' },
  { id: 'uk', label: 'UK', defaultCurrency: 'GBP' },
  { id: 'germany', label: 'Germany', defaultCurrency: 'EUR' },
  { id: 'netherlands', label: 'Netherlands', defaultCurrency: 'EUR' },
  { id: 'sweden', label: 'Sweden', defaultCurrency: 'SEK' },
  { id: 'denmark', label: 'Denmark', defaultCurrency: 'DKK' },
  { id: 'norway', label: 'Norway', defaultCurrency: 'NOK' },
  { id: 'finland', label: 'Finland', defaultCurrency: 'EUR' },
  { id: 'japan', label: 'Japan', defaultCurrency: 'JPY' },
  { id: 'australia', label: 'Australia', defaultCurrency: 'AUD' },
  { id: 'singapore', label: 'Singapore', defaultCurrency: 'SGD' },
  { id: 'uae', label: 'UAE', defaultCurrency: 'AED' },
  { id: 'other', label: 'Other', defaultCurrency: 'USD' },
];

export type FunctionId =
  | 'tech-engineering'
  | 'business-operations'
  | 'finance-corporate'
  | 'rd-design';

export const FUNCTIONS: { id: FunctionId; label: string }[] = [
  { id: 'tech-engineering', label: 'Technology and engineering' },
  { id: 'business-operations', label: 'Business operations' },
  { id: 'finance-corporate', label: 'Finance and corporate functions' },
  { id: 'rd-design', label: 'R&D and design' },
];

export const DEFAULT_FUNCTION_MIX: Record<FunctionId, number> = {
  'tech-engineering': 100,
  'business-operations': 0,
  'finance-corporate': 0,
  'rd-design': 0,
};

export type CalculatorCityId = 'ahmedabad' | 'gift-city' | 'bengaluru' | 'hyderabad' | 'pune';

export const CALCULATOR_CITIES: { id: CalculatorCityId; name: string }[] = [
  { id: 'ahmedabad', name: 'Ahmedabad' },
  { id: 'gift-city', name: 'GIFT City' },
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'pune', name: 'Pune' },
];

export type EngagementModelId = 'bot' | 'assisted' | 'managed-seats';

// The brief's optional fourth model (Employer of Record) is marked "[,
// Employer of Record]". W8 adds EOR to the site (homepage models, /models
// #eor, menus) but NOT to the calculator: Appendix 1 has no EOR seat cost,
// fee or time-to-hire benchmarks, so it stays out of the math until those
// numbers exist rather than being modelled on invented figures.
export const ENGAGEMENT_MODELS: { id: EngagementModelId; label: string }[] = [
  { id: 'bot', label: 'Build-Operate-Transfer' },
  { id: 'assisted', label: 'Assisted set-up' },
  { id: 'managed-seats', label: 'Managed seats' },
];

// Appendix 1 item 1 — fully-loaded salary by city × function, in INR per
// year. Owner: Talent team.
export const SALARY_BY_CITY_FUNCTION: Record<CalculatorCityId, Record<FunctionId, number>> = {
  ahmedabad: {
    'tech-engineering': 1_400_000,
    'business-operations': 900_000,
    'finance-corporate': 1_100_000,
    'rd-design': 1_500_000,
  },
  'gift-city': {
    'tech-engineering': 1_500_000,
    'business-operations': 950_000,
    'finance-corporate': 1_300_000,
    'rd-design': 1_600_000,
  },
  bengaluru: {
    'tech-engineering': 2_200_000,
    'business-operations': 1_200_000,
    'finance-corporate': 1_600_000,
    'rd-design': 2_300_000,
  },
  hyderabad: {
    'tech-engineering': 1_900_000,
    'business-operations': 1_050_000,
    'finance-corporate': 1_400_000,
    'rd-design': 2_000_000,
  },
  pune: {
    'tech-engineering': 1_800_000,
    'business-operations': 1_000_000,
    'finance-corporate': 1_350_000,
    'rd-design': 1_900_000,
  },
};

// Appendix 1 item 2 — home-country cost per employee by country × function,
// fully loaded, per year, in USD. Owner: Research.
export const HOME_COST_BY_COUNTRY_FUNCTION: Record<HqCountryId, Record<FunctionId, number>> = {
  us: {
    'tech-engineering': 170_000,
    'business-operations': 110_000,
    'finance-corporate': 130_000,
    'rd-design': 175_000,
  },
  uk: {
    'tech-engineering': 130_000,
    'business-operations': 90_000,
    'finance-corporate': 105_000,
    'rd-design': 135_000,
  },
  germany: {
    'tech-engineering': 120_000,
    'business-operations': 85_000,
    'finance-corporate': 100_000,
    'rd-design': 125_000,
  },
  netherlands: {
    'tech-engineering': 115_000,
    'business-operations': 82_000,
    'finance-corporate': 96_000,
    'rd-design': 120_000,
  },
  sweden: {
    'tech-engineering': 110_000,
    'business-operations': 78_000,
    'finance-corporate': 92_000,
    'rd-design': 115_000,
  },
  denmark: {
    'tech-engineering': 112_000,
    'business-operations': 80_000,
    'finance-corporate': 94_000,
    'rd-design': 117_000,
  },
  norway: {
    'tech-engineering': 120_000,
    'business-operations': 85_000,
    'finance-corporate': 98_000,
    'rd-design': 124_000,
  },
  finland: {
    'tech-engineering': 108_000,
    'business-operations': 76_000,
    'finance-corporate': 90_000,
    'rd-design': 112_000,
  },
  japan: {
    'tech-engineering': 95_000,
    'business-operations': 70_000,
    'finance-corporate': 82_000,
    'rd-design': 98_000,
  },
  australia: {
    'tech-engineering': 125_000,
    'business-operations': 88_000,
    'finance-corporate': 102_000,
    'rd-design': 128_000,
  },
  singapore: {
    'tech-engineering': 105_000,
    'business-operations': 75_000,
    'finance-corporate': 90_000,
    'rd-design': 108_000,
  },
  uae: {
    'tech-engineering': 100_000,
    'business-operations': 72_000,
    'finance-corporate': 86_000,
    'rd-design': 104_000,
  },
  other: {
    'tech-engineering': 110_000,
    'business-operations': 78_000,
    'finance-corporate': 92_000,
    'rd-design': 114_000,
  },
};

// Appendix 1 item 3 — seat cost per month by city × model, in INR; seat
// factor; sq. ft. per seat. Owner: DevX.
export const SEAT_COST_PER_MONTH: Record<CalculatorCityId, Record<EngagementModelId, number>> = {
  ahmedabad: { bot: 9_000, assisted: 9_500, 'managed-seats': 10_000 },
  'gift-city': { bot: 9_500, assisted: 10_000, 'managed-seats': 10_500 },
  bengaluru: { bot: 16_000, assisted: 16_500, 'managed-seats': 17_500 },
  hyderabad: { bot: 13_000, assisted: 13_500, 'managed-seats': 14_500 },
  pune: { bot: 12_000, assisted: 12_500, 'managed-seats': 13_500 },
};

// Seats-per-person factor (accounts for shared/common area) and the
// resulting floor area per seat. Placeholder industry rules of thumb.
export const SEAT_FACTOR = 1.15;
export const SQ_FT_PER_SEAT = 100;

// Appendix 1 item 4 — fit-out cost per sq. ft. by city, in INR. Owner:
// Savvy Group.
export const FIT_OUT_COST_PER_SQFT: Record<CalculatorCityId, number> = {
  ahmedabad: 2_800,
  'gift-city': 3_000,
  bengaluru: 4_200,
  hyderabad: 3_600,
  pune: 3_400,
};

// Appendix 1 item 5 — IT cost per seat (running, per year) and IT
// equipment per seat (one-time), in INR. Owner: IT partner. Modelled as
// city-independent, since the brief gives no city dimension for IT cost.
export const IT_COST_PER_SEAT_PER_YEAR = 60_000;
export const IT_EQUIPMENT_PER_SEAT = 90_000;

// Appendix 1 item 6 — entity and legal set-up cost per model (INR) and
// recruitment fee % (of first-year people cost). Owner: Tax and legal
// partner. Managed seats needs no new entity, so its entity/legal cost is
// lower (advisory only).
export const ENTITY_LEGAL_SETUP_COST: Record<EngagementModelId, number> = {
  bot: 1_200_000,
  assisted: 1_500_000,
  'managed-seats': 150_000,
};
export const RECRUITMENT_FEE_PCT = 0.15;

// Appendix 1 item 7 — ScaleAX fee structure per model. Owner: Purvi. BOT
// and Assisted are charged as a percentage of the underlying India cost;
// Managed seats is a flat per-seat monthly fee (already close to
// all-inclusive, so the percentage fee doesn't apply).
export const SCALEAX_FEE_PCT: Record<'bot' | 'assisted', number> = {
  bot: 0.18,
  assisted: 0.12,
};
export const MANAGED_SEATS_FEE_PER_SEAT_PER_MONTH = 4_000; // INR

// Appendix 1 item 8 — time to first hires per model. Owner: Purvi / ops.
// Matches the ranges already used on /how-we-work/build and /models.
export const TIME_TO_FIRST_HIRES: Record<EngagementModelId, string> = {
  bot: '12–16 weeks',
  assisted: '12–16 weeks',
  'managed-seats': '4–6 weeks',
};

export const INDIA_HEADCOUNT_RANGE = { min: 10, max: 1000 };
