'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/insights-data';
import { ImageSlot } from '@/components/image-slot';

// Part B15 — the Insights grid with working topic filters. Chips are
// derived from the articles that actually exist (a topic with nothing
// behind it would filter to an empty page); articles sort newest first.
// Art variants key off each article's stable position in ARTICLES so a
// card keeps the same artwork here and on the homepage.
export function InsightsExplorer({ covers = {} }: { covers?: Record<string, string | null> }) {
  const [topic, setTopic] = useState<string>('All');

  const topics = useMemo(() => {
    const seen: string[] = [];
    for (const article of ARTICLES) {
      if (!seen.includes(article.topic)) seen.push(article.topic);
    }
    return ['All', ...seen];
  }, []);

  const articles = useMemo(
    () =>
      ARTICLES.filter((article) => topic === 'All' || article.topic === topic).sort(
        (a, b) => +new Date(b.date) - +new Date(a.date),
      ),
    [topic],
  );

  return (
    <>
      <section className="sx-container pt-12 md:pt-16">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={`min-h-11 rounded-sx px-4 text-[14px] font-bold transition-[background-color,color,box-shadow] duration-200 active:scale-[0.97] ${
                topic === t
                  ? 'bg-sx-ink text-white'
                  : 'text-sx-ink shadow-[inset_0_0_0_1.5px_var(--sx-ink-20)] hover:shadow-[inset_0_0_0_1.5px_var(--sx-ink)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="sx-container pb-16 pt-8 md:pb-24">
        <p className="mb-8 text-[14px] text-sx-muted">
          Sample articles shown below for the Insights template.
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group flex flex-col"
            >
              <ImageSlot
                id={`insight-${article.slug}`}
                src={covers[article.slug] ?? null}
                alt=""
                width={1600}
                height={1000}
                tone="light"
                kind="insight"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[16/10] w-full rounded-sx [&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-sx-out group-hover:[&_img]:scale-[1.05]"
              />
              <div className="mt-5 text-[14px] font-bold text-sx-accent-ink">{article.topic}</div>
              <h2
                data-no-split=""
                className="mt-2 text-[20px] font-black leading-snug tracking-[-0.015em] text-sx-ink"
              >
                <span className="sx-link">{article.title}</span>
              </h2>
              <div className="mt-auto pt-4 text-[14px] text-sx-muted">
                {article.readTime} &middot;{' '}
                {new Date(article.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
