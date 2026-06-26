'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Heart, ShoppingBag, User, LogOut, Package, ChevronDown, Globe } from 'lucide-react';
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
  const { user, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount, setOpen: setCartOpen } = useCart();
  const router = useRouter();

  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [userOpen, setUserOpen]       = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency]       = useState('USD');
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchVal, setSearchVal]     = useState('');
  const searchRef  = useRef(null);
  const userRef    = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  useEffect(() => {
    const fn = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => { if (menuOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) { router.push(`/marketplace?search=${encodeURIComponent(searchVal.trim())}`); setSearchOpen(false); setSearchVal(''); }
  };

  const navBg = scrolled
    ? 'bg-white/96 backdrop-blur-xl border-b border-slate-200 shadow-nav'
    : 'bg-white/80 backdrop-blur-sm border-b border-slate-100';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 flex-shrink-0">
                <polygon points="14,2 26,9 26,21 14,26 2,21 2,9" fill="none" stroke="url(#gN)" strokeWidth="1.5"/>
                <polygon points="14,6 22,10.5 22,19.5 14,22 6,19.5 6,10.5" fill="url(#gNf)" opacity="0.25"/>
                <defs>
                  <linearGradient id="gN" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1E40AF"/><stop offset="50%" stopColor="#2563EB"/><stop offset="100%" stopColor="#3B82F6"/>
                  </linearGradient>
                  <linearGradient id="gNf" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#1E40AF"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-gold-gradient">GEMIFY</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((item) => (
                <Link key={item.href} href={item.href}
                  className="link-underline text-[11px] font-bold tracking-[0.15em] uppercase text-slate-500 hover:text-royal-600 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-0.5">

              {/* Currency — desktop only */}
              <div className="relative hidden md:block">
                <button onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="flex items-center gap-1 px-2 py-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 hover:text-royal-600 transition-colors"
                  aria-label="Select currency">
                  <Globe size={13} /><span>{currency}</span>
                  <ChevronDown size={11} className={`transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
                </button>
                {currencyOpen && (
                  <div className="absolute right-0 mt-1 w-20 bg-white border border-slate-200 py-1 z-50 rounded-lg shadow-card">
                    {CURRENCIES.map((c) => (
                      <button key={c} onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 text-[11px] font-bold tracking-wider transition-colors ${c === currency ? 'text-royal-600' : 'text-slate-500 hover:text-royal-600 hover:bg-slate-50'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <button onClick={() => setSearchOpen(true)} className="p-2.5 text-slate-500 hover:text-royal-600 transition-colors" aria-label="Search">
                <Search size={17} />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2.5 text-slate-500 hover:text-royal-600 transition-colors" aria-label="Wishlist">
                <Heart size={17} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[14px] h-3.5 px-0.5 rounded-full bg-royal-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} className="relative p-2.5 text-slate-500 hover:text-royal-600 transition-colors" aria-label="Cart">
                <ShoppingBag size={17} />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[14px] h-3.5 px-0.5 rounded-full bg-royal-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / CTA — desktop */}
              {user ? (
                <div className="relative hidden sm:block ml-1" ref={userRef}>
                  <button onClick={() => setUserOpen(!userOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 hover:border-royal-400 hover:text-royal-700 transition-all rounded-md bg-white">
                    <User size={14} />
                    <span className="text-[11px] font-bold tracking-wider uppercase hidden md:block">{user.firstName || 'Account'}</span>
                    <ChevronDown size={11} className={`transition-transform ${userOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 py-1.5 z-50 rounded-lg shadow-card">
                      <div className="px-4 py-2 border-b border-slate-100 text-[10px] font-bold tracking-widest uppercase text-slate-400">{user.email}</div>
                      {[{ href: '/account/orders', Icon: Package, label: 'My Orders' }, { href: '/wishlist', Icon: Heart, label: 'Wishlist' }].map(({ href, Icon, label }) => (
                        <Link key={href} href={href} onClick={() => setUserOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-royal-700 hover:bg-slate-50 transition-colors">
                          <Icon size={14} />{label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-100 mt-1" />
                      <button onClick={() => { logout(); setUserOpen(false); router.push('/login'); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={14} />Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login"
                  className="hidden sm:flex items-center gap-1.5 ml-1 px-3 py-1.5 bg-royal-600 text-white hover:bg-royal-700 text-[11px] font-bold tracking-wider uppercase transition-all rounded-md">
                  Sign In
                </Link>
              )}

              {/* Hamburger — mobile */}
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 ml-0.5 text-slate-500 hover:text-royal-600 transition-colors" aria-label="Menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Search overlay ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4" onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <form onSubmit={handleSearch} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-xl">
            <input ref={searchRef} type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search sapphires, rubies, diamonds…"
              className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 px-5 py-4 pr-12 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500 font-medium shadow-card" />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-royal-600 hover:text-royal-800"><Search size={20} /></button>
          </form>
        </div>
      )}

      {/* ── Mobile drawer ── */}
      <div className={`fixed inset-0 z-[55] lg:hidden transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)} />
        <div className={`absolute inset-y-0 right-0 w-[280px] bg-white border-l border-slate-200 flex flex-col transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gold-gradient">GEMIFY</span>
            <button onClick={() => setMenuOpen(false)} className="p-1.5 text-slate-400 hover:text-royal-600 transition-colors"><X size={18} /></button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-5 py-4 gap-0.5 flex-1">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="flex items-center py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase text-slate-600 hover:text-royal-700 border-b border-slate-100 last:border-0 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Currency + CTA */}
          <div className="px-5 py-4 border-t border-slate-100 space-y-4">
            <div>
              <p className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mb-2">Currency</p>
              <div className="flex gap-1.5 flex-wrap">
                {CURRENCIES.map((c) => (
                  <button key={c} onClick={() => setCurrency(c)}
                    className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border transition-colors ${c === currency ? 'border-royal-500 text-royal-600 bg-royal-50' : 'border-slate-200 text-slate-500 hover:border-royal-400 hover:text-royal-600'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            {user ? (
              <div className="space-y-2">
                <Link href="/account/orders" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2.5 text-sm text-slate-600 hover:text-royal-700 transition-colors">
                  <Package size={14} /> My Orders
                </Link>
                <button onClick={() => { logout(); setMenuOpen(false); router.push('/login'); }}
                  className="btn-outline-gold w-full text-center py-2.5 text-xs">Sign Out</button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-gold w-full text-center py-3 text-xs">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
