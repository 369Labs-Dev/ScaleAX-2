// Location Finder data — Website Brief v3, Part D1. Everything the tool
// needs (cities, factors, parameters, weight presets, "why this city" and
// trade-off copy) lives here as plain data, per the brief's "nothing is
// hard-coded" rule, so ScaleAX can update it without a developer.
//
// IMPORTANT — data honesty note (see the W5 report for the full version):
// the brief itself says the city-by-parameter scores must come from
// ScaleAX's Research team (Appendix 1, item 9: "City scores for all 25+
// parameters × 10 cities, with source and date" — owner "Research"; item
// 10: role-level talent data; item 11: "why this city" / trade-off copy).
// None of those figures exist in the brief. Every score below is therefore
// an explicitly-flagged PLACEHOLDER (`PLACEHOLDER_DATA_NOTICE`), directionally
// sketched from well-known, non-confidential facts about each city (e.g.
// Bengaluru's talent depth and traffic, GIFT City's IFSC status, Delhi's air
// quality) so the tool is genuinely testable and differentiates cities
// sensibly — never presented as ScaleAX's real benchmark research. The UI
// surfaces this notice; nothing here should be read as sourced data.

export const PLACEHOLDER_DATA_NOTICE =
  'City scores are illustrative placeholders pending confirmed benchmark data from ScaleAX Research (see Appendix 1, items 9-11). They are not a site-selection study.';

export type IndustryId =
  | 'semiconductors'
  | 'pharma-life-sciences'
  | 'bfsi'
  | 'technology-saas'
  | 'manufacturing-industrial'
  | 'retail-consumer'
  | 'other';

export const INDUSTRIES: { id: IndustryId; label: string }[] = [
  { id: 'semiconductors', label: 'Semiconductors and electronics' },
  { id: 'pharma-life-sciences', label: 'Pharma and life sciences' },
  { id: 'bfsi', label: 'Banking, financial services and insurance' },
  { id: 'technology-saas', label: 'Technology and SaaS' },
  { id: 'manufacturing-industrial', label: 'Manufacturing and industrial' },
  { id: 'retail-consumer', label: 'Retail and consumer' },
  { id: 'other', label: 'Other' },
];

export type HqRegionId =
  | 'us'
  | 'uk'
  | 'germany'
  | 'netherlands'
  | 'nordics'
  | 'japan'
  | 'australia'
  | 'singapore'
  | 'middle-east'
  | 'other';

export const HQ_REGIONS: { id: HqRegionId; label: string }[] = [
  { id: 'us', label: 'US' },
  { id: 'uk', label: 'UK' },
  { id: 'germany', label: 'Germany' },
  { id: 'netherlands', label: 'Netherlands' },
  { id: 'nordics', label: 'Nordics' },
  { id: 'japan', label: 'Japan' },
  { id: 'australia', label: 'Australia' },
  { id: 'singapore', label: 'Singapore' },
  { id: 'middle-east', label: 'Middle East' },
  { id: 'other', label: 'Other' },
];

export type RoleId =
  | 'software-engineering'
  | 'data-ai'
  | 'chip-design-verification'
  | 'finance-accounting'
  | 'business-operations'
  | 'customer-operations'
  | 'rd-engineering-design'
  | 'risk-compliance';

export const ROLES: { id: RoleId; label: string }[] = [
  { id: 'software-engineering', label: 'Software engineering' },
  { id: 'data-ai', label: 'Data and AI' },
  { id: 'chip-design-verification', label: 'Chip design and verification' },
  { id: 'finance-accounting', label: 'Finance and accounting' },
  { id: 'business-operations', label: 'Business operations' },
  { id: 'customer-operations', label: 'Customer operations' },
  { id: 'rd-engineering-design', label: 'R&D and engineering design' },
  { id: 'risk-compliance', label: 'Risk and compliance' },
];

export const MAX_ROLES_SELECTABLE = 3;

export type GiftCityNeed = 'yes' | 'no' | 'not-sure';

export type FactorId =
  | 'talent'
  | 'cost'
  | 'peerCentres'
  | 'officeMarket'
  | 'policy'
  | 'connectivity'
  | 'living'
  | 'climate';

