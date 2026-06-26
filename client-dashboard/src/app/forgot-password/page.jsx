'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { authAPI } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 429) {
        setError('Too many requests. Please wait a few minutes before trying again.');
      } else if (status === 404) {
        setSent(true); // Don't reveal if email exists
      } else {
        setError('We could not send the reset email right now. Please try again shortly.');
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

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4">
          <svg viewBox="0 0 200 200" className="w-56 h-56 opacity-25">
            <polygon points="100,10 180,60 180,140 100,190 20,140 20,60" fill="none" stroke="white" strokeWidth="2"/>
            <polygon points="100,10 180,60 100,90" fill="rgba(255,255,255,0.1)"/>
            <polygon points="100,10 20,60 100,90" fill="rgba(255,255,255,0.06)"/>
          </svg>
          <p className="text-white text-xl font-bold text-center">Secure Account Recovery</p>
          <p className="text-blue-200 text-sm text-center max-w-xs leading-relaxed">
            We'll send a secure reset link to your registered email address.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-blue-200 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 bg-white">
        <div className="w-full max-w-sm">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Sign In
          </Link>

          {sent ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <CheckCircle2 size={30} className="text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox</h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-2">
                If an account exists for <span className="font-semibold text-slate-700">{email}</span>, we've sent a password reset link.
              </p>
              <p className="text-slate-400 text-xs mb-8">
                Check your spam folder if you don't see it within a few minutes.
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 text-royal-600 hover:text-royal-800 text-sm font-semibold transition-colors">
                <ArrowLeft size={15} /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Reset password</h1>
                <p className="text-slate-500 text-sm">Enter your email and we'll send you a reset link.</p>
              </div>

              {error && (
                <div className="mb-6 px-4 py-3 border border-red-200 bg-red-50 rounded-xl text-sm text-red-700 flex items-start gap-2.5">
                  <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50 shadow-royal"
                >
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
