'use client';

import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

const COOKIE_TYPES = [
  {
    name: 'Essential Cookies',
    badge: 'Always Active',
    badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    description: 'These cookies are necessary for the platform to function and cannot be disabled. They include session cookies, authentication tokens, and security cookies that keep your account secure and your cart intact.',
    examples: ['Authentication session', 'CSRF protection token', 'Shopping cart contents', 'Cookie consent preferences'],
  },
  {
    name: 'Analytics Cookies',
    badge: 'Optional',
    badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200',
    description: 'We use analytics cookies to understand how visitors interact with our platform. This helps us improve our services, identify popular features, and fix issues. All data is aggregated and anonymised.',
    examples: ['Page view counts', 'Session duration', 'Navigation paths', 'Device and browser type'],
  },
  {
    name: 'Personalisation Cookies',
    badge: 'Optional',
    badgeColor: 'bg-violet-50 text-violet-700 border border-violet-200',
    description: 'These cookies allow us to remember your preferences and personalise your experience. They enable features like recently viewed gems, currency selection, and saved search filters.',
    examples: ['Recently viewed gems', 'Currency preference', 'Search filter settings', 'Display preferences'],
  },
  {
    name: 'Marketing Cookies',
    badge: 'Optional',
    badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200',
    description: 'Marketing cookies help us show you relevant content and measure the effectiveness of our marketing campaigns. We work only with reputable partners who adhere to strict data protection standards.',
    examples: ['Ad campaign attribution', 'Remarketing audience segments', 'Conversion tracking', 'Social media pixels'],
  },
];

const SECTIONS = [
  {
    title: 'What Are Cookies?',
    content: `Cookies are small text files placed on your device when you visit a website. They serve many purposes: keeping you signed in, remembering your preferences, understanding how you use our platform, and helping us provide relevant content.

We also use similar technologies such as local storage, session storage, and pixel tags. Throughout this policy, we refer to all of these collectively as "cookies".`,
  },
  {
    title: 'How to Manage Cookies',
    content: `You can manage your cookie preferences in several ways:

Cookie Settings Panel: Click "Cookie Settings" in the footer of any page to review and update your preferences at any time.

Browser Settings: Most browsers allow you to refuse or delete cookies through their settings. Note that disabling essential cookies may prevent parts of our platform from functioning correctly.

Third-Party Opt-Outs: For marketing cookies, you can also opt out directly through industry tools such as the Digital Advertising Alliance (DAA) or the Network Advertising Initiative (NAI).`,
  },
  {
    title: 'Third-Party Cookies',
    content: `Some cookies are placed by third-party services we use, such as analytics providers and payment processors. These parties have their own privacy policies and cookie practices, which we encourage you to review.

We carefully vet all third-party partners and require them to comply with applicable data protection laws. We do not allow third parties to use cookies on our platform for their own advertising purposes without your explicit consent.`,
  },
  {
    title: 'Cookie Retention',
    content: `Session cookies expire when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. The duration varies by cookie type:

• Essential session cookies: Expire at session end
• Authentication cookies: Up to 30 days
• Preference cookies: Up to 12 months
• Analytics cookies: Up to 24 months
• Marketing cookies: Up to 90 days`,
  },
  {
    title: 'Updates to This Policy',
    content: `We may update this Cookie Policy to reflect changes in the cookies we use or for legal, operational, or regulatory reasons. We will notify you of material changes via a notice on our platform. We encourage you to review this policy periodically.`,
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Gemify
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-0.5">Legal</p>
              <h1 className="text-3xl font-bold text-slate-900">Cookie Policy</h1>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
            We use cookies to give you the best experience on Gemify. This policy explains what cookies we use, why we use them, and how you can control them.
          </p>
          <p className="text-xs text-slate-400 mt-4">Last updated: June 2025 &nbsp;·&nbsp; Effective: June 2025</p>
        </div>
      </div>

      {/* Cookie types grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Types of Cookies We Use</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COOKIE_TYPES.map((ct) => (
            <div key={ct.name} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm">{ct.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ct.badgeColor}`}>{ct.badge}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{ct.description}</p>
              <div className="space-y-1">
                {ct.examples.map((ex) => (
                  <div key={ex} className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h2>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{s.content}</div>
            </div>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-14 p-6 rounded-2xl border border-amber-100 bg-amber-50">
          <h3 className="font-bold text-slate-900 mb-1">Questions about cookies?</h3>
          <p className="text-sm text-slate-600 mb-3">Contact us if you have any questions about how we use cookies or how to manage your preferences.</p>
          <a href="mailto:privacy@gemify.com" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors">
            privacy@gemify.com →
          </a>
        </div>

        {/* Related links */}
        <div className="mt-8 flex gap-4">
          <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-blue-700 font-medium transition-colors">Privacy Policy →</Link>
          <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-700 font-medium transition-colors">Terms of Service →</Link>
        </div>
      </div>
    </div>
  );
}
