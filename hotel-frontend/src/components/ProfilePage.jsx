import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth(); // assume updateUser is provided
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Populate form from user info
      setProfile({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || '',
        address: user.address || '',
        paymentMethod: user.paymentMethod || '',
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    // Call context or API to update user profile
    if (updateUser) {
      updateUser(profile);
      alert('Profile updated successfully!');
    } else {
      alert('Update function not implemented');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <label>Email (readonly)</label>
        <input type="email" value={profile.email} readOnly />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Your Address"
        />

        <label>Preferred Payment Method</label>
        <select
          name="paymentMethod"
          value={profile.paymentMethod}
          onChange={handleChange}
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Cash">Cash</option>
        </select>

        <button className="profile-button save" onClick={handleSave}>
          Save Changes
        </button>

        <button className="profile-button logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
