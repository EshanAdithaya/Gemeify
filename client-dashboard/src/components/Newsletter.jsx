'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [busy, setBusy]   = useState(false);
  const [done, setDone]   = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast('Please enter a valid email address', 'error');
      return;
    }
    setBusy(true);
    try {
      const list = JSON.parse(localStorage.getItem('gemify:newsletter') || '[]');
      if (!list.includes(email)) list.push(email);
      localStorage.setItem('gemify:newsletter', JSON.stringify(list));
      setDone(true);
      setEmail('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="luxury-card p-8 md:p-10 text-center">
      <p className="section-label mb-3">Private Intelligence</p>
      <h3 className="text-2xl md:text-3xl font-bold text-pearl-100 mb-3">
        Gem insights, in your inbox
      </h3>
      <p className="text-pearl-400 text-sm max-w-md mx-auto mb-7">
        Buying guides, new arrivals, and private auction alerts.
        No spam — unsubscribe anytime.
      </p>

      {done ? (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle size={28} className="text-gold-500" />
          <p className="text-gold-400 font-semibold tracking-wide">You are on the private list.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            className="flex-1 bg-obsidian-900 border border-gold-800/40 text-pearl-100 placeholder-pearl-600 px-4 py-3 text-sm focus:outline-none focus:border-gold-600/60 rounded-l-sm"
          />
          <button type="submit" disabled={busy} className="btn-gold rounded-l-none disabled:opacity-50">
            {busy ? '…' : (<>Subscribe <ArrowRight size={14} /></>)}
          </button>
        </form>
      )}
    </div>
  );
}
