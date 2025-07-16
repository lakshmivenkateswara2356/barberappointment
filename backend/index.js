// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let bookings = [];

app.post("/api/book", (req, res) => {
  const { name, age, services, total, time, slot } = req.body;

  // Check if the slot is already booked
  const alreadyBooked = bookings.find(b => b.slot === slot);
  if (alreadyBooked) {
    return res.status(400).json({ message: "Slot already booked!" });
  }

  const newBooking = { name, age, services, total, time, slot };
  bookings.push(newBooking);
  res.status(201).json({ message: "Booking successful!", booking: newBooking });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
