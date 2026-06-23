'use client';

import { useEffect, useState, useCallback } from 'react';
import { Gem, Check, X, Clock, CheckCircle2, XCircle, Layers } from 'lucide-react';
import { gemsAPI } from '@/lib/api';
import { Card, Badge, Spinner, EmptyState, PageHeader, StatCard } from '@/components/ui';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=200&q=60';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

export default function GemsPage() {
  const [gems, setGems] = useState([]);
  const [stats, setStats] = useState(null);
  const [tab, setTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await gemsAPI.getAll(1, 100, tab);
      setGems(res.data?.data?.data || []);
    } catch {
      setError('Failed to load gems. Is the backend API running?');
    } finally {
      setLoading(false);
    }
  }, [tab]);

  const loadStats = useCallback(async () => {
    try {
      const res = await gemsAPI.getStats();
      setStats(res.data?.data || null);
    } catch {
      /* stats are best-effort */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const refresh = () => {
    load();
    loadStats();
  };

  const handleApprove = async (id) => {
    setBusyId(id);
    try {
      await gemsAPI.approve(id);
      refresh();
    } catch {
      setError('Could not approve gem.');
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Reason for rejection (optional):') ?? undefined;
    setBusyId(id);
    try {
      await gemsAPI.reject(id, reason);
      refresh();
    } catch {
      setError('Could not reject gem.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <PageHeader title="Gems" subtitle="Review and moderate listed gemstones" />

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard Icon={Layers} label="Total" value={stats.total} />
          <StatCard Icon={Clock} label="Pending" value={stats.pending} accent="text-amber-400 bg-amber-500/10" />
          <StatCard Icon={CheckCircle2} label="Approved" value={stats.approved} accent="text-emerald-400 bg-emerald-500/10" />
          <StatCard Icon={XCircle} label="Sold" value={stats.sold} accent="text-purple-400 bg-purple-500/10" />
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-brand-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Spinner label="Loading gems..." />
        ) : error ? (
          <EmptyState Icon={Gem} title="Unable to load gems" text={error} />
        ) : gems.length === 0 ? (
          <EmptyState Icon={Gem} title="Nothing here" text={`No ${tab === 'all' ? '' : tab + ' '}gems found.`} />
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
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
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
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(g.id)}
                          disabled={busyId === g.id || g.status === 'approved'}
                          title="Approve"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Check size={15} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(g.id)}
                          disabled={busyId === g.id || g.status === 'rejected'}
                          title="Reject"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <X size={15} /> Reject
                        </button>
                      </div>
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
