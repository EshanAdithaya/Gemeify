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
        className={`fixed inset-0 z-[60] bg-obsidian-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-obsidian-950 border-l border-gold-900/30 shadow-luxury transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold-900/25">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-gold-500" />
            <h2 className="text-sm font-semibold tracking-widest uppercase text-pearl-100">
              Cart {items.length > 0 && <span className="text-gold-500 ml-1">({items.length})</span>}
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="p-1.5 text-pearl-500 hover:text-gold-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
            <div className="w-16 h-16 rounded-sm border border-gold-900/30 flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.06)' }}>
              <ShoppingBag size={26} className="text-gold-700" />
            </div>
            <div>
              <p className="text-lg font-bold text-pearl-200 mb-1">
                Your cart is empty
              </p>
              <p className="text-pearl-500 text-sm">Discover exceptional gems in our collection</p>
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
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden flex-shrink-0">
                    <OptimizedImage
                      src={item.mainImage}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-pearl-100 text-sm font-medium truncate mb-0.5">{item.name}</p>
                    <p className="text-base text-gold-gradient font-bold">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-sm border border-gold-900/40 flex items-center justify-center text-pearl-400 hover:text-gold-400 hover:border-gold-600/50 disabled:opacity-30 transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-pearl-200 text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.maxQuantity ?? 99)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 rounded-sm border border-gold-900/40 flex items-center justify-center text-pearl-400 hover:text-gold-400 hover:border-gold-600/50 disabled:opacity-30 transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="ml-auto p-1 text-pearl-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-gold-900/25">
              <div className="flex justify-between items-end mb-5">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-pearl-500 mb-0.5">Subtotal</p>
                  <p className="text-2xl font-bold text-gold-gradient">
                    ${subtotal.toLocaleString()}
                  </p>
                </div>
                <p className="text-[10px] text-pearl-600">Excl. shipping</p>
              </div>
              <Link href="/checkout" onClick={() => setOpen(false)} className="btn-gold w-full text-center">
                Proceed to Checkout <ArrowRight size={15} />
              </Link>
              <p className="text-center text-[10px] text-pearl-600 mt-3 tracking-wider uppercase">
                Insured · Discreet Packaging · Free Global Shipping
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
