'use client';

import { Clock } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import OptimizedImage from '@/components/OptimizedImage';

export default function RecentlyViewed({ onSelect }) {
  const { recentlyViewed } = useCompare();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="luxury-card p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={14} className="text-royal-700" />
        <p className="section-label mb-0">Recently Viewed</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
        {recentlyViewed.map((gem) => (
          <button
            key={gem.id}
            onClick={() => onSelect?.(gem)}
            className="flex-shrink-0 w-28 text-left group"
            title={gem.name}
          >
            <div className="w-28 h-20 rounded-sm overflow-hidden border border-slate-200 group-hover:border-royal-300 transition-colors mb-1.5">
              <OptimizedImage
                src={gem.mainImage}
                alt={gem.name}
                width={112}
                height={80}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs text-slate-600 truncate leading-tight">{gem.name}</p>
            <p className="text-[11px] font-semibold text-royal-600 mt-0.5">
              ${Number(gem.price || 0).toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
