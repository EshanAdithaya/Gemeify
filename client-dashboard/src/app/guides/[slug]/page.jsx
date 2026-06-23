import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
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
    title: guide.title,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.url}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <article className="max-w-3xl mx-auto">
        <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-white">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{guide.title}</span>
        </nav>

        <header className="mb-8 animate-fade-up">
          <span className="inline-block text-xs font-medium text-brand-300 bg-brand-500/10 rounded-full px-3 py-1">
            {guide.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">{guide.title}</h1>
          <p className="text-slate-400 mt-3 text-lg">{guide.excerpt}</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Clock size={14} /> {guide.readingTime} min read
            <span className="mx-1">·</span>
            Updated {new Date(guide.updated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </header>

        <div className="space-y-8">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-white mb-2">{s.heading}</h2>
              <p className="text-slate-300 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Internal link into the catalog — turns readers into shoppers */}
        <div className="mt-10 rounded-2xl bg-brand-600/10 border border-brand-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Ready to find your stone?</h3>
            <p className="text-slate-400">Browse certified gems with full lab documentation.</p>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg whitespace-nowrap transition-colors"
          >
            Explore Marketplace <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10">
          <Link href="/guides" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300">
            <ArrowLeft size={16} /> All guides
          </Link>
        </div>

        <div className="mt-12">
          <Newsletter />
        </div>
      </article>
    </main>
  );
}
