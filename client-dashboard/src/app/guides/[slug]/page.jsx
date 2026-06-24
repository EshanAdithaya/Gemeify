import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { GUIDES, getGuide } from '@/lib/guides';
import { SITE, buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Newsletter from '@/components/Newsletter';

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const guide = getGuide(params.slug);
  if (!guide) return buildMetadata({ title: 'Guide not found', noIndex: true });
  return buildMetadata({
    title: `${guide.title} | Gemeify Investment Guide`,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
  });
}

export default function GuidePage({ params }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const url = `${SITE.url}/guides/${guide.slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    keywords: guide.keywords.join(', '),
    dateModified: guide.updated,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo512.png` },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.url}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-obsidian-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <article className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase mb-10" aria-label="Breadcrumb">
          <Link href="/" className="text-pearl-600 hover:text-gold-400 transition-colors">Home</Link>
          <ChevronRight size={12} className="text-pearl-700" />
          <Link href="/guides" className="text-pearl-600 hover:text-gold-400 transition-colors">Guides</Link>
          <ChevronRight size={12} className="text-pearl-700" />
          <span className="text-gold-500 truncate max-w-[180px]">{guide.title}</span>
        </nav>

        {/* Article header */}
        <header className="mb-10">
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-gold-700/40 text-gold-500 rounded-sm mb-4"
            style={{ background: 'rgba(212,175,55,0.06)' }}>
            {guide.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-pearl-50 leading-tight mt-3 mb-4"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
            {guide.title}
          </h1>
          <p className="text-pearl-400 text-lg leading-relaxed mb-5"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '1.15rem' }}>
            {guide.excerpt}
          </p>
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-wider uppercase text-pearl-600">
            <Clock size={12} className="text-gold-700" />
            <span>{guide.readingTime} min read</span>
            <span className="text-pearl-800">·</span>
            <span>Updated {new Date(guide.updated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="h-px bg-gold-900/25 mt-7" />
        </header>

        {/* Article body */}
        <div className="space-y-10">
          {guide.sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-medium text-pearl-100 mb-3"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                {s.heading}
              </h2>
              <p className="text-pearl-300 leading-relaxed text-base">{s.body}</p>
              {i < guide.sections.length - 1 && (
                <div className="h-px bg-gold-900/15 mt-10" />
              )}
            </section>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-14 luxury-card p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="section-label mb-1">Ready to Acquire?</p>
            <h3 className="font-display text-xl font-medium text-pearl-100"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
              Browse Investment-Grade Gems
            </h3>
            <p className="text-sm text-pearl-500 mt-1">Fully certified with provenance documentation.</p>
          </div>
          <Link href="/marketplace" className="btn-gold flex items-center gap-2 whitespace-nowrap flex-shrink-0">
            Explore Collection <ArrowRight size={14} />
          </Link>
        </div>

        {/* Back */}
        <div className="mt-10">
          <Link href="/guides"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-pearl-600 hover:text-gold-400 transition-colors">
            <ArrowLeft size={12} /> All Guides
          </Link>
        </div>

        {/* Newsletter */}
        <div className="mt-14">
          <Newsletter />
        </div>
      </article>
    </main>
  );
}
