import type { Metadata } from 'next';

// W6 — Section 13 (SEO/share) audit: W2–W4 set per-page `title`/`description`
// but never `openGraph`/`twitter`, so every inner page shared the homepage's
// OG card. `pageMetadata()` derives both from the same title/description so
// every page gets correct share text without hand-writing it 26 times, and
// sets a per-page canonical `alternates.canonical` for the sitemap/robots
// story below.
export const SITE_URL = 'https://www.scaleax.com';
export const SITE_NAME = 'ScaleAX';

function titleText(title: string | { absolute: string }): string {
  return typeof title === 'string' ? title : title.absolute;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string | { absolute: string };
  description: string;
  path: string;
}): Metadata {
  const resolvedTitle = titleText(title);
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url,
      title: resolvedTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
    },
  };
}

// Part C7 / Part B — Organization structured data, injected once in the
// root layout so every page carries it (Google's guidance is one
// Organization block site-wide, not per-page).
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'ScaleAX sets up and runs Global Capability Centres in India with HQ at Ahmedabad and GIFT City: site, office, IT, hiring, entity, tax and compliance under one contract.',
    email: 'admin@scaleax.com',
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'GIFT City, Gandhinagar',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    ],
  };
}

// Insights article pages — Article structured data (Part B15).
export function articleJsonLd(article: {
  slug: string;
  title: string;
  intro: string;
  date: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.intro,
    datePublished: article.date,
    dateModified: article.date,
    url: `${SITE_URL}/insights/${article.slug}`,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
  };
}
