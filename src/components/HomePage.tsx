import React, { useState } from 'react';
import InteractiveMap from './InteractiveMap';
import WaterQualityReport from './WaterQualityReport';
import Education from './Education';
import postalCodes from '../data/postalCodes.json'; // Import postal code data
import './HomePage.css';

interface Location {
  lat: number;
  lng: number;
}

interface PostalCodeData {
  postalCode: string;
  city: string;
  lat: number;
  lng: number;
  waterQuality: string;
  areasServed: string;
  populationServed: number;
  contaminantCount: number;
  violationCount: number;
}

const HomePage: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [results, setResults] = useState<PostalCodeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([60.1699, 24.9384]); // Default to Helsinki
  const [mapZoom, setMapZoom] = useState<number>(8); // Default zoom level


  // List of Finland's most populous cities with postal codes
  const mostPopulousCities = [
    { postalCode: '00100', city: 'Helsinki' },
    { postalCode: '02100', city: 'Espoo' },
    { postalCode: '33100', city: 'Tampere' },
    { postalCode: '01300', city: 'Vantaa' },
    { postalCode: '20100', city: 'Turku' },
    { postalCode: '90100', city: 'Oulu' },
    { postalCode: '40100', city: 'Jyväskylä' },
    { postalCode: '15100', city: 'Lahti' },
    { postalCode: '70100', city: 'Kuopio' },
    { postalCode: '28100', city: 'Pori' },
    { postalCode: '53100', city: 'Lappeenranta' },
    { postalCode: '65100', city: 'Vaasa' },
    { postalCode: '48100', city: 'Kotka' },
    { postalCode: '80100', city: 'Joensuu' },
    { postalCode: '13100', city: 'Hämeenlinna' },
  ];

  const handleSearch = () => {
    if (!zipCode) {
      setError('Please enter a valid postal code.');
      return;
    }

    // Find the postal code in the data
    const foundData = postalCodes.find((data) => data.postalCode === zipCode);

    if (foundData) {
      setResults(foundData);
      setSelectedLocation({ lat: foundData.lat, lng: foundData.lng });
      setMapCenter([foundData.lat, foundData.lng]); // Update map center
      setMapZoom(13); // Zoom in to the selected location
      setError(null);
    } else {
      setError('Postal code not found.');
      setResults(null);
      setSelectedLocation(null);
      setMapCenter([60.1699, 24.9384]); // Reset to default center
      setMapZoom(8); // Reset to default zoom
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    console.log('Selected Location:', location);
  };

  const handleReportSubmit = (report: { turbidity: string; odor: string; location: string }) => {
    console.log('Submitted Report:', report);
  };

  return (
    <div className="home-page">
      <h1>CleanWaterCheck Finland</h1>
      <p>Enter a postal code to check water quality and sanitation information in your area.</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter postal code (e.g., 00100)"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {results && (
        <div className="results">
          <h2>Public Water Utilities in {results.city} ({results.postalCode})</h2>
          <p><strong>Water Quality:</strong> {results.waterQuality}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Areas Served</th>
                <th>Population Served</th>
                <th>Contaminant Count</th>
                <th>Violation Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{results.city} Water Utility</td>
                <td>{results.areasServed}</td>
                <td>{results.populationServed.toLocaleString()}</td>
                <td>{results.contaminantCount}</td>
                <td>{results.violationCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <InteractiveMap
        center={mapCenter}
        zoom={mapZoom}
        onSelectLocation={handleLocationSelect}
      />

      {/* Most Populous ZIP Codes Section */}
      <div className="most-populous">
        <h2>Most Populous ZIP Codes</h2>
        <ul>
          {mostPopulousCities.map((city, index) => (
            <li key={index}>
              {city.postalCode} - {city.city}
            </li>
          ))}
        </ul>
      </div>

      <WaterQualityReport onSubmit={handleReportSubmit} />
      <Education />
    </div>
  );
};

export default HomePage;