import React from 'react';

function VibeDisplay({ vibeData }) {
  const stages = [
    { id: 'mainstage', name: 'Main Stage', color: '#ff6b35' },
    { id: 'openair', name: 'Open Air', color: '#f7931e' },
    { id: 'techzone', name: 'Tech Arena', color: '#ffd700' },
    { id: 'indoorauditorium', name: 'Auditorium', color: '#f25c54' },
    { id: 'quadrangle', name: 'Quadrangle', color: '#fa3c7c' },
    { id: 'foodcourt', name: 'Food Court', color: '#ffb300' }
  ];

  const getVibeLevel = (total) => {
    if (total > 30) return { color: '#00ff00', label: 'ON FIRE' };
    if (total > 15) return { color: '#ffb300', label: 'BUZZING' };
    if (total > 5) return { color: '#667eea', label: 'ACTIVE' };
    return { color: '#666', label: 'QUIET' };
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 215, 0, 0.15) 100%)',
      padding: '25px',
      borderRadius: '20px',
      marginTop: '25px',
      border: '3px solid var(--sat-gold)',
      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)'
    }}>
      <h3 style={{
        color: 'var(--sat-gold)',
        fontSize: '28px',
        margin: '0 0 20px 0',
        textAlign: 'center',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        🌊 Live Vibe Monitor
      </h3>

      {/* Horizontal Stage Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {stages.map(stage => {
          const data = vibeData[stage.id] || { fire: 0, sleepy: 0, party: 0, crowded: 0 };
          const total = data.fire + data.sleepy + data.party + data.crowded;
          const vibeLevel = getVibeLevel(total);
          const mostActive = Math.max(data.fire, data.party);

          return (
            <div
              key={stage.id}
              style={{
                background: `linear-gradient(135deg, ${stage.color}15 0%, ${stage.color}05 100%)`,
                padding: '20px',
                borderRadius: '15px',
                border: `3px solid ${stage.color}`,
                boxShadow: `0 4px 15px ${stage.color}40`,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Stage Name with Vibe Level Indicator */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h4 style={{
                  color: stage.color,
                  fontSize: '20px',
                  margin: 0,
                  fontWeight: '800',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {stage.name}
                </h4>
                <span style={{
                  background: vibeLevel.color,
                  color: '#000',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  boxShadow: `0 2px 8px ${vibeLevel.color}60`
                }}>
                  {vibeLevel.label}
                </span>
              </div>

              {/* Emoji Counts - Horizontal Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.2)',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '24px' }}>🔥</span>
                  <span style={{
                    color: data.fire > 0 ? '#ff6b35' : '#666',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {data.fire}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '24px' }}>🎉</span>
                  <span style={{
                    color: data.party > 0 ? '#ffb300' : '#666',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {data.party}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '24px' }}>😴</span>
                  <span style={{
                    color: data.sleepy > 0 ? '#667eea' : '#666',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {data.sleepy}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '24px' }}>😬</span>
                  <span style={{
                    color: data.crowded > 0 ? '#fa3c7c' : '#666',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {data.crowded}
                  </span>
                </div>
              </div>

              {/* Total Reactions Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px'
              }}>
                <span style={{ color: '#fff', fontWeight: '600' }}>
                  Total reactions:
                </span>
                <span style={{
                  color: stage.color,
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  {total}
                </span>
              </div>

              {/* Energy Bar */}
              <div style={{
                marginTop: '10px',
                height: '6px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min((total / 50) * 100, 100)}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${stage.color} 0%, ${vibeLevel.color} 100%)`,
                  transition: 'width 0.5s ease',
                  boxShadow: `0 0 10px ${stage.color}`
                }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VibeDisplay;
