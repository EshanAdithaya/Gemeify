'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/lib/api';
import { friendlyError } from '@/lib/errorMessages';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.login({ email, password });
      const { token, user: userData } = res.data?.data || {};
      login(token, userData);
      router.push('/');
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        setError('The email or password you entered is incorrect. Please try again.');
      } else if (status === 429) {
        setError('Too many sign-in attempts. Please wait a few minutes before trying again.');
      } else {
        setError(friendlyError(err, 'We could not sign you in right now. Please try again.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex">
      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(145deg, #1E3A8A 0%, #2563EB 55%, #3B82F6 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #60A5FA, transparent)' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #93C5FD, transparent)' }} />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #BFDBFE, transparent)' }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10">
              <polygon points="18,3 33,11 33,25 18,33 3,25 3,11" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
              <polygon points="18,8 28,13.5 28,22.5 18,27 8,22.5 8,13.5" fill="rgba(255,255,255,0.2)"/>
            </svg>
            <span className="text-2xl font-bold text-white tracking-widest">GEMIFY</span>
          </Link>
        </div>

        {/* Centre illustration — decorative gem shapes */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 my-8">
          {/* Large gem shape */}
          <svg viewBox="0 0 200 200" className="w-64 h-64 opacity-30">
            <polygon points="100,10 180,60 180,140 100,190 20,140 20,60" fill="none" stroke="white" strokeWidth="2"/>
            <polygon points="100,30 160,65 160,135 100,170 40,135 40,65" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1" strokeDasharray="4,4"/>
            <polygon points="100,10 180,60 100,90" fill="rgba(255,255,255,0.08)"/>
            <polygon points="100,10 20,60 100,90" fill="rgba(255,255,255,0.05)"/>
            <polygon points="100,90 180,60 180,140 100,190" fill="rgba(255,255,255,0.06)"/>
            <polygon points="100,90 20,60 20,140 100,190" fill="rgba(255,255,255,0.04)"/>
          </svg>
          <div className="text-center">
            <p className="text-white text-xl font-bold mb-2">Investment-Grade Gems</p>
            <p className="text-blue-200 text-sm max-w-xs leading-relaxed">
              Access the world's finest certified gemstones. Trusted by collectors across 47 countries.
            </p>
          </div>
          {/* Stats */}
          <div className="flex gap-8 mt-4">
            {[['12,400+', 'Certified Gems'], ['98.7%', 'Satisfaction'], ['$2.4B+', 'Traded']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-white font-bold text-lg">{v}</p>
                <p className="text-blue-200 text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer links */}
        <div className="relative z-10 flex gap-6 text-blue-200 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 flex items-center gap-2">
          <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
            <polygon points="14,2 26,9 26,21 14,26 2,21 2,9" fill="none" stroke="#2563EB" strokeWidth="1.5"/>
            <polygon points="14,6 22,10.5 22,19.5 14,22 6,19.5 6,10.5" fill="rgba(37,99,235,0.15)"/>
          </svg>
          <span className="text-xl font-bold text-slate-900 tracking-widest">GEMIFY</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to access your collection.</p>
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
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 focus:bg-white transition-all"
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
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-royal-600 hover:text-royal-800 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50 shadow-royal"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            New here?{' '}
            <Link href="/signup" className="text-royal-600 hover:text-royal-800 font-semibold transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