export interface FactorDef {
  id: FactorId;
  label: string;
  defaultWeight: number; // percent, 0-100
  parameters: string[]; // display copy only — the brief's named parameters
  source: string;
}

// Factors, parameters and default weights (Part D1). Weights sum to 100.
export const FACTORS: FactorDef[] = [
  {
    id: 'talent',
    label: 'Talent',
    defaultWeight: 25,
    parameters: [
      'Graduates a year in relevant fields',
      'Size of workforce for the selected roles',
      'Senior and leadership talent available',
      'Annual attrition',
    ],
    source: 'AISHE (Ministry of Education); Nasscom; staffing reports (TeamLease, Xpheno)',
  },
  {
    id: 'cost',
    label: 'Cost',
    defaultWeight: 20,
    parameters: [
      'Average salary for the selected roles',
      'Grade A office rent',
      'Managed seat price',
      'Cost of living',
    ],
    source: 'Salary surveys; JLL / CBRE / Colliers office reports; Mercer or Numbeo',
  },
  {
    id: 'peerCentres',
    label: 'Peer centres',
    defaultWeight: 10,
    parameters: [
      'Number of GCCs in the city',
      "GCCs in the visitor's sector",
      'Local GCC leadership network',
    ],
    source: 'Nasscom–Zinnov GCC report',
  },
  {
    id: 'officeMarket',
    label: 'Office market',
    defaultWeight: 10,
    parameters: ['Grade A supply', 'Vacancy', 'Managed workspace supply', 'Fit-out lead time'],
    source: 'JLL / CBRE / Colliers; DevX data',
  },
  {
    id: 'policy',
    label: 'Policy and incentives',
    defaultWeight: 15,
    parameters: [
      'State IT and GCC policy incentives',
      'SEZ or IFSC availability',
      'Ease of registrations',
      'Labour rules (e.g. shift flexibility)',
    ],
    source: 'State IT/ITeS policies; IFSCA; DPIIT',
  },
  {
    id: 'connectivity',
    label: 'Connectivity',
    defaultWeight: 10,
    parameters: [
      "International flights to the visitor's HQ region",
      'Domestic connections',
      'Airport to business district time',
      'Power and internet reliability',
    ],
    source: 'Airline schedules / DGCA; city data',
  },
  {
    id: 'living',
    label: 'Living and retention',
    defaultWeight: 5,
    parameters: ['Housing cost', 'Schools and healthcare', 'Safety', 'Commute time'],
    source: 'Public city indices',
  },
  {
    id: 'climate',
    label: 'Climate and resilience',
    defaultWeight: 5,
    parameters: ['Flood and heat risk', 'Air quality', 'Disaster history'],
    source: 'CPCB AQI; NDMA',
  },
];

export const DEFAULT_WEIGHTS: Record<FactorId, number> = FACTORS.reduce(
  (acc, factor) => ({ ...acc, [factor.id]: factor.defaultWeight }),
  {} as Record<FactorId, number>,
);

// Industry weight presets (Part D1: "Presets change the default weights: for
// example, Banking and financial services raises 'Policy and incentives'
// (GIFT City) to 25%, and Semiconductors raises 'Talent' to 30%."). Only
// these two examples are given in the brief; every other industry preset is
// the base weights unchanged, flagged pending Appendix 1 item 12 ("Industry
// weight presets", owner Purvi). Overridden weights are rebalanced
// proportionally across the remaining factors so the total stays 100%.
export const WEIGHT_PRESET_OVERRIDES: Partial<
  Record<IndustryId, Partial<Record<FactorId, number>>>
> = {
  bfsi: { policy: 25 },
  semiconductors: { talent: 30 },
};

