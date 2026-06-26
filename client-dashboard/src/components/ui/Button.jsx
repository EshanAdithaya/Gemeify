'use client';

import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:   'btn-gold',
  secondary: 'btn-outline-gold',
  outline:   'btn-outline-gold',
  ghost:     'text-royal-600 hover:text-royal-500 hover:bg-royal-50 px-3 py-2 rounded-sm transition-colors',
  danger:    'bg-red-600/90 hover:bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-sm transition-colors',
};

const SIZES = {
  sm: 'text-[10px] py-1.5 px-3',
  md: '',
  lg: 'text-sm py-3.5 px-7',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  Icon,
  ...props
}) {
  const base = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || '';

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${base} ${sizeClass} ${className}`}
      {...props}
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : Icon ? <Icon size={15} /> : null}
      {children}
    </button>
  );
}
