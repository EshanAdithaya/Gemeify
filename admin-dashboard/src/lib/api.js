import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const usersAPI = {
  getAll: (page = 1, limit = 20) => api.get(`/users?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.patch(`/users/${id}`, data),
  updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }),
  remove: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/stats'),
};

export const gemsAPI = {
  getAll: (page = 1, limit = 20) => api.get(`/gems?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/gems/${id}`),
};

export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
};

export const auctionsAPI = {
  getAll: (page = 1, limit = 20) => api.get(`/auctions?page=${page}&limit=${limit}`),
  getLive: () => api.get('/auctions/live'),
  getUpcoming: () => api.get('/auctions/upcoming'),
  getStats: () => api.get('/auctions/stats'),
  remove: (id) => api.delete(`/auctions/${id}`),
};

export const shopsAPI = {
  getAll: () => api.get('/shops'),
};

export default api;
