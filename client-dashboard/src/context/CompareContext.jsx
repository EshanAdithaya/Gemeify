'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CompareContext = createContext(null);

const MAX_COMPARE = 4;
const MAX_RECENT = 8;
const COMPARE_KEY = 'gemify:compare';
const RECENT_KEY = 'gemify:recentlyViewed';

function readStore(key) {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    setCompareList(readStore(COMPARE_KEY));
    setRecentlyViewed(readStore(RECENT_KEY));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
    }
  }, [compareList]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed]);

  const isComparing = useCallback(
    (id) => compareList.some((g) => g.id === id),
    [compareList],
  );

  const toggleCompare = useCallback((gem) => {
    setCompareList((prev) => {
      if (prev.some((g) => g.id === gem.id)) {
        return prev.filter((g) => g.id !== gem.id);
      }
      if (prev.length >= MAX_COMPARE) return prev; // capped
      return [...prev, gem];
    });
  }, []);

  const removeFromCompare = useCallback((id) => {
    setCompareList((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareList([]), []);

  const recordView = useCallback((gem) => {
    if (!gem?.id) return;
    setRecentlyViewed((prev) => {
      const next = [gem, ...prev.filter((g) => g.id !== gem.id)];
      return next.slice(0, MAX_RECENT);
    });
  }, []);

  const value = {
    compareList,
    recentlyViewed,
    isComparing,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    recordView,
    maxCompare: MAX_COMPARE,
    canAddMore: compareList.length < MAX_COMPARE,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return ctx;
}
