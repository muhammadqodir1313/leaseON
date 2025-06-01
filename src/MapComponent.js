import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Helper component to handle map clicks
function LocationMarker({ onLocationSelect }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });

  return null;
}

function MapComponent({ center, onLocationSelect, markerPosition }) {
  return (
    <div className="map-container">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="rental-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition && (
          <Marker position={markerPosition}>
          </Marker>
        )}
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}

export default MapComponent; 