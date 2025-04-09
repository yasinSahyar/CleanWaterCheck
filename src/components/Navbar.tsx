// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Navbar.css'; // Optional: Add CSS for styling

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">About</Link>
        </li>
        <li className="navbar-item">
          <Link to="/data" className="navbar-link">Data</Link>
        </li>
        <li className="navbar-item">
          <Link to="/whats-in-the-water" className="navbar-link">What's in the Water?</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; // Ensure default export