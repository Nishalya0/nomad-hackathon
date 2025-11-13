const express = require('express');
const cors = require('cors');
const festivalRoutes = require('./routes/festivals');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'NOMAD API - Saturnalia 2025 Ready!',
    timestamp: new Date().toISOString()
  });
});

// Festival routes
app.use('/api/festivals', festivalRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 NOMAD Server running on port ${PORT}`);
  console.log(`🎪 Saturnalia 2025 - Golden Jubilee Edition`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`📍 Festival: http://localhost:${PORT}/api/festivals/saturnalia_2025`);
});
