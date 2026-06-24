'use client';

import { useState } from 'react';
import { Shield, Award, Globe2, Users, Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Protected from '@/components/Protected';

const STATS = [
  { value: '25+',  label: 'Years of Expertise' },
  { value: '12K+', label: 'Certified Gems Traded' },
  { value: '47',   label: 'Countries Served' },
  { value: '$2.4B',label: 'Total Value Traded' },
];

const VALUES = [
  { Icon: Shield, title: 'Absolute Authenticity',  description: 'Every gem independently certified by GIA, AGL, GRS, or Gübelin before listing.' },
  { Icon: Award,  title: 'Expert Curation Only',   description: 'Our FGA-certified gemologists personally select every stone for rarity, quality, and investment potential.' },
  { Icon: Globe2, title: 'Global Provenance',       description: 'Direct relationships with ethical mines in Sri Lanka, Burma, Colombia, Mozambique, and beyond.' },
  { Icon: Users,  title: 'Private Client Focus',    description: 'White-glove service for every acquisition. A dedicated relationship manager for major purchases.' },
];

const TEAM = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Gemologist',
    credentials: 'Ph.D. in Gemology · GIA Graduate Gemologist',
    description: 'Over 18 years identifying and grading coloured stones and diamonds for the world\'s leading auction houses.',
  },
  {
    name: 'James Chen',
    role: 'Head of Acquisitions',
    credentials: 'FGA · DGA · GRS Trained',
    description: 'Specialist in sourcing rare no-heat sapphires, pigeon-blood rubies, and Colombian emeralds directly at origin.',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Quality Assurance Director',
    credentials: 'MSc Geology · GIA Certified',
    description: 'Sets and enforces Gemify\'s uncompromising quality standards — every stone examined under laboratory conditions.',
  },
];

const TEAM_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

