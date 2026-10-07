import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import AboutPage from './about/page';
import PlanPage from './how-we-work/plan/page';
import BuildPage from './how-we-work/build/page';
import RunPage from './how-we-work/run/page';
import GrowPage from './how-we-work/grow/page';
import ConsultingPage from './solutions/consulting/page';
import RealEstatePage from './solutions/real-estate/page';
import ItSecurityPage from './solutions/it-security/page';
import TalentPage from './solutions/talent/page';
import HrPayrollPage from './solutions/hr-payroll/page';
import TaxLegalCompliancePage from './solutions/tax-legal-compliance/page';
import FinanceAccountingPage from './solutions/finance-accounting/page';
import ModelsPage from './models/page';
import GiftCityPage from './gift-city/page';
import InsightsPage from './insights/page';
import NewsPage from './news/page';
import CareersPage from './careers/page';
import ContactPage from './contact/page';
import PrivacyPage from './privacy/page';
import TermsPage from './terms/page';

// Part B — route tests asserting each inner page renders its key sections:
// the H1, at least one content block from the brief, and (where the brief
// calls for one) the Where-next band / lifecycle highlight / closing CTA.

describe('About page (B1)', () => {
  it('renders the hero, values, why-ScaleAX hub, ecosystem firms and leadership', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /built by operators/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /we own the result/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /why companies choose scaleax/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /part of a wider platform/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dev IT' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /our leadership/i })).toBeInTheDocument();
    expect(screen.getByText('Purvi Shah')).toBeInTheDocument();
    expect(screen.getByText('Devika Nekkanti')).toBeInTheDocument();
    expect(screen.queryByText('Parth Shah')).not.toBeInTheDocument();
    // Advisors live behind the second tab of the team section.
    expect(screen.getByRole('tab', { name: /advisors/i })).toBeInTheDocument();
    // No lifecycle stage highlighted on this page.
    expect(screen.queryByText(/you are here/i)).not.toBeInTheDocument();
  });
});

describe('How we work pages (B2-B5)', () => {
  it('Plan renders its hero, deliverables and highlights Plan on the lifecycle strip', () => {
    render(<PlanPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /decide where, how and at what cost/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('A board-ready business case')).toBeInTheDocument();
    expect(screen.getByText(/you are here/i)).toBeInTheDocument();
  });

  it('Build renders its workstream accordion and workspace route', () => {
    render(<BuildPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /from a registered company/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /01 real estate and fit-out/i })).toBeInTheDocument();
    expect(screen.getByText('1. City')).toBeInTheDocument();
  });

  it('Run renders its nine services and review cycles', () => {
    render(<RunPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /run day to day by people who know it/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('People · Talent')).toBeInTheDocument();
    expect(screen.getByText('Weekly operations call')).toBeInTheDocument();
  });

  it('Grow renders the handover process and maturity stages', () => {
    render(<GrowPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /scale up, or take it over/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Terms agreed')).toBeInTheDocument();
    expect(screen.getByText('01 Delivering')).toBeInTheDocument();
  });
});

