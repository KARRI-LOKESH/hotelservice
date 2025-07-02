import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import './BookingForm.css';

const BookingForm = () => {
  const { hotelId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await API.get(`/hotels/${hotelId}`);
        setHotel(res.data);
        setPricePerNight(res.data.pricePerNight || 0);
      } catch (err) {
        console.error('Failed to fetch hotel data:', err);
      }
    };
    if (hotelId) fetchHotel();
  }, [hotelId]);

  useEffect(() => {
    if (checkInDate && checkOutDate && pricePerNight) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      if (nights > 0) {
        const total = nights * pricePerNight * guests * rooms;
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    }
  }, [checkInDate, checkOutDate, pricePerNight, guests, rooms]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to book");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    try {
      const response = await API.post('/bookings', {
        hotelId: hotelId,
        userId: user.id,
        checkInDate,
        checkOutDate,
        guests,
        rooms
      });

      alert('Booking successful! Redirecting to payment...');
      navigate('/payment', {
        state: {
          bookingId: response.data.id,
          totalPrice,
          hotelId,
          guests,
          rooms,
          checkInDate,
          checkOutDate,
        },
      });
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (!hotel) return <p>Loading hotel info...</p>;

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>Book Your Stay at {hotel.name}</h3>

      <label>Check-in Date</label>
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        required
        min={todayStr}
      />

      <label>Check-out Date</label>
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        required
        min={checkInDate || todayStr}
      />

      <label>Guests</label>
      <input
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
      />

      <label>Rooms</label>
      <input
        type="number"
        min="1"
        value={rooms}
        onChange={(e) => setRooms(Number(e.target.value))}
        required
      />

      <p className="booking-price">
        Total: ₹{isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}
      </p>

      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
