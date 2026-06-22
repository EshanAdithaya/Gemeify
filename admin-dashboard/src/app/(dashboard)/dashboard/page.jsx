'use client';

import { useEffect, useState } from 'react';
import { Users, Gem, Gavel, Tags, AlertCircle } from 'lucide-react';
import { usersAPI, gemsAPI, auctionsAPI, categoriesAPI } from '@/lib/api';
import { StatCard, Card, Badge, Spinner, PageHeader } from '@/components/ui';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ users: 0, gems: 0, auctions: 0, categories: 0 });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, gemsRes, auctionsRes, categoriesRes] = await Promise.allSettled([
          usersAPI.getAll(1, 5),
          gemsAPI.getAll(1, 1),
          auctionsAPI.getAll(1, 1),
          categoriesAPI.getAll(),
        ]);

        const next = { users: 0, gems: 0, auctions: 0, categories: 0 };

        if (usersRes.status === 'fulfilled') {
          const d = usersRes.value.data?.data;
          next.users = d?.total ?? d?.data?.length ?? 0;
          setRecentUsers(d?.data || d?.users || []);
        }
        if (gemsRes.status === 'fulfilled') {
          const d = gemsRes.value.data?.data;
          next.gems = d?.total ?? 0;
        }
        if (auctionsRes.status === 'fulfilled') {
          const d = auctionsRes.value.data?.data;
          next.auctions = d?.total ?? d?.data?.length ?? 0;
        }
        if (categoriesRes.status === 'fulfilled') {
          const d = categoriesRes.value.data?.data ?? categoriesRes.value.data;
          next.categories = Array.isArray(d) ? d.length : d?.total ?? 0;
        }

        if ([usersRes, gemsRes, auctionsRes, categoriesRes].every((r) => r.status === 'rejected')) {
          setError('Could not reach the backend API. Check that the NestJS server is running.');
        }

        setStats(next);
      } catch {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Spinner label="Loading dashboard..." />;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your Gemify marketplace" />

      {error && (
        <Card className="p-4 mb-6 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard Icon={Users} label="Total Users" value={stats.users} accent="text-brand-400 bg-brand-500/10" />
        <StatCard Icon={Gem} label="Total Gems" value={stats.gems} accent="text-emerald-400 bg-emerald-500/10" />
        <StatCard Icon={Gavel} label="Auctions" value={stats.auctions} accent="text-blue-400 bg-blue-500/10" />
        <StatCard Icon={Tags} label="Categories" value={stats.categories} accent="text-pink-400 bg-pink-500/10" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <h2 className="font-semibold text-white">Recent Users</h2>
        </div>
        {recentUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No users to display.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-slate-800/50 last:border-0">
                    <td className="px-5 py-3 text-white">
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="px-5 py-3 text-slate-400">{u.email}</td>
                    <td className="px-5 py-3">
                      <Badge value={u.role} />
                    </td>
                    <td className="px-5 py-3">
                      <Badge value={u.status} />
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
