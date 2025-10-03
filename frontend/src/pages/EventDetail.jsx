import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventsAPI, bookingsAPI } from "../services/api";
import { useAuthStore } from "../store/useStore";
import {
  formatDate,
  formatTime,
  getStatusColor,
  getCategoryColor,
} from "../utils/helpers";
import { Calendar, MapPin, Users, ArrowLeft, Ticket } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState(1);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventsAPI.getById(id);
      setEvent(response.data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setError("");
    setSuccess("");
    setBooking(true);

    try {
      const response = await bookingsAPI.create({
        eventId: event._id,
        seats: parseInt(seats),
      });
      setSuccess(
        `Booking successful! Booking ID: ${response.data.data.bookingId}`
      );
      fetchEvent();
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Event not found
          </h2>
          <button
            onClick={() => navigate("/events")}
            className="text-blue-600 hover:underline"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = event.price * seats;
  const canBook = event.status === "Upcoming" && event.availableSeats > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/events")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-6 right-6 flex space-x-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  {event.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(event.date)}
                      </p>
                      {event.endDate && (
                        <p className="text-sm text-gray-600 mt-1">
                          {formatTime(event.time)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(event.endDate)}
                      </p>
                      {event.endTime && (
                        <p className="text-sm text-gray-600 mt-1">
                          {formatTime(event.endTime)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">
                        {event.location.type === "Online"
                          ? "Online Event"
                          : event.location.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-semibold text-gray-900">
                        {event.availableSeats} / {event.capacity}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Event ID</p>
                  <p className="font-mono font-semibold text-gray-900">
                    {event.eventId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Book Tickets
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}

              {canBook ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Seats (Max 2)
                    </label>
                    <select
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="1">1 Seat</option>
                      {event.availableSeats >= 2 && (
                        <option value="2">2 Seats</option>
                      )}
                    </select>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price per seat</span>
                      <span className="font-semibold">₹{event.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Seats</span>
                      <span className="font-semibold">× {seats}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          {event.price === 0 ? "Free" : `₹${totalPrice}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={booking}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Ticket className="w-5 h-5" />
                    <span>{booking ? "Booking..." : "Book Now"}</span>
                  </button>

                  {!isAuthenticated && (
                    <p className="text-sm text-gray-500 text-center mt-4">
                      You need to login to book tickets
                    </p>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {event.status === "Completed"
                      ? "Event Completed"
                      : event.status === "Ongoing"
                      ? "Event Ongoing"
                      : "Sold Out"}
                  </p>
                  <p className="text-gray-600">
                    {event.availableSeats === 0
                      ? "No seats available"
                      : "Booking not available"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
