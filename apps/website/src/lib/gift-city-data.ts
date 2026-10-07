import content from './gift-city-content.json';

// GIFT City page content (brief of 6 October 2026). It lives in
// gift-city-content.json so ScaleAX can update rules and timelines without a
// code change; IFSCA revises its frameworks often.

export type Pair = [title: string, text: string];
export type JourneyStage = [stage: string, time: string, steps: string[]];

export interface IfscRoute {
  key: string;
  name: string;
  forWho: string;
  summary: string;
  /** Regulation the route sits under; only the three lead routes carry one. */
  rule?: string;
  points?: Pair[];
  weeks: string;
  journey: JourneyStage[];
}

export interface GiftCityContent {
  meta: { tabTitle: string; searchDesc: string };
  banner: { label: string; heading: string; text: string; buttons: string[]; jump: string[] };
  why: { label: string; heading: string; items: Pair[] };
  ifsc: {
    label: string;
    heading: string;
    text: string;
    routes: IfscRoute[];
    outside: Pair;
    journeyHeading: string;
    journeyNote: string;
    helpHeading: string;
    help: Pair[];
  };
  facilities: {
    label: string;
    heading: string;
    text: string;
    categories: Pair[];
    partnerNote: string;
    deskHeading: string;
    deskText: string;
    desk: Pair[];
    listCta: [heading: string, text: string, button: string];
  };
  jobs: {
    label: string;
    heading: string;
    text: string;
    filters: string[];
    candidate: string[];
    employerHeading: string;
    employerText: string;
    employerButtons: string[];
  };
  faq: Pair[];
  numbers: Pair[];
  closing: [heading: string, text: string, button: string];
}

export const GIFT_CITY = content as unknown as GiftCityContent;

/** The first routes are the ones most capability centres use. */
export const LEAD_ROUTES = 3;

export interface SampleJob {
  title: string;
  company: string;
  func: string;
  type: string;
  experience: string;
  posted: string;
}

export const JOB_FUNCTIONS = [
  'Finance and treasury',
  'Technology',
  'Risk and compliance',
  'Operations',
  'HR and admin',
];
export const JOB_EMPLOYER_TYPES = ['IFSC unit', 'Capability centre', 'Service provider'];
export const JOB_EXPERIENCE = ['0–3 years', '3–8 years', '8+ years'];

// EXAMPLE listings that show the layout of the jobs board. The board has no
// backend yet (employer accounts, applications and alerts are still to be
// built), and the page says so beside the list.
export const SAMPLE_JOBS: SampleJob[] = [
  {
    title: 'Treasury Analyst',
    company: 'Example IFSC treasury centre',
    func: 'Finance and treasury',
    type: 'IFSC unit',
    experience: '3–8 years',
    posted: '2 days ago',
  },
  {
    title: 'Compliance Officer',
    company: 'Example GIC, global bank',
    func: 'Risk and compliance',
    type: 'IFSC unit',
    experience: '8+ years',
    posted: '5 days ago',
  },
  {
    title: 'Fund Accountant',
    company: 'Example fund administrator',
    func: 'Finance and treasury',
    type: 'Service provider',
    experience: '0–3 years',
    posted: '1 week ago',
  },
  {
    title: 'Cloud Engineer',
    company: 'Example capability centre',
    func: 'Technology',
    type: 'Capability centre',
    experience: '3–8 years',
    posted: '1 week ago',
  },
  {
    title: 'HR Business Partner',
    company: 'Example capability centre',
    func: 'HR and admin',
    type: 'Capability centre',
    experience: '8+ years',
    posted: '2 weeks ago',
  },
];