export interface CityData {
  id: string;
  name: string;
  hasIfsc: boolean;
  // All scores are 1-5, already oriented so a higher number is better for
  // the visitor (the brief's "reversed for costs, attrition and risk" rule
  // is applied at authoring time rather than at run time — see the file
  // header note).
  talent: {
    seniorTalent: number;
    attrition: number; // higher = lower attrition = better
    /** Per role: combines the brief's "graduates a year" and "workforce size for the selected roles" into one score (see W5 report). */
    roleAvailability: Partial<Record<RoleId, number>>;
  };
  cost: {
    officeRent: number; // higher = cheaper
    seatPrice: number; // higher = cheaper
    costOfLiving: number; // higher = cheaper
    /** Per role: "average salary for the selected roles" — higher = cheaper. */
    salaryByRole: Partial<Record<RoleId, number>>;
  };
  peerCentres: {
    numGccs: number;
    gccsInSector: number;
    leadershipNetwork: number;
  };
  officeMarket: {
    gradeASupply: number;
    vacancy: number; // higher = more availability = better
    managedSupply: number;
    fitOutLeadTime: number; // higher = faster
  };
  policy: {
    stateIncentives: number;
    sezIfsc: number;
    easeOfRegistration: number;
    labourRules: number;
  };
  connectivity: {
    intlFlights: number;
    domesticConnections: number;
    airportToCbd: number; // higher = closer/faster
    powerInternet: number;
  };
  living: {
    housingCost: number; // higher = cheaper
    schoolsHealthcare: number;
    safety: number;
    commuteTime: number; // higher = shorter
  };
  climate: {
    floodHeatRisk: number; // higher = lower risk
    airQuality: number;
    disasterHistory: number; // higher = fewer events
  };
  whyThisCity: Record<FactorId, string>;
  tradeOff: { strength: string; weakness: string };
}

