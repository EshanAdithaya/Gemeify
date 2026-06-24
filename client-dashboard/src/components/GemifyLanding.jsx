'use client';

import Link from 'next/link';
import { ArrowRight, Shield, CheckCircle, Eye, TrendingUp, Award, Users, Star } from 'lucide-react';

/* ─── Static content ────────────────────────────────────────────────────── */

const HERO_STATS = [
  { value: '12,400+', label: 'Certified Gems' },
  { value: '98.7%',   label: 'Client Satisfaction' },
  { value: '$2.4B+',  label: 'Gems Traded' },
  { value: '47',      label: 'Countries Served' },
];

const FEATURED_GEMS = [
  {
    id: 1,
    name: 'Unheated Padparadscha Sapphire',
    description: '3.82 ct · Ceylon · No Heat',
    price: '148,000',
    currency: 'USD',
    certification: 'GIA',
    origin: 'Sri Lanka',
    image: 'https://cdn.shopify.com/s/files/1/0080/0004/5171/products/BS01HMDB_4b2042f1-421e-4024-b814-6bc73855a9c5_350x@2x.jpg?v=1625054014',
    highlights: ['No Heat Treatment', 'Padparadscha Classification', 'Investment Grade'],
    badge: 'Rare',
  },
  {
    id: 2,
    name: 'Argyle Pink Diamond',
    description: '1.84 ct · Fancy Vivid Pink · VS1',
    price: '342,000',
    currency: 'USD',
    certification: 'GIA',
    origin: 'Australia',
    image: 'https://media.cnn.com/api/v1/images/stellar/prod/230328171155-01-eternal-pink-diamond.jpg?c=original',
    highlights: ['Argyle Provenance', 'Fancy Vivid Color', 'Private Collection'],
    badge: 'Exclusive',
  },
  {
    id: 3,
    name: 'Colombian Muzo Emerald',
    description: '4.15 ct · Muzo Mine · Minor Oil',
    price: '96,500',
    currency: 'USD',
    certification: 'GRS',
    origin: 'Colombia',
    image: 'https://jrcolombianemeralds.com/cdn/shop/files/IMG_4559.jpg?v=1712765173&width=2570',
    highlights: ['Muzo Origin Certificate', 'Vivid Green', 'Minor Enhancement'],
    badge: 'Investment',
  },
];

