import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WaterQualityReport from './components/WaterQualityReport';
import InteractiveMap from './components/InteractiveMap';
import Education from './components/Education';
import HomePage from './components/HomePage';
import './App.css';


const App: React.FC = () => {
  return (
    <div>
      <Header />
      <HomePage />
      <main>
        <WaterQualityReport />
        <InteractiveMap />
        <Education />
      </main>
      <Footer />
    </div>
  );
};

export default App;