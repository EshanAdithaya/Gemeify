'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authAPI } from '@/lib/api';

const ADMIN_ROLES = ['super_admin', 'shop_admin'];

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const restore = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await authAPI.getProfile();
      const profile = res.data?.data?.user || null;
      setUser(profile && ADMIN_ROLES.includes(profile.role) ? profile : null);
    } catch {
      localStorage.removeItem('adminToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restore();
  }, [restore]);

  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { token, user: profile } = res.data?.data || {};
    if (!profile || !ADMIN_ROLES.includes(profile.role)) {
      throw new Error('This account does not have administrator access.');
    }
    if (typeof window !== 'undefined') localStorage.setItem('adminToken', token);
    setUser(profile);
    return profile;
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') localStorage.removeItem('adminToken');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
