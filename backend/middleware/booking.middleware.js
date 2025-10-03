const { formatDate } = require("../utils/helpers");

// Custom middleware to log bookings
exports.logBooking = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    if (res.statusCode === 200 || res.statusCode === 201) {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (parsedData.success && parsedData.data && parsedData.data.bookingId) {
        const logMessage = `
════════════════════════════════════════════
         NEW BOOKING LOGGED                 
════════════════════════════════════════════
 Booking ID: ${parsedData.data.bookingId}
 User: ${req.user.name} (${req.user.email})
 Event: ${parsedData.data.event?.title || "N/A"}
 Seats: ${parsedData.data.seats}
 Timestamp: ${formatDate(new Date())} ${new Date().toLocaleTimeString()}
════════════════════════════════════════════
        `;
        console.log(logMessage);
      }
    }

    originalSend.call(this, data);
  };

  next();
};
