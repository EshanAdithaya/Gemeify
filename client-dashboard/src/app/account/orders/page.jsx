'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Package, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { ordersAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useTheme } from '@/context/ThemeContext';
import { Skeleton } from '@/components/Skeleton';
import Button from '@/components/ui/Button';
import ReviewModal from '@/components/ReviewModal';

const STATUS_COLORS = {
  pending: 'bg-amber-500/15 text-amber-400',
  confirmed: 'bg-blue-500/15 text-blue-400',
  processing: 'bg-blue-500/15 text-blue-400',
  shipped: 'bg-indigo-500/15 text-indigo-400',
  delivered: 'bg-emerald-500/15 text-emerald-400',
  cancelled: 'bg-red-500/15 text-red-400',
  refunded: 'bg-slate-500/15 text-slate-400',
};

const CANCELLABLE = ['pending', 'confirmed'];

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { isDarkMode } = useTheme();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // orderId -> detail
  const [reviewGem, setReviewGem] = useState(null);
  const [reviewed, setReviewed] = useState([]);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
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
      toast('Order cancelled and stock released', 'success');
      load();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not cancel order.';
      toast(Array.isArray(msg) ? msg[0] : msg, 'error');
    }
  };

  const card = isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg';
  const text = isDarkMode ? 'text-white' : 'text-gray-900';
  const muted = isDarkMode ? 'text-slate-400' : 'text-gray-600';

  return (
    <main className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-3 mb-8">
          <Package className="text-brand-400" />
          <h1 className={`text-3xl font-bold ${text}`}>My Orders</h1>
        </header>

        {!user && !authLoading ? (
          <div className={`${card} rounded-xl p-10 text-center`}>
            <p className={muted}>Sign in to view your orders.</p>
            <Link href="/login" className="inline-block mt-4"><Button>Sign In</Button></Link>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className={`${card} rounded-xl p-10 text-center`}>
            <p className={muted}>You haven’t placed any orders yet.</p>
            <Link href="/marketplace" className="inline-block mt-4"><Button>Browse Gems</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const detail = expanded[order.id];
              return (
                <div key={order.id} className={`${card} rounded-xl overflow-hidden`}>
                  <button onClick={() => toggleExpand(order)} className="w-full p-5 flex items-center justify-between text-left">
                    <div>
                      <p className={`font-mono text-sm ${text}`}>{order.orderNumber}</p>
                      <p className={`text-xs ${muted}`}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || STATUS_COLORS.refunded}`}>
                        {order.status}
                      </span>
                      <span className={`font-bold ${text}`}>${Number(order.total).toLocaleString()}</span>
                      {detail ? <ChevronUp size={18} className={muted} /> : <ChevronDown size={18} className={muted} />}
                    </div>
                  </button>

                  {detail && (
                    <div className={`px-5 pb-5 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                      <div className="space-y-3 mt-4">
                        {(detail.items || []).map((it) => (
                          <div key={it.id} className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className={`text-sm truncate ${text}`}>{it.gemSnapshot?.name || it.gem?.name || 'Gem'}</p>
                              <p className={`text-xs ${muted}`}>Qty {it.quantity} · ${Number(it.unitPrice).toLocaleString()}</p>
                            </div>
                            {order.status === 'delivered' && (it.gem?.id) && !reviewed.includes(it.gem.id) && (
                              <Button
                                size="sm"
                                variant="outline"
                                Icon={Star}
                                onClick={() => setReviewGem({ id: it.gem.id, name: it.gemSnapshot?.name || it.gem?.name })}
                              >
                                Review
                              </Button>
                            )}
                            {reviewed.includes(it.gem?.id) && (
                              <span className="text-xs text-emerald-400">Reviewed ✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                      {CANCELLABLE.includes(order.status) && (
                        <div className="mt-4">
                          <Button size="sm" variant="danger" onClick={() => cancel(order)}>Cancel Order</Button>
                        </div>
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
