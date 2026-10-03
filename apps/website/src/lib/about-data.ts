// Content for the About page (Part B, PAGE B1) that doesn't belong in the
// site-wide site-data.ts. Bracketed/unconfirmed details in the brief are
// carried through as explicit "pending confirmation" placeholders rather
// than invented — see the LEADERSHIP comment below.

export interface ValueItem {
  title: string;
  body: string;
}

// "Our values" — shown as an accordion (see accordion-section.tsx), first
// item open by default.
export const ABOUT_VALUES: ValueItem[] = [
  {
    title: 'We own the result',
    body: 'We measure ourselves by whether your centre runs well, not by tasks ticked off. If something falls between two workstreams, it is ours to fix.',
  },
  {
    title: 'We say it straight',
    body: 'Clear costs, clear dates, and early warning when something changes. No surprises on the invoice or at handover.',
  },
  {
    title: 'We do the work ourselves',
    body: 'The people who plan your centre are the people who build and run it. We do not pass work down a chain of subcontractors.',
  },
  {
    title: 'We build for handover',
    body: 'Everything we set up is documented and transferable, so you can take it over whenever you choose.',
  },
];

// "Why companies choose ScaleAX".
export const WHY_SCALEAX: { title: string; description: string }[] = [
  {
    title: 'Land to ledger, one contract',
    description:
      'Real estate, fit-out, IT, hiring, HR, entity, tax and accounting delivered by firms inside the ScaleAX group, under one agreement.',
  },
  {
    title: 'Practitioners, not intermediaries',
    description:
      'Chartered accountants, builders, workspace operators and IT engineers who do this work every day for their own clients.',
  },
  {
    title: 'Ahmedabad and GIFT City',
    description:
      "Our home cities give clients lower costs, less competition for talent, and access to India's international financial services centre.",
  },
  {
    title: 'Built for mid-sized companies',
    description:
      'We focus on companies with 500 to 5,000 employees, where the founders of ScaleAX stay personally involved.',
  },
  {
    title: 'Clear commercial terms',
    description:
      'Fees, service levels and transfer terms are written into the contract before we start.',
  },
];

export interface LeadershipMember {
  name: string;
  position: string;
  background: string;
  /** True when the brief gives this person's name/role without a "[confirm]" bracket. */
  confirmed: boolean;
  /** Headshot under public/leadership/ (reference site's own named asset). */
  photo?: string;
  bio: string[];
  /** Short career highlights shown as a bordered bullet list in the bio panel. */
  highlights?: string[];
}

