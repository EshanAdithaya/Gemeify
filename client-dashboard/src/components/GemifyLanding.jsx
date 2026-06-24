'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Star, CheckCircle, Eye, TrendingUp, Award, Users } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
    quality: 'AAA',
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
    quality: 'Vivid',
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
    quality: 'AAA',
    certification: 'GRS',
    origin: 'Colombia',
    image: 'https://jrcolombianemeralds.com/cdn/shop/files/IMG_4559.jpg?v=1712765173&width=2570',
    highlights: ['Muzo Origin Certificate', 'Vivid Green', 'Minor Enhancement'],
    badge: 'Investment',
  },
];

const CATEGORIES = [
  {
    name: 'Blue Sapphires',
    sub: 'Kashmir · Ceylon · Burma',
    image: 'https://www.gemsinsrilanka.com/wp-content/uploads/2021/01/Blue-sapphire-sri-lanka.jpg',
    count: '1,463',
    href: '/marketplace',
  },
  {
    name: 'Rubies',
    sub: 'Burmese · Mozambique',
    image: 'https://www.latelita.com/cdn/shop/articles/the-ruby-gemstone-everything-you-ever-needed-to-know-about-rubies-748231.jpg?v=1692710601&width=2048',
    count: '1,826',
    href: '/marketplace',
  },
  {
    name: 'Diamonds',
    sub: 'Fancy Color · D-IF',
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/382845659/WJ/BP/SL/211079491/diamonds-for-sale.jpg',
    count: '2,534',
    href: '/marketplace',
  },
  {
    name: 'Emeralds',
    sub: 'Colombian · Zambian',
    image: 'https://www.astrosawal.com/assets/gemstone/Emrald_gemstone.jpg',
    count: '982',
    href: '/marketplace',
  },
];

const TRUST_FEATURES = [
  {
    Icon: Shield,
    title: 'Certified Authentic',
    desc: 'Every gem accompanied by independent certification from GIA, GRS, AGL or Gübelin.',
  },
  {
    Icon: TrendingUp,
    title: 'Investment Grade Only',
    desc: 'Our gemologists curate exclusively top-tier specimens with documented provenance.',
  },
  {
    Icon: Award,
    title: 'Expert Vetted',
    desc: 'Each stone personally inspected by our FGA-certified master gemologist team.',
  },
  {
    Icon: Users,
    title: 'Private Concierge',
    desc: 'Dedicated relationship manager for acquisitions above $50,000 USD.',
  },
];

