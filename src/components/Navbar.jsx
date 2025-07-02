import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  // 1. Declare menuOpen state here!
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = () => setMenuOpen(false);

  console.log("Navbar User:", user); // DEBUG

  return (
    <nav className="navbar">
      <div className="logo">Lokesh</div>

      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={handleNavClick}>
        <li><Link to="/">Hotels</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button className="logout-btn" onClick={logout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
