import React from 'react';
import './App.css';
import FestivalMap from './components/FestivalMap';

function App() {
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
      </header>
      
      <main style={{ 
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ 
            color: '#e94560', 
            fontSize: '28px',
            marginBottom: '10px'
          }}>
            🗺️ Live Festival Map
          </h2>
          <p style={{ color: '#b0b0b0', fontSize: '16px' }}>
            Interactive campus map showing all venues at Saturnalia 2025
          </p>
        </div>
        
        <FestivalMap />
        
        <div style={{ 
          marginTop: '40px',
          padding: '20px',
          background: '#16213e',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#fff', margin: 0 }}>
            ✨ 50 Years of Excellence | AI Schedule Builder, Live Vibe Updates, Smart Navigation
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
