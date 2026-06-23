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

const API = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001').replace(/\/$/, '');

// Best-effort fetch of approved gems for the sitemap. Resilient: if the
// backend is unreachable at build time the sitemap still emits static + guides.
async function fetchGemUrls() {
  try {
    const res = await fetch(`${API}/gems?limit=1000`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const gems = json?.data?.data || [];
    return gems
      .filter((g) => g.slug)
      .map((g) => ({
        url: `${SITE.url}/gems/${g.slug}`,
        lastModified: g.updatedAt ? new Date(g.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
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

  const gemEntries = await fetchGemUrls();

  return [...staticEntries, ...guideEntries, ...gemEntries];
}
