import Link from 'next/link';
import {
  ENGAGEMENT_MODELS_MENU,
  LIFECYCLE_STAGES,
  LOCATIONS,
  SOLUTIONS_MENU,
} from '@/lib/site-data';
import { Wordmark } from './header';

interface FooterLink {
  label: string;
  url: string;
}

const COMPANY_LINKS: FooterLink[] = [
  { label: 'Who we are', url: '/about' },
  { label: 'Insights', url: '/insights' },
  { label: 'News', url: '/news' },
  { label: 'GCC Calculator', url: '/calculator' },
  { label: 'Location Finder', url: '/location' },
  { label: 'GIFT City', url: '/gift-city' },
  { label: 'Careers', url: '/careers' },
  { label: 'Contact us', url: '/contact' },
];

// W9 footer: the one full ink surface on the site. Brand blurb and contact
// on the left, link columns on the right, then the wordmark set as large as
// the container allows above the legal row.
export function Footer() {
  return (
    <footer className="bg-sx-ink text-sx-white">
      <div className="sx-container pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-white/70">
              Your trusted partner for building, managing and scaling global capability centres in
              India. A joint venture between Awfficacy Global, DevX and Dev IT, headquartered in
              Ahmedabad.
            </p>
            <ul className="mt-9 space-y-2 text-[15px] text-white/80">
              <li>
                <a
                  href="mailto:admin@scaleax.com"
                  className="sx-link text-[20px] font-bold text-white"
                >
                  admin@scaleax.com
                </a>
              </li>
              <li>{LOCATIONS.map((group) => group.city.split(',')[0]).join(' · ')}</li>
              <li className="pt-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ScaleAX on LinkedIn"
                  className="group inline-flex items-center gap-2 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="sx-link">LinkedIn</span>
                  <span aria-hidden="true" className="sx-go sx-go-out sx-go-sm" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn
              title="Solutions"
              links={SOLUTIONS_MENU.map(({ label, url }) => ({ label, url }))}
            />
            <FooterColumn
              title="Lifecycle"
              links={LIFECYCLE_STAGES.map(({ label, url }) => ({ label, url }))}
            />
            <FooterColumn
              title="Models"
              links={ENGAGEMENT_MODELS_MENU.map(({ label, url }) => ({ label, url }))}
            />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-20 aspect-[289/56] w-full bg-white/[0.09] [mask:url(/scaleax.svg)_center/contain_no-repeat] md:mt-28"
        />

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-8 text-[14px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} ScaleAX Advisory Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="sx-link transition-colors duration-200 hover:text-white"
            >
              Privacy policy
            </Link>
            <Link href="/terms" className="sx-link transition-colors duration-200 hover:text-white">
              Terms and conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/45">{title}</p>
      <ul className="mt-5 space-y-3 text-[15px]">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className="sx-link text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