// Cities (Part D1: "Ahmedabad, GIFT City (Gandhinagar), Bengaluru,
// Hyderabad, Pune, Chennai, Mumbai, Delhi NCR, Kochi, Jaipur").
export const CITIES: CityData[] = [
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    hasIfsc: false,
    talent: {
      seniorTalent: 3,
      attrition: 4,
      roleAvailability: {
        'finance-accounting': 4,
        'business-operations': 4,
        'customer-operations': 3,
        'software-engineering': 3,
        'data-ai': 3,
        'risk-compliance': 3,
        'rd-engineering-design': 3,
        'chip-design-verification': 2,
      },
    },
    cost: {
      officeRent: 5,
      seatPrice: 5,
      costOfLiving: 5,
      salaryByRole: {
        'finance-accounting': 4,
        'business-operations': 5,
        'customer-operations': 5,
        'software-engineering': 4,
        'data-ai': 4,
        'risk-compliance': 4,
        'rd-engineering-design': 4,
        'chip-design-verification': 4,
      },
    },
    peerCentres: { numGccs: 2, gccsInSector: 2, leadershipNetwork: 2 },
    officeMarket: { gradeASupply: 3, vacancy: 4, managedSupply: 3, fitOutLeadTime: 4 },
    policy: { stateIncentives: 4, sezIfsc: 3, easeOfRegistration: 4, labourRules: 4 },
    connectivity: { intlFlights: 3, domesticConnections: 4, airportToCbd: 4, powerInternet: 4 },
    living: { housingCost: 4, schoolsHealthcare: 3, safety: 4, commuteTime: 4 },
    climate: { floodHeatRisk: 3, airQuality: 3, disasterHistory: 4 },
    whyThisCity: {
      talent:
        'A growing pool of finance, operations and engineering graduates from Gujarat institutions.',
      cost: 'Office rent and salaries well below the crowded hubs.',
      peerCentres: 'An emerging GCC base, anchored by ScaleAX’s own presence.',
      officeMarket: 'Grade A supply growing quickly, with fast fit-out turnaround.',
      policy: 'State incentives and links to GIFT City next door.',
      connectivity: 'Direct flights growing, with quick access from the airport.',
      living: 'Affordable housing and a short commute for most roles.',
      climate: 'Low disaster risk, with manageable summer heat.',
    },
    tradeOff: {
      strength: 'Lower costs than India’s crowded hubs',
      weakness: 'Fewer peer GCCs to hire senior leaders from, for now',
    },
  },
  {
    id: 'gift-city',
    name: 'GIFT City',
    hasIfsc: true,
    talent: {
      seniorTalent: 3,
      attrition: 4,
      roleAvailability: {
        'finance-accounting': 4,
        'risk-compliance': 4,
        'business-operations': 3,
        'customer-operations': 3,
        'software-engineering': 3,
        'data-ai': 3,
        'rd-engineering-design': 2,
        'chip-design-verification': 2,
      },
    },
    cost: {
      officeRent: 5,
      seatPrice: 5,
      costOfLiving: 4,
      salaryByRole: {
        'finance-accounting': 4,
        'risk-compliance': 4,
        'business-operations': 5,
        'customer-operations': 5,
        'software-engineering': 4,
        'data-ai': 4,
        'rd-engineering-design': 4,
        'chip-design-verification': 4,
      },
    },
    peerCentres: { numGccs: 2, gccsInSector: 3, leadershipNetwork: 2 },
    officeMarket: { gradeASupply: 4, vacancy: 5, managedSupply: 4, fitOutLeadTime: 4 },
    policy: { stateIncentives: 5, sezIfsc: 5, easeOfRegistration: 4, labourRules: 4 },
    connectivity: { intlFlights: 3, domesticConnections: 4, airportToCbd: 3, powerInternet: 4 },
    living: { housingCost: 4, schoolsHealthcare: 3, safety: 4, commuteTime: 4 },
    climate: { floodHeatRisk: 3, airQuality: 3, disasterHistory: 4 },
    whyThisCity: {
      talent: 'Draws on the same talent pool as Ahmedabad, a short drive away.',
      cost: 'New-build Grade A space at costs below India’s established hubs.',
      peerCentres: 'A growing base of financial-services GCCs, drawn by the IFSC.',
      officeMarket: 'New Grade A supply purpose-built for financial and technology centres.',
      policy: 'India’s only IFSC: its own regulator (IFSCA) and a dedicated GIC framework.',
      connectivity: 'A short drive from Ahmedabad international airport.',
      living: 'A new, planned township with room to grow.',
      climate: 'Low disaster risk, with manageable summer heat.',
    },
    tradeOff: {
      strength: 'The only IFSC in India, with a purpose-built regulatory regime',
      weakness: 'A newer market, still building its amenities and peer density',
    },
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    hasIfsc: false,
    talent: {
      seniorTalent: 5,
      attrition: 2,
      roleAvailability: {
        'software-engineering': 5,
        'data-ai': 5,
        'rd-engineering-design': 4,
        'chip-design-verification': 4,
        'business-operations': 4,
        'customer-operations': 4,
        'finance-accounting': 3,
        'risk-compliance': 3,
      },
    },
    cost: {
      officeRent: 1,
      seatPrice: 2,
      costOfLiving: 2,
      salaryByRole: {
        'software-engineering': 1,
        'data-ai': 1,
        'rd-engineering-design': 2,
        'chip-design-verification': 2,
        'business-operations': 2,
        'customer-operations': 2,
        'finance-accounting': 2,
        'risk-compliance': 2,
      },
    },
    peerCentres: { numGccs: 5, gccsInSector: 5, leadershipNetwork: 5 },
    officeMarket: { gradeASupply: 5, vacancy: 2, managedSupply: 5, fitOutLeadTime: 3 },
    policy: { stateIncentives: 3, sezIfsc: 2, easeOfRegistration: 3, labourRules: 3 },
    connectivity: { intlFlights: 5, domesticConnections: 5, airportToCbd: 2, powerInternet: 4 },
    living: { housingCost: 2, schoolsHealthcare: 4, safety: 4, commuteTime: 2 },
    climate: { floodHeatRisk: 4, airQuality: 3, disasterHistory: 4 },
    whyThisCity: {
      talent: 'India’s deepest technology talent pool, across every seniority level.',
      cost: 'A competitive tech salary market, reflecting its maturity.',
      peerCentres: 'The largest concentration of GCCs and GCC leaders in India.',
      officeMarket: 'The largest Grade A office market, though vacancy is tight.',
      policy: 'Established state IT policy, without GIFT City’s IFSC benefits.',
      connectivity: 'The widest international network of any city on this list.',
      living: 'Strong schools and healthcare, offset by long commutes.',
      climate: 'Temperate climate with moderate air quality.',
    },
    tradeOff: {
      strength: 'The deepest technology talent pool in India',
      weakness: 'The highest office rents and salaries on the list',
    },
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    hasIfsc: false,
    talent: {
      seniorTalent: 4,
      attrition: 3,
      roleAvailability: {
        'software-engineering': 4,
        'data-ai': 4,
        'rd-engineering-design': 3,
        'chip-design-verification': 3,
        'business-operations': 4,
        'customer-operations': 4,
        'finance-accounting': 3,
        'risk-compliance': 3,
      },
    },
    cost: {
      officeRent: 2,
      seatPrice: 3,
      costOfLiving: 3,
      salaryByRole: {
        'software-engineering': 2,
        'data-ai': 2,
        'rd-engineering-design': 3,
        'chip-design-verification': 3,
        'business-operations': 3,
        'customer-operations': 3,
        'finance-accounting': 3,
        'risk-compliance': 3,
      },
    },
    peerCentres: { numGccs: 4, gccsInSector: 4, leadershipNetwork: 4 },
    officeMarket: { gradeASupply: 4, vacancy: 3, managedSupply: 4, fitOutLeadTime: 3 },
    policy: { stateIncentives: 4, sezIfsc: 2, easeOfRegistration: 4, labourRules: 3 },
    connectivity: { intlFlights: 4, domesticConnections: 4, airportToCbd: 3, powerInternet: 4 },
    living: { housingCost: 3, schoolsHealthcare: 4, safety: 4, commuteTime: 3 },
    climate: { floodHeatRisk: 4, airQuality: 3, disasterHistory: 4 },
    whyThisCity: {
      talent: 'A large, well-established technology and life sciences talent pool.',
      cost: 'Costs below Bengaluru for comparable roles.',
      peerCentres: 'One of India’s largest GCC hubs, with deep sector depth.',
      officeMarket: 'Ample Grade A supply, with room to grow.',
      policy: 'Proactive state IT and GCC policy support.',
      connectivity: 'Strong domestic and growing international connections.',
      living: 'Good schools and healthcare, at a lower cost than Bengaluru.',
      climate: 'Warm climate, moderate air quality.',
    },
    tradeOff: {
      strength: 'Bengaluru-level GCC density at a lower cost',
      weakness: 'No IFSC-style regime for financial services roles',
    },
  },
  {
    id: 'pune',
    name: 'Pune',
    hasIfsc: false,
    talent: {
      seniorTalent: 4,
      attrition: 3,
      roleAvailability: {
        'software-engineering': 4,
        'data-ai': 3,
        'rd-engineering-design': 5,
        'chip-design-verification': 4,
        'business-operations': 3,
        'customer-operations': 3,
        'finance-accounting': 3,
        'risk-compliance': 3,
      },
    },
    cost: {
      officeRent: 3,
      seatPrice: 3,
      costOfLiving: 3,
      salaryByRole: {
        'software-engineering': 3,
        'data-ai': 3,
        'rd-engineering-design': 3,
        'chip-design-verification': 3,
        'business-operations': 3,
        'customer-operations': 3,
        'finance-accounting': 3,
        'risk-compliance': 3,
      },
    },
    peerCentres: { numGccs: 4, gccsInSector: 3, leadershipNetwork: 3 },
    officeMarket: { gradeASupply: 3, vacancy: 3, managedSupply: 4, fitOutLeadTime: 3 },
    policy: { stateIncentives: 3, sezIfsc: 2, easeOfRegistration: 3, labourRules: 3 },
    connectivity: { intlFlights: 2, domesticConnections: 3, airportToCbd: 3, powerInternet: 4 },
    living: { housingCost: 3, schoolsHealthcare: 4, safety: 4, commuteTime: 3 },
    climate: { floodHeatRisk: 4, airQuality: 3, disasterHistory: 4 },
    whyThisCity: {
      talent: 'Strong engineering and R&D talent, especially for product and automotive design.',
      cost: 'Mid-range costs, below Bengaluru and Mumbai.',
      peerCentres: 'A well-established base of engineering-led GCCs.',
      officeMarket: 'Steady Grade A and managed-space supply.',
      policy: 'Standard state IT policy support.',
      connectivity: 'Fewer direct international flights; well connected domestically.',
      living: 'A liveable city with good schools and a manageable commute.',
      climate: 'Temperate climate for most of the year.',
    },
    tradeOff: {
      strength: 'Strong R&D and engineering-design talent',
      weakness: 'Fewer direct international flights than the larger hubs',
    },
  },
  {
    id: 'chennai',
    name: 'Chennai',
    hasIfsc: false,
    talent: {
      seniorTalent: 4,
      attrition: 3,
      roleAvailability: {
        'software-engineering': 3,
        'data-ai': 3,
        'rd-engineering-design': 4,
        'chip-design-verification': 4,
        'business-operations': 3,
        'customer-operations': 4,
        'finance-accounting': 3,
        'risk-compliance': 3,
      },
    },
    cost: {
      officeRent: 3,
      seatPrice: 3,
      costOfLiving: 3,
      salaryByRole: {
        'software-engineering': 3,
        'data-ai': 3,
        'rd-engineering-design': 3,
        'chip-design-verification': 3,
        'business-operations': 3,
        'customer-operations': 3,
        'finance-accounting': 3,
        'risk-compliance': 3,
      },
    },
    peerCentres: { numGccs: 3, gccsInSector: 3, leadershipNetwork: 3 },
    officeMarket: { gradeASupply: 3, vacancy: 3, managedSupply: 3, fitOutLeadTime: 3 },
    policy: { stateIncentives: 3, sezIfsc: 2, easeOfRegistration: 3, labourRules: 3 },
    connectivity: { intlFlights: 3, domesticConnections: 3, airportToCbd: 3, powerInternet: 3 },
    living: { housingCost: 3, schoolsHealthcare: 3, safety: 4, commuteTime: 3 },
    climate: { floodHeatRisk: 2, airQuality: 3, disasterHistory: 3 },
    whyThisCity: {
      talent: 'Deep manufacturing, automotive and hardware engineering talent.',
      cost: 'Mid-range costs, competitive for engineering roles.',
      peerCentres: 'An established manufacturing and engineering GCC base.',
      officeMarket: 'Steady Grade A supply across the city.',
      policy: 'Standard state IT and industrial policy support.',
      connectivity: 'A major port and airport, well connected domestically.',
      living: 'Established schools and healthcare infrastructure.',
      climate: 'Coastal, with seasonal cyclone and flood risk.',
    },
    tradeOff: {
      strength: 'Deep manufacturing and hardware engineering talent',
      weakness: 'Higher monsoon flood and cyclone risk than most cities on the list',
    },
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    hasIfsc: false,
    talent: {
      seniorTalent: 5,
      attrition: 3,
      roleAvailability: {
        'finance-accounting': 5,
        'risk-compliance': 5,
        'business-operations': 4,
        'customer-operations': 3,
        'software-engineering': 3,
        'data-ai': 3,
        'rd-engineering-design': 2,
        'chip-design-verification': 2,
      },
    },
    cost: {
      officeRent: 1,
      seatPrice: 1,
      costOfLiving: 1,
      salaryByRole: {
        'finance-accounting': 1,
        'risk-compliance': 1,
        'business-operations': 2,
        'customer-operations': 2,
        'software-engineering': 2,
        'data-ai': 2,
        'rd-engineering-design': 2,
        'chip-design-verification': 2,
      },
    },
    peerCentres: { numGccs: 4, gccsInSector: 4, leadershipNetwork: 4 },
    officeMarket: { gradeASupply: 4, vacancy: 2, managedSupply: 4, fitOutLeadTime: 2 },
    policy: { stateIncentives: 3, sezIfsc: 2, easeOfRegistration: 3, labourRules: 2 },
    connectivity: { intlFlights: 5, domesticConnections: 5, airportToCbd: 2, powerInternet: 4 },
    living: { housingCost: 1, schoolsHealthcare: 4, safety: 3, commuteTime: 2 },
    climate: { floodHeatRisk: 2, airQuality: 2, disasterHistory: 3 },
    whyThisCity: {
      talent: 'India’s deepest finance, risk and compliance talent pool.',
      cost: 'India’s most expensive market for office space and salaries.',
      peerCentres: 'A strong base of financial-services and corporate GCCs.',
      officeMarket: 'Deep Grade A supply, with very tight vacancy.',
      policy: 'Standard state policy, without GIFT City’s IFSC benefits.',
      connectivity: 'The widest international network alongside Bengaluru and Delhi.',
      living: 'The highest housing costs on the list, offset by amenities.',
      climate: 'Monsoon flood risk is a recurring operational factor.',
    },
    tradeOff: {
      strength: 'The deepest finance and risk talent pool in India',
      weakness: 'The highest office rents, salaries and housing costs on the list',
    },
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    hasIfsc: false,
    talent: {
      seniorTalent: 5,
      attrition: 3,
      roleAvailability: {
        'business-operations': 5,
        'customer-operations': 4,
        'software-engineering': 4,
        'data-ai': 4,
        'finance-accounting': 4,
        'risk-compliance': 4,
        'rd-engineering-design': 3,
        'chip-design-verification': 2,
      },
    },
    cost: {
      officeRent: 2,
      seatPrice: 2,
      costOfLiving: 2,
      salaryByRole: {
        'business-operations': 2,
        'customer-operations': 3,
        'software-engineering': 2,
        'data-ai': 2,
        'finance-accounting': 2,
        'risk-compliance': 2,
        'rd-engineering-design': 3,
        'chip-design-verification': 3,
      },
    },
    peerCentres: { numGccs: 4, gccsInSector: 4, leadershipNetwork: 4 },
    officeMarket: { gradeASupply: 5, vacancy: 3, managedSupply: 5, fitOutLeadTime: 3 },
    policy: { stateIncentives: 3, sezIfsc: 2, easeOfRegistration: 3, labourRules: 3 },
    connectivity: { intlFlights: 5, domesticConnections: 5, airportToCbd: 3, powerInternet: 4 },
    living: { housingCost: 2, schoolsHealthcare: 4, safety: 3, commuteTime: 2 },
    climate: { floodHeatRisk: 2, airQuality: 1, disasterHistory: 3 },
    whyThisCity: {
      talent: 'A very large, broad talent pool across business functions.',
      cost: 'Costs below Bengaluru and Mumbai for most roles.',
      peerCentres: 'A large and diverse base of GCCs across sectors.',
      officeMarket: 'The largest Grade A supply of any city on the list.',
      policy: 'Standard state policy, without GIFT City’s IFSC benefits.',
      connectivity: 'India’s busiest international gateway.',
      living: 'Wide choice of housing and schools, offset by traffic and air quality.',
      climate: 'Poor winter air quality is a well-documented seasonal factor.',
    },
    tradeOff: {
      strength: 'India’s largest Grade A office market and international gateway',
      weakness: 'The worst air quality on the list, especially in winter',
    },
  },
  {
    id: 'kochi',
    name: 'Kochi',
    hasIfsc: false,
    talent: {
      seniorTalent: 2,
      attrition: 3,
      roleAvailability: {
        'software-engineering': 3,
        'data-ai': 2,
        'customer-operations': 3,
        'business-operations': 2,
        'finance-accounting': 2,
        'risk-compliance': 2,
        'rd-engineering-design': 2,
        'chip-design-verification': 1,
      },
    },
    cost: {
      officeRent: 4,
      seatPrice: 4,
      costOfLiving: 4,
      salaryByRole: {
        'software-engineering': 4,
        'data-ai': 4,
        'customer-operations': 4,
        'business-operations': 4,
        'finance-accounting': 4,
        'risk-compliance': 4,
        'rd-engineering-design': 4,
        'chip-design-verification': 4,
      },
    },
    peerCentres: { numGccs: 2, gccsInSector: 2, leadershipNetwork: 2 },
    officeMarket: { gradeASupply: 2, vacancy: 4, managedSupply: 3, fitOutLeadTime: 4 },
    policy: { stateIncentives: 3, sezIfsc: 3, easeOfRegistration: 3, labourRules: 3 },
    connectivity: { intlFlights: 2, domesticConnections: 3, airportToCbd: 3, powerInternet: 3 },
    living: { housingCost: 4, schoolsHealthcare: 3, safety: 4, commuteTime: 4 },
    climate: { floodHeatRisk: 2, airQuality: 4, disasterHistory: 3 },
    whyThisCity: {
      talent: 'A smaller but growing pool of IT and operations talent.',
      cost: 'Among the lowest costs on the list.',
      peerCentres: 'An emerging SEZ-based IT and GCC presence.',
      officeMarket: 'A smaller Grade A market, with fast fit-out turnaround.',
      policy: 'State IT policy support and established SEZ infrastructure.',
      connectivity: 'Fewer direct international routes than the larger hubs.',
      living: 'Good air quality and an easy commute.',
      climate: 'Coastal, with monsoon flood risk to monitor.',
    },
    tradeOff: {
      strength: 'Among the lowest costs on the list, with good air quality',
      weakness: 'A smaller talent pool and few peer GCCs to date',
    },
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    hasIfsc: false,
    talent: {
      seniorTalent: 2,
      attrition: 3,
      roleAvailability: {
        'customer-operations': 3,
        'business-operations': 3,
        'software-engineering': 2,
        'data-ai': 2,
        'finance-accounting': 2,
        'risk-compliance': 2,
        'rd-engineering-design': 2,
        'chip-design-verification': 1,
      },
    },
    cost: {
      officeRent: 5,
      seatPrice: 5,
      costOfLiving: 5,
      salaryByRole: {
        'customer-operations': 5,
        'business-operations': 5,
        'software-engineering': 5,
        'data-ai': 5,
        'finance-accounting': 5,
        'risk-compliance': 5,
        'rd-engineering-design': 5,
        'chip-design-verification': 5,
      },
    },
    peerCentres: { numGccs: 1, gccsInSector: 1, leadershipNetwork: 1 },
    officeMarket: { gradeASupply: 2, vacancy: 4, managedSupply: 2, fitOutLeadTime: 4 },
    policy: { stateIncentives: 3, sezIfsc: 2, easeOfRegistration: 3, labourRules: 3 },
    connectivity: { intlFlights: 2, domesticConnections: 3, airportToCbd: 4, powerInternet: 3 },
    living: { housingCost: 5, schoolsHealthcare: 3, safety: 4, commuteTime: 4 },
    climate: { floodHeatRisk: 2, airQuality: 3, disasterHistory: 4 },
    whyThisCity: {
      talent: 'A growing talent pool for operations and support functions.',
      cost: 'The lowest costs of any city on the list.',
      peerCentres: 'Very few GCCs today — an early-mover opportunity.',
      officeMarket: 'A small but low-cost Grade A market.',
      policy: 'State incentives for IT and services investment.',
      connectivity: 'Good domestic links; fewer direct international routes.',
      living: 'The lowest housing costs on the list.',
      climate: 'Low flood risk, with high summer heat.',
    },
    tradeOff: {
      strength: 'The lowest costs of any city on the list',
      weakness: 'Very few peer GCCs and a smaller senior talent pool',
    },
  },
];

export interface LocationFinderInput {
  industry: IndustryId;
  targetHeadcountYear3: number;
  hqRegion: HqRegionId;
  roles: RoleId[];
  giftCityNeed: GiftCityNeed;
  weights: Record<FactorId, number>;
}

// Input defaults (Part D1 "Inputs" table).
export const LOCATION_INPUT_DEFAULTS: LocationFinderInput = {
  industry: 'technology-saas',
  targetHeadcountYear3: 200,
  hqRegion: 'us',
  roles: ['software-engineering'],
  giftCityNeed: 'not-sure',
  weights: DEFAULT_WEIGHTS,
};

export const HEADCOUNT_RANGE = { min: 25, max: 2000 };
