'use client';

import { useState } from 'react';
import { ArrowRight, Gem, ScanEye, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Protected from '@/components/Protected';

const FEATURES = [
  {
    Icon: Gem,
    title: 'Curated Collections',
    text: 'Handpicked investment-grade gems organised into themed collector sets.',
  },
  {
    Icon: ScanEye,
    title: 'Immersive Showcase',
    text: 'High-resolution imagery and detailed certification data for every stone.',
  },
  {
    Icon: Sparkles,
    title: 'Personalised Curation',
    text: 'Bespoke recommendations from our gemologists based on your portfolio goals.',
  },
];

function CollectionsContent() {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const dark    = isDarkMode;
  const pageBg  = dark ? 'bg-obsidian-950' : 'bg-pearl-100';
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';

  return (
    <div className={`min-h-screen ${pageBg} pt-32 pb-24 px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto text-center">

        {/* Decorative gem mark */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-sm border border-gold-700/40 flex items-center justify-center animate-border-glow"
              style={{ background: 'rgba(212,175,55,0.06)' }}>
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 animate-float">
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
        </div>

        <p className="section-label mb-4">Private Collections</p>
        <h1 className={`font-display font-light leading-tight mb-6 ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
          Something Extraordinary
          <br />
          <span className="text-gold-gradient italic">Is Being Curated</span>
        </h1>

        <p className={`text-lg max-w-xl mx-auto mb-16 leading-relaxed ${subText}`}>
          Our gemologists are assembling a world-class private collection experience.
          Gain first access to rare specimens before they reach the open marketplace.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {FEATURES.map(({ Icon, title, text }, idx) => (
            <div key={title}
              className="luxury-card p-8 flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="w-11 h-11 rounded-sm border border-gold-700/40 flex items-center justify-center mb-5"
                style={{ background: 'rgba(212,175,55,0.08)' }}>
                <Icon size={20} className="text-gold-500" />
              </div>
              <h3 className={`font-display text-lg font-medium mb-2 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                {title}
              </h3>
              <p className={`text-sm leading-relaxed ${subText}`}>{text}</p>
            </div>
          ))}
        </div>

        {/* Notify form */}
        <div className={`luxury-card p-10 max-w-lg mx-auto`}>
          <h2 className={`font-display text-2xl font-light mb-2 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
            First Access
          </h2>
          <p className={`text-sm mb-6 ${subText}`}>Be notified the moment collections launch.</p>

          {subscribed ? (
            <p className="text-gold-500 font-semibold tracking-wide">
              You are on the list. We will be in touch.
            </p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
              className="flex gap-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your private email"
                className={`flex-1 bg-transparent border px-4 py-2.5 text-sm focus:outline-none focus:border-gold-600/70 rounded-l-sm ${
                  dark
                    ? 'border-gold-800/40 text-pearl-100 placeholder-pearl-600'
                    : 'border-gold-700/30 text-obsidian-800 placeholder-obsidian-400'
                }`}
              />
              <button type="submit" className="btn-gold rounded-l-none">
                Notify Me <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Thin gold dots */}
        <div className={`mt-14 pt-8 border-t ${divider} flex items-center justify-center gap-3`}>
          {[0,1,2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-float"
              style={{ animationDelay: `${i * 0.4}s`, opacity: 0.5 + i * 0.2 }} />
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
