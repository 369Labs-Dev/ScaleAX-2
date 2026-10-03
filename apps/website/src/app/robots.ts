import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// W6 — robots.txt as a Next metadata route. The API routes are excluded
// since they're POST-only leadgen/consultation endpoints, not content.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
