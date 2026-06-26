'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { wishlistAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import OptimizedImage from '@/components/OptimizedImage';
import { GemGridSkeleton } from '@/components/Skeleton';

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { toggle } = useWishlist();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!user) { setLoading(false); return; }
      setLoading(true);
      try {
        const res = await wishlistAPI.getMyWishlist();
        if (active) setItems(res.data?.data?.data || []);
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    if (!authLoading) load();
    return () => { active = false; };
  }, [user, authLoading]);

  const handleRemove = async (gem) => {
    await toggle(gem);
    setItems((prev) => prev.filter((it) => it.gem?.id !== gem.id));
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200">
          <Heart size={20} className="text-royal-600 fill-gold-500/30 flex-shrink-0" />
          <div>
            <p className="section-label mb-0.5">Private</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Wishlist</h1>
          </div>
        </header>

        {!user && !authLoading ? (
          <div className="luxury-card p-10 sm:p-12 text-center">
            <p className="text-sm text-slate-500 mb-5">Sign in to view your saved gems.</p>
            <Link href="/login" className="btn-gold inline-flex items-center gap-2">Sign In <ArrowRight size={14} /></Link>
          </div>
        ) : loading ? (
          <GemGridSkeleton count={3} />
        ) : items.length === 0 ? (
          <div className="luxury-card p-10 sm:p-12 text-center">
            <Heart size={32} className="text-royal-700 mx-auto mb-4" />
            <p className="text-lg font-bold text-slate-900 mb-2">Your wishlist is empty</p>
            <p className="text-sm text-slate-500 mb-6">Save extraordinary gems for later consideration.</p>
            <Link href="/marketplace" className="btn-gold inline-flex items-center gap-2">
              Browse Collection <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {items.map((it) => {
              const gem = it.gem;
              if (!gem) return null;
              const img = gem.mainImage || (Array.isArray(gem.images) ? gem.images[0] : null);
              return (
                <div key={it.id} className="luxury-card overflow-hidden group">
                  <Link href={gem.slug ? `/gems/${gem.slug}` : '/marketplace'}
                    className="block relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={img}
                      alt={gem.name}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 to-transparent" />
                  </Link>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base font-bold text-slate-800 mb-1 leading-snug">{gem.name}</h3>
                    <p className="text-xl font-bold text-gold-gradient mb-4">
                      ${Number(gem.price || 0).toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Link href={gem.slug ? `/gems/${gem.slug}` : '/marketplace'}
                        className="flex-1 btn-gold text-xs py-2.5 justify-center">
                        View Details <ArrowRight size={12} />
                      </Link>
                      <button
                        onClick={() => handleRemove(gem)}
                        aria-label="Remove from wishlist"
                        className="p-2.5 rounded-sm border border-slate-200 text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
