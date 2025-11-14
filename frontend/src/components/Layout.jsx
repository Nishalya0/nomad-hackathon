import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ffbb5c 0%, #ffa666 20%, #ff9670 40%, #ff8870 60%, #ff7c70 80%, #ff7070 100%)'
    }}>
      <Sidebar />
      
      {/* Main Content */}
      <div style={{
        marginLeft: '240px',
        flex: 1,
        minHeight: '100vh',
        overflowY: 'auto'
      }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
