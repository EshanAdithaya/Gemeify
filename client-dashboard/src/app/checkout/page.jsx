'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, ShoppingBag, Shield, ArrowRight } from 'lucide-react';
import { ordersAPI } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Events } from '@/lib/analytics';
import OptimizedImage from '@/components/OptimizedImage';

const FIELDS = [
  ['firstName', 'First Name',                      true,  false],
  ['lastName',  'Last Name',                        true,  false],
  ['address1',  'Street Address',                   true,  true],
  ['address2',  'Apartment, Suite (optional)',       false, true],
  ['city',      'City',                             true,  false],
  ['state',     'State / Province',                 true,  false],
  ['zipCode',   'ZIP / Postal Code',                true,  false],
  ['country',   'Country',                          true,  false],
  ['phone',     'Phone (optional)',                  false, true],
];

const PAYMENT_OPTIONS = [
  { value: 'bank_transfer',  label: 'Bank Transfer',     sub: 'Swift / SEPA / Fedwire' },
  { value: 'credit_card',    label: 'Credit Card',       sub: 'Visa, Mastercard, Amex' },
  { value: 'debit_card',     label: 'Debit Card',        sub: 'All major networks' },
  { value: 'paypal',         label: 'PayPal',            sub: 'Secure digital payment' },
];