function AboutContent() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData]   = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const dark    = isDarkMode;
  const pageBg  = dark ? 'bg-obsidian-950' : 'bg-pearl-100';
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';
  const head    = dark ? 'text-pearl-50'  : 'text-obsidian-900';

  const inputCls = `w-full px-4 py-3 text-sm rounded-sm border focus:outline-none focus:border-gold-600/60 transition-colors ${
    dark
      ? 'bg-obsidian-900 border-gold-900/30 text-pearl-100 placeholder-pearl-600'
      : 'bg-white border-gold-700/20 text-obsidian-900 placeholder-obsidian-400'
  }`;

  return (
    <div className={`min-h-screen ${pageBg} pt-24`}>

      {/* ── Hero ── */}
      <section className={`relative border-b ${divider} py-20 px-6 lg:px-8`}>
        <div className="absolute inset-0 bg-luxury-hero opacity-50" />
        <div className="relative max-w-7xl mx-auto">
          <p className="section-label mb-4">About Gemify</p>
          <h1 className={`font-display font-light leading-tight mb-6 ${head}`}
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Crafting Excellence in
            <br /><span className="text-gold-gradient italic">Fine Gemstones</span>
          </h1>
          <p className={`max-w-2xl text-lg leading-relaxed ${subText}`}>
            Since 1998, Gemify has operated at the intersection of gemological expertise and private wealth management.
            We bridge exceptional stones with the collectors who deserve them.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={`border-b ${divider} py-16 px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-semibold text-gold-gradient mb-2"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                {value}
              </p>
              <p className={`text-xs font-semibold tracking-widest uppercase ${subText}`}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">Our Heritage</p>
            <h2 className={`font-display font-light leading-tight mb-6 ${head}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              A Legacy Built on
              <br /><span className="text-gold-gradient italic">Trust & Rarity</span>
            </h2>
            <div className={`space-y-4 text-sm leading-relaxed ${subText}`}>
              <p>
                Gemify was founded by a family of gemologists who believed that investment-grade stones should be
                accessible to discerning collectors worldwide — not locked in the back rooms of traditional jewellers.
              </p>
              <p>
                Our journey began in the gem trading hubs of Bangkok, Colombo, and Jaipur, where we built lasting
                relationships with ethical miners and cutters. Those early partnerships gave us unparalleled access to
                the finest rough stones before they reach the open market.
              </p>
              <p>
                Today, we serve private collectors, family offices, and wealth managers across Europe, the Middle East,
                and Asia — each acquisition handled with the discretion and expertise they deserve.
              </p>
            </div>
            <ul className="space-y-3 mt-8">
              {[
                'Direct-source relationships in 12 gem-producing countries',
                'Partnerships with GIA, AGL, GRS, and Gübelin laboratories',
                'Dedicated privacy protocols for high-value acquisitions',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <span className={`text-sm ${subText}`}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://atouchofbusiness.com/wp-content/uploads/2024/01/Jeweler-Evaluating-Semi-Precious-Gemstone-in-Workshop.png"
              alt="Expert gemologist at work"
              className="w-full h-96 object-cover rounded-sm"
            />
            <div className={`absolute -bottom-6 -left-6 luxury-card p-5`}>
              <p className="section-label mb-1">Est. 1998</p>
              <p className={`font-display text-lg font-medium ${head}`}
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                25+ Years of Trust
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`py-20 px-6 lg:px-8 border-y ${divider} ${dark ? 'bg-obsidian-900/40' : 'bg-pearl-200/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Our Principles</p>
            <h2 className={`font-display font-light ${head}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              The Gemify Standard
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, description }, idx) => (
              <div key={title}
                className="luxury-card p-7 flex flex-col items-center text-center animate-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-11 h-11 rounded-sm border border-gold-700/40 flex items-center justify-center mb-5"
                  style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <Icon size={19} className="text-gold-500" />
                </div>
                <h3 className={`font-display text-lg font-medium mb-3 ${head}`}
                  style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                  {title}
                </h3>
                <p className={`text-sm leading-relaxed ${subText}`}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">The Experts</p>
            <h2 className={`font-display font-light ${head}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Meet Our Gemologists
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TEAM.map((member, idx) => (
              <div key={member.name}
                className="luxury-card overflow-hidden animate-fade-up"
                style={{ animationDelay: `${idx * 0.12}s` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEAM_IMAGE} alt={member.name} className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className={`font-display text-xl font-medium mb-0.5 ${head}`}
                    style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                    {member.name}
                  </h3>
                  <p className="text-gold-500 text-xs font-semibold tracking-wider uppercase mb-2">{member.role}</p>
                  <p className={`text-xs mb-3 ${subText}`}>{member.credentials}</p>
                  <p className={`text-sm leading-relaxed ${subText}`}>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className={`py-20 px-6 lg:px-8 border-t ${divider} ${dark ? 'bg-obsidian-900/40' : 'bg-pearl-200/50'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="luxury-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="section-label mb-4">Private Desk</p>
                <h2 className={`font-display font-light leading-tight mb-5 ${head}`}
                  style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                  Speak With an Expert
                </h2>
                <p className={`text-sm leading-relaxed mb-8 ${subText}`}>
                  Whether you are building a gem portfolio or searching for a specific stone,
                  our team is here with discreet, personalised guidance.
                </p>
                <div className="space-y-4">
                  {[
                    { Icon: Mail,  text: 'private@gemify.com',  href: 'mailto:private@gemify.com' },
                    { Icon: Phone, text: '+1 (800) GEMIFY-1',   href: 'tel:+18004364391' },
                    { Icon: MapPin,text: 'Geneva · Dubai · Singapore', href: null },
                    { Icon: Clock, text: 'Mon–Fri: 9:00 AM–8:00 PM (GMT)',  href: null },
                  ].map(({ Icon, text, href }) => (
                    <div key={text} className="flex items-center gap-3">
                      <Icon size={16} className="text-gold-500 flex-shrink-0" />
                      {href
                        ? <a href={href} className={`text-sm transition-colors ${subText} hover:text-gold-400`}>{text}</a>
                        : <span className={`text-sm ${subText}`}>{text}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-4"
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center">
                    <CheckCircle size={40} className="text-gold-500" />
                    <p className={`font-display text-xl font-light ${head}`}
                      style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                      Message Received
                    </p>
                    <p className={`text-sm ${subText}`}>Our team will respond within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    {[['name','Name','text'], ['email','Email Address','email']].map(([id, label, type]) => (
                      <div key={id}>
                        <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${subText}`}>{label}</label>
                        <input
                          type={type}
                          required
                          value={formData[id]}
                          onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    ))}
                    <div>
                      <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${subText}`}>Message</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full mt-2">
                      Send Message <ArrowRight size={15} />
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function AboutPage() {
  return (
    <Protected>
      <AboutContent />
    </Protected>
  );
}
