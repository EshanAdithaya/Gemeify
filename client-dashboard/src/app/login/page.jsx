'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/lib/api';

export default function LoginPage() {
  const { isDarkMode } = useTheme();
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

  const dark    = isDarkMode;
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';

  const inputCls = `w-full pl-10 pr-4 py-3 text-sm rounded-sm border focus:outline-none focus:border-gold-600/60 transition-colors ${
    dark
      ? 'bg-obsidian-900 border-gold-900/30 text-pearl-100 placeholder-pearl-600'
      : 'bg-white border-gold-700/20 text-obsidian-900 placeholder-obsidian-400'
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-20 ${dark ? 'bg-obsidian-950' : 'bg-pearl-100'}`}>
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
            <span className="font-display text-2xl font-semibold text-gold-gradient tracking-widest-xl"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
              GEMIFY
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className={`luxury-card p-8`}>
          <p className="section-label text-center mb-2">Private Access</p>
          <h1 className={`font-display text-2xl font-light text-center mb-1 ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
            Welcome Back
          </h1>
          <p className={`text-xs text-center mb-8 ${subText}`}>
            Sign in to your private collection
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 rounded-sm text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${subText}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-3.5 h-4 w-4 ${subText}`} />
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
              <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${subText}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3.5 h-4 w-4 ${subText}`} />
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
                  className={`absolute right-3 top-3.5 transition-colors ${subText} hover:text-gold-400`}
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

          <div className={`mt-6 pt-6 border-t ${divider} text-center`}>
            <p className={`text-xs ${subText}`}>
              New to Gemify?{' '}
              <Link href="/signup" className="text-gold-500 hover:text-gold-300 font-semibold transition-colors">
                Request Access
              </Link>
            </p>
          </div>
        </div>

        <p className={`text-center text-[10px] mt-6 ${subText}`}>
          Your data is protected by 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}
