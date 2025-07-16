import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Startup from './components/startuppage';
import Booking from './components/Bookingpage/Booking';
import OTP from './components/otpsystem/OTPLogin'
import './App.css';

function App() {
  return (
    <div>
      <OTP/>
    </div>
  );
}

export default App;
