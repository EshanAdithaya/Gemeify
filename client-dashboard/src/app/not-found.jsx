import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-[7rem] md:text-[10rem] leading-none font-bold text-gold-gradient select-none">
          404
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-sm mb-2">
          The gem you are looking for has moved or no longer exists.
        </p>
        <p className="text-slate-400 text-xs mb-8">
          Double-check the URL or browse our full collection below.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/marketplace" className="btn-gold">
            Browse Collection <ArrowRight size={15} />
          </Link>
          <Link href="/" className="btn-outline-gold">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
