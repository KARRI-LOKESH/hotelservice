import React, { useState } from 'react';
import API from '../api';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      const userData = response.data.user || response.data;
      login(userData);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back 👋</h2>
      <p className="auth-subtitle">Login to your account</p>
      <form className="auth-form" onSubmit={handleLogin}>
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
        <button className="auth-button" type="submit">Login</button>
        <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
