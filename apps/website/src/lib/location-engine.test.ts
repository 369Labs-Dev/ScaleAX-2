import { describe, expect, it } from 'vitest';
import {
  applyIndustryPreset,
  areWeightsValid,
  buildShortlist,
  filterCitiesByIfscNeed,
  scoreCities,
  weightsTotal,
} from './location-engine';
import {
  CITIES,
  DEFAULT_WEIGHTS,
  LOCATION_INPUT_DEFAULTS,
  type CityData,
  type FactorId,
  type LocationFinderInput,
} from './location-data';

// A tiny, fully-known fixture (independent of the real placeholder dataset)
// so scoring arithmetic can be checked exactly by hand, per Part D1
// "Scoring method".
function makeCity(overrides: Partial<CityData> & { id: string; name: string }): CityData {
  return {
    hasIfsc: false,
    talent: { seniorTalent: 3, attrition: 3, roleAvailability: {} },
    cost: { officeRent: 3, seatPrice: 3, costOfLiving: 3, salaryByRole: {} },
    peerCentres: { numGccs: 3, gccsInSector: 3, leadershipNetwork: 3 },
    officeMarket: { gradeASupply: 3, vacancy: 3, managedSupply: 3, fitOutLeadTime: 3 },
    policy: { stateIncentives: 3, sezIfsc: 3, easeOfRegistration: 3, labourRules: 3 },
    connectivity: { intlFlights: 3, domesticConnections: 3, airportToCbd: 3, powerInternet: 3 },
    living: { housingCost: 3, schoolsHealthcare: 3, safety: 3, commuteTime: 3 },
    climate: { floodHeatRisk: 3, airQuality: 3, disasterHistory: 3 },
    whyThisCity: {
      talent: '',
      cost: '',
      peerCentres: '',
      officeMarket: '',
      policy: '',
      connectivity: '',
      living: '',
      climate: '',
    },
    tradeOff: { strength: '', weakness: '' },
    ...overrides,
  };
}

const EQUAL_WEIGHTS: Record<FactorId, number> = {
  talent: 12.5,
  cost: 12.5,
  peerCentres: 12.5,
  officeMarket: 12.5,
  policy: 12.5,
  connectivity: 12.5,
  living: 12.5,
  climate: 12.5,
};

describe('weightsTotal / areWeightsValid', () => {
  it('accepts the brief’s default weights, which sum to exactly 100', () => {
    expect(weightsTotal(DEFAULT_WEIGHTS)).toBe(100);
    expect(areWeightsValid(DEFAULT_WEIGHTS)).toBe(true);
  });

  it('rejects a total below 100 and disables results, per "disable Results until it does"', () => {
    const under = { ...DEFAULT_WEIGHTS, talent: DEFAULT_WEIGHTS.talent - 5 };
    expect(weightsTotal(under)).toBe(95);
    expect(areWeightsValid(under)).toBe(false);
  });

  it('rejects a total above 100', () => {
    const over = { ...DEFAULT_WEIGHTS, talent: DEFAULT_WEIGHTS.talent + 5 };
    expect(areWeightsValid(over)).toBe(false);
  });

  it('tolerates tiny floating-point drift at exactly 100', () => {
    const nearly = { ...EQUAL_WEIGHTS, talent: 12.5 + 1e-9 };
    expect(areWeightsValid(nearly)).toBe(true);
  });
});

describe('applyIndustryPreset', () => {
  it('leaves weights unchanged for an industry with no defined preset (e.g. Retail)', () => {
    const result = applyIndustryPreset(DEFAULT_WEIGHTS, 'retail-consumer');
    expect(result).toEqual(DEFAULT_WEIGHTS);
  });

  it('raises Policy to 25% for BFSI and rebalances the rest to still total 100', () => {
    const result = applyIndustryPreset(DEFAULT_WEIGHTS, 'bfsi');
    expect(result.policy).toBe(25);
    expect(weightsTotal(result)).toBe(100);
    // Every other factor should have shrunk relative to the base weights.
    expect(result.talent).toBeLessThan(DEFAULT_WEIGHTS.talent);
    expect(result.cost).toBeLessThan(DEFAULT_WEIGHTS.cost);
  });

  it('raises Talent to 30% for Semiconductors and rebalances the rest to still total 100', () => {
    const result = applyIndustryPreset(DEFAULT_WEIGHTS, 'semiconductors');
    expect(result.talent).toBe(30);
    expect(weightsTotal(result)).toBe(100);
    expect(result.policy).toBeLessThan(DEFAULT_WEIGHTS.policy);
  });
});

