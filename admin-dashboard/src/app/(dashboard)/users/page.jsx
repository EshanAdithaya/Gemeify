'use client';

import { useEffect, useState, useCallback } from 'react';
import { Users, Ban, CheckCircle, Trash2, Search } from 'lucide-react';
import { usersAPI } from '@/lib/api';
import { Card, Badge, Spinner, EmptyState, PageHeader } from '@/components/ui';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await usersAPI.getAll(1, 100);
      const d = res.data?.data;
      setUsers(d?.data || d?.users || []);
    } catch (err) {
      setError(
        err.response?.status === 403
          ? 'Your account is not authorized to manage users (Super Admin required).'
          : 'Failed to load users. Is the backend API running?'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (user, status) => {
    setBusyId(user.id);
    try {
      await usersAPI.updateStatus(user.id, status);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status } : u)));
    } catch {
      alert('Failed to update user status.');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (user) => {
    if (!confirm(`Delete ${user.firstName} ${user.lastName}? This cannot be undone.`)) return;
    setBusyId(user.id);
    try {
      await usersAPI.remove(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch {
      alert('Failed to delete user.');
    } finally {
      setBusyId(null);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <PageHeader title="Users" subtitle="Manage customer and administrator accounts" />

      <div className="relative mb-4 max-w-sm">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500" />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Spinner label="Loading users..." />
        ) : error ? (
          <EmptyState Icon={Users} title="Unable to load users" text={error} />
        ) : filtered.length === 0 ? (
          <EmptyState Icon={Users} title="No users found" text="Try a different search term." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => {
                  const banned = u.status === 'banned';
                  return (
                    <tr key={u.id} className="border-b border-slate-800/50 last:border-0">
                      <td className="px-5 py-3 text-white whitespace-nowrap">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="px-5 py-3 text-slate-400">{u.email}</td>
                      <td className="px-5 py-3">
                        <Badge value={u.role} />
                      </td>
                      <td className="px-5 py-3">
                        <Badge value={u.status} />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {banned ? (
                            <button
                              onClick={() => setStatus(u, 'active')}
                              disabled={busyId === u.id}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs bg-green-500/10 text-green-400 hover:bg-green-500/20 disabled:opacity-50"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Unban
                            </button>
                          ) : (
                            <button
                              onClick={() => setStatus(u, 'banned')}
                              disabled={busyId === u.id}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 disabled:opacity-50"
                            >
                              <Ban className="w-4 h-4" />
                              Ban
                            </button>
                          )}
                          <button
                            onClick={() => remove(u)}
                            disabled={busyId === u.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
