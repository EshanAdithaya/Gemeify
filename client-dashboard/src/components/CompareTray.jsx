'use client';

import { useState } from 'react';
import { X, GitCompare, Trash2 } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import OptimizedImage from '@/components/OptimizedImage';

const ATTRIBUTES = [
  ['Price',         (g) => `$${Number(g.price || 0).toLocaleString()}`],
  ['Category',      (g) => g.category || '—'],
  ['Weight',        (g) => (g.weight ? `${g.weight} ct` : '—')],
  ['Cut',           (g) => g.cut || '—'],
  ['Clarity',       (g) => g.clarity || '—'],
  ['Colour',        (g) => g.color || '—'],
  ['Origin',        (g) => g.origin || '—'],
  ['Treatment',     (g) => g.treatment || '—'],
  ['Certification', (g) => g.certification || '—'],
  ['Rating',        (g) => (g.rating ? Number(g.rating).toFixed(1) : '—')],
];

export default function CompareTray() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [open, setOpen] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Sticky tray */}
      <div className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 pointer-events-none">
        <div
          className="pointer-events-auto max-w-3xl mx-auto shadow-luxury border border-gold-900/30 backdrop-blur-xl p-3 flex items-center gap-3 rounded-sm"
          style={{ background: 'rgba(14,12,11,0.95)' }}
        >
          <div className="flex -space-x-2 flex-1 overflow-hidden">
            {compareList.map((g) => (
              <div key={g.id} className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-sm overflow-hidden ring-1 ring-gold-700/40">
                  <OptimizedImage
                    src={g.mainImage}
                    alt={g.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  onClick={() => removeFromCompare(g.id)}
                  aria-label={`Remove ${g.name}`}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-obsidian-900 border border-gold-900/40 text-pearl-400 hover:text-red-400 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={9} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="btn-gold text-[10px] py-2 px-4 flex items-center gap-2 whitespace-nowrap"
          >
            <GitCompare size={13} /> Compare ({compareList.length})
          </button>

          <button
            onClick={clearCompare}
            aria-label="Clear comparison"
            className="p-1.5 text-pearl-600 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Comparison modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="luxury-card w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold-900/25">
              <div className="flex items-center gap-3">
                <GitCompare size={16} className="text-gold-500" />
                <div>
                  <p className="section-label mb-0">Comparison</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close comparison"
                className="p-1.5 text-pearl-600 hover:text-gold-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-auto p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left pb-4 pr-6 w-32"></th>
                    {compareList.map((g) => (
                      <th key={g.id} className="pb-4 px-3 align-bottom min-w-[160px]">
                        <div className="w-full h-28 rounded-sm overflow-hidden border border-gold-900/20 mb-3">
                          <OptimizedImage
                            src={g.mainImage}
                            alt={g.name}
                            width={160}
                            height={112}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-bold text-pearl-100 text-left">
                          {g.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ATTRIBUTES.map(([label, accessor], i) => (
                    <tr key={label} className={`border-t border-gold-900/15 ${i % 2 === 0 ? 'bg-gold-950/5' : ''}`}>
                      <td className="py-2.5 pr-6 text-[10px] font-bold tracking-wider uppercase text-pearl-600">{label}</td>
                      {compareList.map((g) => (
                        <td key={g.id} className="py-2.5 px-3 text-center text-sm text-pearl-200">{accessor(g)}</td>
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
