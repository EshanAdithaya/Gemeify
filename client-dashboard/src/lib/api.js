import axios from 'axios';

// Axios instance pointed at the NestJS backend.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the auth token (browser only — guarded for SSR).
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid sessions.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  changePassword: (passwordData) => api.patch('/auth/change-password', passwordData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (resetData) => api.post('/auth/reset-password', resetData),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
};

// Gems API calls
export const gemsAPI = {
  getAll: (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({ page, limit, ...filters });
    return api.get(`/gems?${params}`);
  },
  getById: (id) => api.get(`/gems/${id}`),
  search: (q) => api.get(`/gems/search?q=${encodeURIComponent(q)}`),
};

// Categories API calls
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
};

// Auctions API calls
export const auctionsAPI = {
  getAll: (page = 1, limit = 10, status = 'all') => {
    const params = new URLSearchParams({ page, limit });
    if (status !== 'all') params.append('status', status);
    return api.get(`/auctions?${params}`);
  },
  getById: (id) => api.get(`/auctions/${id}`),
  getLive: () => api.get('/auctions/live'),
  getUpcoming: () => api.get('/auctions/upcoming'),
  getBids: (auctionId) => api.get(`/auctions/${auctionId}/bids`),
  placeBid: (auctionId, bidData) => api.post(`/auctions/${auctionId}/bids`, bidData),
};

// Wishlist API calls
export const wishlistAPI = {
  getMyWishlist: () => api.get('/wishlist'),
  add: (gemId) => api.post('/wishlist', { gemId }),
  remove: (gemId) => api.delete(`/wishlist/${gemId}`),
};

// Orders API calls
export const ordersAPI = {
  getMyOrders: (page = 1, limit = 10) => api.get(`/orders/my-orders?page=${page}&limit=${limit}`),
  create: (orderData) => api.post('/orders', orderData),
};

export default api;
