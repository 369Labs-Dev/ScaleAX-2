import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/breadcrumb';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';
import { InsightArt } from '@/components/home/placeholder-art';
import { ARTICLES } from '@/lib/insights-data';
import { pageMetadata, articleJsonLd } from '@/lib/seo';

// Part B, PAGE B15 — Insights article page: title, author, date, body,
// "Related articles" (3), and the Where-next band.
export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.intro,
    path: `/insights/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      {/* Part B15 — Article structured data. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <section className="mx-auto max-w-[800px] px-4 py-12 sm:py-16">
        <Breadcrumb
          items={[
            { label: 'Home', url: '/' },
            { label: 'Insights', url: '/insights' },
            { label: article.title },
          ]}
        />
        <div className="mt-4 rounded-[8px] bg-sx-bg-light px-3 py-2 text-[13px] text-sx-muted">
          Sample article &mdash; shown to demonstrate the Insights template.
        </div>
        <div className="mt-4 sx-eyebrow">{article.topic}</div>
        <h1 className="mt-2 text-[32px] font-bold leading-[40px] text-sx-ink sm:text-[40px] sm:leading-[48px]">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-[13px] text-sx-muted">
          <div className="h-8 w-8 rounded-full bg-sx-bg-light" aria-hidden="true" />
          <span>ScaleAX team</span>
          <span aria-hidden="true">&middot;</span>
          <span>
            {new Date(article.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>{article.readTime}</span>
        </div>

        <div className="mt-8">
          <InsightArt variant={ARTICLES.indexOf(article)} />
        </div>

        <div className="mt-8 space-y-4">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="text-[16px] leading-[26px] text-sx-body">
              {paragraph}
            </p>
          ))}
        </div>

        {article.sections?.map((section) => (
          <div key={section.heading} className="mt-10">
            <h2 className="text-[22px] font-bold leading-[30px] text-sx-ink">{section.heading}</h2>
            <div className="mt-3 space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-[16px] leading-[26px] text-sx-body">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.list && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-[26px] text-sx-body marker:text-sx-ink">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {related.length > 0 && (
        <section className="sx-container py-12 sm:py-16">
          <h2 className="text-[20px] font-bold text-sx-ink">Related articles</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="rounded-[16px] border border-sx-border bg-white p-5 hover:bg-sx-bg-light"
              >
                <div className="sx-eyebrow">{item.topic}</div>
                <div className="mt-2 text-[15px] font-bold text-sx-ink">{item.title}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <WhereNext page="insights" />
      <ClosingCta
        headline="Talk to us about your centre."
        line="Start with a short call about what you're planning."
      />
    </>
  );
}
