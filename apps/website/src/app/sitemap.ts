import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { ROUTES } from '@/lib/routes';

// W6 — sitemap.xml as a Next metadata route, covering all 26 routes from
// the Part 0.1 site map (the same list the smoke test asserts on).
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/insights/') ? 0.5 : 0.8,
  }));
}
