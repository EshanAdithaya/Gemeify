'use client';

import { useState } from 'react';
import { ShoppingBag, Heart, Share2, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

export default function GemActions({ gem, available }) {
  const { addItem } = useCart();
  const { wishlist, toggle } = useWishlist();
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [shared, setShared] = useState(false);

  const inWishlist = wishlist.includes(gem.id);

  const handleAdd = async () => {
    if (!available) return;
    setAdding(true);
    try {
      addItem({
        id: gem.id,
        name: gem.name,
        price: Number(gem.price),
        mainImage: gem.mainImage || (Array.isArray(gem.images) ? gem.images[0] : null),
        maxQuantity: gem.quantity,
      });
      toast('Added to cart', 'success');
    } finally {
      setAdding(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: gem.name, url: window.location.href });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-7">
      <button
        onClick={handleAdd}
        disabled={!available || adding}
        className="btn-gold w-full flex items-center justify-center gap-2.5 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ShoppingBag size={16} />
        {available ? 'Acquire This Gem' : 'Unavailable'}
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => toggle(gem)}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`flex-1 btn-outline-gold py-2.5 flex items-center justify-center gap-2 text-sm ${
            inWishlist ? 'border-gold-500/60 text-gold-400' : ''
          }`}
        >
          <Heart size={15} className={inWishlist ? 'fill-gold-500/60' : ''} />
          {inWishlist ? 'Saved' : 'Save'}
        </button>
        <button
          onClick={handleShare}
          aria-label="Share"
          className="btn-outline-gold py-2.5 px-4 flex items-center justify-center"
        >
          {shared ? <CheckCircle size={15} className="text-emerald-400" /> : <Share2 size={15} />}
        </button>
      </div>
    </div>
  );
}
