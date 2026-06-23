'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import { wishlistAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import OptimizedImage from '@/components/OptimizedImage';
import { GemGridSkeleton } from '@/components/Skeleton';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { toggle } = useWishlist();
  const { isDarkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!user) {
        setLoading(false);
        return;
      }
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
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  const handleRemove = async (gem) => {
    await toggle(gem);
    setItems((prev) => prev.filter((it) => it.gem?.id !== gem.id));
  };

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-gray-600';

  return (
    <main className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Wishlist</h1>
        </header>

        {!user && !authLoading ? (
          <div className={`text-center py-16 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'}`}>
            <p className={textMuted}>Sign in to view your saved gems.</p>
            <Link href="/login" className="inline-block mt-4">
              <Button>Sign In</Button>
            </Link>
          </div>
        ) : loading ? (
          <GemGridSkeleton count={3} />
        ) : items.length === 0 ? (
          <div className={`text-center py-16 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'}`}>
            <p className={textMuted}>Your wishlist is empty.</p>
            <Link href="/marketplace" className="inline-block mt-4">
              <Button>Browse the Marketplace</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => {
              const gem = it.gem;
              if (!gem) return null;
              const img = gem.mainImage || (Array.isArray(gem.images) ? gem.images[0] : null);
              return (
                <div key={it.id} className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl overflow-hidden`}>
                  <Link href={gem.slug ? `/gems/${gem.slug}` : '/marketplace'} className="block relative h-44">
                    <OptimizedImage src={img} alt={gem.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  </Link>
                  <div className="p-4">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{gem.name}</h3>
                    <p className="text-brand-400 font-bold mt-1">${Number(gem.price || 0).toLocaleString()}</p>
                    <div className="flex gap-2 mt-3">
                      <Link href={gem.slug ? `/gems/${gem.slug}` : '/marketplace'} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">View</Button>
                      </Link>
                      <Button variant="danger" size="sm" Icon={Trash2} onClick={() => handleRemove(gem)} aria-label="Remove">
                        Remove
                      </Button>
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
