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
    body: 'We measure ourselves by whether your centre runs well. If something falls between two workstreams, it is ours to fix.',
  },
  {
    title: 'We say it straight',
    body: 'Clear costs. Clear timelines. Early warning when something changes.',
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
    title: 'Site to Scale, One accountable team.',
    description:
      'From location and strategy to workspace, talent, technology and operations — one accountable partner throughout your GCC journey.',
  },
  {
    title: 'Practitioners, not intermediaries',
    description:
      'Experienced operators across finance, workspace, technology, talent and business operations — doing the work.',
  },
  {
    title: 'India-wide capability',
    description:
      'Start in Ahmedabad, GIFT City or another GCC hub, with access to the talent, infrastructure and ecosystem you need to scale.',
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
  /** LinkedIn profile, linked from the bio panel. */
  linkedin?: string;
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
// Roster and titles as confirmed by ScaleAX (content review, October 2026).
// Bios, highlights, LinkedIn links and portraits are the previous
// scaleax.com profiles; Devika Nekkanti's details came with the review.
export const LEADERSHIP: LeadershipMember[] = [
  {
    name: 'Purvi Shah',
    position: 'Co-founder and CEO',
    background:
      'Purvi is the Co-founder and CEO of ScaleAX, an India-native advisory and delivery firm that helps PE-backed and founder-led businesses design, build and run their India capability centres. A Chartered Accountant (FCA, ICAI) and MBA in Finance, she brings 25+ years of experience building and scaling India operations for international businesses, including large, multi-country capability centres and teams. Across CFO and Chief Strategy Officer roles, she has led multiple fundraises and major transactions, and brings extensive experience working with PE-backed businesses and their boards.',
    confirmed: true,
    photo: '/leadership/purvi.jpg',
    linkedin: 'https://www.linkedin.com/in/purvishah1/',
    bio: [],
    highlights: [
      '25+ years of leadership experience: Chartered Accountant (FCA) and MBA in Finance with extensive experience building and scaling India operations and capability centres for global businesses.',
      'Strategic and transaction expertise: former CFO and Chief Strategy Officer, with a strong track record in fundraises, major transactions, and working with PE-backed businesses and boards.',
    ],
  },
  {
    name: 'Gautam Pai',
    position: 'Director, Strategy & Operation',
    background:
      'Gautam brings over 11 years of expertise in corporate finance advisory, management consulting, investment banking, and tax and regulatory advisory. He has a proven track record of driving growth and delivering strategic solutions across diverse sectors.',
    confirmed: true,
    photo: '/leadership/gautam.png',
    linkedin: 'https://www.linkedin.com/in/gautam-pai-75743870/',
    bio: [],
    highlights: [
      "PLI scheme advisory: enabled 100+ clients across eight industries to secure incentives under India's Make-in-India initiatives.",
      'Global market entry: advised international businesses on India entry strategies, including entity structuring and regulatory compliance.',
      'Corporate restructuring: delivered solutions for mergers, demergers, buybacks and entity conversions.',
      'Startup advisor: guided 12+ startups from early stages to Series B in successful fund-raising journeys.',
      'VC and investor support: conducted buy-side due diligence for institutional VC funds and ultra-HNIs on portfolio investments.',
      'IPO readiness: played a critical role in preparing MSMEs and corporates for successful IPOs.',
      'Tax and regulatory advisory: structured inbound and outbound investments, addressing complex cross-border matters from a tax and regulatory perspective.',
    ],
  },
  {
    name: 'Sunny Agarwal',
    position: 'CXO',
    background:
      'Sunny is a dynamic entrepreneur with over 18 years of experience managing and scaling businesses across various sectors including textiles and travel. With a proven track record of success, he leads ventures with a combined turnover exceeding INR 2 billion.',
    confirmed: true,
    photo: '/leadership/sunny.png',
    linkedin: 'https://www.linkedin.com/in/sunnypagrawal/',
    bio: [],
    highlights: [
      'Multisector expertise: successfully owns and operates businesses in textiles and travel, showcasing cross-industry leadership.',
      'Financial strategist: skilled in financial analysis and investment advisory, driving growth and profitability.',
      'Market visionary: renowned for identifying and capitalizing on emerging market trends with strategic foresight.',
      'Agile leader: demonstrates exceptional adaptability and strategic thinking, ensuring sustained success in competitive markets.',
      'Trusted professional: known for reliability and excellence in financial and business management.',
    ],
  },
  {
    name: 'Umesh Uttamchandani',
    position: 'Director, Managed Space',
    background:
      'Umesh boasts nearly a decade of experience across the IT and real estate sectors. A strategic thinker with a proven track record in marketing, sales and business development, he is also a passionate entrepreneur and startup advocate.',
    confirmed: true,
    photo: '/leadership/umesh.png',
    linkedin: 'https://www.linkedin.com/in/umeshuttamchandani1/',
    bio: [],
    highlights: [
      'Growth enabler: leads the charge in building strategic partnerships, shaping long-term growth strategies, and curating high-potential technology startups and SMEs for the accelerator programme.',
      'Mentorship and investments: serves as a board member, investor and mentor to portfolio ventures across SaaS, mobility, cloud kitchens, media tech and lending.',
      'Entrepreneurial vision: actively invests in and mentors startups, guiding them from the ideation phase to scalable growth.',
    ],
  },
  {
    name: 'Aaryan Shah',
    position: 'Director, Growth',
    background:
      'Aaryan graduated from Boston University with a Bachelor of Science in Business Administration and a Finance concentration.',
    confirmed: true,
    photo: '/leadership/aaryan.png',
    linkedin: 'https://www.linkedin.com/in/aaryan-shahbu/',
    bio: [],
    highlights: [
      'Investment management: previously worked with True Beacon, a hedge fund, as an investment analyst, and at PwC as a valuation intern.',
      "Entrepreneurial vision: co-founder and Director at Instaclaus, a fintech startup focused on making credit more accessible to employees in India, and leads Aris Infra Realty's strategy for Gujarat in the B2B construction supply industry.",
      "Financial modelling and valuations: as Vice President of Boston University's Real Estate Club, grew the organisation from 50 members to 120+ and developed key connections in the industry.",
    ],
  },
  {
    name: 'Shreyans Shah',
    position: 'Director, Infrastructure',
    background:
      'Shreyans boasts years of experience in the commercial and residential real estate space.',
    confirmed: true,
    photo: '/leadership/shreyans.png',
    bio: [],
    highlights: [
      'Execution competency: over 13 years of experience in planning and executing large projects in the commercial and residential space.',
      'Sustainability enthusiast: deeply committed to protection and sustainable development in a personal and professional capacity.',
    ],
  },
  {
    name: 'Devika Nekkanti',
    position: 'Director, Talent',
    background:
      'Seasoned HR leader with 20+ years in organisation building, leadership hiring, people strategy and HR consulting.',
    confirmed: true,
    photo: '/leadership/devika.jpg',
    linkedin: 'https://www.linkedin.com/in/devikanekkanti/',
    bio: [],
  },
];

// Advisors (the previous scaleax.com "Strategic Board") — shown on the
// Advisors tab of the team section, same card/panel treatment as leadership.
export const ADVISORS: LeadershipMember[] = [
  {
    name: 'Jaxay Shah',
    position: 'Advisor',
    background:
      'Jaxay Shah boasts years of experience in the fields of real estate, construction and leadership at multiple levels during his professional journey.',
    confirmed: true,
    photo: '/leadership/jaxay.png',
    linkedin: 'https://www.linkedin.com/in/jaxayshah/',
    bio: [],
    highlights: [
      'Leadership excellence: Founder, Chairman and Managing Director of the Savvy Group of Companies, a professional construction conglomerate. Chairperson of the Quality Council of India (QCI), former Chairman of CREDAI and Promoter Director on the board of ONDC.',
      "Educational qualifications: Bachelor's degree in Civil Engineering with a concentration in geo-technology and foundation engineering from L.D. College of Engineering, Gujarat University.",
      'An environment and sustainability crusader, committed to eco-friendly construction using renewable technology.',
    ],
  },
  {
    name: 'Jaimin Shah',
    position: 'Advisor',
    background:
      'Jaimin Shah brings a wealth of experience and expertise, having established himself as a seasoned leader in the information technology and services industry for over a decade.',
    confirmed: true,
    photo: '/leadership/jaimin.png',
    linkedin: 'https://www.linkedin.com/in/jaimin-shah-b0846646/',
    bio: [],
    highlights: [
      'Technical and business acumen: a career that integrates technical skills with strategic planning and business management, leading teams toward exceptional outcomes.',
      'Entrepreneurial leadership: thrives on exploring new opportunities and driving meaningful change in dynamic environments.',
      'Knowledge sharing: authors articles on technology, leadership and entrepreneurship across various publications.',
    ],
  },
  {
    name: 'Aniket Talati',
    position: 'Advisor',
    background:
      'Aniket has a distinguished career spanning over 12 years, primarily focused on providing audit, tax, regulatory and business advisory services.',
    confirmed: true,
    photo: '/leadership/aniket.png',
    linkedin: 'https://www.linkedin.com/in/anikettalati/',
    bio: [],
    highlights: [
      'Leadership and representation: President of the Institute of Chartered Accountants of India (ICAI) for 2023-24 and an active member of the PAIB Advisory Group of IFAC and the Board of CAPA.',
      'Professional excellence: extensive experience in statutory audits, tax audits, limited reviews and IFRS audits.',
      "Global expansion: spearheaded Talati & Talati's entry into the US market, establishing partnerships with Top 10 US accounting firms.",
      'Strategic alliances: leveraged global accounting networks to forge key partnerships, boosting client acquisition and retention.',
    ],
  },
];
