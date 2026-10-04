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
    <section className="border-b border-sx-border">
      <div className="sx-container py-24 md:py-32">
        <div className="sx-eyebrow">SOMETHING WENT WRONG</div>
        <h1 className="sx-h1 mt-6 max-w-[14ch] text-sx-ink">This page hit an unexpected error.</h1>
        <p className="sx-lead mt-7 max-w-[52ch]">
          Our team has been notified. You can try again, or head back to the homepage.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
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
