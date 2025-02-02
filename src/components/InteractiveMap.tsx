import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const InteractiveMap: React.FC = () => {
  // Define position as a LatLngTuple (an array with exactly two numbers: [latitude, longitude])
  const position: L.LatLngTuple = [60.1699, 24.9384]; // Helsinki coordinates

  return (
    <MapContainer center={position} zoom={13} style={{ height: '300px', width: '90%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          A sample location for water quality report.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default InteractiveMap;