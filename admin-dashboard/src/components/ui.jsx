'use client';

import { Loader2 } from 'lucide-react';

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-800/50 ${className}`}>{children}</div>
  );
}

export function StatCard({ Icon, label, value, accent = 'text-brand-400 bg-brand-500/10' }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${accent}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
}

const BADGE_STYLES = {
  active: 'bg-green-500/15 text-green-400',
  approved: 'bg-green-500/15 text-green-400',
  pending: 'bg-yellow-500/15 text-yellow-400',
  inactive: 'bg-slate-500/15 text-slate-400',
  banned: 'bg-red-500/15 text-red-400',
  rejected: 'bg-red-500/15 text-red-400',
  draft: 'bg-slate-500/15 text-slate-400',
  sold: 'bg-blue-500/15 text-blue-400',
  super_admin: 'bg-brand-500/15 text-brand-400',
  shop_admin: 'bg-indigo-500/15 text-indigo-400',
  user: 'bg-slate-500/15 text-slate-300',
};

export function Badge({ value }) {
  const key = String(value || '').toLowerCase();
  const style = BADGE_STYLES[key] || 'bg-slate-500/15 text-slate-300';
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {String(value || '—').replace('_', ' ')}
    </span>
  );
}

export function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-brand-400 mb-3" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ Icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {Icon && <Icon className="w-12 h-12 text-slate-600 mb-4" />}
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      {text && <p className="text-slate-400 max-w-md">{text}</p>}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
