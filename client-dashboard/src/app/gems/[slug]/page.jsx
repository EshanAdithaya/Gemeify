import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Gem as GemIcon, Award, MapPin, Scale, Star, ChevronRight } from 'lucide-react';
import { SITE, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import OptimizedImage from '@/components/OptimizedImage';
import GemActions from './GemActions';

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
    return null;
  }
}

export async function generateMetadata({ params }) {
  const gem = await fetchGem(params.slug);
  if (!gem) return buildMetadata({ title: 'Gem not found', noIndex: true });

  const image = gem.mainImage || (Array.isArray(gem.images) ? gem.images[0] : null) || SITE.ogImage;
  return buildMetadata({
    title: `${gem.name} — ${gem.weight}ct ${gem.color} | Investment Grade Gemstone`,
    description:
      gem.metaDescription ||
      `${gem.name}: a certified ${gem.weight}ct ${gem.color} ${gem.cut} from ${gem.origin}. GIA certified, investment grade. View specifications, provenance and price on Gemeify.`,
    path: `/gems/${gem.slug}`,
    image,
    keywords: [gem.name, gem.color, gem.cut, gem.origin, gem.certificationLab, 'investment gem', 'certified gemstone', 'luxury gemstone'].filter(Boolean),
  });
}

const CERT_LOGOS = {
  GIA: 'GIA',
  AGL: 'AGL',
  GRS: 'GRS',
  'Gübelin': 'Gübelin',
  IGI: 'IGI',
  SSEF: 'SSEF',
};