const CATEGORIES = [
  { name: 'Blue Sapphires', sub: 'Kashmir · Ceylon · Burma',    image: 'https://www.gemsinsrilanka.com/wp-content/uploads/2021/01/Blue-sapphire-sri-lanka.jpg',         count: '1,463', href: '/marketplace' },
  { name: 'Rubies',         sub: 'Burmese · Mozambique',         image: 'https://www.latelita.com/cdn/shop/articles/the-ruby-gemstone-everything-you-ever-needed-to-know-about-rubies-748231.jpg?v=1692710601&width=2048', count: '1,826', href: '/marketplace' },
  { name: 'Diamonds',       sub: 'Fancy Color · D-IF',           image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/382845659/WJ/BP/SL/211079491/diamonds-for-sale.jpg',                                           count: '2,534', href: '/marketplace' },
  { name: 'Emeralds',       sub: 'Colombian · Zambian',          image: 'https://www.astrosawal.com/assets/gemstone/Emrald_gemstone.jpg',                                                                                  count: '982',   href: '/marketplace' },
];

const TRUST_FEATURES = [
  { Icon: Shield,    title: 'Certified Authentic',    desc: 'Every gem accompanied by independent certification from GIA, GRS, AGL or Gübelin.' },
  { Icon: TrendingUp, title: 'Investment Grade Only', desc: 'Our gemologists curate exclusively top-tier specimens with documented provenance.' },
  { Icon: Award,     title: 'Expert Vetted',          desc: 'Each stone personally inspected by our FGA-certified master gemologist team.' },
  { Icon: Users,     title: 'Private Concierge',      desc: 'Dedicated relationship manager for acquisitions above $50,000 USD.' },
];

const TESTIMONIALS = [
  {
    text: 'Gemeify sourced a 6-carat unheated Burma ruby that completed my portfolio perfectly. The certification and provenance documentation were flawless.',
    name: 'H.E. Sultan Al-Mansoori',
    title: 'Private Collector, Abu Dhabi',
    initials: 'SA',
  },
  {
    text: "The level of discretion and expertise rivals the private banking experience I'm accustomed to. My go-to platform for significant gem acquisitions.",
    name: 'Charlotte Beaumont-Walsh',
    title: 'Family Office Director, Geneva',
    initials: 'CB',
  },
  {
    text: 'Three Kashmir sapphires in eighteen months — each time the quality and service exceeded expectations. An exceptional platform.',
    name: 'Takeshi Yamamoto',
    title: 'Investment Director, Tokyo',
    initials: 'TY',
  },
];

const INVESTMENT_POINTS = [
  { Icon: TrendingUp, title: 'Value Appreciation',  text: 'Rare gems have historically outperformed traditional asset classes over long holding periods.' },
  { Icon: Shield,     title: 'Portable Wealth',      text: 'Physical ownership of beautiful, border-crossing, inflation-resistant assets.' },
  { Icon: Eye,        title: 'Market Uncorrelated',  text: 'Alternative investment class uncorrelated with equity and bond market cycles.' },
];

const TRUST_TAGS = ['GIA Certified', 'AML Compliant', 'Fully Insured', 'Free Global Shipping'];

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function GemifyLanding() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-pearl-100">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
        {/* Gold ambient glow — hidden on mobile to save paint cost */}
        <div className="absolute inset-0 bg-luxury-hero" />
        <div className="hidden sm:block absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />

        {/* Thin top accent line */}
        <div className="absolute top-0 left-1/2 w-px h-24 opacity-25"
          style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37)' }} />

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-36 lg:pb-24">
          {/* Section label */}
          <p className="section-label mb-6 animate-fade-up">
            Investment-Grade · GIA Certified · Private Collection
          </p>

          {/* Headline — bold Inter, mobile-first sizing */}
          <h1 className="font-bold leading-[1.08] mb-6 text-pearl-50 animate-fade-up"
            style={{ animationDelay: '0.1s', fontSize: 'clamp(2.2rem, 8vw, 5.5rem)' }}>
            The World&apos;s Finest
            <br />
            <span className="text-gold-gradient">Investment Gemstones</span>
            <br />
            <span className="text-pearl-400 font-bold"
              style={{ fontSize: 'clamp(1.3rem, 4vw, 3rem)' }}>
              For the Discerning Few
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="text-base sm:text-lg text-pearl-400 max-w-xl leading-relaxed mb-8 animate-fade-up"
            style={{ animationDelay: '0.2s' }}>
            Curated sapphires, rubies, emeralds, and diamonds — each personally
            selected and certified by our master gemologists. Trusted by private
            collectors in Geneva, Dubai, London, and Singapore.
          </p>

          {/* CTAs — stacked full-width on mobile, side-by-side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/collections" className="btn-gold w-full sm:w-auto justify-center py-4 sm:py-3">
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-outline-gold w-full sm:w-auto justify-center py-4 sm:py-3">
              Private Consultation
            </Link>
          </div>

          {/* Trust micro-line — wraps naturally on mobile */}
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {TRUST_TAGS.map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-pearl-500">
                <CheckCircle size={11} className="text-gold-500 flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Stats bar — 2 columns on mobile, 4 on md */}
        <div className="relative border-t border-gold-900/25 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {HERO_STATS.map(({ value, label }) => (
                <div key={label} className="text-center py-2">
                  <p className="text-2xl sm:text-3xl font-bold text-gold-gradient">{value}</p>
                  <p className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-pearl-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Gems ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 lg:mb-14">
            <div>
              <p className="section-label mb-2">Featured Acquisitions</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50 leading-tight">
                Exceptional Gems
              </h2>
            </div>
            <Link href="/marketplace"
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-gold-500 hover:text-gold-300 transition-colors flex-shrink-0 ml-4">
              View All <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile: horizontal scroll strip; md+: 3-column grid */}
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible snap-x snap-mandatory sm:snap-none">
            {FEATURED_GEMS.map((gem) => (
              <Link key={gem.id} href="/marketplace"
                className="luxury-card group overflow-hidden flex flex-col flex-none w-[78vw] sm:w-auto snap-start">
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-gold-gradient text-obsidian-950 rounded-sm">
                    {gem.badge}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold tracking-wider border border-gold-700/60 text-gold-400 bg-obsidian-900/70 backdrop-blur-sm rounded-sm">
                    {gem.certification}
                  </span>
                  <p className="absolute bottom-3 left-3 text-[10px] font-bold tracking-widest uppercase text-pearl-400">
                    {gem.origin}
                  </p>
                </div>

                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                  <h3 className="text-base sm:text-lg font-bold text-pearl-100 mb-1 leading-snug">{gem.name}</h3>
                  <p className="text-xs text-pearl-500 mb-3">{gem.description}</p>

                  <div className="space-y-1 mb-4">
                    {gem.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2">
                        <CheckCircle size={12} className="text-gold-500 flex-shrink-0" />
                        <span className="text-xs text-pearl-500">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 border-t border-gold-900/25 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-bold tracking-widest uppercase text-pearl-600 mb-0.5">Price</p>
                      <p className="text-xl font-bold text-gold-gradient">${gem.price}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-gold-500 group-hover:text-gold-300 transition-colors">
                      Acquire <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-y border-gold-900/25 bg-obsidian-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 lg:mb-14">
            <p className="section-label mb-2">Browse By Stone</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50">Investment Categories</h2>
          </div>

          {/* 2 columns on mobile, 4 on lg */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} href={cat.href}
                className="group relative overflow-hidden rounded-sm cursor-pointer h-44 sm:h-64 lg:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <p className="section-label mb-0.5">{cat.count} stones</p>
                  <h3 className="text-sm sm:text-lg font-bold text-pearl-50 leading-tight mb-0.5">{cat.name}</h3>
                  <p className="text-[10px] sm:text-xs text-pearl-400 mb-2 hidden sm:block">{cat.sub}</p>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gold-400 group-hover:text-gold-300 transition-colors">
                    Explore <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Features ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 lg:mb-14">
            <p className="section-label mb-2">Our Promise</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50">The Gemeify Standard</h2>
          </div>

          {/* 1 col mobile → 2 col sm → 4 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="luxury-card p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-sm border border-gold-700/40 flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <Icon size={20} className="text-gold-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-pearl-100 mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-pearl-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expert Section ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-y border-gold-900/25 bg-obsidian-900/40">
        <div className="max-w-7xl mx-auto">
          {/* Stack on mobile, side-by-side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="section-label mb-4">Expert Guidance</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50 leading-tight mb-5">
                Your Personal<br />
                <span className="text-gold-gradient">Investment Advisor</span>
              </h2>
              <p className="text-sm sm:text-base text-pearl-400 leading-relaxed mb-7">
                Our team of FGA-certified gemologists brings decades of market
                expertise. We provide detailed stone analysis, investment-potential
                assessments, and personalised acquisition strategies — treating
                every collection with the discretion of a Swiss private bank.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  ['Certified Authentication', 'Every stone independently certified by leading gemological labs.'],
                  ['Provenance Documentation', 'Chain of custody and origin reports for significant acquisitions.'],
                  ['Portfolio Strategy', 'Bespoke advice on gem allocation within your wider investment portfolio.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <CheckCircle size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-pearl-200 mb-0.5">{title}</p>
                      <p className="text-xs sm:text-sm text-pearl-500">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="btn-gold w-full sm:w-auto justify-center py-4 sm:py-3">
                  Meet Our Experts <ArrowRight size={15} />
                </Link>
                <Link href="/about" className="btn-outline-gold w-full sm:w-auto justify-center py-4 sm:py-3">
                  Schedule Consultation
                </Link>
              </div>
            </div>

            {/* Images — side by side on mobile, staggered on lg */}
            <div className="grid grid-cols-2 gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://atouchofbusiness.com/wp-content/uploads/2024/01/Jeweler-Evaluating-Semi-Precious-Gemstone-in-Workshop.png"
                alt="Expert gemologist examining a precious gemstone"
                className="rounded-sm w-full h-40 sm:h-56 lg:h-64 object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.thenaturalsapphirecompany.com/education/wp-content/uploads/2010/11/PA213_GIA_certificate_natural_unheated_padparadscha_sapphire.jpg"
                alt="GIA gem certification document"
                className="rounded-sm w-full h-40 sm:h-56 lg:h-64 object-cover lg:mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Invest ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 lg:mb-14">
            <p className="section-label mb-2">Investment Case</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50">Why Precious Gems?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {INVESTMENT_POINTS.map(({ Icon, title, text }) => (
              <div key={title} className="luxury-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm border border-gold-700/40 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.08)' }}>
                    <Icon size={18} className="text-gold-500" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-pearl-100">{title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-pearl-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gold-900/25 bg-obsidian-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 lg:mb-14">
            <p className="section-label mb-2">Client Voices</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50">Trusted by Collectors Worldwide</h2>
          </div>

          {/* Mobile: horizontal scroll; sm+: grid */}
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible snap-x snap-mandatory sm:snap-none">
            {TESTIMONIALS.map((t) => (
              <div key={t.name}
                className="luxury-card p-5 sm:p-8 flex flex-col flex-none w-[84vw] sm:w-auto snap-start">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-pearl-400 leading-relaxed italic mb-5 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-gold-700/50 flex items-center justify-center text-xs font-bold text-gold-500 flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.08)' }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-pearl-200">{t.name}</p>
                    <p className="text-[10px] sm:text-xs text-pearl-500">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-luxury-hero" />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #D4AF37, transparent)' }} />
        <div className="relative max-w-2xl mx-auto">
          <p className="section-label mb-4">Ready to Begin?</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pearl-50 leading-tight mb-5">
            Access the Private Collection
          </h2>
          <p className="text-sm sm:text-base text-pearl-400 mb-8 leading-relaxed">
            Join an exclusive community of serious gem investors and collectors.
            First access to extraordinary stones before public listing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/signup" className="btn-gold w-full sm:w-auto justify-center py-4 sm:py-3">
              Create Private Account <ArrowRight size={16} />
            </Link>
            <Link href="/marketplace" className="btn-outline-gold w-full sm:w-auto justify-center py-4 sm:py-3">
              Browse Collection
            </Link>
          </div>
          <p className="mt-6 text-[10px] tracking-widest uppercase text-pearl-600">
            No subscription fees · Cancel anytime · 100% Satisfaction Guarantee
          </p>
        </div>
      </section>

    </div>
  );
}
