import { useState, useEffect } from "react";
import { adminAPI } from "../services/api";
import { formatDate } from "../utils/helpers";
import {
  Calendar,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Events",
      value: stats?.totalEvents || 0,
      icon: <Calendar className="w-7 h-7 text-blue-600" />,
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: <CheckCircle className="w-7 h-7 text-green-600" />,
      gradient: "from-green-500 to-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Upcoming Events",
      value: stats?.upcomingEvents || 0,
      icon: <Clock className="w-7 h-7 text-purple-600" />,
      gradient: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Ongoing Events",
      value: stats?.ongoingEvents || 0,
      icon: <TrendingUp className="w-7 h-7 text-orange-600" />,
      gradient: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const eventStatusCards = [
    {
      title: "Upcoming",
      value: stats?.upcomingEvents || 0,
      icon: <Clock className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-600",
      description: "Events scheduled",
    },
    {
      title: "Ongoing",
      value: stats?.ongoingEvents || 0,
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-green-500 to-green-600",
      description: "Currently happening",
    },
    {
      title: "Completed",
      value: stats?.completedEvents || 0,
      icon: <CheckCircle className="w-6 h-6" />,
      gradient: "from-gray-500 to-gray-600",
      description: "Past events",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Overview of your event platform</span>
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Updates</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`${card.bg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {card.icon}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                {card.title}
              </h3>
              <p
                className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Event Status Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {eventStatusCards.map((card, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {card.icon}
                  </div>
                </div>
                <p className="text-4xl font-bold mb-2">{card.value}</p>
                <p className="text-white/80 text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Recent Bookings</span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Latest transactions on your platform
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {recentBookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium mb-1">
                  No bookings yet
                </p>
                <p className="text-gray-500 text-sm">
                  Bookings will appear here once users start booking events
                </p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Seats
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 font-mono">
                          {booking.bookingId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.user?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.user?.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {booking.event?.title}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {booking.event?.eventId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {booking.seats}{" "}
                          {booking.seats === 1 ? "seat" : "seats"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-bold ${
                            booking.totalAmount === 0
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {booking.totalAmount === 0
                            ? "Free"
                            : `₹${booking.totalAmount.toLocaleString()}`}
                        </span>
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
    </div>
  );
};

export default AdminDashboard;
