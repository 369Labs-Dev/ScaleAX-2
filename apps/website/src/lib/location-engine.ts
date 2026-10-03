// Location Finder scoring engine — Website Brief v3, Part D1 "Scoring
// method". Pure functions only (no React), so the rules can be unit-tested
// directly against the brief.

import {
  CITIES,
  FACTORS,
  WEIGHT_PRESET_OVERRIDES,
  type CityData,
  type FactorId,
  type IndustryId,
  type LocationFinderInput,
} from './location-data';

export interface FactorScore {
  id: FactorId;
  label: string;
  score: number; // 1-5, 2 decimal places
}

export interface CityResult {
  city: CityData;
  overallScore: number; // 0-5, 2 decimal places
  factorScores: FactorScore[];
  /** The city's three highest-scoring factors, per "Why this city" (D1 section 5). */
  topFactors: FactorScore[];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Applies a weight preset for the given industry to the base weights,
 * rebalancing every other factor proportionally so the total stays 100
 * (Part D1: "Presets change the default weights... weights must always add
 * up to 100%"). Industries without a defined preset return the base
 * weights unchanged (see WEIGHT_PRESET_OVERRIDES's note on unconfirmed
 * presets).
 */
export function applyIndustryPreset(
  baseWeights: Record<FactorId, number>,
  industry: IndustryId,
): Record<FactorId, number> {
  const overrides = WEIGHT_PRESET_OVERRIDES[industry];
  if (!overrides) return { ...baseWeights };

  const result = { ...baseWeights };
  const overriddenIds = Object.keys(overrides) as FactorId[];
  const overriddenTotal = overriddenIds.reduce((sum, id) => sum + (overrides[id] ?? 0), 0);
  const remainingIds = FACTORS.map((f) => f.id).filter((id) => !overriddenIds.includes(id));
  const remainingBaseTotal = remainingIds.reduce((sum, id) => sum + baseWeights[id], 0);
  const remainingTarget = 100 - overriddenTotal;

  for (const id of overriddenIds) {
    result[id] = overrides[id] as number;
  }
  for (const id of remainingIds) {
    result[id] =
      remainingBaseTotal > 0 ? (baseWeights[id] / remainingBaseTotal) * remainingTarget : 0;
  }

  return result;
}

/** Weights must sum to 100% (with float tolerance) before results can show. */
export function weightsTotal(weights: Record<FactorId, number>): number {
  return round2(Object.values(weights).reduce((sum, w) => sum + w, 0));
}

export function areWeightsValid(weights: Record<FactorId, number>): boolean {
  return Math.abs(weightsTotal(weights) - 100) < 0.05;
}

function scoreTalent(city: CityData, roles: LocationFinderInput['roles']): number {
  const roleScores =
    roles.length > 0 ? roles.map((role) => city.talent.roleAvailability[role] ?? 3) : [3];
  return average([city.talent.seniorTalent, city.talent.attrition, average(roleScores)]);
}

function scoreCost(city: CityData, roles: LocationFinderInput['roles']): number {
  const roleScores =
    roles.length > 0 ? roles.map((role) => city.cost.salaryByRole[role] ?? 3) : [3];
  return average([
    city.cost.officeRent,
    city.cost.seatPrice,
    city.cost.costOfLiving,
    average(roleScores),
  ]);
}

function scoreFactor(
  factorId: FactorId,
  city: CityData,
  roles: LocationFinderInput['roles'],
): number {
  switch (factorId) {
    case 'talent':
      return scoreTalent(city, roles);
    case 'cost':
      return scoreCost(city, roles);
    case 'peerCentres':
      return average([
        city.peerCentres.numGccs,
        city.peerCentres.gccsInSector,
        city.peerCentres.leadershipNetwork,
      ]);
    case 'officeMarket':
      return average([
        city.officeMarket.gradeASupply,
        city.officeMarket.vacancy,
        city.officeMarket.managedSupply,
        city.officeMarket.fitOutLeadTime,
      ]);
    case 'policy':
      return average([
        city.policy.stateIncentives,
        city.policy.sezIfsc,
        city.policy.easeOfRegistration,
        city.policy.labourRules,
      ]);
    case 'connectivity':
      return average([
        city.connectivity.intlFlights,
        city.connectivity.domesticConnections,
        city.connectivity.airportToCbd,
        city.connectivity.powerInternet,
      ]);
    case 'living':
      return average([
        city.living.housingCost,
        city.living.schoolsHealthcare,
        city.living.safety,
        city.living.commuteTime,
      ]);
    case 'climate':
      return average([
        city.climate.floodHeatRisk,
        city.climate.airQuality,
        city.climate.disasterHistory,
      ]);
    default:
      return 0;
  }
}

/**
 * Filters candidate cities by the "Needs GIFT City IFSC?" toggle: "yes"
 * restricts the shortlist to IFSC cities (only GIFT City today), "no"
 * excludes them, "not-sure" leaves every city in play.
 */
export function filterCitiesByIfscNeed(
  cities: CityData[],
  need: LocationFinderInput['giftCityNeed'],
): CityData[] {
  if (need === 'yes') return cities.filter((c) => c.hasIfsc);
  if (need === 'no') return cities.filter((c) => !c.hasIfsc);
  return cities;
}

/**
 * Scores every eligible city against the visitor's inputs and weights, and
 * returns them sorted best-first. Overall score = sum of (factor weight ×
 * factor score), each factor score = average of its parameter scores.
 */
export function scoreCities(input: LocationFinderInput, cities: CityData[] = CITIES): CityResult[] {
  const eligible = filterCitiesByIfscNeed(cities, input.giftCityNeed);

  return eligible
    .map((city) => {
      const factorScores: FactorScore[] = FACTORS.map((factor) => ({
        id: factor.id,
        label: factor.label,
        score: round2(scoreFactor(factor.id, city, input.roles)),
      }));

      const overallScore = round2(
        factorScores.reduce((sum, fs) => {
          const weightPct = input.weights[fs.id] ?? 0;
          return sum + (weightPct / 100) * fs.score;
        }, 0),
      );

      const topFactors = [...factorScores].sort((a, b) => b.score - a.score).slice(0, 3);

      return { city, overallScore, factorScores, topFactors };
    })
    .sort((a, b) => b.overallScore - a.overallScore);
}

export interface Shortlist {
  best: CityResult | null;
  strongAlternative: CityResult | null;
  worthConsidering: CityResult | null;
  others: CityResult[];
}

/** Splits a sorted result list into the D1 section 4/6 shortlist shape. */
export function buildShortlist(results: CityResult[]): Shortlist {
  return {
    best: results[0] ?? null,
    strongAlternative: results[1] ?? null,
    worthConsidering: results[2] ?? null,
    others: results.slice(3),
  };
}
