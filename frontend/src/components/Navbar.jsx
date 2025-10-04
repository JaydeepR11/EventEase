import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useStore";
import { Calendar, LogOut, LayoutDashboard, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              EventEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/events"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Browse Events
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === "admin" ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/admin/events"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Manage Events
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/my-bookings"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    My Bookings
                  </Link>
                )}

                <div className="flex items-center space-x-3 border-l pl-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                    {user?.role === "admin" && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                        Admin
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition border border-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm hover:shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                to="/events"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Browse Events
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.role === "admin" ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/admin/events"
                        onClick={closeMobileMenu}
                        className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition"
                      >
                        Manage Events
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/my-bookings"
                      onClick={closeMobileMenu}
                      className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      My Bookings
                    </Link>
                  )}

                  <div className="border-t pt-3 mt-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>
                      {user?.role === "admin" && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                          Admin
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md text-sm font-medium transition mt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 mt-2 border-t">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="text-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium transition border border-gray-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="text-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
