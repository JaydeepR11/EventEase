const Event = require("../models/Event");
const Booking = require("../models/Booking");
const { getIo } = require("../utils/socket");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    // Validate location
    if (!req.body.location || !req.body.location.type) {
      return res.status(400).json({
        success: false,
        message: "Location type is required",
      });
    }
    if (req.body.location.type === "In-Person" && !req.body.location.address) {
      return res.status(400).json({
        success: false,
        message: "Address is required for In-Person events",
      });
    }
    // Ensure location object has all required fields with defaults
    req.body.location = {
      type: req.body.location.type,
      address: req.body.location.address || "",
      city: req.body.location.city || "",
      country: req.body.location.country || "",
    };

    const eventData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const event = await Event.create(eventData);

    // Emit event created notification
    const io = getIo();
    io.emit("eventCreated", event);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Don't allow capacity reduction below booked seats
    if (req.body.capacity && req.body.capacity < event.bookedSeats) {
      return res.status(400).json({
        success: false,
        message: `Cannot reduce capacity below ${event.bookedSeats} (already booked seats)`,
      });
    }

    // Validate location if provided
    if (req.body.location) {
      if (!req.body.location.type) {
        return res.status(400).json({
          success: false,
          message: "Location type is required",
        });
      }
      if (
        req.body.location.type === "In-Person" &&
        !req.body.location.address
      ) {
        return res.status(400).json({
          success: false,
          message: "Address is required for In-Person events",
        });
      }
      // Ensure location object has all required fields with defaults
      req.body.location = {
        type: req.body.location.type,
        address: req.body.location.address || "",
        city: req.body.location.city || "",
        country: req.body.location.country || "",
      };
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Emit event updated notification
    const io = getIo();
    io.emit("eventUpdated", event);

    res.json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if event has bookings
    const bookingsCount = await Booking.countDocuments({
      event: req.params.id,
      status: "confirmed",
    });

    if (bookingsCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete event with active bookings",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    // Emit event deleted notification
    const io = getIo();
    io.emit("eventDeleted", { eventId: req.params.id });

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Event Attendees
exports.getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const bookings = await Booking.find({
      event: req.params.id,
      status: "confirmed",
    })
      .populate("user", "name email")
      .sort({ bookingDate: -1 });

    const attendees = bookings.map((booking) => ({
      bookingId: booking.bookingId,
      userName: booking.user.name,
      userEmail: booking.user.email,
      seats: booking.seats,
      totalAmount: booking.totalAmount,
      bookingDate: booking.bookingDate,
    }));

    res.json({
      success: true,
      event: {
        title: event.title,
        eventId: event.eventId,
        totalCapacity: event.capacity,
        bookedSeats: event.bookedSeats,
        availableSeats: event.availableSeats,
      },
      count: attendees.length,
      data: attendees,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments({ status: "confirmed" });

    const events = await Event.find();
    const upcomingEvents = events.filter((e) => e.status === "Upcoming").length;
    const ongoingEvents = events.filter((e) => e.status === "Ongoing").length;
    const completedEvents = events.filter(
      (e) => e.status === "Completed"
    ).length;

    const recentBookings = await Booking.find({ status: "confirmed" })
      .populate("user", "name email")
      .populate("event", "title eventId")
      .sort({ bookingDate: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        stats: {
          totalEvents,
          totalBookings,
          upcomingEvents,
          ongoingEvents,
          completedEvents,
        },
        recentBookings,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
