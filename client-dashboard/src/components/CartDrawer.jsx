'use client';

import Link from 'next/link';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import OptimizedImage from '@/components/OptimizedImage';

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, updateQty, removeItem } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-white border-l border-slate-200 shadow-card transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-royal-600" />
            <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-800">
              Cart {items.length > 0 && <span className="text-royal-600 ml-1">({items.length})</span>}
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
            <div className="w-16 h-16 rounded-lg border border-royal-100 bg-royal-50 flex items-center justify-center">
              <ShoppingBag size={26} className="text-royal-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800 mb-1">
                Your cart is empty
              </p>
              <p className="text-slate-500 text-sm">Discover exceptional gems in our collection</p>
            </div>
            <Link href="/marketplace" onClick={() => setOpen(false)} className="btn-gold">
              Browse Collection <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="luxury-card p-3 flex gap-3">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <OptimizedImage
                      src={item.mainImage}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 text-sm font-medium truncate mb-0.5">{item.name}</p>
                    <p className="text-base text-royal-700 font-bold">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-royal-600 hover:border-royal-300 disabled:opacity-30 transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-slate-700 text-sm w-5 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.maxQuantity ?? 99)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-royal-600 hover:border-royal-300 disabled:opacity-30 transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="ml-auto p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50">
              <div className="flex justify-between items-end mb-5">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mb-0.5">Subtotal</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${subtotal.toLocaleString()}
                  </p>
                </div>
                <p className="text-[10px] text-slate-400">Excl. shipping</p>
              </div>
              <Link href="/checkout" onClick={() => setOpen(false)} className="btn-gold w-full text-center">
                Proceed to Checkout <ArrowRight size={15} />
              </Link>
              <p className="text-center text-[10px] text-slate-400 mt-3 tracking-wider uppercase">
                Insured · Discreet Packaging · Free Global Shipping
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
