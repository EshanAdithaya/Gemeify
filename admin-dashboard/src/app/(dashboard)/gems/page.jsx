'use client';

import { useEffect, useState, useCallback } from 'react';
import { Gem } from 'lucide-react';
import { gemsAPI } from '@/lib/api';
import { Card, Badge, Spinner, EmptyState, PageHeader } from '@/components/ui';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=200&q=60';

export default function GemsPage() {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await gemsAPI.getAll(1, 100);
      setGems(res.data?.data?.data || []);
    } catch {
      setError('Failed to load gems. Is the backend API running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <PageHeader title="Gems" subtitle="Inventory of listed gemstones" />

      <Card className="overflow-hidden">
        {loading ? (
          <Spinner label="Loading gems..." />
        ) : error ? (
          <EmptyState Icon={Gem} title="Unable to load gems" text={error} />
        ) : gems.length === 0 ? (
          <EmptyState Icon={Gem} title="No gems yet" text="Gems added through the API will appear here." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="px-5 py-3 font-medium">Gem</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Weight</th>
                  <th className="px-5 py-3 font-medium">Cert.</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {gems.map((g) => (
                  <tr key={g.id} className="border-b border-slate-800/50 last:border-0">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={g.mainImage || (Array.isArray(g.images) ? g.images[0] : null) || FALLBACK_IMG}
                          alt={g.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-700"
                        />
                        <span className="text-white font-medium">{g.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-400">{g.category?.name || '—'}</td>
                    <td className="px-5 py-3 text-white">${Number(g.price || 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-slate-400">{g.weight ? `${g.weight} ct` : '—'}</td>
                    <td className="px-5 py-3 text-slate-400">{g.certificationLab || '—'}</td>
                    <td className="px-5 py-3">
                      <Badge value={g.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
