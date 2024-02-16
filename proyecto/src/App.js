import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/home';
import Booking from './views/booking/booking';
import New from './views/newRestaurant/new';
import Restaurants from './views/restaurants/restaurants';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/new" element={<New />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