const TESTIMONIALS = [
  {
    text: 'Gemify sourced a 6-carat unheated Burma ruby that completed my portfolio perfectly. The certification and provenance documentation were flawless.',
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

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function GemifyLanding() {
  const { isDarkMode } = useTheme();

  const dark    = isDarkMode;
  const pageBg  = dark ? 'bg-obsidian-950 text-pearl-100' : 'bg-pearl-100 text-obsidian-900';
  const cardBg  = dark ? 'bg-obsidian-900 border-gold-900/30' : 'bg-white border-gold-700/15';
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background */}
        <div className={`absolute inset-0 ${dark ? 'bg-luxury-hero' : 'bg-pearl-200'}`} />
        <div className="absolute inset-0">
          {/* Decorative gold orbs */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
        </div>

        {/* Thin gold vertical line accent */}
        <div className="absolute top-0 left-1/2 w-px h-32 opacity-30"
          style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="max-w-4xl">
            {/* Label */}
            <p className="section-label mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Investment-Grade · GIA Certified · Private Collection
            </p>

            {/* Headline */}
            <h1 className={`font-display font-light leading-tight mb-8 animate-fade-up ${
              dark ? 'text-pearl-50' : 'text-obsidian-950'
            }`}
              style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                animationDelay: '0.2s',
              }}
            >
              The World&apos;s Finest
              <br />
              <span className="text-gold-gradient font-medium italic">
                Investment Gemstones
              </span>
              <br />
              <span className={`font-light ${dark ? 'text-pearl-300' : 'text-obsidian-600'}`}
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
                For the Discerning Few
              </span>
            </h1>

            {/* Sub */}
            <p className={`text-lg max-w-xl leading-relaxed mb-10 animate-fade-up ${subText}`}
              style={{ animationDelay: '0.35s' }}>
              Curated sapphires, rubies, emeralds, and diamonds — each personally
              selected and certified by our master gemologists. Trusted by private
              collectors in Geneva, Dubai, London, and Singapore.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <Link href="/collections" className="btn-gold">
                Explore Collection
                <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-outline-gold">
                Private Consultation
              </Link>
            </div>

            {/* Trust micro-line */}
            <div className={`mt-10 flex flex-wrap items-center gap-6 text-[11px] font-semibold tracking-widest uppercase animate-fade-up ${subText}`}
              style={{ animationDelay: '0.65s' }}>
              {['GIA Certified', 'AML Compliant', 'Fully Insured', 'Free Global Shipping'].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gold-700">·</span>}
                  <CheckCircle size={12} className="text-gold-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className={`relative border-t ${divider} py-8`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {HERO_STATS.map(({ value, label }, i) => (
                <div key={label} className="text-center animate-count-up" style={{ animationDelay: `${0.7 + i * 0.1}s` }}>
                  <p className="font-display text-2xl md:text-3xl font-semibold text-gold-gradient"
                    style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                    {value}
                  </p>
                  <p className={`text-[11px] font-semibold tracking-widest uppercase mt-1 ${subText}`}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Gems ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="section-label mb-3">Featured Acquisitions</p>
              <h2 className={`font-display font-light leading-tight ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                Exceptional Gems, Exceptional Value
              </h2>
            </div>
            <Link href="/marketplace"
              className={`flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase transition-colors text-gold-500 hover:text-gold-300`}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_GEMS.map((gem, idx) => (
              <Link key={gem.id} href="/marketplace"
                className={`luxury-card group overflow-hidden flex flex-col animate-fade-up`}
                style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-gold-gradient text-obsidian-950 rounded-sm">
                    {gem.badge}
                  </span>
                  {/* Cert */}
                  <span className={`absolute top-4 right-4 px-2 py-1 text-[10px] font-bold tracking-wider border rounded-sm ${
                    dark ? 'border-gold-700/60 text-gold-400 bg-obsidian-900/70 backdrop-blur-sm'
                         : 'border-gold-600/60 text-gold-600 bg-white/80 backdrop-blur-sm'
                  }`}>
                    {gem.certification}
                  </span>
                  <div className="absolute bottom-4 left-4">
                    <p className={`text-[10px] font-semibold tracking-widest uppercase text-pearl-400`}>{gem.origin}</p>
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <h3 className={`font-display text-xl font-medium mb-1 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
                    style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                    {gem.name}
                  </h3>
                  <p className={`text-sm mb-4 ${subText}`}>{gem.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {gem.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-gold-500 flex-shrink-0" />
                        <span className={`text-xs ${subText}`}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-auto pt-4 border-t ${divider} flex items-end justify-between`}>
                    <div>
                      <p className={`text-[10px] font-semibold tracking-widest uppercase mb-0.5 ${subText}`}>Acquisition Price</p>
                      <p className="font-display text-2xl font-semibold text-gold-gradient"
                        style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                        ${gem.price}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors text-gold-500 group-hover:text-gold-300`}>
                      Acquire <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 lg:px-8 border-y ${divider} ${dark ? 'bg-obsidian-900/40' : 'bg-pearl-200/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="section-label mb-3">Browse By Stone</p>
            <h2 className={`font-display font-light ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Investment Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <Link key={cat.name} href={cat.href}
                className="group relative overflow-hidden rounded-sm h-80 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="section-label mb-1">{cat.count} stones</p>
                  <h3 className={`font-display text-xl font-medium text-pearl-50 mb-0.5`}
                    style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                    {cat.name}
                  </h3>
                  <p className="text-xs text-pearl-400 mb-3">{cat.sub}</p>
                  <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gold-400 group-hover:text-gold-300 transition-colors">
                    Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Features ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Our Promise</p>
            <h2 className={`font-display font-light ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              The Gemify Standard
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_FEATURES.map(({ Icon, title, desc }, idx) => (
              <div key={title}
                className={`luxury-card p-8 flex flex-col items-center text-center animate-fade-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-12 h-12 rounded-sm border border-gold-700/40 flex items-center justify-center mb-5"
                  style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <Icon size={20} className="text-gold-500" />
                </div>
                <h3 className={`font-display text-lg font-medium mb-3 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
                  style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                  {title}
                </h3>
                <p className={`text-sm leading-relaxed ${subText}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expert Section ───────────────────────────────────────────────── */}
      <section className={`py-24 px-6 lg:px-8 border-y ${divider} ${dark ? 'bg-obsidian-900/40' : 'bg-pearl-200/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-5">Expert Guidance</p>
              <h2 className={`font-display font-light leading-tight mb-6 ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                Your Personal
                <br />
                <span className="text-gold-gradient italic">Investment Advisor</span>
              </h2>
              <p className={`text-base leading-relaxed mb-8 ${subText}`}>
                Our team of FGA-certified gemologists brings decades of market
                expertise. We provide detailed stone analysis, investment-potential
                assessments, and personalised acquisition strategies — treating
                every collection with the discretion of a Swiss private bank.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  ['Certified Authentication', 'Every stone independently certified by leading gemological labs.'],
                  ['Provenance Documentation', 'Chain of custody and origin reports for significant acquisitions.'],
                  ['Portfolio Strategy',       'Bespoke advice on gem allocation within your wider investment portfolio.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-4">
                    <CheckCircle size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className={`text-sm font-semibold mb-0.5 ${dark ? 'text-pearl-200' : 'text-obsidian-800'}`}>{title}</p>
                      <p className={`text-sm ${subText}`}>{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-gold">
                  Meet Our Experts <ArrowRight size={15} />
                </Link>
                <Link href="/about" className="btn-outline-gold">
                  Schedule Consultation
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://atouchofbusiness.com/wp-content/uploads/2024/01/Jeweler-Evaluating-Semi-Precious-Gemstone-in-Workshop.png"
                alt="Expert gemologist examining a precious gemstone"
                className="rounded-sm w-full h-64 object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.thenaturalsapphirecompany.com/education/wp-content/uploads/2010/11/PA213_GIA_certificate_natural_unheated_padparadscha_sapphire.jpg"
                alt="GIA gem certification document"
                className="rounded-sm w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Invest ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Investment Case</p>
            <h2 className={`font-display font-light ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Why Precious Gems?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {INVESTMENT_POINTS.map(({ Icon, title, text }, idx) => (
              <div key={title}
                className={`luxury-card p-8 animate-fade-up`}
                style={{ animationDelay: `${idx * 0.12}s` }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-sm border border-gold-700/40 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.08)' }}>
                    <Icon size={18} className="text-gold-500" />
                  </div>
                  <h3 className={`font-display text-xl font-medium ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
                    style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                    {title}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed ${subText}`}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 lg:px-8 border-t ${divider} ${dark ? 'bg-obsidian-900/40' : 'bg-pearl-200/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Client Voices</p>
            <h2 className={`font-display font-light ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Trusted by Collectors Worldwide
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={t.name}
                className={`luxury-card p-8 flex flex-col animate-fade-up`}
                style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed italic mb-6 flex-1 ${subText}`}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-gold-700/50 flex items-center justify-center text-xs font-bold text-gold-500 flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.08)' }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${dark ? 'text-pearl-200' : 'text-obsidian-800'}`}>{t.name}</p>
                    <p className={`text-xs ${subText}`}>{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-luxury-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse, #D4AF37, transparent)' }} />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <p className="section-label mb-5">Ready to Begin?</p>
          <h2 className="font-display font-light text-pearl-50 leading-tight mb-6"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Access the Private Collection
          </h2>
          <p className="text-pearl-400 mb-10 text-base leading-relaxed">
            Join an exclusive community of serious gem investors and collectors.
            First access to extraordinary stones before public listing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn-gold">
              Create Private Account <ArrowRight size={16} />
            </Link>
            <Link href="/marketplace" className="btn-outline-gold">
              Browse Collection
            </Link>
          </div>
          <p className="mt-6 text-[11px] tracking-widest uppercase text-pearl-600">
            No subscription fees · Cancel anytime · 100% Satisfaction Guarantee
          </p>
        </div>
      </section>

    </div>
  );
}
