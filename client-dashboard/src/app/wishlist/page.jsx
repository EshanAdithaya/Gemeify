'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { wishlistAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import OptimizedImage from '@/components/OptimizedImage';
import { GemGridSkeleton } from '@/components/Skeleton';

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { toggle } = useWishlist();
  const { isDarkMode } = useTheme();
  const [items, setItems]   = useState([]);
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

  const dark    = isDarkMode;
  const pageBg  = dark ? 'bg-obsidian-950' : 'bg-pearl-100';
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';
  const head    = dark ? 'text-pearl-50'  : 'text-obsidian-900';

  return (
    <main className={`min-h-screen ${pageBg} pt-28 pb-16 px-6 lg:px-8`}>
      <div className="max-w-6xl mx-auto">
        <header className={`flex items-center gap-3 mb-10 pb-6 border-b ${divider}`}>
          <Heart size={20} className="text-gold-500 fill-gold-500/30" />
          <div>
            <p className="section-label mb-0.5">Private</p>
            <h1 className={`font-display text-3xl font-light ${head}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
              My Wishlist
            </h1>
          </div>
        </header>

        {!user && !authLoading ? (
          <div className="luxury-card p-12 text-center">
            <p className={`text-sm mb-5 ${subText}`}>Sign in to view your saved gems.</p>
            <Link href="/login" className="btn-gold">Sign In <ArrowRight size={14} /></Link>
          </div>
        ) : loading ? (
          <GemGridSkeleton count={3} />
        ) : items.length === 0 ? (
          <div className="luxury-card p-12 text-center">
            <Heart size={32} className="text-gold-700 mx-auto mb-4" />
            <p className={`font-display text-xl font-light mb-2 ${head}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
              Your wishlist is empty
            </p>
            <p className={`text-sm mb-6 ${subText}`}>Save extraordinary gems for later consideration.</p>
            <Link href="/marketplace" className="btn-gold">
              Browse Collection <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 to-transparent" />
                  </Link>
                  <div className="p-5">
                    <h3 className={`font-display text-lg font-medium mb-1 ${head}`}
                      style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                      {gem.name}
                    </h3>
                    <p className="font-display text-xl text-gold-gradient font-semibold mb-4"
                      style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                      ${Number(gem.price || 0).toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Link href={gem.slug ? `/gems/${gem.slug}` : '/marketplace'} className="flex-1 btn-gold text-xs py-2">
                        View Details <ArrowRight size={12} />
                      </Link>
                      <button
                        onClick={() => handleRemove(gem)}
                        aria-label="Remove from wishlist"
                        className={`p-2 rounded-sm border transition-colors ${
                          dark
                            ? 'border-gold-900/30 text-pearl-500 hover:text-red-400 hover:border-red-500/30'
                            : 'border-gold-700/20 text-obsidian-400 hover:text-red-500 hover:border-red-500/30'
                        }`}
                      >
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
