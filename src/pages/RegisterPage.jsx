import React, { useState } from 'react';
import API from '../api';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await API.post('/auth/register', { email, password });
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        alert('User already exists');
      } else {
        alert('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Register to get started</p>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
