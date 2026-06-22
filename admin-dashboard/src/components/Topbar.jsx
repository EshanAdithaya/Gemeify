'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Topbar({ onMenu }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'A';

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
      <button onClick={onMenu} className="lg:hidden text-slate-400 hover:text-white">
        <Menu className="w-6 h-6" />
      </button>

      <div className="hidden lg:block" />

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-3 text-sm text-slate-300 hover:text-white"
        >
          <div className="w-9 h-9 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-medium text-white">
              {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
            </div>
            <div className="text-xs text-slate-500 capitalize">{user?.role?.replace('_', ' ')}</div>
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-800 bg-slate-800 shadow-lg py-1">
            <div className="px-4 py-2 text-xs text-slate-500 border-b border-slate-700 truncate">{user?.email}</div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
