'use client';

import { useState } from 'react';
import { Shield, Award, Globe2, Users, Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
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
    description: 'Sets and enforces Gemeify\'s uncompromising quality standards — every stone examined under laboratory conditions.',
  },
];

const TEAM_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

const inputCls = 'w-full px-4 py-3.5 sm:py-3 text-sm rounded-sm border focus:outline-none focus:border-gold-600/60 transition-colors bg-obsidian-900 border-gold-900/30 text-pearl-100 placeholder-pearl-600';

function AboutContent() {
  const [formData, setFormData]   = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian-950 pt-16 sm:pt-20">

      {/* ── Hero ── */}
      <section className="relative border-b border-gold-900/25 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-luxury-hero opacity-50" />
        <div className="relative max-w-7xl mx-auto">
          <p className="section-label mb-4">About Gemeify</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pearl-50 leading-tight mb-5">
            Crafting Excellence in
            <br /><span className="text-gold-gradient">Fine Gemstones</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-pearl-400 leading-relaxed">
            Since 1998, Gemeify has operated at the intersection of gemological expertise and private wealth management.
            We bridge exceptional stones with the collectors who deserve them.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-gold-900/25 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gold-gradient mb-2">{value}</p>
              <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-pearl-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="section-label mb-4">Our Heritage</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50 leading-tight mb-5">
              A Legacy Built on
              <br /><span className="text-gold-gradient">Trust &amp; Rarity</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-pearl-400 leading-relaxed">
              <p>
                Gemeify was founded by a family of gemologists who believed that investment-grade stones should be
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
                  <span className="text-sm text-pearl-400">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mt-4 lg:mt-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://atouchofbusiness.com/wp-content/uploads/2024/01/Jeweler-Evaluating-Semi-Precious-Gemstone-in-Workshop.png"
              alt="Expert gemologist at work"
              className="w-full h-64 sm:h-96 object-cover rounded-sm"
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 luxury-card p-4 sm:p-5">
              <p className="section-label mb-0.5">Est. 1998</p>
              <p className="text-base sm:text-lg font-bold text-pearl-100">25+ Years of Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-gold-900/25 bg-obsidian-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="section-label mb-2">Our Principles</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50">The Gemeify Standard</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {VALUES.map(({ Icon, title, description }) => (
              <div key={title} className="luxury-card p-6 sm:p-7 flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-sm border border-gold-700/40 flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <Icon size={19} className="text-gold-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-pearl-100 mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-pearl-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="section-label mb-2">The Experts</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50">Meet Our Gemologists</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="luxury-card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEAM_IMAGE} alt={member.name} className="w-full h-52 sm:h-60 object-cover" />
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-pearl-100 mb-0.5">{member.name}</h3>
                  <p className="text-gold-500 text-xs font-bold tracking-wider uppercase mb-1.5">{member.role}</p>
                  <p className="text-xs text-pearl-500 mb-3">{member.credentials}</p>
                  <p className="text-sm text-pearl-400 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-gold-900/25 bg-obsidian-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="luxury-card p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
              <div>
                <p className="section-label mb-4">Private Desk</p>
                <h2 className="text-xl sm:text-2xl font-bold text-pearl-50 leading-tight mb-4">Speak With an Expert</h2>
                <p className="text-sm text-pearl-400 leading-relaxed mb-8">
                  Whether you are building a gem portfolio or searching for a specific stone,
                  our team is here with discreet, personalised guidance.
                </p>
                <div className="space-y-4">
                  {[
                    { Icon: Mail,   text: 'private@gemeify.com',        href: 'mailto:private@gemeify.com' },
                    { Icon: Phone,  text: '+1 (800) GEMEIFY-1',          href: 'tel:+18004364391' },
                    { Icon: MapPin, text: 'Geneva · Dubai · Singapore',  href: null },
                    { Icon: Clock,  text: 'Mon–Fri: 9:00 AM–8:00 PM (GMT)', href: null },
                  ].map(({ Icon, text, href }) => (
                    <div key={text} className="flex items-center gap-3">
                      <Icon size={16} className="text-gold-500 flex-shrink-0" />
                      {href
                        ? <a href={href} className="text-sm text-pearl-400 hover:text-gold-400 transition-colors">{text}</a>
                        : <span className="text-sm text-pearl-400">{text}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center">
                    <CheckCircle size={40} className="text-gold-500" />
                    <p className="text-xl font-bold text-pearl-50">Message Received</p>
                    <p className="text-sm text-pearl-400">Our team will respond within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    {[['name','Name','text'], ['email','Email Address','email']].map(([id, label, type]) => (
                      <div key={id}>
                        <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-pearl-500">{label}</label>
                        <input type={type} required value={formData[id]}
                          onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                          className={inputCls} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-pearl-500">Message</label>
                      <textarea rows={4} required value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={inputCls} />
                    </div>
                    <button type="submit" className="btn-gold w-full mt-2 justify-center">
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
