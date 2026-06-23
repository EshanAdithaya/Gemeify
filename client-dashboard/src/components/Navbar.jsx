'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Heart, Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/auctions', label: 'Auctions' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const linkClass = isDarkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav
      className={`fixed w-full ${
        isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'
      } backdrop-blur-md z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
            >
              Gemify
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {NAV_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className={`${linkClass} transition-colors`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 ${linkClass}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className={`p-2 ${linkClass}`} aria-label="Search">
              <Search size={20} />
            </button>

            <button className={`p-2 ${linkClass}`} aria-label="Wishlist">
              <Heart size={20} />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 ${linkClass} transition-colors`}
                >
                  <User size={20} />
                  <span>{user.firstName || 'User'}</span>
                </button>

                {isUserMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                      isDarkMode ? 'bg-slate-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="py-1" role="menu">
                      <Link
                        href="/settings"
                        className={`flex items-center px-4 py-2 text-sm ${
                          isDarkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm ${
                          isDarkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={`${linkClass} transition-colors`}>
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${linkClass}`}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-slate-800' : 'bg-white'} p-4 rounded-b-lg shadow-lg`}>
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${linkClass} transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    href="/settings"
                    className={`${linkClass} transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={`text-left ${linkClass} transition-colors`}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
