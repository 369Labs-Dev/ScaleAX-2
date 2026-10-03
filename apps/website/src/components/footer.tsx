import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { ENGAGEMENT_MODELS_MENU, LIFECYCLE_STAGES, SOLUTIONS_MENU } from '@/lib/site-data';
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

// W8 — dark-green multi-column footer per the reference: brand blurb +
// LinkedIn, Solutions, Lifecycle + Models, Company, Contact; legal row
// below a hairline. Every column maps onto our existing routes.
export function Footer() {
  return (
    <footer className="bg-sx-ink text-sx-white">
      <div className="sx-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">
              Your trusted partner for building, managing and scaling global capability centres in
              India. A joint venture between Awfficacy Global and DevX, headquartered in Ahmedabad.
            </p>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ScaleAX on LinkedIn"
              className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors duration-200 hover:bg-sx-white hover:text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>

          <FooterColumn
            className="md:col-span-3 lg:col-span-2"
            title="Solutions"
            links={SOLUTIONS_MENU.map(({ label, url }) => ({ label, url }))}
          />

          <div className="md:col-span-2">
            <FooterColumn
              title="Lifecycle"
              links={LIFECYCLE_STAGES.map(({ label, url }) => ({ label, url }))}
            />
            <FooterColumn
              className="mt-8"
              title="Models"
              links={ENGAGEMENT_MODELS_MENU.map(({ label, url }) => ({ label, url }))}
            />
          </div>

          <FooterColumn
            className="md:col-span-3 lg:col-span-2"
            title="Company"
            links={COMPANY_LINKS}
          />

          <div className="md:col-span-12 lg:col-span-2">
            <p className="sx-eyebrow !text-white/50">Contact</p>
            <ul className="mt-5 space-y-3 text-[15px] text-white/80">
              <li>
                <a
                  href="mailto:info@scaleax.com"
                  className="sx-link transition-colors duration-200 hover:text-white"
                >
                  info@scaleax.com
                </a>
              </li>
              <li>Ahmedabad and GIFT City, Gujarat, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 text-[14px] text-white/50 md:flex-row md:items-center md:justify-between">
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

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: FooterLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="sx-eyebrow !text-white/50">{title}</p>
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
