import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function FestivalMap({ vibeData }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const center = [30.3550, 76.3648];

  const stages = [
    { id: 'mainstage', name: 'Main Stage', lat: 30.3548, lng: 76.3646, color: '#ff6b35' },
    { id: 'openair', name: 'Open Air Theatre', lat: 30.3552, lng: 76.3650, color: '#f7931e' },
    { id: 'techzone', name: 'Tech Arena', lat: 30.3545, lng: 76.3655, color: '#ffd700' },
    { id: 'indoorauditorium', name: 'Auditorium', lat: 30.3555, lng: 76.3642, color: '#f25c54' },
    { id: 'quadrangle', name: 'Quadrangle', lat: 30.3550, lng: 76.3648, color: '#fa3c7c' },
    { id: 'foodcourt', name: 'Food Court', lat: 30.3543, lng: 76.3652, color: '#ffb300' }
  ];

  const calculateIntensity = (stageData) => {
    if (!stageData) return 0;
    const { fire = 0, party = 0, crowded = 0, sleepy = 0 } = stageData;
    const intensity = (fire * 1.5) + (party * 1.2) + (crowded * 2) - (sleepy * 0.5);
    return Math.max(0, intensity);
  };

  const getVibeColor = (stageData) => {
    if (!stageData) return '#667eea';
    const { fire = 0, party = 0, crowded = 0, sleepy = 0 } = stageData;
    const total = fire + party + crowded + sleepy;
    
    if (total === 0) return '#667eea';
    if (crowded > fire && crowded > party) return '#ff0000';
    if (fire >= party) return '#ff6b35';
    if (party > fire) return '#ffd700';
    return '#667eea';
  };

  const getMarkerSize = (stageData) => {
    if (!stageData) return 25;
    const { fire = 0, party = 0, crowded = 0, sleepy = 0 } = stageData;
    const total = fire + party + crowded + sleepy;
    return 25 + Math.min(total * 2, 40);
  };

  const getActivityLevel = (intensity) => {
    if (intensity > 20) return 'ON FIRE 🔥';
    if (intensity > 10) return 'VERY HOT';
    if (intensity > 5) return 'ACTIVE';
    return 'CHILL';
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: center,
        zoom: 16,
        minZoom: 15,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add enhanced stage markers
    stages.forEach(stage => {
      const data = vibeData[stage.id];
      const intensity = calculateIntensity(data);
      const color = getVibeColor(data);
      const size = getMarkerSize(data);
      const total = data ? (data.fire + data.party + data.crowded + data.sleepy) : 0;
      const activityLevel = getActivityLevel(intensity);

      const pulseIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="position: relative; width: ${size}px; height: ${size}px;">
            ${intensity > 8 ? `
              <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: ${color};
                opacity: 0.3;
                animation: pulse 2s infinite;
              "></div>
            ` : ''}
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: ${color};
              border: 4px solid #fff;
              box-shadow: 0 6px 20px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: ${size * 0.5}px;
            ">
              📍
            </div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker([stage.lat, stage.lng], { icon: pulseIcon })
        .addTo(mapInstanceRef.current);

      const popupContent = `
        <div style="font-family: 'Poppins', Arial, sans-serif; min-width: 200px;">
          <h3 style="color: ${stage.color}; margin: 0 0 12px 0; font-size: 18px; font-weight: bold;">
            ${stage.name}
          </h3>
          <div style="
            background: linear-gradient(135deg, ${color}20 0%, ${color}10 100%);
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 2px solid ${color};
          ">
            <div style="color: ${color}; font-weight: bold; margin-bottom: 8px; font-size: 14px;">
              ${activityLevel}
            </div>
            <strong style="color: #333; font-size: 13px;">Live Vibes:</strong><br/>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
              <div style="text-align: center; background: rgba(255,107,53,0.1); padding: 6px; border-radius: 4px;">
                <div style="font-size: 20px;">🔥</div>
                <div style="font-weight: bold; color: #ff6b35;">${data?.fire || 0}</div>
              </div>
              <div style="text-align: center; background: rgba(255,215,0,0.1); padding: 6px; border-radius: 4px;">
                <div style="font-size: 20px;">🎉</div>
                <div style="font-weight: bold; color: #ffd700;">${data?.party || 0}</div>
              </div>
              <div style="text-align: center; background: rgba(102,126,234,0.1); padding: 6px; border-radius: 4px;">
                <div style="font-size: 20px;">😴</div>
                <div style="font-weight: bold; color: #667eea;">${data?.sleepy || 0}</div>
              </div>
              <div style="text-align: center; background: rgba(255,0,0,0.1); padding: 6px; border-radius: 4px;">
                <div style="font-size: 20px;">😬</div>
                <div style="font-weight: bold; color: #ff0000;">${data?.crowded || 0}</div>
              </div>
            </div>
          </div>
          <div style="text-align: center; color: #666; font-size: 13px; padding: 8px; background: #f5f5f5; border-radius: 6px;">
            Total reactions: <strong style="color: ${stage.color}; font-size: 16px;">${total}</strong>
          </div>
        </div>
      `;
      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup'
      });
      
      markersRef.current.push(marker);
    });

    // Add pulse animation CSS
    if (!document.getElementById('pulse-animation')) {
      const style = document.createElement('style');
      style.id = 'pulse-animation';
      style.innerHTML = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.2; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `;
      document.head.appendChild(style);
    }

  }, [vibeData]);

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={mapRef} 
        style={{ 
          height: '600px', 
          width: '100%', 
          borderRadius: '15px',
          border: '3px solid var(--sat-gold)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
        }} 
      />
      
      {/* Simplified Legend */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        background: 'rgba(255,255,255,0.95)',
        padding: '12px 14px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: 1000,
        fontSize: '12px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333', fontSize: '13px' }}>
          🎯 Activity Levels
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%',
              background: '#ff0000',
              boxShadow: '0 0 8px rgba(255,0,0,0.5)'
            }}></div>
            <span style={{ color: '#666' }}>Crowded</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%',
              background: '#ff6b35',
              boxShadow: '0 0 8px rgba(255,107,53,0.5)'
            }}></div>
            <span style={{ color: '#666' }}>On Fire</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%',
              background: '#ffd700',
              boxShadow: '0 0 8px rgba(255,215,0,0.5)'
            }}></div>
            <span style={{ color: '#666' }}>Party Mode</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%',
              background: '#667eea'
            }}></div>
            <span style={{ color: '#666' }}>Chill</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FestivalMap;
