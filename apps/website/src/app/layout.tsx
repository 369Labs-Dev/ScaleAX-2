import type { Metadata } from 'next';
import { Archivo, Caveat, Geist } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SITE_URL, organizationJsonLd } from '@/lib/seo';
import { MOTION_BOOT_SCRIPT } from '@/lib/motion';
import { MotionRuntime } from '@/components/motion/motion-runtime';
import { ScrollFx } from '@/components/motion/scroll-fx';

// W9: two typefaces. Archivo is the display face (h1 to h3 and the large
// figures); its width axis is loaded so headlines run semi-condensed
// (font-stretch in globals.css). Geist sets everything else: body copy,
// navigation, buttons and labels. next/font self-hosts both and generates
// metric-matched fallbacks, so the swap causes no layout shift.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// The one exception: a handwriting face, used only for the testimonial notes on the home page.
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-hand',
  display: 'swap',
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
    <html
      lang="en"
      className={`${geist.variable} ${archivo.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
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
        <ScrollFx />
        {/* Part C — Organization structured data, site-wide (Google's
            guidance is one Organization block, not one per page). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header />
        <main className="sx-main flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
