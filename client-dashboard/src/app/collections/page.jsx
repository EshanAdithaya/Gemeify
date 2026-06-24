'use client';

import { useState } from 'react';
import { ArrowRight, Gem, ScanEye, Sparkles } from 'lucide-react';
import Protected from '@/components/Protected';

const FEATURES = [
  { Icon: Gem,      title: 'Curated Collections',    text: 'Handpicked investment-grade gems organised into themed collector sets.' },
  { Icon: ScanEye,  title: 'Immersive Showcase',     text: 'High-resolution imagery and detailed certification data for every stone.' },
  { Icon: Sparkles, title: 'Personalised Curation',  text: 'Bespoke recommendations from our gemologists based on your portfolio goals.' },
];

function CollectionsContent() {
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian-950 pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">

        {/* Decorative gem mark */}
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 rounded-sm border border-gold-700/40 flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.06)' }}>
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
              <polygon points="20,3 37,12 37,28 20,37 3,28 3,12"
                fill="none" stroke="url(#gCol)" strokeWidth="1.5"/>
              <polygon points="20,9 31,14.5 31,25.5 20,30 9,25.5 9,14.5"
                fill="url(#gColFill)" opacity="0.2"/>
              <defs>
                <linearGradient id="gCol" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C9A84C"/>
                  <stop offset="100%" stopColor="#D4AF37"/>
                </linearGradient>
                <linearGradient id="gColFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#C9A84C"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <p className="section-label mb-4">Private Collections</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pearl-50 leading-tight mb-5">
          Something Extraordinary
          <br />
          <span className="text-gold-gradient">Is Being Curated</span>
        </h1>

        <p className="text-base sm:text-lg text-pearl-400 max-w-xl mx-auto mb-14 sm:mb-16 leading-relaxed">
          Our gemologists are assembling a world-class private collection experience.
          Gain first access to rare specimens before they reach the open marketplace.
        </p>

        {/* Feature cards — 1 col mobile, 3 col md */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {FEATURES.map(({ Icon, title, text }) => (
            <div key={title} className="luxury-card p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-sm border border-gold-700/40 flex items-center justify-center mb-4"
                style={{ background: 'rgba(212,175,55,0.08)' }}>
                <Icon size={20} className="text-gold-500" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-pearl-100 mb-2">{title}</h3>
              <p className="text-xs sm:text-sm text-pearl-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Notify form */}
        <div className="luxury-card p-8 sm:p-10 max-w-lg mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-pearl-100 mb-2">First Access</h2>
          <p className="text-sm text-pearl-400 mb-6">Be notified the moment collections launch.</p>

          {subscribed ? (
            <p className="text-gold-500 font-bold tracking-wide">You are on the list. We will be in touch.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
              className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your private email"
                className="flex-1 bg-transparent border border-gold-800/40 text-pearl-100 placeholder-pearl-600 px-4 py-3 text-sm focus:outline-none focus:border-gold-600/70 sm:rounded-l-sm sm:rounded-r-none rounded-sm sm:mb-0 mb-2"
              />
              <button type="submit" className="btn-gold sm:rounded-l-none justify-center">
                Notify Me <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-gold-900/25 flex items-center justify-center gap-3">
          {[0,1,2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold-500"
              style={{ opacity: 0.5 + i * 0.2 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Protected>
      <CollectionsContent />
    </Protected>
  );
}
