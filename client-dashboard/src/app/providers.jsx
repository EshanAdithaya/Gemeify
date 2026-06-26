'use client';

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

function Shell({ children }) {
  const { isDarkMode } = useTheme();
  const { loading } = useAuth();

  if (loading) {
    return <Preloader />;
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? 'bg-white'
          : 'bg-pearl-100'
      }`}
    >
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
