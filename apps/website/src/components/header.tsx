import Image from 'next/image';
import Link from 'next/link';
import {
  HOW_WE_WORK_MENU,
  SOLUTIONS_MENU,
  ENGAGEMENT_MODELS_MENU,
  INSIGHTS_MENU,
  type MenuLink,
} from '@/lib/site-data';
import { NavMenu } from './nav-menu';
import { MobileMenu } from './mobile-menu';
import { HeaderScroll } from './header-scroll';

// W9 header. Fixed; transparent with light text over a page's dark hero
// (decided in CSS, see `.sx-header` in globals.css), solid white once the
// visitor scrolls, hidden while scrolling down and back on scroll up.
// "What we offer" holds every How we work / Solutions / Engagement models
// route in one panel, so each page stays one hover away.
// No backdrop-filter or permanent transform on <header>: either would make it
// the containing block for the mobile menu's `position: fixed` dialog.
export function Header() {
  return (
    <header className="sx-header w-full">
      <HeaderScroll />
      <div className="sx-container flex h-full items-center justify-between">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[15px] font-bold lg:flex"
        >
          <NavLink href="/about">Who we are</NavLink>

          <NavMenu
            label="What we offer"
            panelClassName="fixed left-1/2 top-[68px] z-50 w-[min(1080px,calc(100vw-48px))] -translate-x-1/2 rounded-sx sx-glass p-8 text-sx-ink before:absolute before:inset-x-0 before:-top-5 before:h-5 before:content-['']"
          >
            <div className="grid grid-cols-[1fr_1.7fr_1.1fr] gap-10">
              <MenuColumn title="How we work">
                {HOW_WE_WORK_MENU.map((link, i) => (
                  <MegaLink key={link.url} link={link} index={i + 1} />
                ))}
              </MenuColumn>
              <MenuColumn title="Solutions">
                <div className="grid grid-cols-2 gap-x-6">
                  {SOLUTIONS_MENU.map((link) => (
                    <MegaLink key={link.url} link={link} />
                  ))}
                </div>
              </MenuColumn>
              <div className="flex flex-col gap-6">
                <MenuColumn title="Engagement models">
                  <ul>
                    {ENGAGEMENT_MODELS_MENU.map((link) => (
                      <SimpleLink key={link.url} link={link} />
                    ))}
                  </ul>
                </MenuColumn>
                <Link
                  href="/location"
                  role="menuitem"
                  className="group mt-auto flex flex-col rounded-sx bg-sx-tint-blue p-5 text-sx-ink transition-colors duration-300 hover:bg-sx-bg-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
                >
                  <span className="text-[15px] font-bold">Not sure where to start?</span>
                  <span className="mt-1 text-[13px] font-normal text-sx-ink-70">
                    Compare cities with the Location Finder{' '}
                    <span className="sx-btn-arrow">&rarr;</span>
                  </span>
                </Link>
                <Link
                  href="/gift-city"
                  role="menuitem"
                  className="group text-[14px] font-bold text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sx-ink"
                >
                  <span className="sx-link">GIFT City</span> &middot;{' '}
                  <span className="font-normal text-sx-muted">India&rsquo;s finance centre</span>
                </Link>
              </div>
            </div>
          </NavMenu>

          <NavLink href="/gift-city">GIFT City</NavLink>
          <NavMenu label="Insights">
            <ul>
              {INSIGHTS_MENU.map((link) => (
                <SimpleLink key={link.url} link={link} />
              ))}
            </ul>
          </NavMenu>

          <NavLink href="/calculator">GCC Calculator</NavLink>
          <Link
            href="/contact"
            className="sx-btn sx-btn-primary sx-header-cta !h-11 !px-5 text-[14px]"
          >
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
      className={`flex items-center rounded-sx focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        tone === 'ink' ? 'focus-visible:outline-current' : 'focus-visible:outline-white'
      }`}
    >
      <Image
        src="/scaleax.svg"
        alt="ScaleAX"
        width={289}
        height={56}
        priority
        className={`h-7 w-auto ${tone === 'light' ? 'brightness-0 invert' : 'sx-logo'}`}
      />
    </Link>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="sx-header-link group rounded-sx py-2">
      <span className="sx-link">{children}</span>
    </Link>
  );
}

function MenuColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="sx-eyebrow mb-4">{title}</div>
      {children}
    </div>
  );
}

function MegaLink({ link, index }: { link: MenuLink; index?: number }) {
  return (
    <Link
      href={link.url}
      role="menuitem"
      className="group flex items-baseline gap-3 border-t border-sx-border py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
    >
      {index && (
        <span aria-hidden="true" className="sx-figure text-[12px] font-bold text-sx-accent-ink">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <span>
        <span className="block text-[15px] font-bold text-sx-ink">
          <span className="sx-link">{link.label}</span>
        </span>{' '}
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
        className="group block border-t border-sx-border py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
      >
        <span className="flex items-center justify-between text-[15px] font-bold text-sx-ink">
          <span className="sx-link">{link.label}</span>
          <span aria-hidden="true" className="sx-btn-arrow">
            &rarr;
          </span>
        </span>
        <span className="block text-[13px] font-normal text-sx-muted">{link.summary}</span>
      </Link>
    </li>
  );
}
