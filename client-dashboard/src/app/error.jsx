'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-obsidian-950 px-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gold-900/30 rounded-sm"
          style={{ background: 'rgba(212,175,55,0.06)' }}>
          <AlertTriangle size={24} className="text-gold-600" />
        </div>
        <p className="section-label mb-2">Unexpected Error</p>
        <h1 className="text-3xl font-bold text-pearl-100 mb-3">
          Something Went Wrong
        </h1>
        <p className="text-pearl-500 text-sm mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="btn-gold inline-flex items-center gap-2"
        >
          <RefreshCw size={14} /> Try Again
        </button>
      </div>
    </main>
  );
}
