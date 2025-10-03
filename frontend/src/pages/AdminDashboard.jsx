import React, { useState, useEffect } from "react";
import { adminAPI } from "../services/api";
import { formatDate } from "../utils/helpers";
import { Calendar, Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setStats(response.data.data.stats);
      setRecentBookings(response.data.data.recentBookings);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Events",
      value: stats?.totalEvents || 0,
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      bg: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Upcoming Events",
      value: stats?.upcomingEvents || 0,
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      bg: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Ongoing Events",
      value: stats?.ongoingEvents || 0,
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      bg: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Overview of your event platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bg} p-3 rounded-lg`}>{card.icon}</div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {card.title}
            </h3>
            <p className={`text-3xl font-bold ${card.textColor}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Event Status Overview */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Upcoming</h3>
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-4xl font-bold">{stats?.upcomingEvents || 0}</p>
          <p className="text-blue-100 mt-2">Events scheduled</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Ongoing</h3>
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-4xl font-bold">{stats?.ongoingEvents || 0}</p>
          <p className="text-green-100 mt-2">Currently happening</p>
        </div>

        <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Completed</h3>
            <CheckCircle className="w-6 h-6" />
          </div>
          <p className="text-4xl font-bold">{stats?.completedEvents || 0}</p>
          <p className="text-gray-100 mt-2">Past events</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          {recentBookings.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No bookings yet</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Seats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.user?.name}
                      <br />
                      <span className="text-xs text-gray-500">
                        {booking.user?.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.event?.title}
                      <br />
                      <span className="text-xs text-gray-500">
                        {booking.event?.eventId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.seats}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                      {booking.totalAmount === 0
                        ? "Free"
                        : `₹${booking.totalAmount}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(booking.bookingDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
