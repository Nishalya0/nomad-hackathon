import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// FIX for missing marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function FestivalMap() {
  const stages = [
    { id: 1, name: 'Main Stage', lat: 30.3549, lng: 76.3656, emoji: '🎸' },
    { id: 2, name: 'Open Air Theatre', lat: 30.3560, lng: 76.3645, emoji: '🎭' },
    { id: 3, name: 'Tech Exhibition Arena', lat: 30.3540, lng: 76.3670, emoji: '🔬' },
    { id: 4, name: 'Indoor Auditorium', lat: 30.3545, lng: 76.3650, emoji: '🎤' },
    { id: 5, name: 'Campus Quadrangle', lat: 30.3555, lng: 76.3660, emoji: '💃' },
    { id: 6, name: 'Festival Food Court', lat: 30.3550, lng: 76.3665, emoji: '🍕' }
  ];

  return (
    <MapContainer 
      center={[30.3549, 76.3656]}
      zoom={16} 
      style={{ 
        height: '600px', 
        width: '100%', 
        borderRadius: '12px',
        border: '2px solid #667eea'
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {stages.map(stage => (
        <Marker key={stage.id} position={[stage.lat, stage.lng]}>
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                {stage.emoji}
              </div>
              <h3 style={{ margin: '5px 0', color: '#667eea', fontSize: '16px' }}>
                {stage.name}
              </h3>
              <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                Saturnalia 2025
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default FestivalMap;
