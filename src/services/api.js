import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    if (config.data) {
      console.log('📦 Request Data:', config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    console.log('📤 Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
    console.error('🔥 Error Details:', error.response?.data);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
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

// Users API calls
export const usersAPI = {
  getAll: (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.patch(`/users/${id}`, userData),
  updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }),
  delete: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/stats'),
};

// Shops API calls
export const shopsAPI = {
  getAll: () => api.get('/shops'),
  getById: (id) => api.get(`/shops/${id}`),
  create: (shopData) => api.post('/shops', shopData),
  update: (id, shopData) => api.patch(`/shops/${id}`, shopData),
  delete: (id) => api.delete(`/shops/${id}`),
};

// Gems API calls
export const gemsAPI = {
  getAll: (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({ page, limit, ...filters });
    return api.get(`/gems?${params}`);
  },
  getById: (id) => api.get(`/gems/${id}`),
  create: (gemData) => api.post('/gems', gemData),
  update: (id, gemData) => api.patch(`/gems/${id}`, gemData),
  delete: (id) => api.delete(`/gems/${id}`),
  search: (query) => api.get(`/gems/search?q=${encodeURIComponent(query)}`),
};

// Categories API calls
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.patch(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Auctions API calls
export const auctionsAPI = {
  getAll: (page = 1, limit = 10, status = 'all') => {
    const params = new URLSearchParams({ page, limit });
    if (status !== 'all') params.append('status', status);
    return api.get(`/auctions?${params}`);
  },
  getById: (id) => api.get(`/auctions/${id}`),
  create: (auctionData) => api.post('/auctions', auctionData),
  update: (id, auctionData) => api.patch(`/auctions/${id}`, auctionData),
  delete: (id) => api.delete(`/auctions/${id}`),
  getLive: () => api.get('/auctions/live'),
  getUpcoming: () => api.get('/auctions/upcoming'),
  getBids: (auctionId) => api.get(`/auctions/${auctionId}/bids`),
  placeBid: (auctionId, bidData) => api.post(`/auctions/${auctionId}/bids`, bidData),
};

// Bids API calls
export const bidsAPI = {
  getMyBids: (page = 1, limit = 10) => api.get(`/bids/my-bids?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/bids/${id}`),
  cancel: (id) => api.patch(`/bids/${id}/cancel`),
};

// Reviews API calls
export const reviewsAPI = {
  getAll: (page = 1, limit = 10) => api.get(`/reviews?page=${page}&limit=${limit}`),
  getByGem: (gemId, page = 1, limit = 10) => api.get(`/reviews/gem/${gemId}?page=${page}&limit=${limit}`),
  getByShop: (shopId, page = 1, limit = 10) => api.get(`/reviews/shop/${shopId}?page=${page}&limit=${limit}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.patch(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
  markHelpful: (id) => api.post(`/reviews/${id}/helpful`),
};

// Wishlist API calls
export const wishlistAPI = {
  getMyWishlist: () => api.get('/wishlist'),
  add: (gemId) => api.post('/wishlist', { gemId }),
  remove: (gemId) => api.delete(`/wishlist/${gemId}`),
  clear: () => api.delete('/wishlist'),
};

// Orders API calls
export const ordersAPI = {
  getAll: (page = 1, limit = 10) => api.get(`/orders?page=${page}&limit=${limit}`),
  getMyOrders: (page = 1, limit = 10) => api.get(`/orders/my-orders?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  cancel: (id) => api.patch(`/orders/${id}/cancel`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
  status: () => api.get('/'),
};

export default api;