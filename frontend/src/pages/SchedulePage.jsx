import React, { useState } from 'react';
import ScheduleBuilder from '../components/ScheduleBuilder';

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState('Day 1');
  
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4'];
  
  return (
    <div>
      <h1 style={{ color: '#e94560', marginBottom: '30px', textAlign: 'center' }}>
        📅 Festival Schedule
      </h1>
      
      {/* Day Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              padding: '10px 25px',
              borderRadius: '20px',
              border: '2px solid #667eea',
              background: selectedDay === day ? '#667eea' : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: selectedDay === day ? 'bold' : 'normal',
              transition: 'all 0.3s'
            }}
          >
            {day}
          </button>
        ))}
      </div>
      
      {/* AI Schedule Builder */}
      <ScheduleBuilder />
      
      {/* Additional Info */}
      <div style={{
        background: '#16213e',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '30px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#e94560' }}>💡 Pro Tips</h3>
        <ul style={{
          color: '#b0b0b0',
          textAlign: 'left',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          <li>Use the AI Schedule Builder to avoid conflicts</li>
          <li>Check walking times between stages on the map</li>
          <li>Submit live vibes to help others know the crowd</li>
          <li>Arrive 10 minutes early for popular artists</li>
        </ul>
      </div>
    </div>
  );
}

export default SchedulePage;
