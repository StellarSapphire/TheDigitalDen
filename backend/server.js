// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------------------
// Middleware
app.use(cors());
app.use(express.json());

// ------------------------------
// Temporary in-memory "database"
let users = [];

// ------------------------------
// API routes (prefixed with /api)
app.post("/api/reservations", (req, res) => {
  const { firstName, lastName, email, phone, sportSkill } = req.body;

  if (!firstName || !lastName || !email || !sportSkill) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  console.log("New reservation:", req.body);
  return res.json({ message: "Reservation submitted successfully!" });
});

app.post("/api/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User with this email already exists." });
  }

  const newUser = { name, email, password, role };
  users.push(newUser);

  console.log("New user created:", newUser);
  return res.json({ message: "Account created successfully!" });
});

// ------------------------------
// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// ------------------------------
// Frontend catch-all (SPA), ignoring API routes
app.get(/.*/, (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  } else {
    res.status(404).send("Not Found");
  }
});

// ------------------------------
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});