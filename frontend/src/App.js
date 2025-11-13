import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import FestivalMap from './components/FestivalMap';
import VibePanel from './components/VibePanel';
import VibeDisplay from './components/VibeDisplay';

const socket = io('http://localhost:5000');

function App() {
  const [vibeData, setVibeData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Socket connection handlers
    socket.on('connect', () => {
      console.log('✅ Connected to server');
      setIsConnected(true);
    });
    
    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      setIsConnected(false);
    });
    
    // Listen for vibe updates
    socket.on('vibeUpdate', (data) => {
      setVibeData(data);
    });
    
    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('vibeUpdate');
    };
  }, []);
  
  const handleSubmitVibe = ({ stageId, emoji }) => {
    socket.emit('submitVibe', { stageId, emoji });
    
    // Show success notification (optional)
    alert(`Vibe submitted! ${emoji} at ${stageId}`);
  };
  
  return (
    <div className="App" style={{ background: '#1a1a2e', minHeight: '100vh' }}>
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px 20px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ 
          color: '#fff', 
          fontSize: '48px', 
          margin: '0 0 10px 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🎪 NOMAD
        </h1>
        <p style={{ 
          color: '#f0f0f0', 
          fontSize: '20px',
          margin: 0,
          fontWeight: '300'
        }}>
          Saturnalia 2025 - Golden Jubilee Edition
        </p>
        <p style={{ 
          color: '#e0e0e0', 
          fontSize: '14px',
          margin: '5px 0 0 0'
        }}>
          TIET Patiala | November 13-16, 2025
        </p>
        <div style={{
          marginTop: '10px',
          padding: '5px 15px',
          background: isConnected ? '#00ff00' : '#ff0000',
          display: 'inline-block',
          borderRadius: '20px',
          fontSize: '12px',
          color: '#000',
          fontWeight: 'bold'
        }}>
          {isConnected ? '🟢 LIVE' : '🔴 OFFLINE'}
        </div>
      </header>
      
      <main style={{ 
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '300px 1fr', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div>
            <VibePanel onSubmitVibe={handleSubmitVibe} />
            <VibeDisplay vibeData={vibeData} />
          </div>
          
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                color: '#e94560', 
                fontSize: '28px',
                marginBottom: '10px'
              }}>
                🗺️ Live Festival Map
              </h2>
              <p style={{ color: '#b0b0b0', fontSize: '16px' }}>
                Interactive campus map showing all venues with real-time vibe data
              </p>
            </div>
            <FestivalMap vibeData={vibeData} />
          </div>
        </div>
        
        <div style={{ 
          marginTop: '40px',
          padding: '20px',
          background: '#16213e',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#fff', margin: 0 }}>
            ✨ 50 Years of Excellence | Real-Time Vibe Tracking | Smart Festival Navigation
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
