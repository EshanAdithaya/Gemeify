// Central SEO/site configuration and a small helper for building per-page
// Next.js Metadata objects with sensible Open Graph / Twitter defaults.

export const SITE = {
  name: 'Gemeify',
  tagline: 'The Private Gemstone Investment House',
  description:
    'Gemeify is the private marketplace for investment-grade certified gemstones — Kashmir sapphires, Burma rubies, Colombian emeralds, and Argyle pink diamonds — personally vetted by master gemologists and trusted by private collectors in London, Geneva, Dubai, and Singapore.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://gemeify.com').replace(/\/$/, ''),
  locale: 'en_US',
  twitter: '@gemeify',
  ogImage: '/og-default.svg',
  themeColor: '#D4AF37',
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
      'investment gemstones',
      'certified precious gems',
      'buy certified sapphire',
      'investment grade ruby',
      'GIA certified diamonds',
      'luxury gem marketplace',
      'buy gemstones online Europe',
      'precious gems Dubai',
      'Kashmir sapphire for sale',
      'Burma ruby investment',
      'Colombian emerald certified',
      'Argyle pink diamond',
      'gem investment portfolio',
      'private gem collection',
      'certified gemstones London',
      'gem auction house',
      'precious stone investment',
      'certified emerald Geneva',
      'sapphire investment fund',
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
