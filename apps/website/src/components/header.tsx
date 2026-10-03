import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import {
  HOW_WE_WORK_MENU,
  SOLUTIONS_MENU,
  ENGAGEMENT_MODELS_MENU,
  INSIGHTS_MENU,
  type MenuLink,
} from '@/lib/site-data';
import { getIcon } from './icon-map';
import { NavMenu } from './nav-menu';
import { MobileMenu } from './mobile-menu';

// W8 — slim light header per the approved reference: green wordmark left;
// "Who we are", "What we offer", "GIFT City", "Insights", "GCC Calculator"
// (Careers lives in the footer only);
// pill "Plan your centre" CTA right. "What we offer" keeps the full depth
// of the old How we work / Solutions / Engagement models menus in one mega
// panel (plus GIFT City and the Location Finder), so every route stays one
// hover away. The scroll hairline is a CSS scroll-driven animation
// (`.sx-header`). Deliberately no backdrop-filter/transform on <header>:
// either would make it the containing block for the mobile menu's
// `position: fixed` dialog.
export function Header() {
  return (
    <header className="sx-header sticky top-0 z-40 h-[76px] w-full bg-sx-ground">
      <div className="sx-container flex h-full items-center justify-between">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[15px] font-bold text-sx-ink-70 lg:flex"
        >
          <NavLink href="/about">Who we are</NavLink>

          <NavMenu
            label="What we offer"
            panelClassName="fixed left-1/2 top-[68px] z-50 w-[min(1040px,calc(100vw-48px))] -translate-x-1/2 rounded-[20px] border border-sx-border bg-white p-6 shadow-sx-lift before:absolute before:inset-x-0 before:-top-5 before:h-5 before:content-['']"
          >
            <div className="grid grid-cols-[1fr_1.7fr_1.1fr] gap-6">
              <MenuColumn title="How we work">
                {HOW_WE_WORK_MENU.map((link) => (
                  <MegaLink key={link.url} link={link} />
                ))}
              </MenuColumn>
              <MenuColumn title="Solutions">
                <div className="grid grid-cols-2 gap-x-2">
                  {SOLUTIONS_MENU.map((link) => (
                    <MegaLink key={link.url} link={link} />
                  ))}
                </div>
              </MenuColumn>
              <div className="flex flex-col gap-4">
                <MenuColumn title="Engagement models">
                  <ul className="space-y-0.5">
                    {ENGAGEMENT_MODELS_MENU.map((link) => (
                      <SimpleLink key={link.url} link={link} />
                    ))}
                  </ul>
                </MenuColumn>
                <Link
                  href="/location"
                  role="menuitem"
                  className="group relative mt-auto flex flex-col overflow-hidden rounded-[16px] bg-sx-ink p-4 text-sx-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
                >
                  <span aria-hidden="true" className="sx-grid-lines-light absolute inset-0" />
                  <MapPin
                    className="relative h-5 w-5 transition-transform duration-300 ease-sx-out group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                  <span className="relative mt-3 text-[14px] font-bold">
                    Not sure where to start?
                  </span>
                  <span className="relative mt-1 text-[13px] font-normal text-white/75">
                    Compare cities with the Location Finder{' '}
                    <span className="sx-btn-arrow">&rarr;</span>
                  </span>
                </Link>
                <Link
                  href="/gift-city"
                  role="menuitem"
                  className="rounded-[10px] px-2 py-1.5 text-[14px] font-bold text-sx-ink transition-colors duration-200 hover:bg-sx-bg-light focus-visible:bg-sx-bg-light focus-visible:outline-none"
                >
                  GIFT City &middot;{' '}
                  <span className="font-normal text-sx-muted">India&rsquo;s finance centre</span>
                </Link>
              </div>
            </div>
          </NavMenu>

          <NavLink href="/gift-city">GIFT City</NavLink>
          <NavMenu label="Insights">
            <ul className="space-y-1">
              {INSIGHTS_MENU.map((link) => (
                <SimpleLink key={link.url} link={link} />
              ))}
            </ul>
          </NavMenu>

          <NavLink href="/calculator">GCC Calculator</NavLink>
          <Link href="/contact" className="sx-btn sx-btn-primary !h-11 !px-5 text-[14px]">
            Plan your centre
            <span className="sx-btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}

export function Wordmark({ tone = 'ink' }: { tone?: 'ink' | 'light' }) {
  return (
    <Link
      href="/"
      aria-label="ScaleAX home"
      className={`flex items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        tone === 'ink' ? 'focus-visible:outline-sx-ink' : 'focus-visible:outline-white'
      }`}
    >
      <Image
        src="/scaleax.svg"
        alt="ScaleAX"
        width={289}
        height={56}
        priority
        className={`h-7 w-auto ${tone === 'light' ? 'brightness-0 invert' : ''}`}
      />
    </Link>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group rounded py-2 transition-colors duration-200 hover:text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
    >
      <span className="sx-link">{children}</span>
    </Link>
  );
}

function MenuColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="sx-eyebrow mb-3 px-2">{title}</div>
      {children}
    </div>
  );
}

function MegaLink({ link }: { link: MenuLink }) {
  const Icon = getIcon(link.icon ?? '');
  return (
    <Link
      href={link.url}
      role="menuitem"
      className="group flex items-start gap-3 rounded-[12px] p-2 transition-colors duration-200 hover:bg-sx-bg-light focus-visible:bg-sx-bg-light focus-visible:outline-none"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-sx-bg-light transition-[background-color,scale] duration-300 ease-sx-out group-hover:scale-105 group-hover:bg-white group-focus-visible:bg-white">
        <Icon className="h-[18px] w-[18px] text-sx-ink" strokeWidth={1.75} />
      </span>
      <span>
        <span className="block text-[14px] font-bold text-sx-ink">{link.label}</span>
        <span className="block text-[13px] font-normal leading-snug text-sx-muted">
          {link.summary}
        </span>
      </span>
    </Link>
  );
}

function SimpleLink({ link }: { link: MenuLink }) {
  return (
    <li role="none">
      <Link
        href={link.url}
        role="menuitem"
        className="group block rounded-[12px] p-2 transition-colors duration-200 hover:bg-sx-bg-light focus-visible:bg-sx-bg-light focus-visible:outline-none"
      >
        <span className="flex items-center justify-between text-[14px] font-bold text-sx-ink">
          {link.label}
          <span
            aria-hidden="true"
            className="text-sx-ink opacity-0 transition-[opacity,translate] duration-300 ease-sx-out -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          >
            &rarr;
          </span>
        </span>
        <span className="block text-[13px] font-normal text-sx-muted">{link.summary}</span>
      </Link>
    </li>
  );
}
