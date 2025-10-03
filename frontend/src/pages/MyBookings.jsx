import { useState, useEffect } from "react";
import { bookingsAPI } from "../services/api";
import { formatDate, getStatusColor } from "../utils/helpers";
import {
  Calendar as CalendarIcon,
  MapPin,
  Ticket,
  X,
  CheckCircle,
} from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getMyBookings();
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await bookingsAPI.cancel(bookingId);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your event bookings</p>
      </div>

      {/* View Toggle */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setViewMode("calendar")}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === "calendar"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Calendar View
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start exploring events and book your first ticket!
          </p>
          <a
            href="/events"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Events
          </a>
        </div>
      ) : viewMode === "list" ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {booking.event?.title || "Event Deleted"}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status === "confirmed"
                        ? "Confirmed"
                        : "Cancelled"}
                    </span>
                    {booking.event && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          booking.event.status
                        )}`}
                      >
                        {booking.event.status}
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>
                        {booking.event ? formatDate(booking.event.date) : "N/A"}{" "}
                        at {booking.event?.time || "N/A"}
                        {booking.event?.endDate && (
                          <span className="text-xs">
                            {" "}
                            to {formatDate(booking.event.endDate)} at{" "}
                            {booking.event.endTime}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {booking.event?.location.type === "Online"
                          ? "Online Event"
                          : booking.event?.location.city || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Ticket className="w-4 h-4 mr-2" />
                      <span>{booking.seats} Seat(s)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Booking ID: {booking.bookingId}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {booking.totalAmount === 0
                          ? "Free"
                          : `₹${booking.totalAmount}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Booked On</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(booking.bookingDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {booking.status === "confirmed" &&
                  booking.event?.status === "Upcoming" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancellingId === booking._id}
                      className="ml-4 flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                      <span>
                        {cancellingId === booking._id
                          ? "Cancelling..."
                          : "Cancel"}
                      </span>
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
          <div className="grid grid-cols-7 gap-2">
            {/* Simple calendar representation */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
            {bookings.map((booking, idx) => (
              <div
                key={idx}
                className="p-2 bg-blue-50 rounded text-sm hover:bg-blue-100 transition cursor-pointer"
                title={booking.event?.title}
              >
                <div className="font-semibold text-blue-900">
                  {new Date(booking.event?.date).getDate()}
                </div>
                <div className="text-xs text-blue-700 truncate">
                  {booking.event?.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
