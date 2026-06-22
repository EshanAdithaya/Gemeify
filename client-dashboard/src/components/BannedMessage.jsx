'use client';

import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function BannedMessage() {
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <div
        className={`max-w-md w-full mx-4 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } rounded-xl shadow-lg p-8 text-center`}
      >
        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
          Account Suspended
        </h1>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your account has been suspended. Please contact support for assistance.
        </p>
        <button
          onClick={logout}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
