import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <Calendar className="w-10 h-10 text-blue-600" />,
      title: "Easy Booking",
      description:
        "Book your favorite events with just a few clicks. Simple, fast, and secure.",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Diverse Events",
      description:
        "From concerts to tech conferences, discover events across multiple categories.",
    },
    {
      icon: <Star className="w-10 h-10 text-blue-600" />,
      title: "Manage Bookings",
      description:
        "View all your bookings in one place. Cancel anytime before the event starts.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">
                Your Gateway to Amazing Experiences
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Events Near You
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              Your gateway to concerts, webinars, workshops, and more. Start
              exploring today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
              <Link
                to="/events"
                className="group bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center space-x-2"
              >
                <span>Browse Events</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
              >
                Get Started Free
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Instant booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Secure platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-gray-900">
            Why Choose EventEase?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to discover and book amazing events in one
            powerful platform
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 mt-2 text-gray-900">
                Everything You Need in One Place
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Experience seamless event booking with our comprehensive
                platform designed for event enthusiasts.
              </p>
              <ul className="space-y-4">
                {[
                  "Filter events by category, location, and date",
                  "Book up to 2 seats per event",
                  "Real-time seat availability",
                  "Manage all your bookings easily",
                  "Cancel bookings before event starts",
                  "Secure and reliable platform",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3 group">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl">
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-lg mb-8 text-blue-100 leading-relaxed">
                    Join thousands of event enthusiasts and never miss out on
                    amazing experiences.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold">10,000+</div>
                        <div className="text-blue-200 text-sm">
                          Events Listed
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold">50,000+</div>
                        <div className="text-blue-200 text-sm">Happy Users</div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/register"
                    className="group bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Explore events, book tickets, and create unforgettable memories
          </p>
          <Link
            to="/events"
            className="group bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Explore Events Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
