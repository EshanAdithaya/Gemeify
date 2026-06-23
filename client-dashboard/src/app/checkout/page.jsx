'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, ShoppingBag } from 'lucide-react';
import { ordersAPI } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useTheme } from '@/context/ThemeContext';
import OptimizedImage from '@/components/OptimizedImage';
import Button from '@/components/ui/Button';

const FIELDS = [
  ['firstName', 'First name', true],
  ['lastName', 'Last name', true],
  ['address1', 'Address', true],
  ['address2', 'Apartment, suite (optional)', false],
  ['city', 'City', true],
  ['state', 'State / Province', true],
  ['zipCode', 'ZIP / Postal code', true],
  ['country', 'Country', true],
  ['phone', 'Phone (optional)', false],
];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { isDarkMode } = useTheme();

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const card = isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg';
  const text = isDarkMode ? 'text-white' : 'text-gray-900';
  const muted = isDarkMode ? 'text-slate-400' : 'text-gray-600';
  const inputCls = `w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
    isDarkMode ? 'bg-slate-900/60 text-white border border-slate-700' : 'bg-gray-50 text-gray-900 border border-gray-200'
  }`;

  const submit = async (e) => {
    e.preventDefault();
    const missing = FIELDS.filter(([k, , req]) => req && !form[k].trim());
    if (missing.length) {
      toast('Please complete all required shipping fields', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const res = await ordersAPI.create({
        items: items.map((i) => ({ gemId: i.id, quantity: i.quantity })),
        shippingAddress: form,
        paymentMethod,
      });
      const order = res.data?.data;
      clear();
      setConfirmation(order);
      toast('Order placed successfully!', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not place order. Please try again.';
      toast(Array.isArray(msg) ? msg[0] : msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // --- States ---------------------------------------------------------------
  if (!authLoading && !user) {
    return (
      <Shell isDarkMode={isDarkMode}>
        <div className={`${card} rounded-xl p-10 text-center max-w-md mx-auto`}>
          <Lock className="mx-auto text-brand-400 mb-3" />
          <h1 className={`text-xl font-bold ${text}`}>Sign in to check out</h1>
          <p className={`${muted} mt-2`}>You need an account to place an order.</p>
          <Link href="/login" className="inline-block mt-4"><Button>Sign In</Button></Link>
        </div>
      </Shell>
    );
  }

  if (confirmation) {
    return (
      <Shell isDarkMode={isDarkMode}>
        <div className={`${card} rounded-xl p-10 text-center max-w-md mx-auto`}>
          <CheckCircle2 className="mx-auto text-emerald-400 mb-3" size={40} />
          <h1 className={`text-2xl font-bold ${text}`}>Thank you!</h1>
          <p className={`${muted} mt-2`}>Your order has been placed.</p>
          <p className={`${text} font-mono mt-4`}>{confirmation.orderNumber}</p>
          <div className="flex gap-3 justify-center mt-6">
            <Link href="/account/orders"><Button>View Orders</Button></Link>
            <Link href="/marketplace"><Button variant="outline">Keep Shopping</Button></Link>
          </div>
        </div>
      </Shell>
    );
  }

  if (items.length === 0) {
    return (
      <Shell isDarkMode={isDarkMode}>
        <div className={`${card} rounded-xl p-10 text-center max-w-md mx-auto`}>
          <ShoppingBag className="mx-auto text-slate-500 mb-3" />
          <h1 className={`text-xl font-bold ${text}`}>Your cart is empty</h1>
          <Link href="/marketplace" className="inline-block mt-4"><Button>Browse Gems</Button></Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell isDarkMode={isDarkMode}>
      <h1 className={`text-3xl font-bold mb-8 ${text}`}>Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping form */}
        <form onSubmit={submit} className={`lg:col-span-2 ${card} rounded-xl p-6 space-y-4`}>
          <h2 className={`text-lg font-semibold ${text}`}>Shipping address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map(([k, label, req]) => (
              <div key={k} className={k === 'address1' || k === 'address2' ? 'sm:col-span-2' : ''}>
                <label className={`block text-sm mb-1 ${muted}`}>{label}</label>
                <input
                  className={inputCls}
                  value={form[k]}
                  required={req}
                  onChange={(e) => setField(k, e.target.value)}
                />
              </div>
            ))}
          </div>

          <h2 className={`text-lg font-semibold pt-2 ${text}`}>Payment</h2>
          <select className={inputCls} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
          <p className={`text-xs ${muted}`}>
            <Lock size={12} className="inline mr-1" />
            Payment is captured after order confirmation. This demo records purchase intent.
          </p>

          <Button type="submit" size="lg" loading={submitting} className="w-full">
            Place Order · ${subtotal.toLocaleString()}
          </Button>
        </form>

        {/* Summary */}
        <div className={`${card} rounded-xl p-6 h-fit`}>
          <h2 className={`text-lg font-semibold mb-4 ${text}`}>Order summary</h2>
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                  <OptimizedImage src={i.mainImage} alt={i.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${text}`}>{i.name}</p>
                  <p className={`text-xs ${muted}`}>Qty {i.quantity}</p>
                </div>
                <span className={`text-sm ${text}`}>${(i.price * i.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className={`border-t mt-4 pt-4 flex justify-between font-bold ${text} ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <span>Total</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children, isDarkMode }) {
  return (
    <main className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </main>
  );
}
