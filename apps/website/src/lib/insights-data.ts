// Part B, PAGE B15 — Insights. Seed content only: the brief names three
// first-article titles but gives no body copy, so these are clearly-marked
// sample articles (placeholder bodies), not real published content, driven
// from a typed array rather than a full MDX toolchain (a deliberate
// simplification of "markdown/MDX-driven" for this pass — see the W4
// report).
export interface Article {
  slug: string;
  topic: string;
  title: string;
  readTime: string;
  date: string;
  intro: string;
  body: string[];
  /** Optional headed sections, rendered after `body`. */
  sections?: ArticleSection[];
}

export interface ArticleSection {
  heading: string;
  body: string[];
  list?: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'infrastructure-opportunities',
    topic: 'Workspace',
    title:
      'Unlocking India’s potential: infrastructure and opportunities for Global Capability Centres',
    readTime: '7 min read',
    date: '2026-09-22',
    intro:
      'How India’s infrastructure, policy and cost profile combine to make it the default location for new capability centres.',
    body: [
      'A capability centre is only as good as the ground it stands on. Office supply, power, connectivity, transport and the policy regime decide how fast a centre can open, and how well it runs once the first teams are in their seats.',
      'Over the last decade, India has moved from a handful of mature hubs to a wider map of cities that can host a serious centre. That changes the location decision from “which of the big two” to “which city fits this team”.',
    ],
    sections: [
      {
        heading: 'Grade-A workspace beyond the metros',
        body: [
          'Established hubs still offer the deepest supply of ready office space, but newer corridors in cities such as Ahmedabad, Pune and Hyderabad now offer built-to-suit and managed options at a lower seat cost.',
        ],
        list: [
          'Managed seats let a team start in weeks, before a long lease is signed.',
          'Built-to-suit campuses suit centres with a clear multi-year headcount plan.',
          'Special economic zones and GIFT City add tax and regulatory advantages for eligible activities.',
        ],
      },
      {
        heading: 'Connectivity and resilience',
        body: [
          'Redundant fibre, reliable power backup and good airport access are now baseline expectations in every tier-one city. The question to ask is less “is it available” and more “how is it contracted and tested”.',
        ],
      },
      {
        heading: 'Policy that rewards setting up',
        body: [
          'State governments compete for capability centres with incentives on stamp duty, power tariffs, training and capital expenditure. The value of those incentives varies by state and by activity, so they belong in the location model from the start, not as a late negotiation.',
        ],
      },
      {
        heading: 'What this means for your plan',
        body: [
          'Shortlist cities on talent first, then test each against workspace supply, cost and incentives. A structured comparison usually narrows the field to two or three realistic options within a couple of weeks.',
        ],
      },
    ],
  },
  {
    slug: 'india-powerhouse',
    topic: 'Talent',
    title: 'India: a powerhouse of talent for Global Capability Centers',
    readTime: '12 min read',
    date: '2026-09-08',
    intro:
      'The scale and quality of India’s graduate pipeline across engineering, finance, medicine and management.',
    body: [
      'Talent is the reason most organisations look at India, and the reason most of them stay. The country produces graduates at a scale few markets can match, across engineering, finance, life sciences and management.',
      'Scale alone does not build a good centre, though. The real advantage comes from matching the right talent pool to the right roles, and from building the employer brand to win it.',
    ],
    sections: [
      {
        heading: 'Depth across functions',
        body: [
          'India’s talent base now covers far more than software delivery. Capability centres hire for product engineering, data and AI, finance and accounting, risk, clinical research, design and customer operations.',
        ],
      },
      {
        heading: 'City pools differ',
        body: [
          'Each city has its own mix. Some are strongest in product engineering, others in finance operations, pharma or manufacturing engineering. Choosing the city by the roles you need, rather than by reputation, shortens hiring time and improves retention.',
        ],
      },
      {
        heading: 'Leadership is the bottleneck',
        body: [
          'Entry and mid-level hiring scales well. Experienced site leaders and function heads are scarcer and take longer to find, so they should be hired first and brought into the parent organisation early.',
        ],
        list: [
          'Hire the site leader before the first delivery team.',
          'Pair each India function head with a counterpart at headquarters.',
          'Build a campus pipeline once the core team is stable.',
        ],
      },
      {
        heading: 'Keeping the talent you hire',
        body: [
          'Retention comes from meaningful work, visible career paths and ownership of outcomes, not just pay. Centres that are treated as partners in the business, rather than as a cost line, keep their people longer.',
        ],
      },
    ],
  },
  {
    slug: 'best-practices-gcc',
    topic: 'Operations',
    title: 'Best practices for scaling a GCC in India',
    readTime: '5 min read',
    date: '2026-08-25',
    intro:
      'Thumb rules every organisation should keep at the core while planning to set up or expand a centre.',
    body: [
      'Setting up a centre is a project. Scaling one is an operating discipline. The organisations that scale well tend to follow the same handful of rules.',
    ],
    sections: [
      {
        heading: 'Define clear objectives and a roadmap',
        body: [
          'Agree what the centre is for, how success will be measured and how its remit should grow over three years. Tie headcount plans to those outcomes, not to a cost target alone.',
        ],
      },
      {
        heading: 'Invest in leadership early',
        body: [
          'Strong local leadership with real decision rights is the single biggest predictor of a centre that grows in value, not just in size.',
        ],
      },
      {
        heading: 'Run it like one company',
        body: [
          'Shared tools, shared rituals and rotations between headquarters and India keep the centre part of the business rather than a separate supplier.',
        ],
        list: [
          'Common goals and KPIs across locations.',
          'Regular governance reviews with named owners.',
          'Exchange programmes and international rotations.',
        ],
      },
      {
        heading: 'Keep compliance and risk on a calendar',
        body: [
          'Employment, data protection and tax obligations recur. A tracked compliance calendar with clear owners avoids surprises as the entity grows.',
        ],
      },
      {
        heading: 'Measure efficiency, then value',
        body: [
          'Early metrics focus on cost and delivery. Mature centres add measures of innovation, ownership and business impact, and report them to the same forum as the rest of the business.',
        ],
      },
    ],
  },
  {
    slug: 'global-teams',
    topic: 'Talent',
    title: 'Global teams: a remedy to the tech talent shortage',
    readTime: '6 min read',
    date: '2026-08-11',
    intro:
      'Why boardrooms are turning to distributed capability centres to counter saturation and rising costs in developed markets.',
    body: [
      'In many developed markets, demand for engineers, data specialists and security talent keeps outpacing supply. Roles stay open for months and salary inflation erodes budgets.',
      'A distributed model, with a capability centre as a core hub, gives organisations access to a second, much larger talent market without giving up control of the work.',
    ],
    sections: [
      {
        heading: 'From outsourcing to ownership',
        body: [
          'Unlike traditional outsourcing, a capability centre employs its own people, follows the parent’s standards and builds institutional knowledge that stays in the company.',
        ],
      },
      {
        heading: 'Follow-the-sun delivery',
        body: [
          'Time-zone spread turns into an advantage when work is designed for handover: faster release cycles, round-the-clock support and shorter lead times.',
        ],
      },
      {
        heading: 'Making distributed teams work',
        body: [
          'The model succeeds when teams own whole products or processes rather than fragments of them.',
        ],
        list: [
          'Give each location end-to-end ownership of a clear scope.',
          'Invest in shared tooling and documentation.',
          'Set overlap hours for decisions, and work asynchronously for the rest.',
        ],
      },
    ],
  },
  {
    slug: 'what-it-costs-to-run-a-capability-centre-in-ahmedabad',
    topic: 'Cost',
    title: 'What it costs to run a capability centre in Ahmedabad',
    readTime: '6 min read',
    date: '2026-01-15',
    intro:
      'A look at how office, people and set-up costs in Ahmedabad compare with India’s more established GCC hubs.',
    body: [
      'This is a sample article included to show the Insights template. Replace this body with the real analysis when it is written.',
      'Topics to cover: office rent, salary benchmarks by role and level, set-up costs, and the ongoing cost of running a centre once it is live.',
    ],
  },
  {
    slug: 'gift-city-for-capability-centres-what-the-2025-gic-regulations-change',
    topic: 'GIFT City',
    title: 'GIFT City for capability centres: what the 2025 GIC regulations change',
    readTime: '5 min read',
    date: '2026-01-08',
    intro:
      'What the IFSCA (Global In-House Centres) Regulations, 2025 mean for financial services groups considering a centre in GIFT City.',
    body: [
      'This is a sample article included to show the Insights template. Replace this body with the real analysis when it is written.',
      'Topics to cover: who qualifies as a GIC, the application process, and how the regime compares with setting up on the Indian mainland.',
    ],
  },
  {
    slug: 'build-operate-transfer-plan-the-handover-on-day-one',
    topic: 'Operating models',
    title: 'Build-Operate-Transfer: plan the handover on day one',
    readTime: '4 min read',
    date: '2025-12-18',
    intro:
      'Why the terms of a BOT transfer should be written into the contract before the centre is even built.',
    body: [
      'This is a sample article included to show the Insights template. Replace this body with the real analysis when it is written.',
      'Topics to cover: transfer pricing formulas, readiness reviews, and how to keep the handover a planned project rather than a negotiation.',
    ],
  },
];
