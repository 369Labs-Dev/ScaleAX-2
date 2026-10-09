import Link from 'next/link';
import type { Metadata } from 'next';

// W6 — branded 404. Next renders this in place of the root layout's
// `<main>` children, so the header / footer still wrap
// it; it only needs to supply the page body, in the same design language as
// the rest of the site (Part C5).
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="border-b border-sx-border">
      <div className="sx-container grid gap-x-14 py-24 md:py-32 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <div className="sx-eyebrow">404</div>
          <h1 className="sx-h1 mt-6 max-w-[14ch] text-sx-ink">We couldn&rsquo;t find that page.</h1>
          <p className="sx-lead mt-7 max-w-[52ch]">
            The page you&rsquo;re looking for may have moved or no longer exists. Try the homepage,
            or jump straight to one of our tools.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="sx-btn sx-btn-primary">
              Go to homepage
              <span className="sx-btn-arrow" aria-hidden="true" />
            </Link>
            <Link href="/calculator" className="sx-btn sx-btn-ghost">
              Estimate your cost
            </Link>
            <Link href="/location" className="sx-btn sx-btn-ghost">
              Find the right city
            </Link>
          </div>
        </div>
        <p
          aria-hidden="true"
          className="sx-figure mt-12 select-none text-[clamp(7rem,22vw,15rem)] font-bold leading-[0.8] tracking-[-0.01em] text-sx-ink-06 lg:col-span-4 lg:mt-0 lg:text-right"
        >
          404
        </p>
      </div>
    </section>
  );
}
