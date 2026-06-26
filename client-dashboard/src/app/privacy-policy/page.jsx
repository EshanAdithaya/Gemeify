'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us when you create an account, make a purchase, or contact our private desk. This includes your name, email address, shipping address, payment details, and communication preferences.

We also automatically collect certain information when you use our platform, such as your IP address, browser type, device identifiers, pages visited, and time spent on each page. This helps us personalise your experience and improve our services.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Process and fulfil your orders, including sending confirmation and shipping notifications
• Provide personalised recommendations based on your collection interests
• Send you exclusive acquisition opportunities and market updates (with your consent)
• Respond to your enquiries and provide customer support
• Maintain the security and integrity of our platform
• Comply with legal obligations and resolve disputes`,
  },
  {
    title: 'Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Logistics and courier partners solely to fulfil your orders
• Payment processors who handle transactions under strict security standards
• Professional certification laboratories (GIA, AGL, GRS) for gem authentication records
• Law enforcement or regulatory bodies where required by law

All third parties are bound by confidentiality agreements and may only use your data for the specified purpose.`,
  },
  {
    title: 'Data Security',
    content: `We employ industry-leading security measures to protect your personal information. All data is encrypted in transit using TLS 1.3, and sensitive data at rest is protected with AES-256 encryption. Our systems comply with PCI DSS standards for payment card data.

Access to personal data is restricted to authorised personnel only, and all access is logged and audited. We conduct regular security assessments and penetration testing to identify and remediate vulnerabilities.`,
  },
  {
    title: 'Your Rights',
    content: `You have the following rights regarding your personal data:

• Access: Request a copy of the personal data we hold about you
• Rectification: Ask us to correct inaccurate or incomplete information
• Erasure: Request deletion of your personal data where no legal obligation requires us to retain it
• Portability: Receive your data in a structured, machine-readable format
• Objection: Object to processing of your data for direct marketing purposes
• Withdrawal: Withdraw consent at any time where processing is based on consent

To exercise any of these rights, please contact us at privacy@gemify.com.`,
  },
  {
    title: 'Cookies',
    content: `We use cookies and similar tracking technologies to enhance your experience. Essential cookies are necessary for the platform to function. Analytics cookies help us understand how you use our services. You can manage your cookie preferences at any time through our Cookie Settings panel.

For full details on how we use cookies, please see our Cookie Policy.`,
  },
  {
    title: 'Data Retention',
    content: `We retain your personal information for as long as your account is active or as needed to provide you with our services. Transaction records are retained for seven years to comply with financial regulations. If you close your account, we will delete or anonymise your data within 90 days, except where we are required by law to retain it.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes via email or a prominent notice on our platform at least 30 days before the change takes effect. Your continued use of our services after the effective date constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPolicyPage() {
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
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-0.5">Legal</p>
              <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
            At Gemify, your privacy is paramount. This policy explains how we collect, use, and protect your personal information when you use our platform.
          </p>
          <p className="text-xs text-slate-400 mt-4">Last updated: June 2025 &nbsp;·&nbsp; Effective: June 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-10">
          {SECTIONS.map((s, i) => (
            <div key={s.title} className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h2>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{s.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-14 p-6 rounded-2xl border border-blue-100 bg-blue-50">
          <h3 className="font-bold text-slate-900 mb-1">Questions about your privacy?</h3>
          <p className="text-sm text-slate-600 mb-3">Our Data Protection Officer is available to assist you with any privacy-related enquiries.</p>
          <a href="mailto:privacy@gemify.com" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
            privacy@gemify.com →
          </a>
        </div>

        {/* Related links */}
        <div className="mt-8 flex gap-4">
          <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-700 font-medium transition-colors">Terms of Service →</Link>
          <Link href="/cookie-policy" className="text-sm text-slate-500 hover:text-blue-700 font-medium transition-colors">Cookie Policy →</Link>
        </div>
      </div>
    </div>
  );
}
