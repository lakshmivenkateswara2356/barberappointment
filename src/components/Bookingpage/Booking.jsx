import React, { useState } from "react";
import './Booking.css';
import Conform from '../..//Assets/conform.png'

const servicesList = [
  { label: "Haircut", price: 150, time: 20 },
  { label: "Beard Trim", price: 100, time: 15 },
  { label: "Facial", price: 250, time: 30 },
  { label: "Hair Color", price: 400, time: 45 },
];

const slots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:00 PM"
];

const Booking = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleServiceChange = (label) => {
    if (selectedServices.includes(label)) {
      setSelectedServices(selectedServices.filter(item => item !== label));
    } else {
      setSelectedServices([...selectedServices, label]);
    }
  };

  const totalPrice = selectedServices.reduce((acc, label) => {
    const item = servicesList.find(s => s.label === label);
    return acc + (item ? item.price : 0);
  }, 0);

  const totalTime = selectedServices.reduce((acc, label) => {
    const item = servicesList.find(s => s.label === label);
    return acc + (item ? item.time : 0);
  }, 0);

  const handleBooking = () => {
    // Later: send to backend & notify
    setConfirmed(true);
    console.log("Notify barber & customer ✅");
  };

  if (confirmed) {
    return (
      <div className="bookingcontainer" >
        <h2 className="customerdetailshed">✅ Appointment Confirmed</h2>
        <p className="paragraphtext"><strong>{name}</strong>, your slot at <strong>{selectedSlot}</strong> is booked!</p>
        <p className="paragraphtext">Services: {selectedServices.join(", ")}<br />
        Total: ₹{totalPrice} | Time: {totalTime} mins</p>
        <img
          src={Conform}
          alt="Success"
          width="200"
        />
      </div>
    );
  }

  return (
    <div className="bookingcontainer">
      <h2 className="customerdetailshed">Book Your Grooming Slot</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputfields"
        />
        <input
          type="number"
          placeholder="Your Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="inputfields"
        />
      </div>

      <h4 className="customerdetailshed">Select Services:</h4>
      {servicesList.map(service => (
        <label key={service.label} style={{ display: "block", marginBottom: 5, color:"#8a82fa" }}>
          <input
        
            type="checkbox"
            checked={selectedServices.includes(service.label)}
            onChange={() => handleServiceChange(service.label)}
          />
          {" "}
          {service.label} – ₹{service.price} ({service.time} mins)
        </label>
      ))}

      <div style={{ margin: "10px 0",color:"#8a82fa" }}>
        <strong>Total:</strong> ₹{totalPrice} | ⏱ {totalTime} mins
      </div>

      <h4 className="customerdetailshed">Select Time Slot:</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {slots.map(time => (
          <button
            key={time}
            onClick={() => setSelectedSlot(time)}
            style={{
              padding: "10px",
              background: selectedSlot === time ? "#8a82fa" : "#ddd",
              color: selectedSlot === time ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              flex: "1 1 40%"
            }}
          >
            {time}
          </button>
        ))}
      </div>

      <button
        disabled={!name || !age || !selectedServices.length || !selectedSlot}
        onClick={handleBooking}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#8a82fa",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px"
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
