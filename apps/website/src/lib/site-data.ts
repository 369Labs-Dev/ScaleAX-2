// Site structure data — Website Brief v3, Part 0.
// Central source for the sitemap, main menu, and "Where next" link cards (0.4)
// so route skeleton and components stay consistent with the brief.

export type CardId =
  | 'plan'
  | 'build'
  | 'run'
  | 'grow'
  | 'consulting'
  | 'real-estate'
  | 'it-security'
  | 'talent'
  | 'hr-payroll'
  | 'tax-legal-compliance'
  | 'finance-accounting'
  | 'models'
  | 'gift-city'
  | 'about'
  | 'location'
  | 'calculator';

export interface WhereNextCard {
  eyebrow: string;
  title: string;
  url: string;
  icon: string; // lucide-react icon name, see WhereNext component
}

// Part 0.4 — card text and links for each destination.
export const WHERE_NEXT_CARDS: Record<CardId, WhereNextCard> = {
  plan: {
    eyebrow: 'PLAN',
    title: 'Strategy, location and business case',
    url: '/how-we-work/plan',
    icon: 'compass',
  },
  build: {
    eyebrow: 'BUILD',
    title: 'Entity, people, workplace & technology',
    url: '/how-we-work/build',
    icon: 'hammer',
  },
  run: {
    eyebrow: 'RUN',
    title: 'Day-to-day operations, finance & compliance',
    url: '/how-we-work/run',
    icon: 'settings',
  },
  grow: {
    eyebrow: 'GROW',
    title: 'Scale, optimise or transition to your team',
    url: '/how-we-work/grow',
    icon: 'trending-up',
  },
  consulting: {
    eyebrow: 'Consulting',
    title: 'Choose the right city, model & economics',
    url: '/solutions/consulting',
    icon: 'lightbulb',
  },
  'real-estate': {
    eyebrow: 'Real estate and workspace',
    title: 'Offices found, built and run',
    url: '/solutions/real-estate',
    icon: 'building-2',
  },
  'it-security': {
    eyebrow: 'IT and security',
    title: 'IT infrastructure, security & connectivity',
    url: '/solutions/it-security',
    icon: 'server',
  },
  talent: {
    eyebrow: 'Talent',
    title: 'Hiring from first leader to full team',
    url: '/solutions/talent',
    icon: 'users',
  },
  'hr-payroll': {
    eyebrow: 'HR and payroll',
    title: 'People operations that run on time',
    url: '/solutions/hr-payroll',
    icon: 'id-card',
  },
  'tax-legal-compliance': {
    eyebrow: 'Tax, legal and compliance',
    title: 'Entity, tax, legal & regulatory setup',
    url: '/solutions/tax-legal-compliance',
    icon: 'scale',
  },
  'finance-accounting': {
    eyebrow: 'Finance and accounting',
    title: 'Books to Boardroom reports, every month',
    url: '/solutions/finance-accounting',
    icon: 'calculator',
  },
  models: {
    eyebrow: 'Engagement models',
    title: 'Choose how much you own, and when',
    url: '/models',
    icon: 'layers',
  },
  'gift-city': {
    eyebrow: 'GIFT City',
    title: "Set up in India's international finance centre",
    url: '/gift-city',
    icon: 'landmark',
  },
  about: { eyebrow: 'ABOUT', title: 'Our team and story', url: '/about', icon: 'users-round' },
  location: {
    eyebrow: 'Location Finder',
    title: 'Compare Indian cities for your centre',
    url: '/location',
    icon: 'map-pin',
  },
  calculator: {
    eyebrow: 'Cost calculator',
    title: 'What your team would cost in India',
    url: '/calculator',
    icon: 'calculator',
  },
};

