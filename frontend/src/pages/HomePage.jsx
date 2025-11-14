import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FestivalMap from '../components/FestivalMap';
import VibePanel from '../components/VibePanel';
import VibeDisplay from '../components/VibeDisplay';
import ScheduleBuilder from '../components/ScheduleBuilder';
import '../styles/theme.css';
import '../styles/components.css';
import FestivalFeed from '../components/FestivalFeed';


function HomePage({ vibeData, onSubmitVibe, isConnected }) {
  const [festivalData, setFestivalData] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [detectedStage, setDetectedStage] = useState('Main Stage'); // Default stage
  
  useEffect(() => {
    // Fetch festival data
    fetch('http://localhost:5000/api/festivals/saturnalia_2025')
      .then(res => res.json())
      .then(data => setFestivalData(data))
      .catch(err => console.error('Failed to fetch festival data:', err));
    
    // Countdown timer
    const targetDate = new Date('2025-11-14T18:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        setCountdown('🎉 FESTIVAL IS LIVE! 🎉');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  return (
    <div style={{ 
  background: 'linear-gradient(180deg, #ea9a45 0%, #f85735 30%, #d63620 60%, #c22e27 100%)',


  minHeight: '100vh' 
}}>


      {/* ONLY Saturnalia NavBar */}
      <NavBar />
      
      
      {/* Hero Section - Clean & Smooth */}
<div style={{
  padding: '60px 20px 40px 20px',
  textAlign: 'center'
}}>
  <h1 style={{ 
    color: '#fff', 
    fontSize: '64px', 
    margin: '0 0 15px 0',
    fontWeight: '900',
    letterSpacing: '5px',
    textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
    lineHeight: '1.1'
  }}>
    <span style={{ color: 'var(--sat-gold)', fontSize: '1.2em' }}>50</span>
    <sup style={{ fontSize: '0.4em', verticalAlign: 'super' }}>th</sup> SATURNALIA
  </h1>
  
  <p style={{ 
    color: '#fff', 
    fontSize: '24px', 
    margin: '15px 0 30px 0',
    fontWeight: '600',
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
  }}>
    Golden Jubilee Edition | TIET Patiala
  </p>
  
  {/* Quick Stats - Clean inline style */}
  {festivalData && (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '50px',
      marginTop: '35px',
      flexWrap: 'wrap'
    }}>
      <div style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>
        <strong style={{ 
          color: 'var(--sat-gold)', 
          fontSize: '36px', 
          display: 'block',
          fontWeight: '900',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {festivalData.stages.length}
        </strong> 
        STAGES
      </div>
      <div style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>
        <strong style={{ 
          color: 'var(--sat-gold)', 
          fontSize: '36px', 
          display: 'block',
          fontWeight: '900',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {festivalData.artists.length}
        </strong> 
        ARTISTS
      </div>
      <div style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>
        <strong style={{ 
          color: 'var(--sat-gold)', 
          fontSize: '36px', 
          display: 'block',
          fontWeight: '900',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {festivalData.dates.length}
        </strong> 
        DAYS
      </div>
    </div>
  )}
</div>

      
      {/* Main Content */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '50px 20px'
      }}>


        <FestivalFeed currentStage={detectedStage || 'Main Stage'} />


        
        
        {/* LIVE VIBE MAP - Main Feature */}
<div style={{ marginBottom: '50px' }}>
  <h2 style={{
    color: 'var(--sat-gold)',
    fontSize: '42px',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: '35px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  }}>
    🗺️ Live Vibe Map
  </h2>
  
  {/* NEW LAYOUT - Map on top, vibe panel and display below */}
  <div style={{
    background: 'linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%)',
    padding: '30px',
    borderRadius: '25px',
    border: '4px solid var(--sat-gold)',
    boxShadow: '0 15px 50px rgba(255, 215, 0, 0.35)'
  }}>
    {/* Map Area - Full Width */}
    <div style={{ 
      minHeight: '600px',
      borderRadius: '15px',
      overflow: 'hidden',
      marginBottom: '30px'
    }}>
      <FestivalMap vibeData={vibeData} />
    </div>
    
    {/* Vibe Panel - Below Map */}
    <VibePanel onSubmitVibe={onSubmitVibe} />
  </div>
  
  {/* Vibe Display - Horizontal Below Everything */}
  <VibeDisplay vibeData={vibeData} />
</div>


        
        {/* Quick Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px',
          marginBottom: '50px'
        }}>
          {[
            { icon: '🎤', title: 'Artist Lineup', section: 'artists', desc: 'View all performers' },
            { icon: '📅', title: 'AI Schedule', section: 'schedule', desc: 'Build your lineup' },
            { icon: '🗺️', title: 'Route Planner', section: 'routes', desc: 'Plan your path' },
            { icon: 'ℹ️', title: 'Festival Info', section: 'info', desc: 'Event details' }
          ].map(card => (
            <button
              key={card.section}
              onClick={() => toggleSection(card.section)}
              style={{
                background: expandedSection === card.section 
                  ? 'linear-gradient(135deg, var(--sat-accent) 0%, var(--sat-purple) 100%)'
                  : 'linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%)',
                padding: '35px 25px',
                borderRadius: '20px',
                border: '3px solid',
                borderColor: expandedSection === card.section ? 'var(--sat-gold)' : 'transparent',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: expandedSection === card.section 
                  ? '0 10px 30px rgba(255, 215, 0, 0.4)'
                  : '0 5px 20px rgba(0,0,0,0.3)'
              }}
              onMouseOver={(e) => {
                if (expandedSection !== card.section) {
                  e.currentTarget.style.borderColor = 'var(--sat-gold)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (expandedSection !== card.section) {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
                }
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>
                {card.icon}
              </div>
              <div style={{ 
                color: '#fff', 
                fontSize: '22px', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {card.title}
              </div>
              <div style={{ 
                color: '#b0b0b0', 
                fontSize: '14px',
                marginBottom: '10px'
              }}>
                {card.desc}
              </div>
              <div style={{ 
                color: expandedSection === card.section ? '#fff' : '#999', 
                fontSize: '13px',
                fontWeight: 'bold'
              }}>
                {expandedSection === card.section ? '▲ Close' : '▼ Expand'}
              </div>
            </button>
          ))}
        </div>
        
        {/* Expandable Sections */}
        {expandedSection === 'schedule' && (
          <div style={{
            background: 'linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%)',
            padding: '35px',
            borderRadius: '20px',
            marginBottom: '40px',
            border: '3px solid var(--sat-gold)',
            animation: 'fadeIn 0.5s'
          }}>
            <ScheduleBuilder />
          </div>
        )}
        
        {expandedSection === 'routes' && (
          <div style={{
            background: 'linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%)',
            padding: '35px',
            borderRadius: '20px',
            marginBottom: '40px',
            border: '3px solid var(--sat-gold)',
            animation: 'fadeIn 0.5s'
          }}>
            <h3 style={{ color: 'var(--sat-gold)', fontSize: '32px', marginBottom: '25px' }}>
              🗺️ Walking Times Between Stages
            </h3>
            <div style={{ color: '#d0d0d0', fontSize: '16px', lineHeight: '2' }}>
              <div>🚶 Main Stage → Open Air Theatre: <strong style={{color: 'var(--sat-gold)'}}>5 mins</strong></div>
              <div>🚶 Open Air → Tech Arena: <strong style={{color: 'var(--sat-gold)'}}>8 mins</strong></div>
              <div>🚶 Tech Arena → Auditorium: <strong style={{color: 'var(--sat-gold)'}}>6 mins</strong></div>
              <div>🚶 Auditorium → Quadrangle: <strong style={{color: 'var(--sat-gold)'}}>4 mins</strong></div>
              <div>🚶 Quadrangle → Food Court: <strong style={{color: 'var(--sat-gold)'}}>3 mins</strong></div>
            </div>
          </div>
        )}
        
        {expandedSection === 'info' && (
          <div style={{
            background: 'linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%)',
            padding: '35px',
            borderRadius: '20px',
            marginBottom: '40px',
            border: '3px solid var(--sat-gold)',
            animation: 'fadeIn 0.5s'
          }}>
            <h3 style={{ color: 'var(--sat-gold)', fontSize: '32px', marginBottom: '25px' }}>
              ℹ️ Festival Information
            </h3>
            <div style={{ color: '#d0d0d0', lineHeight: '2', fontSize: '16px' }}>
              <p><strong style={{color: '#fff'}}>Dates:</strong> November 14-16, 2025</p>
              <p><strong style={{color: '#fff'}}>Location:</strong> TIET Patiala, Punjab, India</p>
              <p><strong style={{color: '#fff'}}>Theme:</strong> Echoes of Eternity - 50th Golden Jubilee</p>
              <p><strong style={{color: '#fff'}}>Entry:</strong> Free for TIET students, paid for outside colleges</p>
            </div>
          </div>
        )}
        
      </div>
      
      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%)',
        padding: '25px',
        textAlign: 'center',
        borderTop: '2px solid var(--sat-gold)',
        color: '#fff'
      }}>
        <p style={{ margin: 0, fontSize: '16px' }}>
          ✨ 50 Years of Excellence | Saturnalia 2025 | TIET Patiala ✨
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
