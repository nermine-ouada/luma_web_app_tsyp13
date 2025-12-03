import axios from 'axios';

// Use relative URL when using Vite proxy, or full URL for direct connection
// If VITE_API_URL is set, use it directly (for production or direct connection)
// Otherwise, use relative URL which will be proxied by Vite
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : '/api'; // Relative URL uses Vite proxy in development

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Kids API
export const kidsAPI = {
  getAll: (userId) => {
    const url = userId ? `/kids?userId=${userId}` : '/kids';
    return api.get(url);
  },
  getById: (id) => api.get(`/kids/${id}`),
  getByUserId: (userId) => api.get(`/kids/users/${userId}/kids`),
  create: (data) => api.post('/kids', data),
  update: (id, data) => api.put(`/kids/${id}`, data),
  delete: (id) => api.delete(`/kids/${id}`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;

