// Part B, PAGE B16 — News. No real announcements exist yet, so these are
// clearly-marked sample entries showing the template (launches,
// partnerships, events, media coverage), not real news.
export interface NewsItem {
  date: string;
  headline: string;
  line: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    date: '2026-01-20',
    headline: 'ScaleAX opens its GIFT City office (sample entry)',
    line: 'A placeholder entry showing how a launch announcement will appear here.',
  },
  {
    date: '2025-12-02',
    headline: 'ScaleAX partners with DevX on managed workspace (sample entry)',
    line: 'A placeholder entry showing how a partnership announcement will appear here.',
  },
];
