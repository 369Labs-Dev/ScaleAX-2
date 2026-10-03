'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// W6 — branded runtime-error boundary (Next requires this to be a Client
// Component). Rendered inside the root layout, same as not-found.tsx, so
// header/footer persist even when a page segment throws.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[website] unhandled page error', error);
  }, [error]);

  return (
    <section className="bg-sx-bg-light">
      <div className="mx-auto max-w-[680px] px-4 py-24 text-center sm:py-32">
        <div className="sx-eyebrow">SOMETHING WENT WRONG</div>
        <h1 className="mt-2 text-[32px] font-bold leading-[40px] text-sx-ink sm:text-[44px] sm:leading-[52px]">
          This page hit an unexpected error.
        </h1>
        <p className="mt-4 text-[16px] leading-[26px] text-sx-body sm:text-[18px] sm:leading-[28px]">
          Our team has been notified. You can try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={reset} className="sx-btn sx-btn-primary">
            Try again
          </button>
          <Link href="/" className="sx-btn sx-btn-ghost">
            Go to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
