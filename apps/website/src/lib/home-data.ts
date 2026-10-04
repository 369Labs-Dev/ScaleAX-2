// Homepage content — W8 green redesign. Copy is taken verbatim from the
// approved reference homepage (https://site-hazel-gamma-44.vercel.app/)
// unless noted; every link is re-pointed at OUR routes. Figures the user's
// approved mock specified are used as given (see HOME_STATS).

export interface ProofTile {
  figure: string;
  label: string;
}

// Hero proof tiles (reference: under the CTAs).
export const HERO_PROOF: ProofTile[] = [
  { figure: '1.5M+', label: 'sq. ft. managed' },
  { figure: '10+', label: 'cities' },
  { figure: '30 to 90', label: 'days to operational' },
];

// Four-stat row under the claim band. Values per the user's approved mock
// (the live reference shows 60+ / 1.5M+ / 10+ / 250+ here).
export const HOME_STATS: ProofTile[] = [
  { figure: '34+', label: 'Years of combined leadership experience' },
  { figure: '0.8M+', label: 'Sq. ft. of workspace under management' },
  { figure: '6+', label: 'Cities with an active presence' },
  { figure: '140+', label: 'Enterprises served across the JV network' },
];

export interface RouteLink {
  label: string;
  url: string;
}

export interface Offering {
  id: string;
  title: string;
  line: string;
  /** What the pillar covers, in the words of the pages that deliver it. */
  points: string[];
  /** Where this pillar lives on our site (the reference links to /what-we-offer#id). */
  links: RouteLink[];
}

