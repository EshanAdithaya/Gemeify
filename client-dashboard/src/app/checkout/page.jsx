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
import { friendlyError } from '@/lib/errorMessages';

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

const inputCls = 'w-full px-4 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition-colors';

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
      toast(friendlyError(err, 'We could not place your order right now. Please try again or contact support.'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Not signed in ──────────────────────────────────────────────────────────
  if (!authLoading && !user) {
    return (
      <Shell>
        <div className="luxury-card p-12 text-center max-w-md mx-auto">
          <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-royal-50 border border-royal-100">
            <Lock size={22} className="text-royal-600" />
          </div>
          <p className="section-label mb-1">Sign In Required</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Sign In to Continue</h1>
          <p className="text-sm text-slate-500 mb-6">You need an account to complete your purchase.</p>
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
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-emerald-500" />
          </div>
          <p className="section-label mb-1">Order Confirmed</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Thank You!</h1>
          <p className="text-sm text-slate-500 mb-2">Your order has been received and is being processed.</p>
          <p className="font-mono text-sm text-royal-600 bg-royal-50 border border-royal-100 rounded-md px-3 py-2 inline-block mb-7">{confirmation.orderNumber}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account/orders" className="btn-gold w-full sm:w-auto justify-center">View Orders</Link>
            <Link href="/marketplace" className="btn-outline-gold w-full sm:w-auto justify-center">Browse More</Link>
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
          <ShoppingBag size={32} className="text-slate-400 mx-auto mb-4" />
          <p className="text-xl font-bold text-slate-800 mb-3">Your Cart is Empty</p>
          <p className="text-sm text-slate-500 mb-6">Add some gems to your cart before checking out.</p>
          <Link href="/marketplace" className="btn-gold inline-flex items-center gap-2">
            Browse Collection <ArrowRight size={14} />
          </Link>
        </div>
      </Shell>
    );
  }

  // ── Main checkout ──────────────────────────────────────────────────────────
  return (
    <Shell>
      <header className="mb-10">
        <p className="section-label mb-1">Secure Checkout</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Complete Your Order</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Form ── */}
        <form onSubmit={submit} className="lg:col-span-2 space-y-6">

          {/* Shipping */}
          <div className="luxury-card p-6">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-5 flex items-center gap-2">
              <Shield size={12} className="text-royal-600" /> Shipping Details
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {FIELDS.map(([k, label, req, fullRow]) => (
                <div key={k} className={fullRow ? 'sm:col-span-2' : ''}>
                  <label className="text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-1.5 block">
                    {label}
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
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-5 flex items-center gap-2">
              <Lock size={12} className="text-royal-600" /> Payment Method
            </p>
            <div className="space-y-2.5">
              {PAYMENT_OPTIONS.map(({ value, label, sub }) => (
                <label
                  key={value}
                  className={`flex items-center gap-4 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === value
                      ? 'border-royal-400 bg-royal-50'
                      : 'border-slate-200 hover:border-royal-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="accent-blue-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{label}</p>
                    <p className="text-[11px] text-slate-500">{sub}</p>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-4 flex items-center gap-1.5">
              <Lock size={10} /> Payment is confirmed after order review. All transactions are encrypted.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full py-4 text-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock size={14} />
            {submitting ? 'Processing your order…' : `Place Order · $${subtotal.toLocaleString()}`}
          </button>
        </form>

        {/* ── Summary ── */}
        <div className="space-y-4">
          <div className="luxury-card p-5">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-4">Order Summary</p>
            <div className="space-y-3 mb-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden border border-slate-100 shrink-0">
                    <OptimizedImage src={i.mainImage} alt={i.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 truncate">{i.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Qty {i.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                    ${(i.price * i.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Total</p>
              <p className="text-2xl font-bold text-slate-900">${subtotal.toLocaleString()}</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="luxury-card p-4">
            {['Insured Global Shipping', 'Discreet Packaging', '256-Bit Encryption', 'GIA Documentation Included'].map((t) => (
              <div key={t} className="flex items-center gap-2.5 py-1.5">
                <Shield size={11} className="text-royal-500 flex-shrink-0" />
                <span className="text-[11px] text-slate-500">{t}</span>
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
    <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">{children}</div>
    </main>
  );
}
