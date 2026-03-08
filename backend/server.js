// AI was utilized for the development of this code
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Use port from environment (Render) or fallback to 5000 (local)
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());              // Allow requests from frontend
app.use(express.json());      // Parse JSON request bodies

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Temporary in-memory "database"
let users = [];

// ------------------------------
// Reservation endpoint
app.post("/reservations", (req, res) => {
  const { firstName, lastName, email, phone, sportSkill } = req.body;

  if (!firstName || !lastName || !email || !sportSkill) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  console.log("New reservation:", req.body);
  return res.json({ message: "Reservation submitted successfully!" });
});

// ------------------------------
// Signup endpoint
app.post("/signup", (req, res) => {
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
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});