// "Every function a centre needs, delivered by one team." — six pillars
// (reference titles and one-liners), each expanding to our pages for it.
export const OFFERINGS: Offering[] = [
  {
    id: 'advisory',
    title: 'Advisory & Location Strategy',
    line: 'Business case, city, operating model.',
    points: [
      'What the centre is for, and how its success will be measured.',
      'City, micro-market and building shortlist.',
      'Five-year cost model and payback.',
    ],
    links: [
      { label: 'Consulting', url: '/solutions/consulting' },
      { label: 'Plan: strategy and business case', url: '/how-we-work/plan' },
      { label: 'Location Finder', url: '/location' },
    ],
  },
  {
    id: 'enablement',
    title: 'Enablement & Compliance',
    line: 'Entity, finance, tax and law, run locally.',
    points: [
      'PAN, TAN, GST, LUT, Shops and Establishments, professional tax.',
      'Intercompany agreements, benchmarking, Form 3CEB and documentation.',
      'Chart of accounts, ERP, approval rules and month-end calendar.',
    ],
    links: [
      { label: 'Tax, legal and compliance', url: '/solutions/tax-legal-compliance' },
      { label: 'Finance and accounting', url: '/solutions/finance-accounting' },
      { label: 'GIFT City', url: '/gift-city' },
    ],
  },
  {
    id: 'talent',
    title: 'Talent',
    line: 'GCC-grade hiring across every level.',
    points: [
      'Roles, grades, timing and budget for the first 12 months.',
      'Direct sourcing, referrals, campuses and specialist networks.',
      'Retained search for site leaders and function heads.',
    ],
    links: [
      { label: 'Talent', url: '/solutions/talent' },
      { label: 'HR and payroll', url: '/solutions/hr-payroll' },
    ],
  },
  {
    id: 'workspace',
    title: 'Workspace & IT',
    line: 'Enterprise-grade offices in 10+ cities.',
    points: [
      'A dedicated floor or wing in a managed centre, branded for you.',
      'Layout, interiors, furniture, meeting rooms and commissioning.',
      'Switching, Wi-Fi, firewall and two independent internet links.',
    ],
    links: [
      { label: 'Real estate and workspace', url: '/solutions/real-estate' },
      { label: 'IT and security', url: '/solutions/it-security' },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery Incubation',
    line: 'Value before the last desk is installed.',
    points: [
      'Office found, designed, built and ready for move-in.',
      'Hiring plan, first leaders, first team and an India careers presence.',
      'One plan, one project lead, weekly status and a clear escalation route.',
    ],
    links: [
      { label: 'Build: entity to first day', url: '/how-we-work/build' },
      { label: 'Run: day-to-day operations', url: '/how-we-work/run' },
    ],
  },
  {
    id: 'transformation',
    title: 'Transformation',
    line: 'From execution hub to value creator.',
    points: [
      'Takes full ownership of processes and improves them.',
      'Accountable for business results, not just tasks.',
      'Leads work for the whole group and develops new capabilities.',
    ],
    links: [
      { label: 'Grow: scale up or take it over', url: '/how-we-work/grow' },
      { label: 'Engagement models', url: '/models' },
    ],
  },
];

export interface ModelCard {
  id: string;
  name: string;
  tagline: string;
  url: string;
}

// "Four ways to work with us." — reference order and taglines; model NAMES
// stay ours so they match /models (reference "Assisted Build" = our
// Assisted set-up, "Pay-as-you-expand" = our Managed seats).
export const HOME_MODELS: ModelCard[] = [
  {
    id: 'assisted',
    name: 'Assisted set-up',
    tagline: 'You own. We co-pilot.',
    url: '/models#assisted',
  },
  {
    id: 'bot',
    name: 'Build-Operate-Transfer',
    tagline: 'We build and run it. You take over.',
    url: '/models#bot',
  },
  {
    id: 'managed-seats',
    name: 'Managed seats',
    tagline: 'Start small. Scale on demand.',
    url: '/models#managed-seats',
  },
  {
    id: 'eor',
    name: 'Employer of Record',
    tagline: 'Hire in India. No entity required.',
    url: '/models#eor',
  },
];

export interface IndiaStat {
  figure: string;
  title: string;
  body: string;
}

// "Why India is the default answer." — reference copy.
export const WHY_INDIA: IndiaStat[] = [
  {
    figure: '1,500+',
    title: 'GCCs already operating in India',
    body: 'Over 60% of Fortune 500 companies run a capability centre here.',
  },
  {
    figure: '1.3M+',
    title: 'professionals employed in GCCs',
    body: "The world's largest youth population and second largest English-speaking talent pool.",
  },
  {
    figure: '90%',
    title: 'lower real estate cost',
    body: 'USD 0.8 to 1.0 per sq. ft. against USD 8 to 10 in the US and Europe.',
  },
  {
    figure: '63rd',
    title: 'ease of doing business rank',
    body: 'Up from 142nd in 2014, with relaxed FDI norms and stronger investment infrastructure.',
  },
];

export interface PlatformPartner {
  name: string;
  description: string;
  url: string;
  logo: string;
  logoHeight: number;
  stats: ProofTile[];
}

// "Three specialists. One integrated platform." — reference descriptions,
// links and card order; the numbers are the brief's confirmed Section 9
// figures (identical to PARTNER_FIRMS below).
export const PLATFORM_PARTNERS: PlatformPartner[] = [
  {
    name: 'Awfficacy Global',
    description:
      'Strategic navigator for corporate finance, business process and international regulatory outsourcing.',
    url: 'https://www.awfficacyglobal.com/',
    logo: '/firms/awfficacy.svg',
    logoHeight: 44,
    stats: [
      { figure: '25+', label: 'years combined experience' },
      { figure: '70+', label: 'clients served' },
      { figure: '15+', label: 'sector expertise' },
    ],
  },
  {
    name: 'DevX',
    description:
      'Managed workspace provider spanning the full value chain of space and innovation from day zero.',
    url: 'https://www.devx.work/',
    logo: '/firms/devx.svg',
    logoHeight: 30,
    stats: [
      { figure: '1.5M+', label: 'sq. ft. managed workspace' },
      { figure: '12,000+', label: 'professionals in the network' },
      { figure: '250+', label: 'enterprises across industries' },
    ],
  },
  {
    name: 'Savvy Group',
    description:
      'Progressive construction group changing the paradigm of the business through technology.',
    url: 'https://www.savvygroup.in/',
    logo: '/firms/savvy.png',
    logoHeight: 52,
    stats: [
      { figure: '10M+', label: 'sq. ft. under development' },
      { figure: '25+', label: 'years of construction' },
      { figure: '5,000+', label: 'customers' },
    ],
  },
];

export interface Testimonial {
  quote: string;
  /** PLACEHOLDER — the reference itself shows "Client name"; pending real, cleared quotes. */
  name: string;
  role: string;
}

// "What clients say once the centre is running." — PLACEHOLDER testimonials.
// The quotes and roles are the reference design's sample copy and the names
// are its own "Client name" placeholders. They must be replaced with real,
// cleared client quotes (with written permission) before launch; the section
// labels itself as sample content on the page until then.
export const TESTIMONIALS_ARE_PLACEHOLDERS = true;
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We had a signed lease, a hiring plan and a compliance calendar in the time it took our previous vendor to send a proposal. The centre was live in eleven weeks.',
    name: 'Client name',
    role: 'Chief Technology Officer, US fintech',
  },
  {
    quote:
      'One team owned everything, so we never had to referee between a broker, a recruiter and a law firm.',
    name: 'Client name',
    role: 'VP Engineering, UK healthcare SaaS',
  },
  {
    quote:
      'The transfer at month 30 was uneventful, which is exactly what you want from a build-operate-transfer.',
    name: 'Client name',
    role: 'COO, Australian logistics group',
  },
];

export interface PartnerFirm {
  name: string;
  role: string;
  description: string;
  logo: string;
  logoHeight: number;
  stats: string[];
}

// Section 9 — "The firms behind ScaleAX" (used on /about and in the
// homepage proof band). Only the three firms the brief gives confirmed
// numbers for; the optional Dev IT / Talati & Talati tiles are marked
// "[if...]" in the brief and are omitted rather than invented.
export const PARTNER_FIRMS: PartnerFirm[] = [
  {
    name: 'Savvy Group',
    role: 'We build it',
    logo: '/firms/savvy.png',
    logoHeight: 52,
    description: 'Construction and real estate development.',
    stats: ['10M+ sq. ft. under development', '25+ years', '5,000+ customers'],
  },
  {
    name: 'DevX',
    role: 'We run the workspace',
    logo: '/firms/devx.svg',
    logoHeight: 30,
    description: 'Managed offices and workspace operations.',
    stats: ['1.5M+ sq. ft. managed', '12,000+ professionals', '250+ companies'],
  },
  {
    name: 'Awfficacy Global',
    role: 'We keep the books and filings',
    logo: '/firms/awfficacy.svg',
    logoHeight: 44,
    description: 'Finance, accounting and regulatory outsourcing for international clients.',
    stats: ['25+ years', '70+ clients', '15+ sectors'],
  },
];
