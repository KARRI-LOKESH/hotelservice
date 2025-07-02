import React, { useEffect, useState } from 'react';
import api from '../api';  // axios instance with baseURL http://localhost:8081
import './HotelList.css';
import { useNavigate } from 'react-router-dom';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pricePerNight: '',
    imageUrl: '',
  });
  const [newHotel, setNewHotel] = useState({
    name: '',
    address: '',
    city: '',
    pricePerNight: '',
    imageFile: null,
  });
  const [editImageFile, setEditImageFile] = useState(null);

  // New state for showing clicked image popup
  const [popupImageUrl, setPopupImageUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await api.get('/hotels');
      setHotels(res.data);
    } catch (error) {
      alert('Failed to load hotels.');
      console.error(error);
    }
  };

  const handleAddChange = (e) => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewHotel({ ...newHotel, imageFile: e.target.files[0] });
  };

  const addHotel = async () => {
    if (!newHotel.name || !newHotel.address || !newHotel.city || !newHotel.pricePerNight) {
      alert("Please fill all fields");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', newHotel.name);
      formDataToSend.append('address', newHotel.address);
      formDataToSend.append('city', newHotel.city);
      formDataToSend.append('pricePerNight', newHotel.pricePerNight);
      if (newHotel.imageFile) {
        formDataToSend.append('image', newHotel.imageFile);
      }

      await api.post('/hotels', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setNewHotel({ name: '', address: '', city: '', pricePerNight: '', imageFile: null });
      fetchHotels();
    } catch (error) {
      alert('Failed to add hotel.');
      console.error(error);
    }
  };

  const deleteHotel = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      await api.delete(`/hotels/${id}`);
      fetchHotels();
    } catch (error) {
      alert('Failed to delete hotel.');
      console.error(error);
    }
  };

  const handleEditClick = (hotel) => {
    setEditingHotel(hotel);
    setFormData(hotel);
    setEditImageFile(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditFileChange = (e) => {
    setEditImageFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.address || !formData.city || !formData.pricePerNight) {
      alert("Please fill all fields");
      return;
    }

    try {
      let dataToSend;

      if (editImageFile) {
        dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('address', formData.address);
        dataToSend.append('city', formData.city);
        dataToSend.append('pricePerNight', formData.pricePerNight);
        dataToSend.append('image', editImageFile);
      } else {
        dataToSend = {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          pricePerNight: formData.pricePerNight,
          imageUrl: formData.imageUrl,
        };
      }

      await api.put(
        `/hotels/${editingHotel.id}`,
        dataToSend,
        editImageFile
          ? { headers: { 'Content-Type': 'multipart/form-data' } }
          : {}
      );

      setEditingHotel(null);
      setEditImageFile(null);
      fetchHotels();
    } catch (error) {
      alert('Failed to update hotel.');
      console.error(error);
    }
  };

  // Show popup centered image on click
  const handleImageClick = (e, imageUrl) => {
    e.stopPropagation();
    setPopupImageUrl(imageUrl);
  };

  // Close popup on background click
  const handlePopupClose = () => {
    setPopupImageUrl(null);
  };

  return (
    <div className="hotel-container">
      <h1 className="hotel-title">🏨 Hotel Management System</h1>
      <p className="hotel-subtitle">Empowering hospitality through smart and scalable technology.</p>

      {/* Add New Hotel Form */}
      <div className="add-form">
        <h3>Add New Hotel</h3>
        <input
          type="text"
          name="name"
          value={newHotel.name}
          onChange={handleAddChange}
          placeholder="Hotel Name"
        />
        <input
          type="text"
          name="address"
          value={newHotel.address}
          onChange={handleAddChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          value={newHotel.city}
          onChange={handleAddChange}
          placeholder="City"
        />
        <input
          type="number"
          name="pricePerNight"
          value={newHotel.pricePerNight}
          onChange={handleAddChange}
          placeholder="Price per Night"
          min="0"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button className="edit-btn" onClick={addHotel}>Add Hotel</button>
      </div>

      {/* Hotel List */}
      <div className="hotel-list">
        {hotels.length === 0 ? (
          <p className="no-hotels">No hotels found.</p>
        ) : (
          hotels.map((hotel) => {
            const imageUrl = `http://localhost:8081/${hotel.imageUrl.replace(/^\/+/, '')}`;
            return (
              <div className="hotel-card" key={hotel.id}>
                {hotel.imageUrl && (
                  <img
                    src={imageUrl}
                    alt={hotel.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '12px 12px 0 0',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => handleImageClick(e, imageUrl)}
                  />
                )}
                <div className="hotel-name">{hotel.name}</div>
                <div className="hotel-info">
                  ₹{hotel.pricePerNight} / night<br />
                  {hotel.address}, {hotel.city}
                </div>
                <div className="hotel-actions">
                  <button className="view-btn" onClick={() => alert(JSON.stringify(hotel, null, 2))}>View</button>
                  <button className="edit-btn" onClick={() => handleEditClick(hotel)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteHotel(hotel.id)}>Delete</button>
                  <button className="book-btn" onClick={() => navigate(`/booking/${hotel.id}`)}>Book</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Centered Image Popup */}
      {popupImageUrl && (
        <div className="image-popup-overlay" onClick={handlePopupClose}>
          <div className="image-popup-content" onClick={e => e.stopPropagation()}>
            <img src={popupImageUrl} alt="Hotel" />
            <button className="popup-close-btn" onClick={handlePopupClose}>×</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingHotel && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Hotel</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              name="pricePerNight"
              value={formData.pricePerNight}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              min="0"
            />
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL (optional)"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleEditFileChange}
            />
            <div className="modal-actions">
              <button onClick={handleUpdate} className="edit-btn">Update</button>
              <button onClick={() => { setEditingHotel(null); setEditImageFile(null); }} className="delete-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelList;
