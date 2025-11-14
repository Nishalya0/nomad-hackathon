import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import './styles/theme.css';

import Layout from './components/Layout';
import FeedPage from './pages/FeedPage';
import MapPage from './pages/MapPage';
import EventsPage from './pages/EventsPage';
import ArtistsPage from './pages/ArtistsPage';
import MomentsPage from './pages/MomentsPage';
import VibesPage from './pages/VibesPage';

const socket = io('http://localhost:5000');

function App() {
  const [vibeData, setVibeData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
    socket.on('vibeUpdate', (data) => {
      setVibeData(data);
    });
    
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('vibeUpdate');
    };
  }, []);
  
  const handleSubmitVibe = ({ stageId, emoji }) => {
    socket.emit('submitVibe', { stageId, emoji });
  };
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/map" element={
            <MapPage 
              vibeData={vibeData}
              onSubmitVibe={handleSubmitVibe}
              isConnected={isConnected}
            />
          } />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/vibes" element={<VibesPage vibeData={vibeData} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
