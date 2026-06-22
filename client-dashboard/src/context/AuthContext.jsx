'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authAPI } from '@/lib/api';

const AuthContext = createContext({
  user: null,
  isBanned: false,
  loading: true,
  login: () => {},
  logout: () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the current user from the backend using the stored JWT.
  const refresh = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await authAPI.getProfile();
      setUser(res.data?.data?.user || null);
    } catch (error) {
      // Invalid/expired token — clear it.
      localStorage.removeItem('authToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Persist the session after a successful login/register.
  const login = useCallback((token, userData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    setUser(null);
  }, []);

  const isBanned = user?.status === 'banned';

  return (
    <AuthContext.Provider value={{ user, isBanned, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
