'use client';

import { useState } from 'react';
import { X, Heart, Star, Shield, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import OptimizedImage from '@/components/OptimizedImage';

export default function GemDetailModal({ gem, isOpen, onClose }) {
  const { addItem }          = useCart();
  const { wishlist, toggle } = useWishlist();
  const { toast }            = useToast();
  const [imgIdx, setImgIdx]  = useState(0);
  const [adding, setAdding]  = useState(false);

  const allImages = [gem.mainImage, ...(gem.additionalImages || gem.images || [])].filter(Boolean);
  const inWishlist = wishlist.includes(gem.id);
  const price = Number(gem.price || 0);
  const available = gem.status === 'approved' && (gem.quantity ?? 1) > 0;

  const next = () => setImgIdx((i) => (i + 1) % allImages.length);
  const prev = () => setImgIdx((i) => (i - 1 + allImages.length) % allImages.length);

  const handleAdd = async () => {
    setAdding(true);
    try {
      addItem({ id: gem.id, name: gem.name, price, mainImage: allImages[0], maxQuantity: gem.quantity });
      toast('Added to cart', 'success');
    } finally {
      setAdding(false);
    }
  };

  if (!isOpen) return null;

  const specs = [
    ['Weight',  gem.weight  ? `${gem.weight} ct` : '—'],
    ['Cut',     gem.cut     || '—'],
    ['Colour',  gem.color   || '—'],
    ['Clarity', gem.clarity || '—'],
    ['Origin',  gem.origin  || '—'],
    ['Treatment', gem.treatment || '—'],
  ];

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl luxury-card overflow-hidden shadow-luxury">

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 p-2 border border-gold-900/30 text-pearl-500 hover:text-gold-400 hover:border-gold-700/50 transition-colors rounded-sm"
            style={{ background: 'rgba(14,12,11,0.8)' }}
          >
            <X size={16} />
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* ── Image column ── */}
            <div className="lg:w-1/2 relative bg-obsidian-900">
              <div className="relative h-[320px] lg:h-[520px]">
                <OptimizedImage
                  src={allImages[imgIdx] || null}
                  alt={gem.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/40 to-transparent" />

                {/* Certification watermark */}
                {gem.certificationLab && (
                  <div className="absolute top-3 left-3 px-2 py-1 text-[9px] font-bold tracking-widest uppercase border border-gold-500/40 text-gold-400"
                    style={{ background: 'rgba(14,12,11,0.75)', backdropFilter: 'blur(8px)' }}>
                    {gem.certificationLab} Certified
                  </div>
                )}

                {/* Image nav */}
                {allImages.length > 1 && (
                  <>
                    <button onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 border border-gold-900/40 text-pearl-300 hover:text-gold-400 transition-colors rounded-sm"
                      style={{ background: 'rgba(14,12,11,0.7)' }}>
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 border border-gold-900/40 text-pearl-300 hover:text-gold-400 transition-colors rounded-sm"
                      style={{ background: 'rgba(14,12,11,0.7)' }}>
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button key={i} onClick={() => setImgIdx(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? 'bg-gold-500' : 'bg-pearl-700'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Details column ── */}
            <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto max-h-[520px]">
              {/* Category + wishlist */}
              <div className="flex items-start justify-between mb-3">
                {gem.category?.name && (
                  <p className="section-label">{gem.category.name}</p>
                )}
                <button
                  onClick={() => toggle(gem)}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-1.5 border rounded-sm transition-colors flex-shrink-0 ml-3 ${
                    inWishlist
                      ? 'border-gold-700/50 text-gold-400'
                      : 'border-gold-900/30 text-pearl-600 hover:text-gold-400 hover:border-gold-700/40'
                  }`}
                >
                  <Heart size={15} className={inWishlist ? 'fill-gold-500/50' : ''} />
                </button>
              </div>

              <h2 className="font-display text-3xl font-light text-pearl-50 mb-2"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                {gem.name}
              </h2>

              {/* Rating */}
              {gem.rating && (
                <div className="flex items-center gap-1.5 mb-4">
                  {[1,2,3,4,5].map((n) => (
                    <Star key={n} size={12}
                      className={n <= Math.round(gem.rating) ? 'text-gold-500 fill-gold-500' : 'text-pearl-700'} />
                  ))}
                  <span className="text-xs text-pearl-500 ml-1">{Number(gem.rating).toFixed(1)}</span>
                </div>
              )}

              {/* Price */}
              <p className="font-display text-3xl font-semibold text-gold-gradient mb-1"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                ${price.toLocaleString()}
              </p>
              <p className={`text-[10px] font-bold tracking-widest uppercase mb-5 ${available ? 'text-emerald-400' : 'text-amber-500'}`}>
                {available ? '● Available' : '○ Unavailable'}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {specs.map(([l, v]) => (
                  <div key={l}>
                    <p className="text-[9px] font-bold tracking-wider uppercase text-pearl-600 mb-0.5">{l}</p>
                    <p className="text-sm text-pearl-100">{v}</p>
                  </div>
                ))}
              </div>

              {/* Certification */}
              {gem.certificationLab && (
                <div className="flex items-center gap-2 mb-5 px-3 py-2 border border-gold-900/20 rounded-sm"
                  style={{ background: 'rgba(212,175,55,0.04)' }}>
                  <Shield size={13} className="text-gold-600 flex-shrink-0" />
                  <p className="text-xs text-pearl-300">{gem.certificationLab} Certified{gem.certificationNumber ? ` · #${gem.certificationNumber}` : ''}</p>
                </div>
              )}

              {/* Description */}
              {gem.description && (
                <p className="text-sm text-pearl-400 leading-relaxed mb-5 line-clamp-3">{gem.description}</p>
              )}

              {/* CTAs */}
              <div className="space-y-2">
                <button
                  onClick={handleAdd}
                  disabled={!available || adding}
                  className="btn-gold w-full py-3 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={14} />
                  {available ? 'Add to Cart' : 'Unavailable'}
                </button>
                {gem.slug && (
                  <Link href={`/gems/${gem.slug}`} onClick={onClose}
                    className="btn-outline-gold w-full py-2.5 flex items-center justify-center gap-2 text-xs">
                    Full Details <ArrowRight size={12} />
                  </Link>
                )}
              </div>

              {/* Trust */}
              <div className="flex gap-4 mt-5 pt-4 border-t border-gold-900/15">
                {['Insured Shipping', 'Authenticity Guaranteed'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <Shield size={11} className="text-gold-700 flex-shrink-0" />
                    <span className="text-[10px] text-pearl-600">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
