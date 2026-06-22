'use client';

import { useState } from 'react';
import { X, GitCompare, Trash2 } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useTheme } from '@/context/ThemeContext';

const ATTRIBUTES = [
  ['Price', (g) => `$${Number(g.price || 0).toLocaleString()}`],
  ['Category', (g) => g.category || '—'],
  ['Weight', (g) => (g.weight ? `${g.weight} ct` : '—')],
  ['Cut', (g) => g.cut || '—'],
  ['Clarity', (g) => g.clarity || '—'],
  ['Color', (g) => g.color || '—'],
  ['Origin', (g) => g.origin || '—'],
  ['Treatment', (g) => g.treatment || '—'],
  ['Certification', (g) => g.certification || '—'],
  ['Rating', (g) => (g.rating ? Number(g.rating).toFixed(1) : '—')],
];

export default function CompareTray() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);

  if (compareList.length === 0) return null;

  const panel = isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900';

  return (
    <>
      {/* Sticky tray */}
      <div className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 pointer-events-none">
        <div
          className={`pointer-events-auto max-w-3xl mx-auto rounded-2xl shadow-2xl border ${
            isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-gray-200'
          } backdrop-blur p-3 flex items-center gap-3`}
        >
          <div className="flex -space-x-3 flex-1 overflow-hidden">
            {compareList.map((g) => (
              <div key={g.id} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.mainImage}
                  alt={g.name}
                  title={g.name}
                  className="w-12 h-12 rounded-lg object-cover ring-2 ring-purple-500"
                />
                <button
                  onClick={() => removeFromCompare(g.id)}
                  aria-label={`Remove ${g.name}`}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            <GitCompare size={18} /> Compare ({compareList.length})
          </button>
          <button
            onClick={clearCompare}
            aria-label="Clear comparison"
            className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Comparison modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div
            className={`${panel} rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-500/20">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <GitCompare size={22} /> Compare Gems
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close comparison">
                <X size={24} />
              </button>
            </div>
            <div className="overflow-x-auto p-5">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 w-32"></th>
                    {compareList.map((g) => (
                      <th key={g.id} className="p-2 align-bottom min-w-[140px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.mainImage} alt={g.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                        <div className="font-semibold">{g.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ATTRIBUTES.map(([label, accessor], i) => (
                    <tr key={label} className={i % 2 ? (isDarkMode ? 'bg-slate-700/30' : 'bg-gray-50') : ''}>
                      <td className="p-2 font-medium opacity-70">{label}</td>
                      {compareList.map((g) => (
                        <td key={g.id} className="p-2 text-center">{accessor(g)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