describe('filterCitiesByIfscNeed', () => {
  it('"yes" restricts the shortlist to IFSC cities (GIFT City only, today)', () => {
    const result = filterCitiesByIfscNeed(CITIES, 'yes');
    expect(result.map((c) => c.id)).toEqual(['gift-city']);
  });

  it('"no" excludes IFSC cities', () => {
    const result = filterCitiesByIfscNeed(CITIES, 'no');
    expect(result.some((c) => c.id === 'gift-city')).toBe(false);
    expect(result.length).toBe(CITIES.length - 1);
  });

  it('"not-sure" leaves every city in play', () => {
    const result = filterCitiesByIfscNeed(CITIES, 'not-sure');
    expect(result.length).toBe(CITIES.length);
  });
});

describe('scoreCities', () => {
  const bestCity = makeCity({
    id: 'best',
    name: 'Best City',
    talent: { seniorTalent: 5, attrition: 5, roleAvailability: {} },
  });
  const worstCity = makeCity({
    id: 'worst',
    name: 'Worst City',
    talent: { seniorTalent: 1, attrition: 1, roleAvailability: {} },
  });
  const fixtureCities = [worstCity, bestCity]; // deliberately unsorted input

  it('computes the overall score as the weighted sum of factor averages, to 2 decimal places', () => {
    const input: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const [top] = scoreCities(input, [bestCity]);

    // Talent factor for bestCity = average(senior=5, attrition=5, roleAvg=3 default) = 13/3 = 4.333...
    // Every other factor is the fixture default of 3.
    // Overall = 0.125*4.3333 + 0.125*3*7 = 0.5417 + 2.625 = 3.1667 -> rounds to 3.17
    expect(top.overallScore).toBeCloseTo(3.17, 2);
  });

  it('sorts results best-first', () => {
    const input: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const results = scoreCities(input, fixtureCities);
    expect(results.map((r) => r.city.id)).toEqual(['best', 'worst']);
    expect(results[0].overallScore).toBeGreaterThan(results[1].overallScore);
  });

  it('averages the Talent parameter across multiple selected roles (max 3)', () => {
    const city = makeCity({
      id: 'role-city',
      name: 'Role City',
      talent: {
        seniorTalent: 3,
        attrition: 3,
        roleAvailability: { 'software-engineering': 5, 'data-ai': 1, 'finance-accounting': 3 },
      },
    });
    const oneRole: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: ['software-engineering'],
      weights: { ...EQUAL_WEIGHTS },
    };
    const twoRoles: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: ['software-engineering', 'data-ai'],
      weights: { ...EQUAL_WEIGHTS },
    };

    const [oneRoleResult] = scoreCities(oneRole, [city]);
    const [twoRoleResult] = scoreCities(twoRoles, [city]);

    const talentOne = oneRoleResult.factorScores.find((f) => f.id === 'talent')!.score;
    const talentTwo = twoRoleResult.factorScores.find((f) => f.id === 'talent')!.score;

    // One role (software-engineering, score 5): talent = avg(3, 3, 5) = 3.67
    expect(talentOne).toBeCloseTo(3.67, 2);
    // Two roles (5 and 1, averaged to 3 first): talent = avg(3, 3, 3) = 3
    expect(talentTwo).toBeCloseTo(3, 2);
  });

  it('falls back to a neutral score of 3 when no role is selected (empty selection)', () => {
    const city = makeCity({
      id: 'role-city',
      name: 'Role City',
      talent: { seniorTalent: 3, attrition: 3, roleAvailability: { 'software-engineering': 5 } },
    });
    const noRoles: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const [result] = scoreCities(noRoles, [city]);
    expect(result.factorScores.find((f) => f.id === 'talent')!.score).toBeCloseTo(3, 2);
  });

  it('returns the three highest-scoring factors as topFactors, for "Why this city"', () => {
    const city = makeCity({
      id: 'top-factors',
      name: 'Top Factors City',
      policy: { stateIncentives: 5, sezIfsc: 5, easeOfRegistration: 5, labourRules: 5 },
      connectivity: { intlFlights: 5, domesticConnections: 5, airportToCbd: 5, powerInternet: 5 },
      cost: { officeRent: 5, seatPrice: 5, costOfLiving: 5, salaryByRole: {} },
    });
    const input: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const [result] = scoreCities(input, [city]);
    const topIds = result.topFactors.map((f) => f.id).sort();
    expect(topIds).toEqual(['connectivity', 'cost', 'policy']);
  });

  it('handles the minimum and maximum headcount inputs without changing scores (headcount does not enter the formula)', () => {
    const minInput: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      targetHeadcountYear3: 25,
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const maxInput: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      targetHeadcountYear3: 2000,
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const [minResult] = scoreCities(minInput, [bestCity]);
    const [maxResult] = scoreCities(maxInput, [bestCity]);
    expect(minResult.overallScore).toBe(maxResult.overallScore);
  });

  it('returns an empty list when the IFSC filter excludes every fixture city', () => {
    const input: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      giftCityNeed: 'yes',
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const results = scoreCities(input, [bestCity, worstCity]); // neither has hasIfsc: true
    expect(results).toEqual([]);
  });
});

