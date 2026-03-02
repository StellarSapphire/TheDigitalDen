const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is working!");
});

// Example: Save a reservation
let reservations = []; // In-memory storage for now

app.post("/reservations", (req, res) => {
  const { firstName, lastName, email, phone, sportSkill } = req.body;

  if (!firstName || !lastName || !email || !sportSkill) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  const newReservation = { firstName, lastName, email, phone, sportSkill };
  reservations.push(newReservation);

  res.status(201).json({ message: "Reservation saved", reservation: newReservation });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});