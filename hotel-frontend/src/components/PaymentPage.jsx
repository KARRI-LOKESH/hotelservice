import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>No booking details found. Please go back and book again.</p>;
  }

  const {
    totalPrice,
    hotelId,
    bookingId,
    guests,
    rooms,
    checkInDate,
    checkOutDate,
  } = state;

  const handlePayment = () => {
    alert('Payment successful!');
    navigate('/');
  };

  return (
    <div className="payment-container">
      <h2>🔐 Payment Page</h2>
      <div className="payment-summary">
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Hotel ID:</strong> {hotelId}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Rooms:</strong> {rooms}</p>
        <p><strong>Check-in:</strong> {checkInDate}</p>
        <p><strong>Check-out:</strong> {checkOutDate}</p>
        <p className="total-price"><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>
      </div>

      <button className="pay-button" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
