'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

// Lightweight email capture. Persists intent locally (no backend list yet) and
// gives immediate feedback — a stepping stone toward a real ESP integration.
export default function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

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
      toast('You’re subscribed — welcome to Gemify!', 'success');
      setEmail('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-900 to-slate-900 p-8 text-center shadow-xl">
      <Mail className="mx-auto mb-3 text-brand-300" size={32} />
      <h3 className="text-2xl font-bold text-white">Gem insights, in your inbox</h3>
      <p className="mt-2 text-slate-300">
        Buying guides, new arrivals and auction alerts. No spam — unsubscribe anytime.
      </p>
      <form onSubmit={submit} className="mt-5 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 rounded-lg px-4 py-2 bg-slate-800/80 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <Button type="submit" loading={busy}>Subscribe</Button>
      </form>
    </div>
  );
}
