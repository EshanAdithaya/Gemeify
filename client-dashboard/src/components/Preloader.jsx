'use client';

import { useTheme } from '@/context/ThemeContext';

export default function Preloader() {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
    </div>
  );
}
