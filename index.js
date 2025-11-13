// Import the tools we installed
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

// Create the app
const app = express();
const httpServer = createServer(app);

// Create WebSocket server with settings to allow connections
const io = new Server(httpServer, {
  cors: {
    origin: "*",  // Allow connections from anywhere
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

// When someone visits http://localhost:3001 in a browser
app.get('/', (req, res) => {
  res.send('✅ NOMAD Real-Time Server is running! 🎪');
});

// When a user connects via WebSocket
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);
  
  // Send welcome message
  socket.emit('welcome', { 
    message: 'Connected to NOMAD!',
    socketId: socket.id 
  });
  
  // When user joins a festival
  socket.on('join-festival', (data) => {
    const { festivalId, userId } = data;
    socket.join(`festival-${festivalId}`);
    console.log(`👤 User ${userId} joined festival: ${festivalId}`);
  });
  
  // When user sends a vibe (emoji reaction)
  socket.on('submit-vibe', (data) => {
    console.log('🎭 Vibe submitted:', data);
    const { festivalId } = data;
    
    // Send this vibe to everyone in the festival
    io.to(`festival-${festivalId}`).emit('vibe-update', data);
  });
  
  // When user disconnects
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('⚡ WebSocket ready for connections');
});
