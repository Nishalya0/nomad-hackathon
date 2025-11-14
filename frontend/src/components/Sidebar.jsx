import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: '🏠', label: 'Feed', path: '/' },
    { icon: '🗺️', label: 'Map', path: '/map' },
    { icon: '📅', label: 'Events', path: '/events' },
    { icon: '🎤', label: 'Artists', path: '/artists' },
    { icon: '📸', label: 'Moments', path: '/moments' },
    { icon: '⚡', label: 'Live Vibes', path: '/vibes' },
  ];

  const bottomItems = [
    { icon: '⚙️', label: 'Settings', path: '/settings' },
    { icon: '👤', label: 'Profile', path: '/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: 'linear-gradient(180deg, #2a1810 0%, #1a0f08 100%)',
      borderRight: '2px solid #ff7800',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
      boxShadow: '2px 0 20px rgba(255, 120, 0, 0.2)'
    }}>
      {/* Logo */}
      <div style={{
        padding: '25px 20px',
        borderBottom: '2px solid rgba(255, 120, 0, 0.3)'
      }}>
        <h1 style={{
          background: 'linear-gradient(135deg, #ff7800 0%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '28px',
          fontWeight: '900',
          margin: 0,
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '1px'
        }}>
          🎪 NOMAD
        </h1>
        <p style={{
          color: '#ffb366',
          fontSize: '11px',
          margin: '5px 0 0 0',
          fontWeight: '600',
          letterSpacing: '1px'
        }}>
          Saturnalia 2025
        </p>
      </div>

      {/* Main Menu */}
      <div style={{ flex: 1, padding: '12px 0' }}>
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: isActive(item.path) 
                ? 'linear-gradient(90deg, rgba(255, 120, 0, 0.2) 0%, rgba(255, 120, 0, 0.05) 100%)'
                : 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderLeft: isActive(item.path) ? '4px solid #ff7800' : '4px solid transparent'
            }}
            onMouseOver={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.background = 'rgba(255, 120, 0, 0.1)';
                e.currentTarget.style.borderLeft = '4px solid rgba(255, 120, 0, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderLeft = '4px solid transparent';
              }
            }}
          >
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{
              color: isActive(item.path) ? '#FFD700' : '#d4a574',
              fontSize: '16px',
              fontWeight: isActive(item.path) ? '700' : '500',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Menu */}
      <div style={{
        borderTop: '2px solid rgba(255, 120, 0, 0.3)',
        padding: '12px 0'
      }}>
        {bottomItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 120, 0, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{
              color: '#d4a574',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500'
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Live Indicator */}
      <div style={{
        padding: '15px 20px',
        borderTop: '2px solid rgba(255, 120, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(255, 120, 0, 0.1)'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#FFD700',
          boxShadow: '0 0 12px #FFD700',
          animation: 'pulse 2s infinite'
        }}/>
        <span style={{
          color: '#FFD700',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.5px'
        }}>
          Festival Live
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
