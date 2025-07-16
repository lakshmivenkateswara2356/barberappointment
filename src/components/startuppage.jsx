import React from "react";
import './startuppage.css';
import barberpng from '../Assets/Barber-amico.png';
import { useNavigate } from 'react-router-dom';

const StartupPage = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
    <div className="startuppagecontainer">
      <div className="imagearrange">
        <img src={barberpng} alt="barberpng" className="barberpngimg" />
      </div>
      <div className="textcontent">
        <div>
          <h1 className="bookantext">Book an </h1>
          <h1 className="appointmentttxt">Appointment</h1>
        </div>
        <div>
          <p className="paragraphtext">
            Schedule your Appointment Online And Get Fresh New Look
          </p>
        </div>
        <button className="booknowbutton" onClick={handleBookingClick}>
          Book now
        </button>
      </div>
    </div>
  );
};

export default StartupPage;
