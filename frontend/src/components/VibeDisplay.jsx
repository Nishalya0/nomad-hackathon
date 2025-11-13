import React from 'react';

function VibeDisplay({ vibeData }) {
  const stages = [
    { id: 'mainstage', name: 'Main Stage' },
    { id: 'openair', name: 'Open Air' },
    { id: 'techzone', name: 'Tech Arena' },
    { id: 'indoorauditorium', name: 'Auditorium' },
    { id: 'quadrangle', name: 'Quadrangle' },
    { id: 'foodcourt', name: 'Food Court' }
  ];
  
  const getVibeColor = (stageId) => {
    if (!vibeData[stageId]) return '#555';
    const { fire, party, sleepy, crowded } = vibeData[stageId];
    const total = fire + party + sleepy + crowded;
    
    if (total === 0) return '#555';
    
    const positiveRatio = (fire + party) / total;
    
    if (positiveRatio > 0.7) return '#00ff00'; // Green = Great vibe
    if (positiveRatio > 0.4) return '#ffff00'; // Yellow = Mixed
    return '#ff0000'; // Red = Bad vibe
  };
  
  return (
    <div style={{
      background: '#16213e',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#e94560', marginTop: 0 }}>
        🌊 Live Vibe Monitor
      </h3>
      
      {stages.map(stage => {
        const data = vibeData[stage.id] || { fire: 0, party: 0, sleepy: 0, crowded: 0 };
        const total = data.fire + data.party + data.sleepy + data.crowded;
        
        return (
          <div key={stage.id} style={{
            background: '#0f3460',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '10px',
            borderLeft: `4px solid ${getVibeColor(stage.id)}`
          }}>
            <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>
              {stage.name}
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '20px' }}>
              <span>🔥 {data.fire}</span>
              <span>🎉 {data.party}</span>
              <span>😴 {data.sleepy}</span>
              <span>😬 {data.crowded}</span>
            </div>
            <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
              Total reactions: {total}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VibeDisplay;
