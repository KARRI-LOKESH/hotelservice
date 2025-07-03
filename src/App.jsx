import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './components/HotelList';
import About from './pages/About';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './components/PaymentPage';
import BookingForm from './components/BookingForm';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking/:hotelId" element={<BookingForm />} />
        <Route path="/payment" element={<PaymentPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
