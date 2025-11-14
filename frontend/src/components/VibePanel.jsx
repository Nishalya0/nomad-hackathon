import React, { useState, useEffect } from 'react';

function VibePanel({ onSubmitVibe }) {
  const [selectedStage, setSelectedStage] = useState('mainstage');
  const [detectedStage, setDetectedStage] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  
  const stages = [
    { id: 'mainstage', name: 'Main Stage', lat: 30.3548, lng: 76.3646 },
    { id: 'openair', name: 'Open Air Theatre', lat: 30.3552, lng: 76.3650 },
    { id: 'techzone', name: 'Tech Arena', lat: 30.3545, lng: 76.3655 },
    { id: 'indoorauditorium', name: 'Auditorium', lat: 30.3555, lng: 76.3642 },
    { id: 'quadrangle', name: 'Quadrangle', lat: 30.3550, lng: 76.3648 },
    { id: 'foodcourt', name: 'Food Court', lat: 30.3543, lng: 76.3652 }
  ];
  
  const emojis = [
    { emoji: '🔥', label: 'Lit!' },
    { emoji: '🎉', label: 'Amazing' },
    { emoji: '😴', label: 'Boring' },
    { emoji: '😬', label: 'Too Crowded' }
  ];
  
  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };
  
  // Find nearest stage based on user's GPS location
  const findNearestStage = (userLat, userLng) => {
    let nearestStage = stages[0];
    let minDistance = Infinity;
    
    stages.forEach(stage => {
      const distance = calculateDistance(userLat, userLng, stage.lat, stage.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestStage = stage;
      }
    });
    
    return { stage: nearestStage, distance: minDistance };
  };
  
  // Get user's location and detect nearest stage
  const detectLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by browser');
      setIsLoadingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const { stage, distance } = findNearestStage(latitude, longitude);
        
        setDetectedStage(stage.name);
        setSelectedStage(stage.id);
        setIsLoadingLocation(false);
        
        console.log(`📍 Detected location: ${stage.name} (${Math.round(distance)}m away)`);
      },
      (error) => {
        let errorMessage = 'Unable to get location';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timeout';
            break;
          default:
            errorMessage = 'Unknown location error';
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  
  // Auto-detect location on component mount
  useEffect(() => {
    detectLocation();
  }, []);
  
  const handleVibeSubmit = (emoji) => {
    onSubmitVibe({ stageId: selectedStage, emoji });
  };
  
  return (
    <div style={{
      background: '#16213e',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#e94560', marginTop: 0 }}>
        📱 Submit Live Vibe
      </h3>
      
      {/* Location Detection Status */}
      <div style={{ 
        marginBottom: '15px',
        padding: '12px',
        background: '#0f3460',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        {isLoadingLocation && (
          <div style={{ color: '#ffb300' }}>
            📍 Detecting your location...
          </div>
        )}
        {detectedStage && !isLoadingLocation && (
          <div style={{ color: '#00ff00' }}>
            ✅ Detected: {detectedStage}
          </div>
        )}
        {locationError && (
          <div style={{ color: '#ff6b6b' }}>
            ⚠️ {locationError}
          </div>
        )}
      </div>
      
      {/* Manual Location Selector with Auto-detect Button */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <label style={{ color: '#fff', fontSize: '14px' }}>
            Stage Location:
          </label>
          <button
            onClick={detectLocation}
            disabled={isLoadingLocation}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: isLoadingLocation ? '#555' : '#667eea',
              color: '#fff',
              fontSize: '12px',
              cursor: isLoadingLocation ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isLoadingLocation ? '⏳' : '📍'} {isLoadingLocation ? 'Detecting...' : 'Auto-detect'}
          </button>
        </div>
        <select 
          value={selectedStage}
          onChange={(e) => {
            setSelectedStage(e.target.value);
            setDetectedStage(null); // Clear auto-detection when manually changed
          }}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '2px solid #667eea',
            background: '#1a1a2e',
            color: '#fff',
            fontSize: '16px'
          }}
        >
          {stages.map(stage => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Vibe Emoji Buttons */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>
          How's the vibe?
        </label>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px'
        }}>
          {emojis.map(({ emoji, label }) => (
            <button
              key={emoji}
              onClick={() => handleVibeSubmit(emoji)}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #667eea',
                background: '#0f3460',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#667eea';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#0f3460';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {emoji} <br/>
              <span style={{ fontSize: '12px' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Info Text */}
      <p style={{ 
        color: '#999', 
        fontSize: '12px', 
        marginTop: '15px',
        marginBottom: 0
      }}>
        💡 Location detected automatically. Change manually if needed.
      </p>
    </div>
  );
}

export default VibePanel;
