'use client';

import { Clock } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useTheme } from '@/context/ThemeContext';

export default function RecentlyViewed({ onSelect }) {
  const { recentlyViewed } = useCompare();
  const { isDarkMode } = useTheme();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl p-4 mb-6`}>
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} className="text-purple-400" />
        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recently viewed</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {recentlyViewed.map((gem) => (
          <button
            key={gem.id}
            onClick={() => onSelect?.(gem)}
            className="flex-shrink-0 w-28 text-left group"
            title={gem.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gem.mainImage}
              alt={gem.name}
              className="w-28 h-20 object-cover rounded-lg group-hover:ring-2 ring-purple-500 transition"
            />
            <p className={`mt-1 text-xs truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{gem.name}</p>
            <p className="text-xs text-purple-400">${Number(gem.price || 0).toLocaleString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
