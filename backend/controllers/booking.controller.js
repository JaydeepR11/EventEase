const Booking = require("../models/Booking");
const Event = require("../models/Event");
const { getIo } = require("../utils/socket");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { eventId, seats } = req.body;

    // Validate seats
    if (!seats || seats < 1 || seats > 2) {
      return res.status(400).json({
        success: false,
        message: "You can book between 1 to 2 seats per event",
      });
    }

    // Get event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if event has already started
    if (event.status === "Completed" || event.status === "Ongoing") {
      return res.status(400).json({
        success: false,
        message:
          "Cannot book for an event that has already started or completed",
      });
    }

    // Check capacity
    if (event.bookedSeats + seats > event.capacity) {
      return res.status(400).json({
        success: false,
        message: `Only ${event.availableSeats} seats available`,
      });
    }

    // Check if user already has a booking for this event
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      event: eventId,
      status: "confirmed",
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You already have a booking for this event",
      });
    }

    // Generate booking ID
    const count = await Booking.countDocuments();
    const bookingId = `BKG-${Date.now()}-${(count + 1)
      .toString()
      .padStart(4, "0")}`;

    // Create booking
    const booking = new Booking({
      bookingId,
      user: req.user._id,
      event: eventId,
      seats,
      totalAmount: event.price * seats,
    });
    await booking.save();

    // Update event booked seats
    event.bookedSeats += seats;
    await event.save();

    // Emit event update for bookedSeats change
    const io = getIo();
    io.emit("eventUpdated", event);

    // Populate booking details
    await booking.populate("event");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event")
      .sort({ bookingDate: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("event");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check ownership
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      });
    }

    // Check if already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // Check if event has started
    if (booking.event.status !== "Upcoming") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel booking for an event that has already started",
      });
    }

    // Update booking status
    booking.status = "cancelled";
    booking.cancelledAt = Date.now();
    await booking.save();

    // Update event booked seats
    const event = await Event.findById(booking.event._id);
    event.bookedSeats -= booking.seats;
    await event.save();

    // Emit event update for bookedSeats change
    const io = getIo();
    io.emit("eventUpdated", event);

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
