import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-brand-500">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-white">Page not found</h1>
        <p className="mt-2 text-slate-400">The gem you’re looking for isn’t here.</p>
        <Link
          href="/marketplace"
          className="inline-block mt-6 rounded-lg bg-brand-600 hover:bg-brand-700 px-6 py-3 text-white font-medium transition-colors"
        >
          Browse the Marketplace
        </Link>
      </div>
    </main>
  );
}
