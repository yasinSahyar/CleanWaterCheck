import React, { useState } from 'react';
import './HomePage.css'; // Optional: for styling

const HomePage: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [results, setResults] = useState<any>(null); // Replace 'any' with a proper type for your data
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!zipCode) {
      setError('Please enter a valid zip code.');
      return;
    }

    try {
      // Simulate an API call with mock data
      const mockData = {
        zipCode,
        waterQuality: 'Excellent',
        sanitation: 'Safely managed',
        waterBodies: [
          { name: 'Lake Saimaa', quality: 'Good' },
          { name: 'Vantaa River', quality: 'Moderate' },
        ],
      };

      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResults(mockData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      setResults(null);
    }
  };

  return (
    <div className="home-page">
      <h1>CleanWaterCheck</h1>
      <p>Enter a zip code to check water quality and sanitation information in your area.</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {results && (
        <div className="results">
          <h2>Results for {results.zipCode}</h2>
          <p><strong>Water Quality:</strong> {results.waterQuality}</p>
          <p><strong>Sanitation:</strong> {results.sanitation}</p>
          <h3>Nearby Water Bodies:</h3>
          <ul>
            {results.waterBodies.map((body: any, index: number) => (
              <li key={index}>
                {body.name}: {body.quality}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;