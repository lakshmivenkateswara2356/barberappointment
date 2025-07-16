import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminStyles.css'; // Create your own styles or use Tailwind

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("https://barberappointment.onrender.com/api/bookings")
      .then(res => {
        setBookings(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch bookings", err);
      });
  }, []);

  return (
    <div className="admin-container">
      <h2>📋 Barber Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>🎂 Age</th>
            <th>🧰 Services</th>
            <th>⏰ Slot</th>
            <th>🗓️ Booked At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td>{b.name}</td>
              <td>{b.age}</td>
              <td>{b.services.join(", ")}</td>
              <td>{b.slot}</td>
              <td>{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
