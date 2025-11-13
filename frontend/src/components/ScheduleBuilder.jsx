import React, { useState } from 'react';

function ScheduleBuilder() {
  const [preferences, setPreferences] = useState({
    genres: []
  });
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const genres = ['Rock', 'EDM', 'Hip-Hop', 'Pop', 'Classical', 'Indie'];

  const toggleGenre = (genre) => {
    setPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const generateSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/schedule/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences })
      });
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Failed to generate schedule:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: '#16213e',
      padding: '25px',
      borderRadius: '12px',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#e94560', marginTop: 0 }}>
        🤖 AI Schedule Builder
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: '#fff', display: 'block', marginBottom: '10px' }}>
          Select your favorite genres:
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid #667eea',
                background: preferences.genres.includes(genre) ? '#667eea' : '#0f3460',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
            >
              {genre} {preferences.genres.includes(genre) ? '✓' : ''}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generateSchedule}
        disabled={loading}
        style={{
          width: '100%',
          padding: '15px',
          borderRadius: '8px',
          border: 'none',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? '⏳ Generating...' : '🚀 Generate Smart Schedule'}
      </button>

      {schedule && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#00ff00' }}>
            ✅ Schedule Generated!
          </h4>
          <p style={{ color: '#fff' }}>
            {schedule.stats.scheduledArtists} artists scheduled out of {schedule.stats.totalArtists}
          </p>

          <div style={{ marginTop: '15px' }}>
            {schedule.schedule.map((artist, index) => (
              <div key={artist.id} style={{
                background: '#0f3460',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '10px',
                borderLeft: '4px solid #667eea'
              }}>
                <div style={{ color: '#fff', fontWeight: 'bold' }}>
                  {index + 1}. {artist.name}
                </div>
                <div style={{ color: '#aaa', fontSize: '14px' }}>
                  {artist.time} at {artist.stage} • {artist.genre}
                </div>
              </div>
            ))}
          </div>

          {schedule.conflicts.length > 0 && (
            <div style={{ marginTop: '15px' }}>
              <h4 style={{ color: '#ff0000' }}>
                ⚠️ Conflicts Detected
              </h4>
              {schedule.conflicts.slice(0, 3).map((conflict, idx) => (
                <div key={idx} style={{ color: '#ffaa00', fontSize: '13px' }}>
                  • {conflict.reason}: {conflict.artist1} ↔ {conflict.artist2}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScheduleBuilder;