describe('Solutions pages (B6-B12)', () => {
  it('Consulting renders its service lines', () => {
    render(<ConsultingPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /advice before you commit/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('New centre plan')).toBeInTheDocument();
  });

  it('Real estate renders workspace options and the workspace route', () => {
    render(<RealEstatePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /start in a managed office/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Managed private floor')).toBeInTheDocument();
    expect(screen.getByText('9. Facilities')).toBeInTheDocument();
  });

  it('IT and security renders its set-up areas', () => {
    render(<ItSecurityPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /it that meets your group.s standards/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Passive infrastructure')).toBeInTheDocument();
  });

  it('Talent renders hiring models and the people lifecycle', () => {
    render(<TalentPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /hire the right people first/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Recruitment service (RPO)')).toBeInTheDocument();
    expect(screen.getByText('Attract')).toBeInTheDocument();
  });

  it('HR and payroll renders its set-up and ongoing services', () => {
    render(<HrPayrollPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /people operations that run on time/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Monthly payroll')).toBeInTheDocument();
  });

  it('Tax, legal and compliance renders entity, tax and compliance sections', () => {
    render(<TaxLegalCompliancePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /your entity, tax and filings, handled/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Transfer pricing')).toBeInTheDocument();
  });

  it('Finance and accounting renders its six processes', () => {
    render(<FinanceAccountingPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /books closed on time/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Purchase to pay')).toBeInTheDocument();
  });
});

describe('Engagement models page (B13)', () => {
  it('renders all four models, including Employer of Record at #eor, and a four-column comparison', () => {
    render(<ModelsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /choose how much you own, and when/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^build-operate-transfer$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^assisted set-up$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^managed seats$/i })).toBeInTheDocument();

    // W8 — EOR is offered: its own anchored section with the reference's tagline.
    const eor = screen.getByRole('heading', { name: /^employer of record$/i });
    expect(eor.closest('[id]')).toHaveAttribute('id', 'eor');
    expect(screen.getByText('Hire in India. No entity required.')).toBeInTheDocument();

    expect(screen.getByRole('columnheader', { name: /^bot$/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /^employer of record$/i })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(5); // row-label column + 4 models
  });
});

describe('GIFT City page (B14)', () => {
  it('renders the hub: licence routes, facilities, jobs and FAQ', () => {
    render(<GiftCityPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /set up, staff and settle your team in gift city/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('One regulator, one application')).toBeInTheDocument();
    // Eight licence routes; the GIC is open first with its own journey.
    expect(screen.getAllByRole('tab')).toHaveLength(8);
    expect(screen.getByRole('tab', { name: /global in-house centre \(gic\)/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Who qualifies')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ScaleAX One Desk' })).toBeInTheDocument();
    expect(screen.getByText('Treasury Analyst')).toBeInTheDocument();
    expect(screen.getByText(/listings shown are examples/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /how long does set-up take/i })).toBeInTheDocument();
  });
});

describe('Insights, News, Careers, Contact (B15-B18)', () => {
  it('Insights lists the three sample articles', () => {
    render(<InsightsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /notes from the work/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /what it costs to run a capability centre in ahmedabad/i }),
    ).toHaveAttribute('href', '/insights/what-it-costs-to-run-a-capability-centre-in-ahmedabad');
  });

  it('News lists sample entries', () => {
    render(<NewsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /what.s new at scaleax/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/sample entry/i).length).toBeGreaterThan(0);
  });

  it('Careers renders the two job tabs and shows an honest empty state', () => {
    render(<CareersPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /build india.s next capability centres with us/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /jobs at scaleax/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /jobs at client centres/i })).toBeInTheDocument();
    expect(screen.getByText(/no open roles at scaleax right now/i)).toBeInTheDocument();
  });

  it('Contact renders the office cards and the consultation form', () => {
    render(<ContactPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /tell us what you want to build in india/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Ahmedabad').length).toBeGreaterThan(0);
    expect(screen.getAllByText('GIFT City').length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });
});

describe('Privacy and Terms shells', () => {
  it('Privacy renders a structured shell with multiple sections', () => {
    render(<PrivacyPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /privacy policy/i });
    const section = heading.closest('section') as HTMLElement;
    expect(
      within(section).getByRole('heading', { name: /information we collect/i }),
    ).toBeInTheDocument();
    expect(within(section).getByRole('heading', { name: /your rights/i })).toBeInTheDocument();
  });

  it('Terms renders a structured shell with multiple sections', () => {
    render(<TermsPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /terms of use/i });
    const section = heading.closest('section') as HTMLElement;
    expect(within(section).getByRole('heading', { name: /governing law/i })).toBeInTheDocument();
    expect(
      within(section).getByRole('heading', { name: /limitation of liability/i }),
    ).toBeInTheDocument();
  });
});
