'use client';

import { ShieldOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function BannedMessage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian-950 px-6">
      <div className="luxury-card max-w-md w-full p-10 text-center">
        <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-red-500/30 rounded-sm"
          style={{ background: 'rgba(239,68,68,0.08)' }}>
          <ShieldOff size={22} className="text-red-400" />
        </div>
        <p className="section-label mb-1 text-red-500">Account Restricted</p>
        <h1 className="font-display text-3xl font-light text-pearl-100 mb-3"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
          Access Suspended
        </h1>
        <p className="text-sm text-pearl-400 mb-8 leading-relaxed">
          Your account has been suspended. Please contact our private client desk for assistance.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:support@gemeify.com"
            className="btn-gold flex items-center justify-center gap-2"
          >
            Contact Support
          </a>
          <button
            onClick={logout}
            className="btn-outline-gold py-2.5 text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
