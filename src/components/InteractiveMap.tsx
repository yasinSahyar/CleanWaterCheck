//interactiveMap.tsx
import React, { useEffect, useRef } from 'react';
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

interface InteractiveMapProps {
  center: [number, number];
  zoom: number;
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ center, zoom, onSelectLocation }) => {
  const mapRef = useRef<any>(null);

  // Update the map view when center or zoom changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '300px', width: '90%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <Marker
          position={center}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onSelectLocation({ lat: center[0], lng: center[1] }),
          }}
        >
          <Popup>
            Water quality information for this location.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;