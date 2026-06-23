'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-2 text-slate-400">An unexpected error occurred. Please try again.</p>
        <button
          onClick={() => reset()}
          className="inline-block mt-6 rounded-lg bg-brand-600 hover:bg-brand-700 px-6 py-3 text-white font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
