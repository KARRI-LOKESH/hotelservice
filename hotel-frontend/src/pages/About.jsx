import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">🌐 Hotel Service Management System</h2>
      <p className="about-intro">
        A smart and efficient way to manage hotel data, bookings, pricing, and guest records. Built using <strong>Spring Boot + React</strong>, this system offers seamless CRUD operations and modern UI for real-time data handling.
      </p>

      <div className="about-grid">
        <div className="about-box">
          <h3>🏨 What is Hotel Management?</h3>
          <p>
            Hotel Service Management is a digital system that helps hotels organize and manage data like room availability, customer details, pricing, and services offered. It reduces manual work and enhances customer satisfaction.
          </p>
        </div>

        <div className="about-box">
          <h3>💡 Why is it Important?</h3>
          <p>
            It simplifies day-to-day operations, reduces human errors, and speeds up decision-making. From small hotels to large chains, such systems are essential for staying competitive in a tech-driven world.
          </p>
        </div>

        <div className="about-box">
          <h3>💰 Cost & Efficiency</h3>
          <p>
            This system minimizes costs by automating bookings, reducing paper-based work, and providing insights through analytics. Efficient management leads to higher profits and better customer service.
          </p>
        </div>

        <div className="about-box">
          <h3>🛠️ Tech Stack</h3>
          <p>
            Backend: Spring Boot REST API<br />
            Frontend: React + Vite<br />
            Database: MySQL<br />
            Styling: Custom CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
