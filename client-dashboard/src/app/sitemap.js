import { SITE } from '@/lib/seo';
import { GUIDES } from '@/lib/guides';

// Static marketing/catalog routes. Dynamic per-gem URLs are appended once the
// public gem pages exist (see /gems/[slug]).
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/marketplace', priority: 0.9, changeFrequency: 'daily' },
  { path: '/collections', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/auctions', priority: 0.8, changeFrequency: 'daily' },
  { path: '/live-auctions', priority: 0.7, changeFrequency: 'hourly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/guides', priority: 0.7, changeFrequency: 'weekly' },
];

export default function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const guideEntries = GUIDES.map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...guideEntries];
}
