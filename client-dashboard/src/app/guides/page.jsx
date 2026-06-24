import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { GUIDES } from '@/lib/guides';
import { SITE, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Newsletter from '@/components/Newsletter';

export const metadata = buildMetadata({
  title: 'Gem Investment Guides',
  description:
    'Expert gemstone buying guides for serious collectors and investors — certificates, the 4 Cs, sapphire selection, ruby valuation, diamond grading, and ethical sourcing. Written by FGA-certified gemologists.',
  path: '/guides',
  keywords: [
    'gemstone investment guide', 'how to buy certified sapphire', 'ruby investment tips',
    'gem education', 'GIA certificate explained', 'diamond buying guide Europe',
    'precious gem portfolio advice',
  ],
});

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Gemify Investment Guides',
  url: `${SITE.url}/guides`,
  description: 'Expert gemstone buying guides for collectors and investors.',
  hasPart: GUIDES.map((g) => ({
    '@type': 'Article',
    headline: g.title,
    url: `${SITE.url}/guides/${g.slug}`,
    author: { '@type': 'Organization', name: 'Gemify' },
  })),
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-obsidian-950 pt-28 pb-20 px-6 lg:px-8">
      <JsonLd data={collectionLd} />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="text-center mb-16 animate-fade-up">
          <p className="section-label mb-3">Expert Knowledge</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pearl-50 mb-4">
            Gem Investment Guides
          </h1>
          <p className="text-pearl-400 max-w-2xl mx-auto text-base leading-relaxed">
            Everything you need to invest with confidence — written by FGA-certified gemologists
            who grade stones professionally.
          </p>
        </header>

        {/* Guide cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {GUIDES.map((g, idx) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="luxury-card group flex flex-col p-7 animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4 self-start border border-gold-700/40 text-gold-500"
                style={{ background: 'rgba(212,175,55,0.08)' }}>
                {g.category}
              </span>
              <h2 className="text-lg font-bold text-pearl-100 mb-2 group-hover:text-gold-400 transition-colors">
                {g.title}
              </h2>
              <p className="text-pearl-500 text-sm leading-relaxed flex-1 mb-5">{g.excerpt}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-pearl-500">
                  <Clock size={12} /> {g.readingTime} min read
                </span>
                <span className="flex items-center gap-1.5 text-gold-500 group-hover:text-gold-300 font-semibold tracking-wider uppercase transition-all">
                  Read Guide <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16">
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