describe('buildShortlist', () => {
  it('splits best / strong alternative / worth considering / others in order', () => {
    const input: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: [],
      weights: EQUAL_WEIGHTS,
    };
    const results = scoreCities(input, CITIES);
    const shortlist = buildShortlist(results);

    expect(shortlist.best?.city.id).toBe(results[0].city.id);
    expect(shortlist.strongAlternative?.city.id).toBe(results[1].city.id);
    expect(shortlist.worthConsidering?.city.id).toBe(results[2].city.id);
    expect(shortlist.others).toHaveLength(results.length - 3);
  });

  it('handles fewer than three eligible cities (e.g. the IFSC "yes" filter) without throwing', () => {
    const shortlist = buildShortlist(
      scoreCities(
        { ...LOCATION_INPUT_DEFAULTS, giftCityNeed: 'yes', roles: [], weights: EQUAL_WEIGHTS },
        CITIES,
      ),
    );
    expect(shortlist.best?.city.id).toBe('gift-city');
    expect(shortlist.strongAlternative).toBeNull();
    expect(shortlist.worthConsidering).toBeNull();
    expect(shortlist.others).toEqual([]);
  });

  it('handles a completely empty result list', () => {
    const shortlist = buildShortlist([]);
    expect(shortlist).toEqual({
      best: null,
      strongAlternative: null,
      worthConsidering: null,
      others: [],
    });
  });
});

describe('real dataset sanity checks', () => {
  it('scores every one of the 10 brief-listed cities with the default inputs', () => {
    const results = scoreCities(LOCATION_INPUT_DEFAULTS, CITIES);
    expect(results).toHaveLength(10);
    for (const result of results) {
      expect(result.overallScore).toBeGreaterThanOrEqual(1);
      expect(result.overallScore).toBeLessThanOrEqual(5);
      expect(result.factorScores).toHaveLength(8);
    }
  });

  it('is neutral: Bengaluru can outscore Ahmedabad when the visitor weights talent heavily', () => {
    const talentHeavy: LocationFinderInput = {
      ...LOCATION_INPUT_DEFAULTS,
      roles: ['software-engineering'],
      weights: {
        ...DEFAULT_WEIGHTS,
        talent: 100,
        cost: 0,
        peerCentres: 0,
        officeMarket: 0,
        policy: 0,
        connectivity: 0,
        living: 0,
        climate: 0,
      },
    };
    const results = scoreCities(talentHeavy, CITIES);
    expect(results[0].city.id).toBe('bengaluru');
  });
});