// Leadership (About, #leadership). The brief's table (Part B1) lists 15
// proposed people; rows still marked "[To appoint]" have no name at all and
// the brief says explicitly to "leave out rows still marked 'to appoint'"
// at launch, so those (Head Legal, Head HR Operations, Head IT
// Infrastructure, Head Marketing, both regional sales heads, the advisor
// slot) are omitted entirely — there's no name to show. The seven proposed
// co-founders/leads DO have names (even where a surname or exact title is
// bracketed "[confirm]"), so per this round's instruction they're carried
// through as clearly-marked "pending confirmation" placeholder cards rather
// than invented — never omitted and never given a fabricated bio.
export const LEADERSHIP: LeadershipMember[] = [
  // Roster, titles, bios and highlights follow the reference site's team
  // section (site-hazel-gamma-44.vercel.app/who-we-are, "directors" data),
  // whose named photo assets give a reliable name-to-photo mapping. Purvi
  // Shah stays from the brief (confirmed CEO; homepage founder quote)
  // pending her photo. The brief's remaining bracketed co-founder
  // placeholders (Shreyans, Devika Nekkanti) are parked until the roster
  // confirms them - reinstate from git history if they return.
  {
    name: 'Purvi Shah',
    position: 'Co-founder and CEO',
    background: 'Chartered Accountant (FCA), MBA Finance; former CFO and Chief Strategy Officer.',
    confirmed: true,
    bio: [
      'Purvi is Co-founder and CEO of ScaleAX. She is a Chartered Accountant with an MBA in Finance, and has served as CFO and Chief Strategy Officer before co-founding ScaleAX.',
      'She works directly with clients from the first conversation through to their centre going live.',
    ],
  },
  {
    name: 'Gautam Pai',
    position: 'Director, CXO',
    background:
      'Over 11 years in corporate finance advisory, management consulting, investment banking and tax and regulatory advisory.',
    confirmed: true,
    photo: '/leadership/gautam.png',
    bio: [],
    highlights: [
      'Enabled 100+ clients across eight industries to secure Make-in-India PLI incentives',
      'Advised international businesses on India entry, entity structuring and compliance',
      'Guided 12+ startups from early stage to Series B fund-raising',
      'IPO readiness for MSMEs and corporates',
    ],
  },
  {
    name: 'Sunny Agarwal',
    position: 'CXO',
    background:
      'Entrepreneur with over 18 years scaling businesses across textiles and travel, leading ventures with combined turnover above INR 2 billion.',
    confirmed: true,
    photo: '/leadership/sunny.png',
    bio: [],
    highlights: [
      'Cross-industry operator in textiles and travel',
      'Financial analysis and investment advisory',
      'Known for identifying emerging market trends early',
    ],
  },
  {
    name: 'Umesh Uttamchandani',
    position: 'Director, CXO',
    background:
      'Nearly a decade across IT and real estate, with a track record in marketing, sales and business development. Co-founder at DevX.',
    confirmed: true,
    photo: '/leadership/umesh.png',
    bio: [],
    highlights: [
      'Builds strategic partnerships and long-term growth strategies',
      'Board member, investor and mentor across SaaS, mobility and media tech',
      'Curates high-potential startups for the DevX accelerator',
    ],
  },
  {
    name: 'Parth Shah',
    position: 'CXO',
    background:
      'Over a decade in commercial real estate and the co-founder of two startups. Oversees operations and workspace delivery at DevX.',
    confirmed: true,
    photo: '/leadership/parth.png',
    bio: [],
    highlights: [
      'Runs operations for tailored workspace solutions',
      'Optimised and automated hiring processes for enterprises',
      'Active investor in early-stage technology startups',
    ],
  },
  {
    name: 'Aaryan Shah',
    position: 'Director, CXO',
    background:
      'Boston University graduate in finance. Former investment analyst at hedge fund True Beacon and valuation intern at PwC.',
    confirmed: true,
    photo: '/leadership/aaryan.png',
    bio: [],
    highlights: [
      'Co-founder and Director at fintech Instaclaus',
      'Leads Aris Infra Realty strategy for Gujarat',
      'Grew Boston University Real Estate Club from 50 to 120+ members',
    ],
  },
];

// Advisors (reference site "advisors" data) — shown on the Advisors tab of
// the team section, same card/panel treatment as leadership.
export const ADVISORS: LeadershipMember[] = [
  {
    name: 'Aniket Talati',
    position: 'Advisor',
    background:
      'President of the Institute of Chartered Accountants of India (ICAI) 2023-24. Over 12 years in audit, tax, regulatory and business advisory.',
    confirmed: true,
    photo: '/leadership/aniket.png',
    bio: [],
    highlights: [
      'Member of the PAIB Advisory Group of IFAC and Board of CAPA',
      "Led Talati & Talati's entry into the US market",
      'Partnerships with Top 10 US accounting firms',
    ],
  },
  {
    name: 'Jaimin Shah',
    position: 'Advisor',
    background:
      'A decade of leadership in information technology and services, integrating technical depth with strategic business management.',
    confirmed: true,
    photo: '/leadership/jaimin.png',
    bio: [],
    highlights: [
      'Leads teams from technical delivery to business outcomes',
      'Author on technology, leadership and entrepreneurship',
    ],
  },
  {
    name: 'Jaxay Shah',
    position: 'Advisor',
    background:
      'Founder, Chairman and Managing Director of the Savvy Group. Chairperson of the Quality Council of India and former Chairman of CREDAI.',
    confirmed: true,
    photo: '/leadership/jaxay.png',
    bio: [],
    highlights: [
      'Promoter Director on the board of ONDC',
      'Civil engineer, L.D. College of Engineering',
      'Sustainability advocate for eco-friendly construction',
    ],
  },
];
