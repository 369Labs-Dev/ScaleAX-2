import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';
import { NEWS_ITEMS } from '@/lib/news-data';

// Part B, PAGE B16 — News.
export const metadata: Metadata = pageMetadata({
  title: 'News',
  description: "Updates on ScaleAX's launches, partnerships, events and media coverage.",
  path: '/news',
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="NEWS"
        title="What's new at ScaleAX."
        intro="Updates on new offices, partnerships and milestones."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'News' }]}
      />

      <section className="mx-auto max-w-[800px] px-4 py-12 sm:py-16">
        <p className="mb-6 text-[13px] text-sx-muted">
          Sample entries shown below for the News template.
        </p>
        <ul className="divide-y divide-sx-border">
          {NEWS_ITEMS.map((item) => (
            <li key={item.headline} className="py-5">
              <div className="text-[13px] text-sx-muted">
                {new Date(item.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="mt-1 text-[17px] font-bold text-sx-ink">{item.headline}</div>
              <p className="mt-1 text-[14px] text-sx-body">{item.line}</p>
            </li>
          ))}
        </ul>
      </section>

      <WhereNext page="news" />
      <ClosingCta
        headline="Talk to us about your centre."
        line="Start with a short call about what you're planning."
      />
    </>
  );
}
