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
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
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
