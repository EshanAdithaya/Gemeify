'use client';

import { Loader2 } from 'lucide-react';

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white ${className}`}>{children}</div>
  );
}

export function StatCard({ Icon, label, value, accent = 'text-blue-600 bg-blue-50' }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${accent}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </Card>
  );
}

const BADGE_STYLES = {
  active:      'bg-emerald-50 text-emerald-700 border border-emerald-200',
  approved:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:     'bg-amber-50 text-amber-700 border border-amber-200',
  inactive:    'bg-slate-100 text-slate-600 border border-slate-200',
  banned:      'bg-red-50 text-red-700 border border-red-200',
  rejected:    'bg-red-50 text-red-700 border border-red-200',
  draft:       'bg-slate-100 text-slate-600 border border-slate-200',
  sold:        'bg-blue-50 text-blue-700 border border-blue-200',
  super_admin: 'bg-purple-50 text-purple-700 border border-purple-200',
  shop_admin:  'bg-indigo-50 text-indigo-700 border border-indigo-200',
  user:        'bg-slate-100 text-slate-600 border border-slate-200',
};

export function Badge({ value }) {
  const key = String(value || '').toLowerCase();
  const style = BADGE_STYLES[key] || 'bg-slate-100 text-slate-600 border border-slate-200';
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {String(value || '—').replace('_', ' ')}
    </span>
  );
}

export function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({ Icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {Icon && <Icon className="w-12 h-12 text-slate-300 mb-4" />}
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
      {text && <p className="text-slate-500 max-w-md text-sm">{text}</p>}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-1 text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
