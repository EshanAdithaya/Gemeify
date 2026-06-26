'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Package, ChevronDown, ChevronUp, Star, ArrowRight } from 'lucide-react';
import { ordersAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Skeleton } from '@/components/Skeleton';
import ReviewModal from '@/components/ReviewModal';

const STATUS_STYLES = {
  pending:    'border-amber-600/40 text-amber-400 bg-amber-500/8',
  confirmed:  'border-blue-500/40 text-blue-400 bg-blue-500/8',
  processing: 'border-blue-500/40 text-blue-400 bg-blue-500/8',
  shipped:    'border-indigo-500/40 text-indigo-400 bg-indigo-500/8',
  delivered:  'border-emerald-500/40 text-emerald-400 bg-emerald-500/8',
  cancelled:  'border-red-500/40 text-red-400 bg-red-500/8',
  refunded:   'border-pearl-600/40 text-slate-500 bg-pearl-500/8',
};

const CANCELLABLE = ['pending', 'confirmed'];

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState({});
  const [reviewGem, setReviewGem] = useState(null);
  const [reviewed, setReviewed] = useState([]);

  const load = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await ordersAPI.getMyOrders(1, 50);
      setOrders(res.data?.data?.data || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) load();
  }, [authLoading, load]);

  const toggleExpand = async (order) => {
    if (expanded[order.id]) {
      setExpanded((e) => ({ ...e, [order.id]: undefined }));
      return;
    }
    try {
      const res = await ordersAPI.getById(order.id);
      setExpanded((e) => ({ ...e, [order.id]: res.data?.data || order }));
    } catch {
      setExpanded((e) => ({ ...e, [order.id]: order }));
    }
  };

  const cancel = async (order) => {
    try {
      await ordersAPI.cancel(order.id);
      toast('Order cancelled', 'success');
      load();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not cancel order.';
      toast(Array.isArray(msg) ? msg[0] : msg, 'error');
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200">
          <Package size={20} className="text-royal-600 flex-shrink-0" />
          <div>
            <p className="section-label mb-0.5">Account</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Orders</h1>
          </div>
        </header>

        {!user && !authLoading ? (
          <div className="luxury-card p-10 sm:p-12 text-center">
            <p className="text-sm text-slate-500 mb-5">Sign in to view your orders.</p>
            <Link href="/login" className="btn-gold">Sign In <ArrowRight size={14} /></Link>
          </div>
        ) : loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="luxury-card p-12 text-center">
            <Package size={32} className="text-royal-700 mx-auto mb-4" />
            <p className="text-lg font-bold text-slate-900 mb-2">No orders yet</p>
            <p className="text-sm text-slate-500 mb-6">Your acquisition history will appear here.</p>
            <Link href="/marketplace" className="btn-gold">
              Browse Gems <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const detail = expanded[order.id];
              return (
                <div key={order.id} className="luxury-card overflow-hidden">
                  <button
                    onClick={() => toggleExpand(order)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <div>
                      <p className="font-mono text-sm font-bold text-slate-800">{order.orderNumber}</p>
                      <p className="text-xs mt-0.5 text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm border capitalize ${STATUS_STYLES[order.status] || STATUS_STYLES.refunded}`}>
                        {order.status}
                      </span>
                      <span className="text-base font-bold text-gold-gradient">${Number(order.total).toLocaleString()}</span>
                      {detail ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                    </div>
                  </button>

                  {detail && (
                    <div className="px-4 sm:px-6 pb-5 border-t border-slate-200">
                      <div className="space-y-3 mt-4">
                        {(detail.items || []).map((it) => (
                          <div key={it.id} className="flex items-center justify-between gap-3 py-2 border-b border-slate-200 last:border-0">
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-800 truncate">
                                {it.gemSnapshot?.name || it.gem?.name || 'Gem'}
                              </p>
                              <p className="text-xs mt-0.5 text-slate-500">
                                Qty {it.quantity} · ${Number(it.unitPrice).toLocaleString()}
                              </p>
                            </div>
                            {order.status === 'delivered' && it.gem?.id && !reviewed.includes(it.gem.id) ? (
                              <button
                                onClick={() => setReviewGem({ id: it.gem.id, name: it.gemSnapshot?.name || it.gem?.name })}
                                className="btn-outline-gold text-[10px] py-1.5 px-3 flex items-center gap-1.5"
                              >
                                <Star size={11} /> Review
                              </button>
                            ) : reviewed.includes(it.gem?.id) ? (
                              <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">Reviewed ✓</span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                      {CANCELLABLE.includes(order.status) && (
                        <button
                          onClick={() => cancel(order)}
                          className="mt-4 text-[11px] font-semibold tracking-wider uppercase text-red-400 hover:text-red-300 transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {reviewGem && (
        <ReviewModal
          gem={reviewGem}
          onClose={() => setReviewGem(null)}
          onDone={(gemId) => setReviewed((r) => [...r, gemId])}
        />
      )}
    </main>
  );
}
