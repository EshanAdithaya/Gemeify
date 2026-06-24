'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/lib/api';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);

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
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full pl-10 pr-4 py-3.5 sm:py-3 text-sm rounded-sm border focus:outline-none focus:border-gold-600/60 transition-colors bg-obsidian-900 border-gold-900/30 text-pearl-100 placeholder-pearl-600';

  return (
    <div className="min-h-[100svh] flex items-center justify-center px-4 py-20 bg-obsidian-950">
      {/* Subtle gold orb */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #D4AF37, transparent)' }} />

      <div className={`relative w-full max-w-sm`}>
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10">
              <polygon points="18,3 33,11 33,25 18,33 3,25 3,11"
                fill="none" stroke="url(#gLogin)" strokeWidth="1.5"/>
              <polygon points="18,8 28,13.5 28,22.5 18,27 8,22.5 8,13.5"
                fill="url(#gLoginFill)" opacity="0.2"/>
              <defs>
                <linearGradient id="gLogin" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C9A84C"/>
                  <stop offset="100%" stopColor="#D4AF37"/>
                </linearGradient>
                <linearGradient id="gLoginFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#C9A84C"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-bold text-gold-gradient tracking-widest">GEMIFY</span>
          </Link>
        </div>

        {/* Card */}
        <div className={`luxury-card p-8`}>
          <p className="section-label text-center mb-2">Private Access</p>
          <h1 className="text-2xl font-bold text-pearl-50 text-center mb-1">Welcome Back</h1>
          <p className="text-xs text-center mb-8 text-pearl-400">
            Sign in to your private collection
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 rounded-sm text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-pearl-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-pearl-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="private@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-pearl-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-pearl-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputCls} pr-11`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 transition-colors text-pearl-500 hover:text-gold-400"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full disabled:opacity-50 mt-2"
            >
              {loading ? 'Authenticating…' : (<>Sign In <ArrowRight size={15} /></>)}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gold-900/25 text-center">
            <p className="text-xs text-pearl-400">
              New to Gemeify?{' '}
              <Link href="/signup" className="text-gold-500 hover:text-gold-300 font-semibold transition-colors">
                Request Access
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] mt-6 text-pearl-600">
          Your data is protected by 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}
