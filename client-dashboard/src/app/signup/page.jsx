'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/lib/api';
import { friendlyError } from '@/lib/errorMessages';

export default function SignupPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName]       = useState('');
  const [lastName, setLastName]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [isLoading, setIsLoading]       = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Your password must be at least 8 characters long.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await authAPI.register({ firstName, lastName, email, password });
      const { token, user: userData } = res.data?.data || {};
      if (token) {
        login(token, userData);
        router.push('/');
      } else {
        router.push('/login');
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        setError('An account with this email already exists. Try signing in instead.');
      } else {
        setError(friendlyError(err, 'We could not create your account right now. Please try again.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const PERKS = [
    'First access to rare, uncatalogued gems',
    'Private price negotiation on major acquisitions',
    'Dedicated gemologist relationship manager',
  ];

  return (
    <div className="min-h-[100svh] flex">
      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(145deg, #1E3A8A 0%, #2563EB 55%, #3B82F6 100%)' }}>
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #60A5FA, transparent)' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #93C5FD, transparent)' }} />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10">
              <polygon points="18,3 33,11 33,25 18,33 3,25 3,11" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
              <polygon points="18,8 28,13.5 28,22.5 18,27 8,22.5 8,13.5" fill="rgba(255,255,255,0.2)"/>
            </svg>
            <span className="text-2xl font-bold text-white tracking-widest">GEMIFY</span>
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center gap-6 my-8">
          <div>
            <p className="text-blue-200 text-xs font-bold tracking-widest uppercase mb-3">Member Benefits</p>
            <h2 className="text-white text-2xl font-bold mb-6 leading-snug">
              Join an exclusive<br />community of collectors
            </h2>
            <ul className="space-y-4">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-blue-300 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100 text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Decorative gem */}
          <svg viewBox="0 0 160 160" className="w-40 h-40 mx-auto opacity-20 mt-4">
            <polygon points="80,8 148,48 148,112 80,152 12,112 12,48" fill="none" stroke="white" strokeWidth="2"/>
            <polygon points="80,8 148,48 80,72" fill="rgba(255,255,255,0.1)"/>
            <polygon points="80,8 12,48 80,72" fill="rgba(255,255,255,0.06)"/>
          </svg>
        </div>

        <div className="relative z-10 flex gap-6 text-blue-200 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 bg-white py-10">
        <div className="lg:hidden mb-8 flex items-center gap-2">
          <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
            <polygon points="14,2 26,9 26,21 14,26 2,21 2,9" fill="none" stroke="#2563EB" strokeWidth="1.5"/>
            <polygon points="14,6 22,10.5 22,19.5 14,22 6,19.5 6,10.5" fill="rgba(37,99,235,0.15)"/>
          </svg>
          <span className="text-xl font-bold text-slate-900 tracking-widest">GEMIFY</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Create account</h1>
            <p className="text-slate-500 text-sm">Join Gemeify and start your collection.</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 border border-red-200 bg-red-50 rounded-xl text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-3 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 focus:bg-white transition-all"
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-3 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 focus:bg-white transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min. 8 characters)"
                required
                disabled={isLoading}
                minLength={8}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50 shadow-royal mt-2"
            >
              {isLoading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-royal-600 hover:text-royal-800 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
