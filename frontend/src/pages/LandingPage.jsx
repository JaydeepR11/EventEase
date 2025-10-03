import { Link } from "react-router-dom";
import { Calendar, Users, Star, ArrowRight, CheckCircle } from "lucide-react";

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
      <div className="relatives bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your gateway to concerts, webinars, workshops, and more
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/events"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition inline-flex items-center space-x-2"
              >
                <span>Browse Events</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Why Choose EventEase?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Everything You Need in One Place
              </h2>
              <ul className="space-y-4">
                {[
                  "Filter events by category, location, and date",
                  "Book up to 2 seats per event",
                  "Real-time seat availability",
                  "Manage all your bookings easily",
                  "Cancel bookings before event starts",
                  "Secure and reliable platform",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-6 text-blue-100">
                Join thousands of event enthusiasts and never miss out on
                amazing experiences.
              </p>
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition inline-block"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore events, book tickets, and create unforgettable memories
          </p>
          <Link
            to="/events"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition inline-flex items-center space-x-2"
          >
            <span>Explore Events Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
