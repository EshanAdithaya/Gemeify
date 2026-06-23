'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { wishlistAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [ids, setIds] = useState([]); // gem ids saved by the current user
  const [busy, setBusy] = useState(false);

  // Hydrate from the backend whenever the auth state changes.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) {
        setIds([]);
        return;
      }
      try {
        const res = await wishlistAPI.getMyWishlist();
        const items = res.data?.data?.data || [];
        if (!cancelled) setIds(items.map((it) => it.gem?.id).filter(Boolean));
      } catch {
        if (!cancelled) setIds([]);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const has = useCallback((gemId) => ids.includes(gemId), [ids]);

  const toggle = useCallback(
    async (gem) => {
      if (!user) {
        toast('Sign in to save gems to your wishlist', 'info');
        router.push('/login');
        return;
      }
      if (busy) return;
      const saved = ids.includes(gem.id);
      setBusy(true);
      // Optimistic update
      setIds((prev) => (saved ? prev.filter((i) => i !== gem.id) : [...prev, gem.id]));
      try {
        if (saved) {
          await wishlistAPI.remove(gem.id);
          toast(`Removed ${gem.name || 'gem'} from wishlist`, 'success');
        } else {
          await wishlistAPI.add(gem.id);
          toast(`Saved ${gem.name || 'gem'} to wishlist`, 'success');
        }
      } catch {
        // Roll back on failure
        setIds((prev) => (saved ? [...prev, gem.id] : prev.filter((i) => i !== gem.id)));
        toast('Could not update wishlist. Please try again.', 'error');
      } finally {
        setBusy(false);
      }
    },
    [user, busy, ids, toast, router],
  );

  return (
    <WishlistContext.Provider value={{ ids, count: ids.length, has, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
