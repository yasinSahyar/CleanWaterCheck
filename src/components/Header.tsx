// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './HomePage.css'; // Optional: Add CSS for styling

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <h1>CleanWaterCheck Finland</h1>
      </Link>
    </header>
  );
};

export default Header;