export default async function GemPage({ params }) {
  const gem = await fetchGem(params.slug);
  if (!gem) notFound();

  const price    = Number(gem.price) || 0;
  const images   = gem.mainImage
    ? [gem.mainImage, ...(Array.isArray(gem.images) ? gem.images.filter((i) => i !== gem.mainImage) : [])]
    : Array.isArray(gem.images) ? gem.images : [];
  const mainImg  = images[0] || null;
  const available = gem.status === 'approved' && (gem.quantity ?? 0) > 0;
  const url      = `${SITE.url}/gems/${gem.slug}`;
  const rating   = gem.rating ? Number(gem.rating) : 0;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: gem.name,
    description: gem.description,
    image: images.length ? images : undefined,
    sku: gem.sku || gem.id,
    category: gem.category?.name,
    brand: { '@type': 'Brand', name: gem.shop?.name || SITE.name },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: price.toFixed(2),
      availability: available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    ...(gem.totalReviews > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toFixed(1),
        reviewCount: gem.totalReviews,
      },
    } : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE.url}/marketplace` },
      { '@type': 'ListItem', position: 3, name: gem.name,      item: url },
    ],
  };

  const specs = [
    { Icon: Scale,  label: 'Weight',  value: gem.weight  ? `${gem.weight} ct`  : '—' },
    { Icon: GemIcon, label: 'Cut',    value: gem.cut     || '—' },
    { Icon: Award,  label: 'Clarity', value: gem.clarity || '—' },
    { Icon: MapPin, label: 'Origin',  value: gem.origin  || '—' },
  ];

  const extraSpecs = [
    gem.color     && { label: 'Colour',    value: gem.color },
    gem.treatment && { label: 'Treatment', value: gem.treatment },
    gem.shape     && { label: 'Shape',     value: gem.shape },
    gem.dimensions && { label: 'Dimensions', value: gem.dimensions },
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />

      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase mb-10" aria-label="Breadcrumb">
          <Link href="/" className="text-slate-400 hover:text-royal-500 transition-colors">Home</Link>
          <ChevronRight size={12} className="text-slate-300" />
          <Link href="/marketplace" className="text-slate-400 hover:text-royal-500 transition-colors">Marketplace</Link>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-royal-600">{gem.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Image Column */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-sm overflow-hidden border border-slate-200"
              style={{ background: 'rgba(24,22,20,0.8)' }}>
              <OptimizedImage
                src={mainImg}
                alt={gem.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Certification watermark */}
              {gem.certificationLab && (
                <div className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase border border-gold-500/40 text-royal-500"
                  style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}>
                  {CERT_LOGOS[gem.certificationLab] || gem.certificationLab} Certified
                </div>
              )}
              {!available && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-slate-500 border border-pearl-700/40 px-4 py-2"
                    style={{ backdropFilter: 'blur(8px)' }}>
                    Sold / Unavailable
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border border-slate-200 hover:border-royal-300 transition-colors">
                    <OptimizedImage src={img} alt={`${gem.name} view ${i + 2}`} fill sizes="80px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Trust strip */}
            <div className="flex items-center justify-around py-3 border border-slate-200 rounded-sm"
              style={{ background: 'rgba(37,99,235,0.03)' }}>
              {['GIA Certified', 'Insured Shipping', 'Authenticity Guaranteed'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <Shield size={11} className="text-royal-700" />
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div>
            {gem.category?.name && (
              <p className="section-label mb-2">{gem.category.name}</p>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              {gem.name}
            </h1>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((n) => (
                    <Star key={n} size={13}
                      className={n <= Math.round(rating) ? 'text-royal-600 fill-gold-500' : 'text-slate-300'} />
                  ))}
                </div>
                <span className="text-xs text-slate-500">{rating.toFixed(1)} ({gem.totalReviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="mb-2">
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Investment Price</p>
              <p className="text-3xl sm:text-4xl font-bold text-gold-gradient">
                ${price.toLocaleString()}
              </p>
            </div>

            {/* Availability */}
            <p className={`text-[11px] font-bold tracking-widest uppercase mb-7 ${available ? 'text-emerald-400' : 'text-amber-500'}`}>
              {available ? '● Available for Acquisition' : '○ Currently Unavailable'}
            </p>

            {/* Primary Specs */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {specs.map(({ Icon, label, value }) => (
                <div key={label} className="luxury-card px-4 py-3">
                  <Icon size={14} className="text-royal-700 mb-1.5" />
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Certification */}
            {gem.certificationLab && (
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300/30 rounded-sm mb-6"
                style={{ background: 'rgba(37,99,235,0.04)' }}>
                <Shield size={18} className="text-royal-600 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Certification</p>
                  <p className="text-sm text-slate-800 font-medium">
                    {gem.certificationLab} Certified
                    {gem.certificationNumber ? ` · #${gem.certificationNumber}` : ''}
                  </p>
                </div>
              </div>
            )}

            {/* CTA Buttons (client component) */}
            <GemActions gem={gem} available={available} />

            {/* Private Consultation */}
            <p className="text-center text-[10px] tracking-wider uppercase text-slate-400 mt-4">
              Questions? <Link href="/about#contact" className="text-royal-600 hover:text-royal-500 transition-colors underline underline-offset-2">Request a Private Consultation</Link>
            </p>
          </div>
        </div>

        {/* Lower sections */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {/* Description / Provenance */}
          <div className="md:col-span-2 space-y-8">
            {gem.description && (
              <section>
                <div className="flex items-center gap-4 mb-5">
                  <span className="section-label">Provenance</span>
                  <div className="flex-1 h-px bg-gold-900/25" />
                </div>
                <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                  {gem.description}
                </p>
              </section>
            )}

            {/* Extended Specs */}
            {extraSpecs.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-5">
                  <span className="section-label">Specifications</span>
                  <div className="flex-1 h-px bg-gold-900/25" />
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {extraSpecs.map(({ label, value }) => (
                      <tr key={label} className="border-b border-slate-100 last:border-0">
                        <td className="py-2.5 pr-6 text-[11px] font-bold tracking-wider uppercase text-slate-400 w-36">{label}</td>
                        <td className="py-2.5 text-slate-700">{value}</td>
                      </tr>
                    ))}
                    {gem.shop?.name && (
                      <tr className="border-b border-slate-100 last:border-0">
                        <td className="py-2.5 pr-6 text-[11px] font-bold tracking-wider uppercase text-slate-400 w-36">Dealer</td>
                        <td className="py-2.5 text-slate-700">{gem.shop.name}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            )}
          </div>

          {/* Investment Sidebar */}
          <div className="space-y-4">
            <div className="luxury-card p-5">
              <p className="section-label mb-4">Investment Notes</p>
              <ul className="space-y-3">
                {[
                  'Investment-grade gemstones have historically appreciated 8–12% annually',
                  'Rarity and origin certification are primary value drivers',
                  'Insured and fully documented for estate transfer',
                  'Global resale liquidity through our certified dealer network',
                ].map((note) => (
                  <li key={note} className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                    <span className="text-royal-700 mt-0.5 flex-shrink-0">◆</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="luxury-card p-5">
              <p className="section-label mb-3">Authenticity</p>
              <div className="space-y-2.5">
                {['Certified Natural', 'Conflict Free', 'Fully Insured', 'Discreet Packaging'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2.5">
                    <Shield size={12} className="text-royal-700 flex-shrink-0" />
                    <span className="text-xs text-slate-600">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link href="/marketplace"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-slate-400 hover:text-royal-500 transition-colors">
            ← Back to the Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
