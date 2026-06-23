// Central SEO/site configuration and a small helper for building per-page
// Next.js Metadata objects with sensible Open Graph / Twitter defaults.

export const SITE = {
  name: 'Gemify',
  tagline: 'Investment-Grade Certified Gemstones',
  description:
    'Gemify is a curated marketplace of certified precious gemstones — sapphires, rubies, emeralds and diamonds — personally vetted by expert gemologists.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://gemify.com').replace(/\/$/, ''),
  locale: 'en_US',
  twitter: '@gemify',
  ogImage: '/og-default.svg',
  themeColor: '#7c3aed',
};

/**
 * Build a Next.js Metadata object. Pass a page title (without the brand),
 * description, path and optional image; brand suffix and OG/Twitter are
 * filled in automatically.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = '/',
  image = SITE.ogImage,
  keywords = [],
  noIndex = false,
} = {}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const url = `${SITE.url}${path}`;
  const img = image.startsWith('http') ? image : `${SITE.url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'gemstones',
      'certified gems',
      'sapphire',
      'ruby',
      'emerald',
      'diamond',
      'gem marketplace',
      ...keywords,
    ],
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: fullTitle,
      description,
      url,
      locale: SITE.locale,
      images: [{ url: img, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      title: fullTitle,
      description,
      images: [img],
    },
  };
}
