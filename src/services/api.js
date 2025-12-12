import axios from "axios";

// Use relative URL when using Vite proxy, or full URL for direct connection
// If VITE_API_URL is set, use it directly (for production or direct connection)
// Otherwise, use relative URL which will be proxied by Vite
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "/api"; // Relative URL uses Vite proxy in development

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Users API
export const usersAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Health check
export const healthAPI = {
  check: () => api.get("/health"),
};

// Doctors API
export const doctorsAPI = {
  getAll: (params) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return api.get(`/doctors${queryString}`);
  },
  getById: (id) => api.get(`/doctors/${id}`),
  create: (data) => api.post("/doctors", data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  delete: (id) => api.delete(`/doctors/${id}`),
};

// Articles API
export const articlesAPI = {
  getAll: (params) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return api.get(`/articles${queryString}`);
  },
  getById: (id) => api.get(`/articles/${id}`),
  create: (data) => api.post("/articles", data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`),
};

// Feedback API
export const feedbackAPI = {
  getAll: (params) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return api.get(`/feedback${queryString}`);
  },
  getById: (id) => api.get(`/feedback/${id}`),
  create: (data) => api.post("/feedback", data),
  markAsRead: (id) => api.put(`/feedback/${id}/read`),
  delete: (id) => api.delete(`/feedback/${id}`),
};

// Events API
export const eventsAPI = {
  getAll: (params) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return api.get(`/events${queryString}`);
  },
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post("/events", data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

// Game Progress API
export const gameProgressAPI = {
  getAll: (params) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return api.get(`/game-progress${queryString}`);
  },
  getById: (id) => api.get(`/game-progress/${id}`),
  create: (data) => api.post("/game-progress", data),
  update: (id, data) => api.put(`/game-progress/${id}`, data),
  delete: (id) => api.delete(`/game-progress/${id}`),
};

// Community API
export const communityAPI = {
  getAll: (params) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return api.get(`/community${queryString}`);
  },
  getById: (id) => api.get(`/community/${id}`),
  create: (data) => api.post("/community", data),
  update: (id, data) => api.put(`/community/${id}`, data),
  delete: (id) => api.delete(`/community/${id}`),
};

export default api;
