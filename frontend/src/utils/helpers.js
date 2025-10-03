/* eslint-disable no-unused-vars */
import { format, parseISO } from "date-fns";

// Format time to AM/PM format
export const formatTime = (time) => {
  if (!time) return "";
  try {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return format(date, "h:mm a");
  } catch (error) {
    return time;
  }
};

// Format date to DD-MMM-YYYY
export const formatDate = (date) => {
  if (!date) return "";
  try {
    const d = typeof date === "string" ? parseISO(date) : new Date(date);
    return format(d, "dd-MMM-yyyy").toUpperCase();
  } catch (error) {
    return "";
  }
};

// Format date for input fields (YYYY-MM-DD)
export const formatDateInput = (date) => {
  if (!date) return "";
  try {
    const d = typeof date === "string" ? parseISO(date) : new Date(date);
    return format(d, "yyyy-MM-dd");
  } catch (error) {
    return "";
  }
};

// Get event status badge color
export const getStatusColor = (status) => {
  const colors = {
    Upcoming: "bg-blue-100 text-blue-800",
    Ongoing: "bg-green-100 text-green-800",
    Completed: "bg-gray-100 text-gray-800",
  };
  return colors[status] || colors.Upcoming;
};

// Get category color
export const getCategoryColor = (category) => {
  const colors = {
    Music: "bg-purple-100 text-purple-800",
    Tech: "bg-blue-100 text-blue-800",
    Business: "bg-green-100 text-green-800",
    Sports: "bg-red-100 text-red-800",
    Arts: "bg-pink-100 text-pink-800",
    Food: "bg-orange-100 text-orange-800",
    Other: "bg-gray-100 text-gray-800",
  };
  return colors[category] || colors.Other;
};

// Validate email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Calculate days until event
export const getDaysUntilEvent = (eventDate) => {
  const now = new Date();
  const event = new Date(eventDate);
  const diff = Math.ceil((event - now) / (1000 * 60 * 60 * 24));
  return diff;
};
