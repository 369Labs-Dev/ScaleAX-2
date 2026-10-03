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
    title: 'From entity to first day in the office',
    url: '/how-we-work/build',
    icon: 'hammer',
  },
  run: {
    eyebrow: 'RUN',
    title: 'Day-to-day operations, owned by us',
    url: '/how-we-work/run',
    icon: 'settings',
  },
  grow: {
    eyebrow: 'GROW',
    title: 'Scale up, or take it over',
    url: '/how-we-work/grow',
    icon: 'trending-up',
  },
  consulting: {
    eyebrow: 'CONSULTING',
    title: 'Advice before you commit',
    url: '/solutions/consulting',
    icon: 'lightbulb',
  },
  'real-estate': {
    eyebrow: 'REAL ESTATE AND WORKSPACE',
    title: 'Offices found, built and run',
    url: '/solutions/real-estate',
    icon: 'building-2',
  },
  'it-security': {
    eyebrow: 'IT AND SECURITY',
    title: 'Network, devices and security from day one',
    url: '/solutions/it-security',
    icon: 'server',
  },
  talent: {
    eyebrow: 'TALENT',
    title: 'Hiring from first leader to full team',
    url: '/solutions/talent',
    icon: 'users',
  },
  'hr-payroll': {
    eyebrow: 'HR AND PAYROLL',
    title: 'People operations that run on time',
    url: '/solutions/hr-payroll',
    icon: 'id-card',
  },
  'tax-legal-compliance': {
    eyebrow: 'TAX, LEGAL AND COMPLIANCE',
    title: 'Entity, tax and filings, handled',
    url: '/solutions/tax-legal-compliance',
    icon: 'scale',
  },
  'finance-accounting': {
    eyebrow: 'FINANCE AND ACCOUNTING',
    title: 'Books closed on time, every month',
    url: '/solutions/finance-accounting',
    icon: 'calculator',
  },
  models: {
    eyebrow: 'ENGAGEMENT MODELS',
    title: 'Choose how much you own, and when',
    url: '/models',
    icon: 'layers',
  },
  'gift-city': {
    eyebrow: 'GIFT CITY',
    title: "Set up in India's international finance centre",
    url: '/gift-city',
    icon: 'landmark',
  },
  about: { eyebrow: 'ABOUT', title: 'Our team and story', url: '/about', icon: 'users-round' },
  location: {
    eyebrow: 'LOCATION FINDER',
    title: 'Compare Indian cities for your centre',
    url: '/location',
    icon: 'map-pin',
  },
  calculator: {
    eyebrow: 'COST CALCULATOR',
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
    summary: 'From entity to first day in the office',
    url: '/how-we-work/build',
    icon: 'hammer',
  },
  {
    label: 'Run',
    summary: 'Day-to-day operations, owned by us',
    url: '/how-we-work/run',
    icon: 'settings',
  },
  {
    label: 'Grow',
    summary: 'Scale up, or take it over',
    url: '/how-we-work/grow',
    icon: 'trending-up',
  },
];

// "Solutions" mega menu: two link columns (split in the header component)
// plus a Location Finder promo panel (0.2).
export const SOLUTIONS_MENU: MenuLink[] = [
  {
    label: 'Consulting',
    summary: 'Advice before you commit',
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
    summary: 'Network, devices and security from day one',
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
    summary: 'Entity, tax and filings, handled',
    url: '/solutions/tax-legal-compliance',
    icon: 'scale',
  },
  {
    label: 'Finance and accounting',
    summary: 'Books closed on time, every month',
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
  '/location',
  '/calculator',
  '/insights',
  '/news',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
];
