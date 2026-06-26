'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Gem } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setError('The email or password you entered is incorrect. Please try again.');
      } else if (status === 403) {
        setError('This account does not have administrator access.');
      } else if (status === 429) {
        setError('Too many failed attempts. Please wait a few minutes before trying again.');
      } else {
        setError('We could not sign you in right now. Please try again shortly.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 50%, #334155 100%)' }}>
        {/* Decorative glows */}
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #60A5FA, transparent)' }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Gem className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-wide">Gemify</span>
            <span className="block text-slate-400 text-[10px] tracking-widest uppercase">Admin Console</span>
          </div>
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center gap-5">
          <div>
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-3">Administration</p>
            <h2 className="text-white text-3xl font-bold leading-snug mb-4">
              Gemify Control<br />Center
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Manage gems, users, auctions, and orders from one centralized dashboard. Restricted to authorized administrators.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t border-slate-700/50">
            {[['Gem Catalog', 'Manage listings'], ['User Accounts', 'Roles & access'], ['Live Auctions', 'Monitor bids']].map(([t, s]) => (
              <div key={t}>
                <p className="text-white text-sm font-semibold">{t}</p>
                <p className="text-slate-400 text-xs mt-0.5">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-slate-500 text-xs">
          Restricted to accounts with administrator privileges.
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 bg-white">
        {/* Mobile brand */}
        <div className="lg:hidden mb-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
            <Gem className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xl font-bold text-slate-900">Gemify Admin</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to the administration console.</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-200 bg-red-50 rounded-xl text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50 shadow-sm"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
