const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.use(protect);
router.use(restrictTo("admin"));

router.post("/events", adminController.createEvent);
router.put("/events/:id", adminController.updateEvent);
router.delete("/events/:id", adminController.deleteEvent);
router.get("/events/:id/attendees", adminController.getEventAttendees);
router.get("/dashboard", adminController.getDashboardStats);

module.exports = router;
