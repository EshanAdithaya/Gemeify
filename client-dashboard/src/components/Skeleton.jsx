'use client';

import { useTheme } from '@/context/ThemeContext';

export function Skeleton({ className = '' }) {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`animate-pulse rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-200'} ${className}`}
    />
  );
}

// Card-shaped placeholder used while the gem grid loads.
export function GemCardSkeleton() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl overflow-hidden`}>
      <Skeleton className="w-full h-48 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-5 w-2/3" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

export function GemGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <GemCardSkeleton key={i} />
      ))}
    </div>
  );
}
