import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/breadcrumb';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';
import { Media } from '@/components/media';
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
      <section className="sx-container py-12 md:py-20">
        <div className="mx-auto max-w-[1040px]">
          <Breadcrumb
            items={[
              { label: 'Home', url: '/' },
              { label: 'Insights', url: '/insights' },
              { label: article.title },
            ]}
          />
          <div className="mt-6 w-fit rounded-sx bg-sx-tint-yellow px-3 py-2 text-[13px] font-bold text-sx-ink">
            Sample article: shown to demonstrate the Insights template.
          </div>
          <div className="sx-eyebrow mt-10">{article.topic}</div>
          <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-black leading-[1.02] tracking-[-0.022em] text-sx-ink">
            {article.title}
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-[14px] font-bold text-sx-muted">
            <span className="text-sx-ink">ScaleAX team</span>
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

          <Media
            id={`insight-${article.slug}`}
            fallback={['insight-default']}
            alt=""
            width={1600}
            height={1000}
            tone="light"
            kind="insight"
            priority
            sizes="(min-width: 1100px) 1040px, 100vw"
            className="mt-10 aspect-[16/9] w-full rounded-sx"
          />
        </div>

        <div className="mx-auto max-w-[720px]">
          <div className="mt-12 space-y-5">
            {article.body.map((paragraph) => (
              <p key={paragraph} className="text-[18px] leading-[1.7] text-sx-body">
                {paragraph}
              </p>
            ))}
          </div>

          {article.sections?.map((section) => (
            <div key={section.heading} className="mt-10">
              <h2
                data-no-split=""
                className="text-[26px] font-black leading-tight tracking-[-0.015em] text-sx-ink"
              >
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[18px] leading-[1.7] text-sx-body">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[18px] leading-[1.7] text-sx-body marker:text-sx-accent">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="sx-container border-t border-sx-border py-16 md:py-24">
          <h2 className="sx-h2 text-sx-ink">Related articles</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-sx-ink sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="group border-b border-sx-border py-7"
              >
                <div className="sx-eyebrow">{item.topic}</div>
                <div className="mt-4 text-[20px] font-black leading-snug tracking-[-0.015em] text-sx-ink">
                  <span className="sx-link">{item.title}</span>
                </div>
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
