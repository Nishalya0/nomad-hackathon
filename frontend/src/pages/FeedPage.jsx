import React from 'react';
import FestivalFeed from '../components/FestivalFeed';

function FeedPage() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <FestivalFeed currentStage="Main Stage" />
    </div>
  );
}

export default FeedPage;
