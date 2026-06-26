'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gem, Mail, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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
        // Don't reveal whether email exists — show success anyway for security
        setSent(true);
      } else {
        setError('We could not send the reset email right now. Please try again shortly.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/15 mb-4">
            <Gem className="w-7 h-7 text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Gemify Admin</h1>
          <p className="text-slate-400 mt-1">Reset your password</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Check your inbox</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                If an account exists for <span className="text-white font-medium">{email}</span>,
                we&apos;ve sent a password reset link. Check your spam folder if you don&apos;t
                see it within a few minutes.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Enter the email address linked to your admin account and we&apos;ll send you a
                link to reset your password.
              </p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-5 text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
                      required
                    />
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-pink-600 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
