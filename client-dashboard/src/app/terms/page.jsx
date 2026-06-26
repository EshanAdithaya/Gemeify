'use client';

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using the Gemify platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.

These terms constitute a legally binding agreement between you and Gemify Ltd. We reserve the right to update these terms at any time, with notice provided as described in the Changes section below.`,
  },
  {
    title: 'Eligibility',
    content: `You must be at least 18 years of age to use Gemify. By creating an account, you represent and warrant that you are of legal age and have the legal capacity to enter into binding contracts. Gemify reserves the right to verify your identity and age at any time.

Our platform is available to individuals and entities globally, subject to applicable laws and sanctions regulations. We reserve the right to refuse service to anyone at our sole discretion.`,
  },
  {
    title: 'Account Responsibilities',
    content: `You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activity that occurs under your account
• Ensuring your account information is accurate and up to date
• Notifying us immediately of any unauthorised use of your account

Gemify is not liable for any loss or damage arising from your failure to comply with these obligations. You may not transfer your account to another person without our written consent.`,
  },
  {
    title: 'Purchases and Payments',
    content: `All gem listings on Gemify are subject to availability. Prices are displayed in your selected currency and include applicable taxes where required by law. We reserve the right to cancel or refuse any order at our discretion.

Payment is required in full at the time of purchase. We accept major credit cards, bank transfers, and other payment methods as displayed at checkout. All transactions are processed securely through PCI DSS-compliant payment processors.

Title and risk of loss for items purchased transfer to you upon delivery to the carrier.`,
  },
  {
    title: 'Authenticity Guarantee',
    content: `Every gemstone listed on Gemify is accompanied by a certificate from an internationally recognised gemological laboratory (GIA, AGL, GRS, Gübelin, or IGI). We stand behind the authenticity and quality of every item we sell.

If you receive an item that materially differs from its certified description, please contact our private desk within 14 days of delivery. We will arrange for independent verification and, where a discrepancy is confirmed, offer a full refund including return shipping costs.`,
  },
  {
    title: 'Returns and Refunds',
    content: `We offer a 14-day return window from the date of delivery for most items, provided they are returned in their original condition with all accompanying certificates and documentation.

Custom orders, items with personalised engraving, and items acquired at live auction are final sale and may not be returned unless they fail our authenticity guarantee.

Refunds are processed within 5–10 business days of receiving the returned item. Original shipping fees are non-refundable.`,
  },
  {
    title: 'Auctions',
    content: `Participation in Gemify live auctions requires a verified account and, for high-value lots, a pre-qualified credit limit. By placing a bid, you agree to purchase the item at your bid price if you are the winning bidder.

Bids are legally binding commitments. Failure to complete payment for a winning bid may result in account suspension and recovery of costs. Reserve prices and starting bids are set by the seller and are non-negotiable.`,
  },
  {
    title: 'Prohibited Conduct',
    content: `You agree not to:

• Use our platform for any unlawful purpose or in violation of any applicable regulations
• Submit false or misleading information
• Attempt to circumvent our security or authentication systems
• Scrape, crawl, or harvest data from our platform without written permission
• Interfere with the operation of our services or the experience of other users
• Engage in market manipulation or bid shilling in auction events

Violation of these prohibitions may result in immediate account termination and referral to relevant authorities.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the fullest extent permitted by law, Gemify shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, our services.

Our total liability to you for any claim arising out of or relating to these terms or our services shall not exceed the amount you paid for the specific item giving rise to the claim in the twelve months preceding the claim.`,
  },
  {
    title: 'Governing Law',
    content: `These Terms of Service are governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions.

Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales. You waive any objection to jurisdiction or venue in such courts.`,
  },
  {
    title: 'Changes to These Terms',
    content: `We may revise these Terms of Service at any time. Material changes will be communicated to you via email or through a prominent notice on our platform at least 30 days before they take effect.

Your continued use of our services after the effective date of revised terms constitutes your acceptance of the changes. If you do not agree to the updated terms, you must stop using our services.`,
  },
];

export default function TermsPage() {
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
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
              <FileText className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-0.5">Legal</p>
              <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
            These terms govern your use of the Gemify platform and the purchase of gemstones through our services. Please read them carefully.
          </p>
          <p className="text-xs text-slate-400 mt-4">Last updated: June 2025 &nbsp;·&nbsp; Effective: June 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-10">
          {SECTIONS.map((s, i) => (
            <div key={s.title} className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 mt-0.5">
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
        <div className="mt-14 p-6 rounded-2xl border border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900 mb-1">Legal enquiries</h3>
          <p className="text-sm text-slate-600 mb-3">For any questions about these Terms of Service, please contact our legal team.</p>
          <a href="mailto:legal@gemify.com" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
            legal@gemify.com →
          </a>
        </div>

        {/* Related links */}
        <div className="mt-8 flex gap-4">
          <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-blue-700 font-medium transition-colors">Privacy Policy →</Link>
          <Link href="/cookie-policy" className="text-sm text-slate-500 hover:text-blue-700 font-medium transition-colors">Cookie Policy →</Link>
        </div>
      </div>
    </div>
  );
}
