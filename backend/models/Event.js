const mongoose = require("mongoose");
const { generateEventId } = require("../utils/helpers");

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      return generateEventId(this.date);
    },
  },
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Music", "Tech", "Business", "Sports", "Arts", "Food", "Other"],
  },
  location: {
    type: {
      type: String,
      enum: ["Online", "In-Person"],
      required: true,
    },
    address: {
      type: String,
      required: function () {
        return this.location && this.location.type === "In-Person";
      },
    },
    city: String,
    country: String,
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
  },
  endDate: {
    type: Date,
  },
  time: {
    type: String,
    required: [true, "Event start time is required"],
  },
  endTime: {
    type: String,
  },
  capacity: {
    type: Number,
    required: [true, "Event capacity is required"],
    min: 1,
  },
  bookedSeats: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  imageUrl: {
    type: String,
    default: "https://via.placeholder.com/400x300",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for event status
eventSchema.virtual("status").get(function () {
  const now = new Date();
  const eventDate = new Date(this.date);
  const eventEndDate = this.endDate ? new Date(this.endDate) : eventDate;

  now.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  eventEndDate.setHours(23, 59, 59, 999);

  if (now < eventDate) {
    return "Upcoming";
  } else if (now >= eventDate && now <= eventEndDate) {
    return "Ongoing";
  } else {
    return "Completed";
  }
});

// Virtual for available seats
eventSchema.virtual("availableSeats").get(function () {
  return this.capacity - this.bookedSeats;
});

eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Event", eventSchema);
