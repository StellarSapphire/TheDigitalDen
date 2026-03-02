// AI was utilized to assist in the development of this code

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());              // Allow requests from frontend
app.use(express.json());      // Parse JSON request bodies

// Temporary in-memory "database"
let users = [];

// ------------------------------
// Reservation endpoint (you already have this)
app.post("/reservations", (req, res) => {
  const { firstName, lastName, email, phone, sportSkill } = req.body;

  if (!firstName || !lastName || !email || !sportSkill) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  // For demo, just log the reservation
  console.log("New reservation:", req.body);

  return res.json({ message: "Reservation submitted successfully!" });
});

// ------------------------------
// Signup endpoint
app.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User with this email already exists." });
  }

  // Save user in memory (for now)
  const newUser = { name, email, password, role };
  users.push(newUser);

  console.log("New user created:", newUser);

  return res.json({ message: "Account created successfully!" });
});

// ------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});