const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const festivalRoutes = require('./routes/festivals');
const scheduleRoutes = require('./routes/schedule');


const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for vibe data
const vibeData = {
  mainstage: { fire: 0, sleepy: 0, party: 0, crowded: 0 },
  openair: { fire: 0, sleepy: 0, party: 0, crowded: 0 },
  techzone: { fire: 0, sleepy: 0, party: 0, crowded: 0 },
  indoorauditorium: { fire: 0, sleepy: 0, party: 0, crowded: 0 },
  quadrangle: { fire: 0, sleepy: 0, party: 0, crowded: 0 },
  foodcourt: { fire: 0, sleepy: 0, party: 0, crowded: 0 }
};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);
  
  // Send current vibe data to newly connected client
  socket.emit('vibeUpdate', vibeData);
  
  // Handle vibe reaction submission
  socket.on('submitVibe', (data) => {
    const { stageId, emoji } = data;
    
    if (vibeData[stageId]) {
      // Map emoji to categories
      const emojiMap = {
        '🔥': 'fire',
        '😴': 'sleepy',
        '🎉': 'party',
        '😬': 'crowded'
      };
      
      const category = emojiMap[emoji];
      if (category) {
        vibeData[stageId][category]++;
        
        // Broadcast updated vibe data to all clients
        io.emit('vibeUpdate', vibeData);
        
        console.log(`📊 Vibe submitted: ${emoji} at ${stageId}`);
      }
    }
  });
  
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'NOMAD API - Saturnalia 2025 Ready!',
    timestamp: new Date().toISOString(),
    connectedClients: io.engine.clientsCount
  });
});

// Festival routes
app.use('/api/festivals', festivalRoutes);
app.use('/api/schedule', scheduleRoutes);


// Get current vibe data via REST
app.get('/api/vibes', (req, res) => {
  res.json(vibeData);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 NOMAD Server running on port ${PORT}`);
  console.log(`🎪 Saturnalia 2025 - Golden Jubilee Edition`);
  console.log(`🔌 WebSocket ready for real-time updates`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
});
