import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { GUIDES } from '@/lib/guides';
import { SITE, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Newsletter from '@/components/Newsletter';

export const metadata = buildMetadata({
  title: 'Gem Guides',
  description:
    'Expert gemstone buying guides and education — certificates, the 4 Cs, sapphire selection and ethical sourcing. Learn before you buy.',
  path: '/guides',
  keywords: ['gemstone guides', 'gem education', 'how to buy gemstones'],
});

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Gem Guides',
  url: `${SITE.url}/guides`,
  hasPart: GUIDES.map((g) => ({
    '@type': 'Article',
    headline: g.title,
    url: `${SITE.url}/guides/${g.slug}`,
  })),
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <JsonLd data={collectionLd} />
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12 animate-fade-up">
          <p className="text-brand-400 font-medium">Learn</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">Gem Guides</h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Everything you need to buy with confidence — written by people who grade stones for a living.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group block rounded-2xl bg-slate-800/50 hover:bg-slate-800 p-6 transition-colors"
            >
              <span className="inline-block text-xs font-medium text-brand-300 bg-brand-500/10 rounded-full px-3 py-1">
                {g.category}
              </span>
              <h2 className="text-xl font-semibold text-white mt-3 group-hover:text-brand-300 transition-colors">
                {g.title}
              </h2>
              <p className="text-slate-400 mt-2">{g.excerpt}</p>
              <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {g.readingTime} min read
                </span>
                <span className="flex items-center gap-1 text-brand-400 group-hover:gap-2 transition-all">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14">
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
