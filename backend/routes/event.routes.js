const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
