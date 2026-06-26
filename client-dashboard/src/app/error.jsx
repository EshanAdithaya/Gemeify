'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-50 border border-red-100">
          <AlertTriangle size={26} className="text-red-500" />
        </div>
        <p className="section-label mb-2 text-red-500">Unexpected Error</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-500 text-sm mb-2 leading-relaxed">
          We ran into an unexpected problem while loading this page.
        </p>
        <p className="text-slate-400 text-xs mb-8 leading-relaxed">
          Our team has already been notified. You can try again or go back to the homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="btn-gold inline-flex items-center gap-2"
          >
            <RefreshCw size={14} /> Try Again
          </button>
          <Link href="/" className="btn-outline-gold inline-flex items-center gap-2">
            <Home size={14} /> Home
          </Link>
        </div>
      </div>
    </main>
  );
}
