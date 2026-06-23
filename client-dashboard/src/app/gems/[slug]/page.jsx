import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Shield, Gem as GemIcon, Award, MapPin, Scale } from 'lucide-react';
import { SITE, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import OptimizedImage from '@/components/OptimizedImage';

// Revalidate the page periodically so catalog changes propagate without a
// rebuild (Incremental Static Regeneration).
export const revalidate = 300;

const API = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001').replace(/\/$/, '');

async function fetchGem(slug) {
  try {
    const res = await fetch(`${API}/gems/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    // Backend unreachable (e.g. during an offline build) — render 404 rather
    // than failing the whole build.
    return null;
  }
}

export async function generateMetadata({ params }) {
  const gem = await fetchGem(params.slug);
  if (!gem) return buildMetadata({ title: 'Gem not found', noIndex: true });

  const image = gem.mainImage || (Array.isArray(gem.images) ? gem.images[0] : null) || SITE.ogImage;
  return buildMetadata({
    title: `${gem.name} — ${gem.weight}ct ${gem.color}`,
    description:
      gem.metaDescription ||
      `${gem.name}: a certified ${gem.weight}ct ${gem.color} ${gem.cut} from ${gem.origin}. View specifications, certification and price on Gemify.`,
    path: `/gems/${gem.slug}`,
    image,
    keywords: [gem.name, gem.color, gem.cut, gem.origin, gem.certificationLab].filter(Boolean),
  });
}

export default async function GemPage({ params }) {
  const gem = await fetchGem(params.slug);
  if (!gem) notFound();

  const price = Number(gem.price) || 0;
  const image = gem.mainImage || (Array.isArray(gem.images) ? gem.images[0] : null);
  const available = gem.status === 'approved' && (gem.quantity ?? 0) > 0;
  const url = `${SITE.url}/gems/${gem.slug}`;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: gem.name,
    description: gem.description,
    image: image ? [image] : undefined,
    sku: gem.sku || gem.id,
    category: gem.category?.name,
    brand: { '@type': 'Brand', name: gem.shop?.name || SITE.name },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: price.toFixed(2),
      availability: available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    ...(gem.totalReviews > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Number(gem.rating).toFixed(1),
            reviewCount: gem.totalReviews,
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE.url}/marketplace` },
      { '@type': 'ListItem', position: 3, name: gem.name, item: url },
    ],
  };

  const specs = [
    { Icon: Scale, label: 'Weight', value: `${gem.weight} ct` },
    { Icon: GemIcon, label: 'Cut', value: gem.cut },
    { Icon: Award, label: 'Clarity', value: gem.clarity },
    { Icon: MapPin, label: 'Origin', value: gem.origin },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />

      <div className="max-w-5xl mx-auto">
        <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{gem.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-80 md:h-[28rem] rounded-2xl overflow-hidden bg-slate-800">
            <OptimizedImage src={image} alt={gem.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>

          <div className="animate-fade-up">
            {gem.category?.name && (
              <span className="text-brand-400 font-medium">{gem.category.name}</span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">{gem.name}</h1>

            <div className="mt-4 text-3xl font-bold text-white">${price.toLocaleString()}</div>
            <div className={`mt-1 text-sm font-medium ${available ? 'text-emerald-400' : 'text-amber-400'}`}>
              {available ? 'Available' : 'Sold / Unavailable'}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {specs.map((s) => (
                <div key={s.label} className="rounded-xl bg-slate-800/60 p-4">
                  <s.Icon size={18} className="text-brand-400" />
                  <p className="text-xs text-slate-400 mt-2">{s.label}</p>
                  <p className="text-white font-medium">{s.value}</p>
                </div>
              ))}
            </div>

            {gem.certificationLab && (
              <div className="flex items-center gap-2 mt-5 text-slate-300">
                <Shield size={18} className="text-brand-400" />
                {gem.certificationLab} certified
                {gem.certificationNumber ? ` · ${gem.certificationNumber}` : ''}
              </div>
            )}

            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center mt-7 w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              View in Marketplace
            </Link>
          </div>
        </div>

        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold text-white mb-3">About this gem</h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">{gem.description}</p>
        </section>

        <div className="mt-10">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300">
            <ArrowLeft size={16} /> Back to marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}
