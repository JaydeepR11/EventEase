const jwt = require("jsonwebtoken");

// Generate Event ID: EVT-[MMM][YYYY]-[Random3]
const generateEventId = (eventDate) => {
  const date = new Date(eventDate);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `EVT-${month}${year}-${random}`;
};

// Format date to DD-MMM-YYYY
const formatDate = (date) => {
  const d = new Date(date);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "7d",
  });
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateEventId,
  formatDate,
  generateToken,
  verifyToken,
};
