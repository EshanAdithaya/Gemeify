'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Menu, X, Heart, ShoppingBag, User,
  LogOut, Package, ChevronDown, Globe,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/auctions',    label: 'Auctions'    },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/guides',      label: 'Guides'      },
  { href: '/about',       label: 'About'       },
];

const CURRENCIES = ['USD', 'EUR', 'GBP', 'AED', 'CHF'];

export default function Navbar() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount, setOpen: setCartOpen } = useCart();
  const router = useRouter();

  const [scrolled, setScrolled]           = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [currency, setCurrency]           = useState('USD');
  const [isSearchOpen, setIsSearchOpen]   = useState(false);
  const [searchVal, setSearchVal]         = useState('');
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const close = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchVal.trim())}`);
      setIsSearchOpen(false);
      setSearchVal('');
    }
  };

  /* ── Dark: obsidian glass / Light: pearl glass ── */
  const navBg = scrolled
    ? isDarkMode
      ? 'bg-obsidian-950/95 backdrop-blur-xl shadow-nav border-b border-gold-900/30'
      : 'bg-pearl-100/95 backdrop-blur-xl shadow-nav border-b border-gold-700/20'
    : isDarkMode
      ? 'bg-transparent'
      : 'bg-transparent';

  const textMuted = isDarkMode
    ? 'text-pearl-400 hover:text-gold-400'
    : 'text-obsidian-600 hover:text-gold-700';

  const textActive = isDarkMode ? 'text-pearl-100' : 'text-obsidian-900';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative w-7 h-7">
                <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
                  <polygon
                    points="14,2 26,9 26,21 14,26 2,21 2,9"
                    fill="none"
                    stroke="url(#gNav)"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="14,6 22,10.5 22,19.5 14,22 6,19.5 6,10.5"
                    fill="url(#gNavFill)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="gNav" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%"   stopColor="#C9A84C"/>
                      <stop offset="50%"  stopColor="#D4AF37"/>
                      <stop offset="100%" stopColor="#B8962E"/>
                    </linearGradient>
                    <linearGradient id="gNavFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%"   stopColor="#D4AF37"/>
                      <stop offset="100%" stopColor="#C9A84C"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span
                className="font-display text-xl tracking-widest-xl font-semibold text-gold-gradient"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
              >
                GEMIFY
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline text-[11px] font-semibold tracking-widest-xl uppercase transition-colors duration-200 ${textMuted}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Currency */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className={`flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors ${textMuted}`}
                  aria-label="Select currency"
                >
                  <Globe size={14} />
                  <span>{currency}</span>
                  <ChevronDown size={12} className={`transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCurrencyOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-24 rounded border py-1 z-50 animate-scale-in ${
                      isDarkMode
                        ? 'bg-obsidian-900 border-gold-900/40'
                        : 'bg-pearl-50 border-gold-700/20'
                    }`}
                  >
                    {CURRENCIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCurrency(c); setIsCurrencyOpen(false); }}
                        className={`w-full text-left px-4 py-1.5 text-[11px] font-semibold tracking-wider transition-colors ${
                          c === currency
                            ? 'text-gold-500'
                            : textMuted
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2.5 transition-colors ${textMuted}`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`relative p-2.5 transition-colors ${textMuted}`}
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-gold-500 text-obsidian-950 text-[10px] font-bold flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-2.5 transition-colors ${textMuted}`}
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-gold-500 text-obsidian-950 text-[10px] font-bold flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              {user ? (
                <div className="relative ml-1" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all ${
                      isDarkMode
                        ? 'border-gold-900/40 text-pearl-300 hover:border-gold-600/60 hover:text-gold-400'
                        : 'border-gold-700/30 text-obsidian-700 hover:border-gold-600 hover:text-gold-700'
                    }`}
                  >
                    <User size={15} />
                    <span className="text-[11px] font-semibold tracking-wider uppercase hidden sm:block">
                      {user.firstName || 'Account'}
                    </span>
                    <ChevronDown size={12} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isUserMenuOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-52 rounded border py-1 z-50 animate-scale-in shadow-obsidian ${
                        isDarkMode
                          ? 'bg-obsidian-900 border-gold-900/40'
                          : 'bg-pearl-50 border-gold-700/20'
                      }`}
                    >
                      <div className={`px-4 py-2 border-b text-[10px] font-semibold tracking-widest uppercase ${
                        isDarkMode ? 'text-pearl-500 border-gold-900/30' : 'text-obsidian-400 border-gold-700/15'
                      }`}>
                        {user.email}
                      </div>
                      {[
                        { href: '/account/orders', Icon: Package, label: 'My Orders' },
                        { href: '/wishlist',       Icon: Heart,   label: 'Wishlist'  },
                      ].map(({ href, Icon, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            isDarkMode
                              ? 'text-pearl-300 hover:text-gold-400 hover:bg-obsidian-800'
                              : 'text-obsidian-600 hover:text-gold-700 hover:bg-pearl-200'
                          }`}
                        >
                          <Icon size={15} />
                          {label}
                        </Link>
                      ))}
                      <div className={`border-t ${isDarkMode ? 'border-gold-900/30' : 'border-gold-700/15'}`} />
                      <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                          isDarkMode
                            ? 'text-pearl-300 hover:text-red-400 hover:bg-obsidian-800'
                            : 'text-obsidian-600 hover:text-red-600 hover:bg-pearl-200'
                        }`}
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:flex items-center gap-1.5 ml-2 px-4 py-1.5 rounded-sm border text-[11px] font-semibold tracking-wider uppercase transition-all ${
                    isDarkMode
                      ? 'border-gold-700/60 text-gold-400 hover:bg-gold-500/10'
                      : 'border-gold-700 text-gold-700 hover:bg-gold-500/10'
                  }`}
                >
                  Private Access
                </Link>
              )}

              {/* Theme toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 ml-0.5 transition-colors ${textMuted}`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 w-[18px] h-[18px]">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2.5 ml-1 transition-colors ${textMuted}`}
                aria-label="Open menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Gold bottom accent line */}
        <div className="h-px bg-gold-gradient opacity-30" />
      </nav>

      {/* ── Search overlay ───────────────────────────────────────────────── */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm" />
          <form
            onSubmit={handleSearch}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl animate-scale-in"
          >
            <input
              ref={searchRef}
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search sapphires, rubies, diamonds…"
              className="w-full bg-obsidian-900 border border-gold-700/40 text-pearl-100 placeholder-pearl-500 px-6 py-4 pr-14 text-lg rounded-sm focus:outline-none focus:border-gold-500/70"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500 hover:text-gold-400">
              <Search size={22} />
            </button>
          </form>
        </div>
      )}

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div
            className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className={`absolute inset-y-0 right-0 w-72 flex flex-col overflow-y-auto animate-fade-in ${
            isDarkMode ? 'bg-obsidian-950' : 'bg-pearl-100'
          }`}>
            <div className="flex items-center justify-between p-6 border-b border-gold-900/30">
              <span className="font-display text-lg tracking-widest-xl font-semibold text-gold-gradient"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                GEMIFY
              </span>
              <button onClick={() => setIsMenuOpen(false)} className={textMuted}>
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 text-[11px] font-semibold tracking-widest-xl uppercase border-b transition-colors ${
                    isDarkMode
                      ? 'border-obsidian-800 text-pearl-300 hover:text-gold-400'
                      : 'border-pearl-300 text-obsidian-600 hover:text-gold-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-6 mt-auto space-y-3">
              <div className="flex gap-2 flex-wrap">
                {CURRENCIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-sm border transition-colors ${
                      c === currency
                        ? 'border-gold-500 text-gold-500 bg-gold-500/10'
                        : isDarkMode
                          ? 'border-obsidian-700 text-pearl-400'
                          : 'border-pearl-400 text-obsidian-500'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn-outline-gold w-full text-center"
                >
                  Sign Out
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="btn-gold w-full text-center">
                  Private Access
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
