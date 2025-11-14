import React from 'react';
import FestivalMap from '../components/FestivalMap';
import VibePanel from '../components/VibePanel';
import VibeDisplay from '../components/VibeDisplay';

function MapPage({ vibeData, onSubmitVibe, isConnected }) {
  return (
    <div style={{
      padding: '40px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <h1 style={{
        color: '#fff',
        fontSize: '36px',
        fontWeight: '700',
        marginBottom: '30px'
      }}>
        🗺️ Live Festival Map
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '30px'
      }}>
        <div>
          <FestivalMap vibeData={vibeData} />
        </div>
        <div>
          <VibePanel onSubmitVibe={onSubmitVibe} />
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <VibeDisplay vibeData={vibeData} />
      </div>
    </div>
  );
}

export default MapPage;
