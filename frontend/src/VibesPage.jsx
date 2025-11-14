import React from 'react';
import VibeDisplay from '../components/VibeDisplay';

function VibesPage({ vibeData }) {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ color: '#fff', fontSize: '36px', marginBottom: '30px' }}>
        ⚡ Live Vibes
      </h1>
      <VibeDisplay vibeData={vibeData} />
    </div>
  );
}

export default VibesPage;
