'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const COL_DISCOVER = [
  { label: 'Collections',    href: '/collections'  },
  { label: 'Live Auctions',  href: '/auctions'     },
  { label: 'Marketplace',    href: '/marketplace'  },
  { label: 'Investment Guides', href: '/guides'    },
  { label: 'About Gemify',   href: '/about'        },
];

const COL_SERVICES = [
  { label: 'Private Consultation', href: '/about' },
  { label: 'Gem Authentication',   href: '/guides' },
  { label: 'Portfolio Advisory',   href: '/about'  },
  { label: 'Shipping & Insurance', href: '/about'  },
  { label: 'Returns Policy',       href: '/about'  },
];

const CERTIFICATIONS = ['GIA', 'AGL', 'GRS', 'Gübelin', 'IGI'];

const CONTACT = [
  { Icon: Mail,   text: 'private@gemify.com',        href: 'mailto:private@gemify.com' },
  { Icon: Phone,  text: '+1 (800) GEMIFY-1',         href: 'tel:+18004364391'          },
  { Icon: MapPin, text: 'Geneva · Dubai · Singapore', href: null                        },
];

export default function Footer() {
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      {/* Newsletter strip */}
      <div className="border-b border-slate-200 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-1">Private Newsletter</p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">First access to rare acquisitions</h3>
          </div>
          {subscribed ? (
            <p className="text-royal-600 text-sm font-semibold tracking-wider">
              Thank you — you will be the first to know.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your private email"
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 px-4 py-2.5 text-sm focus:outline-none focus:border-royal-500 rounded-l-sm"
              />
              <button
                type="submit"
                className="btn-gold rounded-l-none"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7 flex-shrink-0">
                <polygon
                  points="14,2 26,9 26,21 14,26 2,21 2,9"
                  fill="none" stroke="url(#gFoot)" strokeWidth="1.5"
                />
                <polygon
                  points="14,6 22,10.5 22,19.5 14,22 6,19.5 6,10.5"
                  fill="url(#gFootFill)" opacity="0.25"
                />
                <defs>
                  <linearGradient id="gFoot" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#C9A84C"/>
                    <stop offset="100%" stopColor="#B8962E"/>
                  </linearGradient>
                  <linearGradient id="gFootFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#D4AF37"/>
                    <stop offset="100%" stopColor="#C9A84C"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-lg font-bold tracking-widest text-gold-gradient">GEMIFY</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              A curated vault of investment-grade certified gemstones, personally
              selected by master gemologists. Trusted by collectors in Geneva,
              Dubai, and Singapore.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link"
                  className="text-slate-500 hover:text-royal-600 transition-colors">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="section-label mb-5">Discover</h4>
            <ul className="space-y-3">
              {COL_DISCOVER.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-sm text-slate-600 link-underline hover:text-royal-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="section-label mb-5">Services</h4>
            <ul className="space-y-3">
              {COL_SERVICES.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-sm text-slate-600 link-underline hover:text-royal-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-5">Private Desk</h4>
            <div className="space-y-4">
              {CONTACT.map(({ Icon, text, href }) =>
                href ? (
                  <a key={text} href={href}
                    className="flex items-start gap-3 text-sm text-slate-600 hover:text-royal-500 transition-colors">
                    <Icon size={15} className="text-royal-700 mt-0.5 flex-shrink-0" />
                    <span>{text}</span>
                  </a>
                ) : (
                  <div key={text} className="flex items-start gap-3 text-sm text-slate-500">
                    <Icon size={15} className="text-royal-700 mt-0.5 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Certification badges */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="section-label mb-3">Certified By</p>
              <div className="flex flex-wrap gap-4">
                {CERTIFICATIONS.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 text-[11px] font-bold tracking-widest border rounded-sm border-slate-300/50 text-slate-500"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold tracking-wider mb-1 text-slate-500">
                SECURE TRANSACTIONS
              </p>
              <div className="flex gap-2 items-center justify-end">
                {['SSL', 'PCI DSS', '256-BIT'].map((b) => (
                  <span key={b} className="px-2 py-0.5 text-[10px] font-bold tracking-widest border rounded-sm border-slate-200 text-slate-500">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Gemify. All rights reserved. Investment grade gemstones for discerning collectors.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms', 'Cookie Policy'].map((l) => (
              <a key={l} href="#"
                className="text-xs text-slate-500 transition-colors hover:text-royal-600">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