// Part 0.4 — which four cards appear on each page.
export const WHERE_NEXT_BY_PAGE: Record<string, CardId[]> = {
  about: ['plan', 'consulting', 'models', 'calculator'],
  plan: ['build', 'consulting', 'location', 'calculator'],
  build: ['run', 'real-estate', 'tax-legal-compliance', 'talent'],
  run: ['grow', 'hr-payroll', 'finance-accounting', 'it-security'],
  grow: ['models', 'consulting', 'plan', 'about'],
  consulting: ['plan', 'location', 'models', 'about'],
  'real-estate': ['build', 'it-security', 'location', 'gift-city'],
  'it-security': ['build', 'run', 'real-estate', 'tax-legal-compliance'],
  talent: ['hr-payroll', 'build', 'run', 'calculator'],
  'hr-payroll': ['talent', 'tax-legal-compliance', 'run', 'finance-accounting'],
  'tax-legal-compliance': ['finance-accounting', 'gift-city', 'build', 'models'],
  'finance-accounting': ['tax-legal-compliance', 'run', 'hr-payroll', 'about'],
  models: ['grow', 'calculator', 'plan', 'about'],
  'gift-city': ['tax-legal-compliance', 'location', 'models', 'consulting'],
  location: ['real-estate', 'gift-city', 'calculator', 'plan'],
  calculator: ['models', 'location', 'plan', 'talent'],
  // Insights, News, Careers, Contact share the same four cards (0.4).
  insights: ['plan', 'models', 'location', 'calculator'],
  news: ['plan', 'models', 'location', 'calculator'],
  careers: ['plan', 'models', 'location', 'calculator'],
  contact: ['plan', 'models', 'location', 'calculator'],
};

export interface LifecycleStage {
  id: CardId;
  label: string;
  url: string;
}

// Part C6 — lifecycle strip: Plan, Build, Run, Grow.
export const LIFECYCLE_STAGES: LifecycleStage[] = [
  { id: 'plan', label: 'Plan', url: '/how-we-work/plan' },
  { id: 'build', label: 'Build', url: '/how-we-work/build' },
  { id: 'run', label: 'Run', url: '/how-we-work/run' },
  { id: 'grow', label: 'Grow', url: '/how-we-work/grow' },
];

export interface MenuLink {
  label: string;
  summary: string;
  url: string;
  icon?: string; // lucide-react icon name, see icon-map.tsx — mega menu links only (Part C6)
}

// Part 0.2 — main menu. "How we work" mega menu: four stage columns, each
// with an icon + one-line summary (0.2 / C6).
export const HOW_WE_WORK_MENU: MenuLink[] = [
  {
    label: 'Plan',
    summary: 'Strategy, location and business case',
    url: '/how-we-work/plan',
    icon: 'compass',
  },
  {
    label: 'Build',
    summary: 'Entity, people, workplace & technology',
    url: '/how-we-work/build',
    icon: 'hammer',
  },
  {
    label: 'Run',
    summary: 'Day-to-day operations, finance & compliance',
    url: '/how-we-work/run',
    icon: 'settings',
  },
  {
    label: 'Grow',
    summary: 'Scale, optimise or transition to your team',
    url: '/how-we-work/grow',
    icon: 'trending-up',
  },
];

// "Solutions" mega menu: two link columns (split in the header component)
// plus a Location Finder promo panel (0.2).
export const SOLUTIONS_MENU: MenuLink[] = [
  {
    label: 'Consulting',
    summary: 'Choose the right city, model & economics',
    url: '/solutions/consulting',
    icon: 'lightbulb',
  },
  {
    label: 'Real estate and workspace',
    summary: 'Offices found, built and run',
    url: '/solutions/real-estate',
    icon: 'building-2',
  },
  {
    label: 'IT and security',
    summary: 'IT infrastructure, security & connectivity',
    url: '/solutions/it-security',
    icon: 'server',
  },
  {
    label: 'Talent',
    summary: 'Hiring from first leader to full team',
    url: '/solutions/talent',
    icon: 'users',
  },
  {
    label: 'HR and payroll',
    summary: 'People operations that run on time',
    url: '/solutions/hr-payroll',
    icon: 'id-card',
  },
  {
    label: 'Tax, legal and compliance',
    summary: 'Entity, tax, legal & regulatory setup',
    url: '/solutions/tax-legal-compliance',
    icon: 'scale',
  },
  {
    label: 'Finance and accounting',
    summary: 'Books to Boardroom reports, every month',
    url: '/solutions/finance-accounting',
    icon: 'calculator',
  },
];

// "Engagement models" menu — simple dropdown, no icons/mega layout (0.2).
export const ENGAGEMENT_MODELS_MENU: MenuLink[] = [
  {
    label: 'Build-Operate-Transfer',
    summary: 'Start on our entity, take it over on your terms',
    url: '/models#bot',
  },
  { label: 'Assisted set-up', summary: 'We set it up, you run it', url: '/models#assisted' },
  {
    label: 'Managed seats',
    summary: 'No fit-out, no upfront capital',
    url: '/models#managed-seats',
  },
  {
    label: 'Employer of Record',
    summary: 'Hire in India. No entity required.',
    url: '/models#eor',
  },
];

