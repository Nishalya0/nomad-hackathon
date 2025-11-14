import React from "react";
import './NavBar.css';

export default function NavBar() {
  return (
    <header className="sat-header">
      <nav className="sat-nav">
        {/* Left side - empty or small icon */}
        <div className="nav-left">
          <span style={{ fontSize: '24px' }}>🎪</span>
        </div>
        
        {/* Center - Large Saturnalia Logo */}
        <div className="nav-center">
          <img 
            src="/sat.png" 
            alt="Saturnalia Logo" 
            className="nav-logo-center"
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="nav-logo-text" style={{ display: 'none' }}>
            <span style={{ 
              fontSize: '48px', 
              fontWeight: '900',
              color: '#fff',
              letterSpacing: '3px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              SATURNALIA
            </span>
          </div>
        </div>
        
        {/* Right side - Login button */}
        <div className="nav-right">
          <button className="nav-login-btn">LOGIN</button>
        </div>
      </nav>
    </header>
  );
}
