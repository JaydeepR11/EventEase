const Event = require("../models/Event");

// Get All Events with Filters
exports.getAllEvents = async (req, res) => {
  try {
    const {
      category,
      location,
      startDate,
      endDate,
      status,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // Category filter
    if (category) {
      query.category = category;
    }

    // Location filter
    if (location) {
      query["location.type"] = location;
    }

    // Date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    // Get all events first
    let events = await Event.find(query)
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    // Filter by status if provided
    if (status) {
      events = events.filter((event) => event.status === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedEvents = events.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: events.length,
      totalPages: Math.ceil(events.length / limit),
      currentPage: parseInt(page),
      data: paginatedEvents,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
