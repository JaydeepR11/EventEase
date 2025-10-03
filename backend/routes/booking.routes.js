const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const { protect } = require("../middleware/auth.middleware");
const { logBooking } = require("../middleware/booking.middleware");

router.use(protect);

router.post("/", logBooking, bookingController.createBooking);
router.get("/my-bookings", bookingController.getMyBookings);
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;
