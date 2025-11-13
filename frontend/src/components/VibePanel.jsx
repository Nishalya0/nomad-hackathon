import React, { useState } from 'react';

function VibePanel({ onSubmitVibe }) {
  const [selectedStage, setSelectedStage] = useState('mainstage');
  
  const stages = [
    { id: 'mainstage', name: 'Main Stage' },
    { id: 'openair', name: 'Open Air Theatre' },
    { id: 'techzone', name: 'Tech Arena' },
    { id: 'indoorauditorium', name: 'Auditorium' },
    { id: 'quadrangle', name: 'Quadrangle' },
    { id: 'foodcourt', name: 'Food Court' }
  ];
  
  const emojis = [
    { emoji: '🔥', label: 'Lit!' },
    { emoji: '🎉', label: 'Amazing' },
    { emoji: '😴', label: 'Boring' },
    { emoji: '😬', label: 'Too Crowded' }
  ];
  
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
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>
          Select Stage:
        </label>
        <select 
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
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
              onMouseOver={(e) => e.target.style.background = '#667eea'}
              onMouseOut={(e) => e.target.style.background = '#0f3460'}
            >
              {emoji} <br/>
              <span style={{ fontSize: '12px' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VibePanel;
