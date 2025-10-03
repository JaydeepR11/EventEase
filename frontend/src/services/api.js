import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-storage");
  if (token) {
    const parsed = JSON.parse(token);
    if (parsed.state?.token) {
      config.headers.Authorization = `Bearer ${parsed.state.token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Events API
export const eventsAPI = {
  getAll: (params) => api.get("/events", { params }),
  getById: (id) => api.get(`/events/${id}`),
};

// Bookings API
export const bookingsAPI = {
  create: (data) => api.post("/bookings", data),
  getMyBookings: () => api.get("/bookings/my-bookings"),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

// Admin API
export const adminAPI = {
  createEvent: (data) => api.post("/admin/events", data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
  getAttendees: (id) => api.get(`/admin/events/${id}/attendees`),
  getDashboard: () => api.get("/admin/dashboard"),
};

export default api;
