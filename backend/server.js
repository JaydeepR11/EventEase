const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const socketManager = require("./utils/socket");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173", "https://event-ease-ochre.vercel.app"],
    methods: ["GET", "POST"],
  },
});

// Initialize socket
socketManager.init(io);

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://event-ease-ochre.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/eventease", {
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/events", require("./routes/event.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "EventEase API is running" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
