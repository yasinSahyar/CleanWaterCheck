import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import leaflet CSS
import L from 'leaflet'; // Import Leaflet for custom icons
import { useMySQL } from '../hooks/useMySQL'; // Import useMySQL to get token
import './HomePage.css';

// Fix for default Leaflet marker icon issue with webpack
const DefaultIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Utility {
  name: string;
  areasServed: string;
  populationServed: number;
  contaminantCount: number;
  violationCount: number;
}

interface UtilityInfo {
  city: string;
  quality: string;
  utilities: Utility[];
  // Assuming backend might provide lat/lng for the area center
  lat?: number; 
  lng?: number;
}

interface UserReport {
  id: number;
  title: string;
  created_at: string; // Assuming date comes as string
  address: string;
  notes: string;
  photo_url?: string; // Optional photo URL
  postal_code: string;
}

const HomePage: React.FC = () => {
  const [postalCodeInput, setPostalCodeInput] = useState<string>('');
  const [utilityInfo, setUtilityInfo] = useState<UtilityInfo | null>(null);
  const [userReports, setUserReports] = useState<UserReport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([61.9241, 25.7482]); // Default center of Finland
  const [mapZoom, setMapZoom] = useState<number>(6); // Default zoom level for Finland
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false); // Track if search has been done

  // Popular cities in Finland with their postal codes
  const popularCities = [
    { name: 'Helsinki', postalCode: '00100', coords: [60.1699, 24.9384] },
    { name: 'Espoo', postalCode: '02100', coords: [60.2055, 24.6559] },
    { name: 'Tampere', postalCode: '33100', coords: [61.4978, 23.7610] },
    { name: 'Vantaa', postalCode: '01300', coords: [60.2934, 25.0378] },
    { name: 'Oulu', postalCode: '90100', coords: [65.0121, 25.4651] }
  ];

  const handlePopularCityClick = (postalCode: string) => {
    setPostalCodeInput(postalCode);
    handleSearch();
  };

  const { token } = useMySQL(); // Get auth token

  const handleSearch = async () => {
    if (!postalCodeInput.match(/^\d{5}$/)) {
      setError('Please enter a valid 5-digit Finnish postal code.');
      setUtilityInfo(null);
      setUserReports([]);
      setSearchPerformed(true);
      return;
    }

    setError(null);
    setLoading(true);
    setUtilityInfo(null);
    setUserReports([]);
    setSearchPerformed(true);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    try {
      // Prepare headers for authenticated request
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Fetch data from both endpoints concurrently
      const [utilityResponse, reportsResponse] = await Promise.all([
        axios.get<UtilityInfo>(`${backendUrl}/api/water-info/${postalCodeInput}`),
        axios.get<UserReport[]>(`${backendUrl}/api/reports`, { 
          params: { postalCode: postalCodeInput },
          headers: headers 
        })
      ]);

      // Process utility info
      if (utilityResponse.data && utilityResponse.data.utilities.length > 0) {
          setUtilityInfo(utilityResponse.data);
           // Use lat/lng from response if available, otherwise keep default Finland center
          if (utilityResponse.data.lat && utilityResponse.data.lng) {
               setMapCenter([utilityResponse.data.lat, utilityResponse.data.lng]);
               setMapZoom(12); // Zoom in closer when location found
          } else {
               // Attempt to use a default location if specific lat/lng aren't provided
               // This part might need adjustment based on actual available data
               setMapCenter([61.9241, 25.7482]); // Revert to default Finland if no specific coords
               setMapZoom(6);
          }
      } else {
        // Handle case where utility info is not found but response is successful
        setUtilityInfo({ city: 'Unknown Area', quality: 'Unknown', utilities: [] });
        setMapCenter([61.9241, 25.7482]);
        setMapZoom(6);
      }

      // Process user reports
      setUserReports(reportsResponse.data || []);
      
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Failed to fetch data. Please check the postal code or try again later.');
      setUserReports([]);
      setUtilityInfo(null);
      setMapCenter([61.9241, 25.7482]); // Reset map on error
      setMapZoom(6);
    } finally {
      setLoading(false);
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fi-FI'); // Finnish date format
    } catch (e) {
      return 'Invalid Date';
    }
  };


  return (
    <div className="home-page">
      <h1>CleanWaterCheck Finland</h1>
      <p>Enter a postal code to check water quality and sanitation information in your area.</p>

      {/* Popular Cities Section */}
      <div className="popular-cities-section">
        <h2>Popular Cities</h2>
        <div className="popular-cities-grid">
          {popularCities.map((city) => (
            <button
              key={city.postalCode}
              className="city-button"
              onClick={() => handlePopularCityClick(city.postalCode)}
            >
              {city.name} ({city.postalCode})
            </button>
          ))}
        </div>
      </div>

      {/* Default Map View */}
      {!searchPerformed && (
        <div className="map-section">
          <h2>Finland Water Quality Map</h2>
          <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {popularCities.map((city) => (
              <Marker key={city.postalCode} position={city.coords as [number, number]}>
                <Popup>
                  {city.name} ({city.postalCode})
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter 5-digit postal code (e.g., 33100)"
          value={postalCodeInput}
          onChange={(e) => setPostalCodeInput(e.target.value)}
          maxLength={5}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Results Section */}
      {searchPerformed && !loading && !error && (
          <> 
            {/* Public Water Utilities Section */}
            {utilityInfo && (
              <div className="results-section">
                <h2>Public Water Utilities in {utilityInfo.city || 'Area'} ({postalCodeInput})</h2>
                {utilityInfo.utilities.length > 0 ? (
                  <>
                    <p><strong>Water Quality:</strong> {utilityInfo.quality || 'N/A'}</p>
                    <table className="results-table">
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
                        {utilityInfo.utilities.map((utility, index) => (
                          <tr key={index}>
                            <td>{utility.name || 'N/A'}</td>
                            <td>{utility.areasServed || 'N/A'}</td>
                            <td>{utility.populationServed?.toLocaleString() || 'N/A'}</td>
                            <td>{utility.contaminantCount ?? 'N/A'}</td> 
                            <td>{utility.violationCount ?? 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p>No public water utility information found for this postal code.</p>
                )}
              </div>
            )}

            {/* User Reports Section */}
            <div className="results-section">
              <h2>User reports in this area</h2>
              {userReports.length > 0 ? (
                <table className="results-table user-reports-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Address</th>
                      <th>Notes</th>
                      <th>Photo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userReports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.title || 'N/A'}</td>
                        <td>{formatDate(report.created_at)}</td>
                        <td>{report.address || 'N/A'}</td>
                        <td>{report.notes || 'N/A'}</td>
                        <td>
                          {report.photo_url ? (
                            <a href={`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}${report.photo_url}`} target="_blank" rel="noopener noreferrer">
                              <img 
                                src={`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}${report.photo_url}`} 
                                alt={`Report ${report.title}`}
                                className="report-photo-thumbnail"
                              />
                            </a>
                          ) : (
                            'No photo'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No user reports found for this postal code.</p>
              )}
            </div>
        </>
       )}
       {/* Only show map when utility info is available */} 
      {utilityInfo && (
          <div className="map-section">
            <h2>Map Location</h2>
            <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Add marker only if we have specific coords, maybe from utilityInfo */} 
                {utilityInfo.lat && utilityInfo.lng && (
                    <Marker position={[utilityInfo.lat, utilityInfo.lng]}>
                    <Popup>
                        {utilityInfo.city || `Area: ${postalCodeInput}`}
                    </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
      )}    
    </div>
  );
};

export default HomePage;