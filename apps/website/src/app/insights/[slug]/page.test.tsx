import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticlePage, { generateStaticParams } from './page';
import { ARTICLES } from '@/lib/insights-data';

// Part B15 — article detail route. The page component is an async Server
// Component (it awaits `params`), so it's awaited here before rendering the
// resolved element, rather than rendered directly.
describe('Insights article page', () => {
  it('lists every sample article slug as a static param', () => {
    expect(generateStaticParams()).toHaveLength(ARTICLES.length);
  });

  it('renders the article title, sample-article notice, body and related articles', async () => {
    const article = ARTICLES[0];
    const element = await ArticlePage({ params: Promise.resolve({ slug: article.slug }) });
    render(element);

    expect(screen.getByRole('heading', { level: 1, name: article.title })).toBeInTheDocument();
    expect(screen.getAllByText(/sample article/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /related articles/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(ARTICLES[1].title) })).toBeInTheDocument();
  });

  it('renders headed sections and lists for articles that have them', async () => {
    const article = ARTICLES.find((a) => a.sections?.some((s) => s.list));
    if (!article?.sections) throw new Error('expected an article with sections');
    const element = await ArticlePage({ params: Promise.resolve({ slug: article.slug }) });
    render(element);

    for (const section of article.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.heading })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });
});
