'use client';

import { useEffect, useState, useCallback } from 'react';
import { Gavel, Trash2 } from 'lucide-react';
import { auctionsAPI } from '@/lib/api';
import { Card, Badge, Spinner, EmptyState, PageHeader } from '@/components/ui';

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await auctionsAPI.getAll(1, 100);
      const d = res.data?.data;
      setAuctions(d?.data || d?.auctions || []);
    } catch {
      setError('Failed to load auctions. Is the backend API running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (auction) => {
    if (!confirm(`Delete auction "${auction.title}"?`)) return;
    setBusyId(auction.id);
    try {
      await auctionsAPI.remove(auction.id);
      setAuctions((prev) => prev.filter((a) => a.id !== auction.id));
    } catch {
      alert('Failed to delete auction (live auctions with bids cannot be removed).');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <PageHeader title="Auctions" subtitle="Manage live and scheduled auctions" />

      <Card className="overflow-hidden">
        {loading ? (
          <Spinner label="Loading auctions..." />
        ) : error ? (
          <EmptyState Icon={Gavel} title="Unable to load auctions" text={error} />
        ) : auctions.length === 0 ? (
          <EmptyState Icon={Gavel} title="No auctions yet" text="Auctions created through the API will appear here." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Current Bid</th>
                  <th className="px-5 py-3 font-medium">Bids</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Ends</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {auctions.map((a) => (
                  <tr key={a.id} className="border-b border-slate-800/50 last:border-0">
                    <td className="px-5 py-3 text-white">{a.title}</td>
                    <td className="px-5 py-3 text-white">${Number(a.currentBid || 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-slate-400">{a.totalBids || 0}</td>
                    <td className="px-5 py-3">
                      <Badge value={a.status} />
                    </td>
                    <td className="px-5 py-3 text-slate-400">
                      {a.endTime ? new Date(a.endTime).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => remove(a)}
                        disabled={busyId === a.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
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
