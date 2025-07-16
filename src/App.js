// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartupPage from './components/startuppage';
import Booking from './components/Bookingpage/Booking';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartupPage />} />
        <Route path="/booking" element={<Booking />} />
       
      </Routes>
    </Router>
  );
}

export default App;
