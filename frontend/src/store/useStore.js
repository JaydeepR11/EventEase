import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useEventStore = create((set) => ({
  events: [],
  selectedEvent: null,
  filters: {
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "",
  },
  loading: false,
  error: null,

  setEvents: (events) => set({ events }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () =>
    set({
      filters: {
        category: "",
        location: "",
        startDate: "",
        endDate: "",
        status: "",
      },
    }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export const useBookingStore = create((set) => ({
  bookings: [],
  loading: false,
  error: null,

  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) =>
    set((state) => ({
      bookings: [booking, ...state.bookings],
    })),
  removeBooking: (bookingId) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b._id !== bookingId),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
