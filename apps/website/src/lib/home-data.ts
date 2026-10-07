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
  { figure: '60M+', label: 'Workspace Ecosystem' },
  { figure: '14+', label: 'Cities' },
  { figure: '30 to 90', label: 'days to operational' },
];

// Four-stat row under the claim band. Values per the user's approved mock
// (the live reference shows 60+ / 1.5M+ / 10+ / 250+ here).
export const HOME_STATS: ProofTile[] = [
  { figure: '34+', label: 'Years of combined leadership experience' },
  { figure: '60M+', label: 'Sq. ft. of workspace under management' },
  { figure: '14+', label: 'Cities with an active presence' },
  { figure: '350+', label: 'Enterprises served across the JV network' },
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
    line: 'Hiring from first site leader to full team.',
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
    line: 'Enterprise-grade offices in 14+ cities.',
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
    line: 'Your first team starts work while the office is being finished.',
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
    line: 'Your India team takes on more of the work and owns the results.',
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

export interface ClientLogo {
  name: string;
  src: string;
}

export interface PlatformPartner {
  name: string;
  description: string;
  url: string;
  logo: string;
  logoHeight: number;
  stats: ProofTile[];
  /** Enterprises this firm serves, shown as a logo row under it. */
  clients: ClientLogo[];
}

const numbered = (dir: string, names: string[]): ClientLogo[] =>
  names.map((name, i) => ({ name, src: `/partners/${dir}/${dir}-${i + 1}.png` }));

// Client logos per firm, as on the previous scaleax.com. Permission to
// display each enterprise's logo is ScaleAX's to confirm before launch.
const AWFFICACY_CLIENTS = numbered('awfficacy', [
  'Zydus Wellness',
  'Arvind',
  'Trent',
  'Kraft Heinz',
  'Hindalco',
  'Amul',
  'Blue Star',
  'Wockhardt',
]);

const DEVX_CLIENTS = numbered('devx', [
  'BASF',
  'Horizontal',
  'Savills',
  'Tim Hortons',
  'Persistent',
  'HDFC Credila',
  'DCB Bank',
  'Red Nucleus',
  'WhiteOak Capital',
  'Growfitter',
  'Darwinbox',
  'Menlo Technologies',
  'ClearTax',
  'QX Global Group',
  'PayMe India',
  'Schneider Electric',
]);

const SAVVY_CLIENTS: ClientLogo[] = [
  { name: 'Bank of America', src: '/partners/bank-of-america.png' },
  { name: 'Yes Bank', src: '/partners/yes-bank.png' },
  { name: 'Groww', src: '/partners/groww.png' },
  { name: 'Suzuki', src: '/partners/suzuki.png' },
  { name: 'ITC Limited', src: '/partners/itc-limited.png' },
  { name: 'ICICI Prudential', src: '/partners/icici.png' },
  { name: 'HDFC Bank', src: '/partners/hdfc.png' },
  { name: 'Schneider Electric', src: '/partners/schneider.png' },
  { name: 'Samsung', src: '/partners/samsung.png' },
  { name: 'PwC', src: '/partners/pwc.png' },
  { name: 'Deloitte', src: '/partners/deloitte.png' },
];

// "Three specialists. One integrated platform." — the three joint-venture
// firms plus the construction partner, each with the enterprises it serves.
export const PLATFORM_PARTNERS: PlatformPartner[] = [
  {
    name: 'Awfficacy Global',
    description: 'Runs finance, accounting and regulatory filings for international companies.',
    url: 'https://www.awfficacyglobal.com/',
    logo: '/firms/awfficacy.svg',
    logoHeight: 44,
    stats: [
      { figure: '25+', label: 'years combined experience' },
      { figure: '70+', label: 'clients served' },
      { figure: '15+', label: 'sector expertise' },
    ],
    clients: AWFFICACY_CLIENTS,
  },
  {
    name: 'DevX',
    description: 'Designs, builds and runs managed offices for growing companies.',
    url: 'https://www.devx.work/',
    logo: '/firms/devx.svg',
    logoHeight: 30,
    stats: [
      { figure: '3M+', label: 'sq. ft. managed workspace' },
      { figure: '25k+', label: 'professionals in the network' },
      { figure: '350+', label: 'enterprises across industries' },
    ],
    clients: DEVX_CLIENTS,
  },
  {
    name: 'Dev IT',
    description: 'Sets up and runs IT infrastructure, cloud and 24/7 cybersecurity.',
    url: 'https://www.devitpl.com/',
    logo: '/firms/devit.png',
    logoHeight: 30,
    stats: [
      { figure: '1,500+', label: 'engineers' },
      { figure: '4,000+', label: 'projects delivered' },
      { figure: '10+', label: 'global locations' },
    ],
    clients: [],
  },
  {
    name: 'Savvy Group',
    description: 'Builds and develops commercial real estate.',
    url: 'https://www.savvygroup.in/',
    logo: '/firms/savvy.png',
    logoHeight: 52,
    stats: [
      { figure: '60M+', label: 'sq. ft. under development' },
      { figure: '30+', label: 'years of construction' },
      { figure: '5,000+', label: 'customers' },
    ],
    clients: SAVVY_CLIENTS,
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
// Kept for internal use only for now (client request): the section is not
// rendered on the public site until real, cleared quotes replace the samples.
export const SHOW_TESTIMONIALS = false;
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
  description: string;
  logo: string;
  logoHeight: number;
  stats: string[];
}

// "Part of a wider platform" — the ecosystem firms shown on /about.
export const PARTNER_FIRMS: PartnerFirm[] = [
  {
    name: 'Savvy Group',
    logo: '/firms/savvy.png',
    logoHeight: 52,
    description:
      'Savvy is a progressive construction company that believes in changing the paradigm of the construction business by adopting innovative technologies. Within a decade, Savvy established a strong foothold and reliable reputation in the densely saturated construction market of Ahmedabad.',
    stats: ['60M+ sq. ft. under development', '30+ years', '5,000+ customers'],
  },
  {
    name: 'DevX',
    logo: '/firms/devx.svg',
    logoHeight: 30,
    description:
      'DevX is a managed workspace provider having its wings spread to multiple avenues of the value chain within the space and innovation well-aligned with the fundamentals of the business from day Zero.',
    stats: ['3M+ sq. ft. managed', '25k+ professionals', '350+ companies', '14+ cities'],
  },
  {
    name: 'Dev IT',
    logo: '/firms/devit.png',
    logoHeight: 40,
    description: 'Dev IT sets up and runs IT infrastructure, cloud and 24/7 cybersecurity.',
    stats: ['1,500+ engineers', '4,000+ projects delivered', '10+ global locations'],
  },
  {
    name: 'Awfficacy Global',
    logo: '/firms/awfficacy.svg',
    logoHeight: 44,
    description:
      'Awfficacy Global serves as strategic navigator for businesses of all sizes, guiding them through the intricacies of the global marketplace. We achieve this through a comprehensive suite of outsourcing services encompassing Corporate Finance, Business Processes, and international Regulations.',
    stats: ['35+ years', '70+ clients', '15+ sectors'],
  },
];
