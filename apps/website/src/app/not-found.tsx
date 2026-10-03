import Link from 'next/link';
import type { Metadata } from 'next';

// W6 — branded 404. Next renders this in place of the root layout's
// `<main>` children, so the header / footer still wrap
// it; it only needs to supply the page body, in the same navy/orange
// design language as the rest of the site (Part C5).
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-sx-bg-light">
      <div className="mx-auto max-w-[680px] px-4 py-24 text-center sm:py-32">
        <div className="sx-eyebrow">404</div>
        <h1 className="mt-2 text-[32px] font-bold leading-[40px] text-sx-ink sm:text-[44px] sm:leading-[52px]">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-[16px] leading-[26px] text-sx-body sm:text-[18px] sm:leading-[28px]">
          The page you&rsquo;re looking for may have moved or no longer exists. Try the homepage, or
          jump straight to one of our tools.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="sx-btn sx-btn-primary">
            Go to homepage
          </Link>
          <Link href="/calculator" className="sx-btn sx-btn-ghost">
            Estimate your cost
          </Link>
          <Link href="/location" className="sx-btn sx-btn-ghost">
            Find the right city
          </Link>
        </div>
      </div>
    </section>
  );
}
