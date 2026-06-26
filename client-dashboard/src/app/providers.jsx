'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import { ToastProvider } from '@/context/ToastContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import CartDrawer from '@/components/CartDrawer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import PageLoader from '@/components/PageLoader';

const AUTH_PATHS = ['/login', '/signup', '/forgot-password'];

function Shell({ children }) {
  const { isDarkMode } = useTheme();
  const { loading } = useAuth();
  const pathname = usePathname();
  const [pageLoading, setPageLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setPageLoading(true);
      const t = setTimeout(() => {
        setPageLoading(false);
        setPrevPath(pathname);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [pathname, prevPath]);

  if (loading) return <Preloader />;

  const isAuthPage = AUTH_PATHS.some((p) => pathname?.startsWith(p));

  if (isAuthPage) {
    return (
      <>
        {pageLoading && <PageLoader />}
        {children}
      </>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-white' : 'bg-pearl-100'}`}>
      {pageLoading && <PageLoader />}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <div id="main">{children}</div>
      <Footer />
      <CartDrawer />
      <AnalyticsTracker />
    </div>
  );
}

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <CompareProvider>
                <Shell>{children}</Shell>
              </CompareProvider>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
