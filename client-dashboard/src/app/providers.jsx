'use client';

import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

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
    </div>
  );
}

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CompareProvider>
          <Shell>{children}</Shell>
        </CompareProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
