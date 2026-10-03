'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/insights-data';
import { InsightArt } from '@/components/home/placeholder-art';

// Part B15 — the Insights grid with working topic filters. Chips are
// derived from the articles that actually exist (a topic with nothing
// behind it would filter to an empty page); articles sort newest first.
// Art variants key off each article's stable position in ARTICLES so a
// card keeps the same artwork here and on the homepage.
export function InsightsExplorer() {
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
      ARTICLES.filter((article) => topic === 'All' || article.topic === topic)
        .map((article) => ({ article, variant: ARTICLES.indexOf(article) }))
        .sort((a, b) => +new Date(b.article.date) - +new Date(a.article.date)),
    [topic],
  );

  return (
    <>
      <section className="sx-container pt-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition-colors ${
                topic === t
                  ? 'border-sx-ink bg-sx-ink text-white'
                  : 'border-sx-border text-sx-body hover:border-sx-ink hover:text-sx-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="sx-container py-8 sm:py-12">
        <p className="mb-6 text-[13px] text-sx-muted">
          Sample articles shown below for the Insights template.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(({ article, variant }) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group flex flex-col rounded-[16px] border border-sx-border bg-white p-5 transition-colors hover:border-sx-ink/30"
            >
              <InsightArt variant={variant} />
              <div className="sx-eyebrow mt-4">{article.topic}</div>
              <h2 className="mt-2 text-[17px] font-bold leading-snug text-sx-ink">
                {article.title}
              </h2>
              <div className="mt-auto pt-4 text-[13px] text-sx-muted">
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
