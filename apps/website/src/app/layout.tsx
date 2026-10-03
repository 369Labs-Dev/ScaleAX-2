import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SITE_URL, organizationJsonLd } from '@/lib/seo';
import { MOTION_BOOT_SCRIPT } from '@/lib/motion';
import { MotionRuntime } from '@/components/motion/motion-runtime';

// W8 — Lato, the typeface of the approved reference design (it self-hosts
// Lato 400/500/600/700/900). Google Fonts ships Lato at 400/700/900 only, so
// 500/600 resolve to 700 — the reference's own 800 already resolves to 900.
// next/font generates a metric-matched fallback, so the swap causes no CLS.
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// Section 13 — home page title/description are the site-wide defaults;
// inner pages override title via the `%s | ScaleAX` template (or an
// absolute title when the brief specifies an exact string, e.g. the tools).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ScaleAX | GCC set-up in Ahmedabad and GIFT City, India',
    template: '%s | ScaleAX',
  },
  description:
    'ScaleAX sets up and runs Global Capability Centres in Ahmedabad and GIFT City: site, office, IT, hiring, entity, tax and compliance under one contract.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: 'ScaleAX',
    url: SITE_URL,
    title: 'ScaleAX | GCC set-up in Ahmedabad and GIFT City, India',
    description:
      'ScaleAX sets up and runs Global Capability Centres in Ahmedabad and GIFT City: site, office, IT, hiring, entity, tax and compliance under one contract.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScaleAX | GCC set-up in Ahmedabad and GIFT City, India',
    description:
      'ScaleAX sets up and runs Global Capability Centres in Ahmedabad and GIFT City: site, office, IT, hiring, entity, tax and compliance under one contract.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline motion script below may add
    // `sx-motion` to <html> before React hydrates (W7 motion system).
    <html lang="en" className={lato.variable} suppressHydrationWarning>
      <head>
        {/* W7 — decides, before first paint, whether scroll/entrance motion
            is enabled (never under prefers-reduced-motion). See lib/motion.ts. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <MotionRuntime />
        {/* Part C — Organization structured data, site-wide (Google's
            guidance is one Organization block, not one per page). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
