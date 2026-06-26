'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
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
        setError('An account with this email address already exists. Try signing in instead.');
      } else {
        setError(friendlyError(err, 'We could not create your account right now. Please try again.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = 'w-full pl-10 pr-4 py-3.5 sm:py-3 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500 transition-colors bg-white border-slate-200 text-slate-900 placeholder-slate-400';

  const PERKS = [
    'First access to rare, uncatalogued gems',
    'Private price negotiation on major acquisitions',
    'Dedicated gemologist relationship manager',
  ];

  return (
    <div className="min-h-[100svh] flex items-center justify-center px-4 py-24 bg-slate-50">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #3B82F6, transparent)' }} />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10">
              <polygon points="18,3 33,11 33,25 18,33 3,25 3,11"
                fill="none" stroke="url(#gSignup)" strokeWidth="1.5"/>
              <polygon points="18,8 28,13.5 28,22.5 18,27 8,22.5 8,13.5"
                fill="url(#gSignupFill)" opacity="0.2"/>
              <defs>
                <linearGradient id="gSignup" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1E40AF"/>
                  <stop offset="100%" stopColor="#3B82F6"/>
                </linearGradient>
                <linearGradient id="gSignupFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563EB"/>
                  <stop offset="100%" stopColor="#1E40AF"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-bold text-gold-gradient tracking-widest">GEMIFY</span>
          </Link>
        </div>

        <div className="luxury-card p-8">
          <p className="section-label text-center mb-2">Create Account</p>
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-1">Join Gemeify</h1>
          <p className="text-xs text-center mb-6 text-slate-500">
            Become part of an exclusive community of gem investors
          </p>

          {/* Perks */}
          <div className="rounded-md p-4 mb-6 bg-royal-50 border border-royal-100">
            <ul className="space-y-2">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-royal-600 flex-shrink-0" />
                  <span className="text-xs text-slate-600">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 border border-red-200 bg-red-50 rounded-md text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[['firstName', 'First Name', setFirstName, firstName], ['lastName', 'Last Name', setLastName, lastName]].map(([id, label, setter, val]) => (
                <div key={id}>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-1.5 text-slate-500">{label}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      className={inputCls}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase mb-1.5 text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase mb-1.5 text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputCls} pr-11`}
                  placeholder="Min. 8 characters"
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-3.5 transition-colors text-slate-400 hover:text-royal-600"
                  aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Must be at least 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account…' : (<>Create Account <ArrowRight size={15} /></>)}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="text-royal-600 hover:text-royal-800 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] mt-6 text-slate-400">
          By creating an account you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
}