const inputCls = 'w-full px-4 py-2.5 bg-obsidian-900 text-pearl-100 border border-gold-900/30 rounded-sm text-sm placeholder:text-pearl-700 focus:outline-none focus:border-gold-700/60 transition-colors';

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    address1: '', address2: '', city: '', state: '', zipCode: '', country: '', phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [submitting,    setSubmitting]    = useState(false);
  const [confirmation,  setConfirmation]  = useState(null);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const missing = FIELDS.filter(([k, , req]) => req && !form[k].trim());
    if (missing.length) { toast('Please complete all required shipping fields', 'error'); return; }
    setSubmitting(true);
    try {
      const res = await ordersAPI.create({
        items: items.map((i) => ({ gemId: i.id, quantity: i.quantity })),
        shippingAddress: form,
        paymentMethod,
      });
      const order = res.data?.data;
      Events.orderCreated(order?.id, Number(order?.total) || subtotal);
      clear();
      setConfirmation(order);
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not place order. Please try again.';
      toast(Array.isArray(msg) ? msg[0] : msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Not signed in ──────────────────────────────────────────────────────────
  if (!authLoading && !user) {
    return (
      <Shell>
        <div className="luxury-card p-12 text-center max-w-md mx-auto">
          <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-gold-900/30 rounded-sm"
            style={{ background: 'rgba(212,175,55,0.06)' }}>
            <Lock size={22} className="text-gold-600" />
          </div>
          <p className="section-label mb-1">Private Access Required</p>
          <h1 className="font-display text-2xl font-light text-pearl-50 mb-3"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
            Sign In to Continue
          </h1>
          <p className="text-sm text-pearl-500 mb-6">You need an account to acquire gems.</p>
          <Link href="/login" className="btn-gold inline-flex items-center gap-2">
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      </Shell>
    );
  }

  // ── Confirmation ───────────────────────────────────────────────────────────
  if (confirmation) {
    return (
      <Shell>
        <div className="luxury-card p-12 text-center max-w-md mx-auto">
          <CheckCircle2 size={44} className="text-emerald-400 mx-auto mb-5" />
          <p className="section-label mb-1">Order Confirmed</p>
          <h1 className="font-display text-3xl font-light text-pearl-50 mb-3"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
            Thank You
          </h1>
          <p className="text-sm text-pearl-400 mb-2">Your acquisition has been recorded.</p>
          <p className="font-mono text-sm text-gold-500 mb-7">{confirmation.orderNumber}</p>
          <div className="flex gap-3 justify-center">
            <Link href="/account/orders" className="btn-gold">View Orders</Link>
            <Link href="/marketplace" className="btn-outline-gold">Browse More</Link>
          </div>
        </div>
      </Shell>
    );
  }

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <Shell>
        <div className="luxury-card p-12 text-center max-w-md mx-auto">
          <ShoppingBag size={32} className="text-gold-700 mx-auto mb-4" />
          <p className="font-display text-xl font-light text-pearl-50 mb-3"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
            Your Cart is Empty
          </p>
          <Link href="/marketplace" className="btn-gold inline-flex items-center gap-2">
            Browse the Collection <ArrowRight size={14} />
          </Link>
        </div>
      </Shell>
    );
  }

  // ── Main checkout ──────────────────────────────────────────────────────────
  return (
    <Shell>
      <header className="mb-10">
        <p className="section-label mb-1">Secure Acquisition</p>
        <h1 className="font-display text-4xl font-light text-pearl-50"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
          Checkout
        </h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Form ── */}
        <form onSubmit={submit} className="lg:col-span-2 space-y-6">

          {/* Shipping */}
          <div className="luxury-card p-6">
            <p className="text-[10px] font-bold tracking-widest uppercase text-pearl-500 mb-5 flex items-center gap-2">
              <Shield size={12} className="text-gold-600" /> Shipping Details
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {FIELDS.map(([k, label, req, fullRow]) => (
                <div key={k} className={fullRow ? 'sm:col-span-2' : ''}>
                  <label className="text-[10px] font-bold tracking-wider uppercase text-pearl-600 mb-1.5 block">
                    {label}{req ? '' : ''}
                  </label>
                  <input
                    className={inputCls}
                    value={form[k]}
                    required={req}
                    placeholder={req ? '' : 'Optional'}
                    onChange={(e) => setField(k, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="luxury-card p-6">
            <p className="text-[10px] font-bold tracking-widest uppercase text-pearl-500 mb-5 flex items-center gap-2">
              <Lock size={12} className="text-gold-600" /> Payment Method
            </p>
            <div className="space-y-2.5">
              {PAYMENT_OPTIONS.map(({ value, label, sub }) => (
                <label
                  key={value}
                  className={`flex items-center gap-4 px-4 py-3 border rounded-sm cursor-pointer transition-colors ${
                    paymentMethod === value
                      ? 'border-gold-700/60 bg-gold-500/5'
                      : 'border-gold-900/20 hover:border-gold-900/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="accent-amber-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-pearl-100">{label}</p>
                    <p className="text-[11px] text-pearl-600">{sub}</p>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-[10px] text-pearl-600 mt-4 flex items-center gap-1.5">
              <Lock size={10} /> Payment is confirmed after order review. All transactions are encrypted.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full py-4 text-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock size={14} />
            {submitting ? 'Processing…' : `Complete Acquisition · $${subtotal.toLocaleString()}`}
          </button>
        </form>

        {/* ── Summary ── */}
        <div className="space-y-4">
          <div className="luxury-card p-5">
            <p className="text-[10px] font-bold tracking-widest uppercase text-pearl-500 mb-4">Order Summary</p>
            <div className="space-y-3 mb-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-sm overflow-hidden border border-gold-900/20 shrink-0">
                    <OptimizedImage src={i.mainImage} alt={i.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-pearl-100 truncate">{i.name}</p>
                    <p className="text-[11px] text-pearl-600 mt-0.5">Qty {i.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-pearl-200 whitespace-nowrap">
                    ${(i.price * i.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gold-900/20 pt-4 flex justify-between items-baseline">
              <p className="text-[10px] font-bold tracking-widest uppercase text-pearl-600">Total</p>
              <p className="font-display text-2xl font-semibold text-gold-gradient"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                ${subtotal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Trust */}
          <div className="luxury-card p-4">
            {['Insured Global Shipping', 'Discreet Packaging', '256-Bit Encryption', 'GIA Documentation Included'].map((t) => (
              <div key={t} className="flex items-center gap-2.5 py-1.5">
                <Shield size={11} className="text-gold-600 flex-shrink-0" />
                <span className="text-[11px] text-pearl-400">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <main className="min-h-screen bg-obsidian-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">{children}</div>
    </main>
  );
}
