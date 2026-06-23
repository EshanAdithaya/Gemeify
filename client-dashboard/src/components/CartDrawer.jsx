'use client';

import Link from 'next/link';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import OptimizedImage from '@/components/OptimizedImage';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, updateQty, removeItem } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-slate-900 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag size={20} /> Your Cart
          </h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-slate-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <ShoppingBag size={40} className="text-slate-600 mb-3" />
            <p className="text-slate-400">Your cart is empty.</p>
            <Link href="/marketplace" onClick={() => setOpen(false)} className="mt-4">
              <Button>Browse Gems</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <OptimizedImage src={i.mainImage} alt={i.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{i.name}</p>
                    <p className="text-brand-400 font-semibold">${i.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(i.id, i.quantity - 1)}
                        className="p-1 rounded bg-slate-800 text-white disabled:opacity-30"
                        disabled={i.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white w-6 text-center">{i.quantity}</span>
                      <button
                        onClick={() => updateQty(i.id, i.quantity + 1)}
                        className="p-1 rounded bg-slate-800 text-white disabled:opacity-30"
                        disabled={i.quantity >= (i.maxQuantity ?? 99)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(i.id)}
                        className="ml-auto p-1 text-slate-400 hover:text-red-400"
                        aria-label={`Remove ${i.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-slate-800">
              <div className="flex justify-between text-white mb-4">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-xl font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <Link href="/checkout" onClick={() => setOpen(false)}>
                <Button className="w-full" size="lg">Proceed to Checkout</Button>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
