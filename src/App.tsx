// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar'; // Import the Navbar component
import About from './components/About'; // Create these components
import Data from './components/Data'; // Create these components
import WhatsInTheWater from './components/WhatsInTheWater'; // Create these components
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Navbar /> {/* Add the Navbar component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/data" element={<Data />} />
          <Route path="/whats-in-the-water" element={<WhatsInTheWater />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;