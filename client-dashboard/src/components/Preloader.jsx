'use client';

export default function Preloader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian-950">
      {/* Gem logo */}
      <div className="relative mb-8 animate-float">
        <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
          <polygon points="28,4 52,18 52,38 28,52 4,38 4,18"
            fill="none" stroke="url(#gPre)" strokeWidth="1.5" />
          <polygon points="28,10 46,20 46,36 28,44 10,36 10,20"
            fill="url(#gPreFill)" opacity="0.15" />
          <defs>
            <linearGradient id="gPre" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#C9A84C"/>
              <stop offset="50%"  stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#B8962E"/>
            </linearGradient>
            <linearGradient id="gPreFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#C9A84C"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand name */}
      <p className="font-display text-xl font-semibold text-gold-gradient tracking-widest-xl mb-6"
        style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
        GEMIFY
      </p>

      {/* Gold spinner */}
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-gold-900/30" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-500 animate-spin" />
      </div>
    </div>
  );
}