// "GIFT City" menu: the hub is split into one page per part.
export const GIFT_CITY_MENU: MenuLink[] = [
  { label: 'Overview', summary: 'What ScaleAX does in GIFT City', url: '/gift-city' },
  { label: 'Why GIFT City', summary: 'Regulator, currency and tax regime', url: '/gift-city/why' },
  { label: 'IFSC set-up', summary: 'Licence routes and timelines', url: '/gift-city/ifsc-set-up' },
  { label: 'Facilities', summary: 'Services around the office', url: '/gift-city/facilities' },
  { label: 'Jobs', summary: 'Open roles at GIFT City employers', url: '/gift-city/jobs' },
  { label: 'FAQ', summary: 'Common questions answered', url: '/gift-city/faq' },
];

// "Insights" menu — simple dropdown (0.2).
export const INSIGHTS_MENU: MenuLink[] = [
  { label: 'Articles', summary: 'Analysis on GCCs in India', url: '/insights' },
  { label: 'News', summary: 'ScaleAX announcements', url: '/news' },
];

// Full sitemap — Part 0.1. Used by the smoke test and available for nav/footer.
export const SITE_ROUTES: string[] = [
  '/',
  '/about',
  '/how-we-work/plan',
  '/how-we-work/build',
  '/how-we-work/run',
  '/how-we-work/grow',
  '/solutions/consulting',
  '/solutions/real-estate',
  '/solutions/it-security',
  '/solutions/talent',
  '/solutions/hr-payroll',
  '/solutions/tax-legal-compliance',
  '/solutions/finance-accounting',
  '/models',
  '/gift-city',
  '/gift-city/why',
  '/gift-city/ifsc-set-up',
  '/gift-city/facilities',
  '/gift-city/jobs',
  '/gift-city/faq',
  '/location',
  '/calculator',
  '/insights',
  '/news',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
];

// "Book a consultation" opens ScaleAX's Microsoft Bookings page (supplied by
// ScaleAX, October 2026) rather than the contact form.
export const BOOKING_URL =
  'https://bookings.cloud.microsoft/bookwithme/user/e0d00f350bdd45c88df40d2b4120b482@scaleax.com/meetingtype/XfokVj_kK0Wi9-vLEd7Z0Q2?anonymous&ismsaljsauthenabled&ep=mLinkFromTile';

export interface OfficeLocation {
  name: string;
  address?: string;
  /** Google Maps search query: an address or "lat,lng". */
  map?: string;
}

export interface OfficeCity {
  city: string;
  offices: OfficeLocation[];
}

// Where ScaleAX works from, as supplied by ScaleAX (October 2026). Buildings
// without a street address carry the coordinates of the supplied map pin.
export const LOCATIONS: OfficeCity[] = [
  {
    city: 'Ahmedabad',
    offices: [
      {
        name: 'Ambica Chambers',
        address: '1st Floor, Ambica Chambers, Near Old High Court, Ahmedabad, Gujarat 380009',
        map: 'Ambica Chambers, Near Old High Court, Ahmedabad, Gujarat 380009',
      },
      {
        name: 'The First',
        address:
          'C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot, Nr. Shivalik High-Street, Vastrapur, Ahmedabad, Gujarat 380015',
        map: 'The First, Vastrapur, Ahmedabad, Gujarat 380015',
      },
    ],
  },
  {
    city: 'GIFT City, Gandhinagar',
    offices: [
      {
        name: 'GIFT City',
        address: 'Gujarat International Finance Tec-City, Gandhinagar, Gujarat 382050',
        map: '5M6H+5CG Gujarat International Finance Tec-City, Gujarat 382050',
      },
    ],
  },
  {
    city: 'Pune',
    offices: [
      { name: 'ABZ', map: '18.5638264,73.7764783' },
      { name: 'ICC', map: '18.5356883,73.829868' },
      { name: 'SBH' },
    ],
  },
  {
    city: 'Delhi NCR',
    offices: [
      { name: 'Jask Tower', map: '28.5431334,77.3298234' },
      { name: 'Embassy Galaxy Business Park', map: 'Embassy Galaxy Business Park, Noida' },
    ],
  },
  {
    city: 'Hyderabad',
    offices: [
      { name: 'Purva Summit', map: 'Purva Summit, Hyderabad' },
      {
        name: 'Laxmi Pinnacle',
        map: 'Laxmi Pinnacle, Venkat Nagar, Banjara Hills, Hyderabad, Telangana 500034',
      },
    ],
  },
];
