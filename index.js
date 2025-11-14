const express = require('express');
const { createServer } = require('node:http');

const cors = require('cors');
const { Server } = require('socket.io');

const cloudinary = require('./cloudinary-config');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


const { CLIENT_EVENTS, SERVER_EVENTS } = require('./events');
const dbHelpers = require('./database-helpers');
const helpers = require('./helpers');
const CrowdSimulator = require('./crowd-simulator');
const NotificationSystem = require('./notification-system');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video');
    return {
      folder: 'saturnalia-2025',
      resource_type: 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi', 'webm']
    };
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});
const httpServer = createServer(app);


// ==========================================
// MEDIA UPLOAD ENDPOINT (Photos + Videos)
// ==========================================
app.post('/upload-media', upload.single('media'), async (req, res) => {
  try {
    console.log('📸🎥 Media upload request received');
    
    const { festivalId, stageId, userId, location, caption } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    const isVideo = req.file.mimetype.startsWith('video');
    const mediaType = isVideo ? 'video' : 'photo';
    
    console.log(`  Type: ${mediaType}`);
    console.log(`  Size: ${(req.file.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  User: ${userId}, Stage: ${stageId}`);
    
    // Cloudinary already uploaded! URL is at req.file.path
    const downloadURL = req.file.path;
    
    console.log(`  ✅ Uploaded to Cloudinary: ${downloadURL}`);
    
    // Save to database
    const timestamp = Date.now();
    const mediaId = `media-${timestamp}`;
    const mediaData = {
      id: mediaId,
      url: downloadURL,
      userId,
      stageId,
      location: location ? JSON.parse(location) : null,
      timestamp,
      likes: 0,
      likedBy: [],
      caption: caption || '',
      type: mediaType,
      fileSize: req.file.size,
      cloudinaryId: req.file.filename
    };
    
    await dbHelpers.addMedia(festivalId, stageId, mediaId, mediaData);
    console.log('  ✅ Saved to database');
    
    // Broadcast to all users
    io.to(`festival-${festivalId}`).emit('new-media', {
      stageId,
      media: mediaData
    });
    
    console.log('  ✅ Broadcast complete\n');
    
    res.json({ success: true, media: mediaData });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all media endpoint
app.get('/api/media/:festivalId', async (req, res) => {
  try {
    const { festivalId } = req.params;
    const media = await dbHelpers.getAllMedia(festivalId);
    res.json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Initialize Socket.io with CORS
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;
// Crowd simulator instance
let simulator = null;
let notificationSystem = null;

// Track connected users per festival
const festivalRooms = new Map();

// Basic route
app.get('/', (req, res) => {
  res.send('✅ NOMAD Real-Time Server is running! 🎪');
});

// Get current stats (for monitoring)
app.get('/stats', (req, res) => {
  const stats = {
    totalConnections: io.engine.clientsCount,
    festivals: Array.from(festivalRooms.entries()).map(([festivalId, users]) => ({
      festivalId,
      connectedUsers: users.size
    }))
  };
  res.json(stats);
});

// Add this after the /stats route
app.get('/test-notification', (req, res) => {
  if (notificationSystem) {
    notificationSystem.sendTestNotification('🎉 Test notification from server!');
    res.json({ success: true, message: 'Notification sent!' });
  } else {
    res.json({ success: false, message: 'Notification system not ready' });
  }
});

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);
  
  socket.emit(SERVER_EVENTS.WELCOME, { 
    message: 'Connected to NOMAD real-time server',
    socketId: socket.id,
    timestamp: Date.now()
  });
  
  // Join festival room
  socket.on(CLIENT_EVENTS.JOIN_FESTIVAL, async (data) => {
    const { festivalId, userId } = data;
    
    // Join the room
    socket.join(`festival-${festivalId}`);
    socket.festivalId = festivalId;
    socket.userId = userId;
    
    // Track user in festival
    if (!festivalRooms.has(festivalId)) {
      festivalRooms.set(festivalId, new Set());
    }
    festivalRooms.get(festivalId).add(socket.id);
    
    console.log(`👤 User ${userId} joined festival: ${festivalId}`);
    console.log(`   Total users in ${festivalId}: ${festivalRooms.get(festivalId).size}`);
    
    // Send current vibe data to the new user
    try {
      const stages = await dbHelpers.getAllStages(festivalId);
      const vibeData = {};
      
      for (const stage of stages) {
        const vibes = await dbHelpers.getStageVibes(festivalId, stage.id);
        const crowd = await dbHelpers.getStageCrowd(festivalId, stage.id);
        
        vibeData[stage.id] = {
          vibes: vibes || { fire: 0, party: 0, sleep: 0, neutral: 0 },
          crowd: crowd || { current: 0, capacity: stage.capacity, percent: 0 },
          stageName: stage.name
        };
      }
      
      socket.emit(SERVER_EVENTS.WELCOME, {
        message: `Joined ${festivalId}`,
        currentVibes: vibeData,
        userCount: festivalRooms.get(festivalId).size
      });
      
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  });
  
  // Handle vibe submission
  socket.on(CLIENT_EVENTS.SUBMIT_VIBE, async (data) => {
    const { festivalId, stageId, emoji, userId } = data;
    
    console.log(`🎭 Vibe submitted: ${emoji} for ${stageId} by ${userId}`);
    
    try {
      // Update vibe count in Firebase
      const newCount = await dbHelpers.updateVibe(festivalId, stageId, emoji);
      
      // Get updated vibe totals
      const allVibes = await dbHelpers.getStageVibes(festivalId, stageId);
      
      // Calculate total reactions
      const totalReactions = Object.values(allVibes)
        .filter(v => typeof v === 'number')
        .reduce((sum, count) => sum + count, 0);
      
      // Get crowd data
      const crowd = await dbHelpers.getStageCrowd(festivalId, stageId);
      
      // Broadcast to everyone in the festival
      io.to(`festival-${festivalId}`).emit(SERVER_EVENTS.VIBE_UPDATE, {
        stageId,
        emoji,
        vibes: {
          fire: allVibes.fire || 0,
          party: allVibes.party || 0,
          sleep: allVibes.sleep || 0,
          neutral: allVibes.neutral || 0
        },
        totalReactions,
        crowd,
        timestamp: Date.now(),
        submittedBy: userId
      });
      
        // ==========================================
  // MEDIA LIKE HANDLER
  // ==========================================
  socket.on('like-media', async (data) => {
    const { festivalId, stageId, mediaId, userId } = data;
    
    console.log(`❤️ ${userId} liked ${mediaId}`);
    
    try {
      const updatedMedia = await dbHelpers.likeMedia(festivalId, stageId, mediaId, userId);
      
      io.to(`festival-${festivalId}`).emit('media-liked', {
        stageId,
        mediaId,
        likes: updatedMedia.likes
      });
      
      console.log(`  ✅ Now has ${updatedMedia.likes} likes`);
    } catch (error) {
      console.error('Error liking media:', error);
    }
  });


      console.log(`   Broadcast to ${festivalRooms.get(festivalId)?.size || 0} users`);
      
    } catch (error) {
      console.error('Error updating vibe:', error);
      socket.emit(SERVER_EVENTS.ERROR, {
        message: 'Failed to update vibe',
        error: error.message
      });
    }
  });
  
  // Handle vibe request (get current vibes without submitting)
  socket.on(CLIENT_EVENTS.REQUEST_VIBES, async (data) => {
    const { festivalId, stageId } = data;
    
    try {
      const vibes = await dbHelpers.getStageVibes(festivalId, stageId);
      const crowd = await dbHelpers.getStageCrowd(festivalId, stageId);
      
      socket.emit(SERVER_EVENTS.VIBE_UPDATE, {
        stageId,
        vibes,
        crowd,
        timestamp: Date.now()
      });
      
    } catch (error) {
      console.error('Error fetching vibes:', error);
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
    
    // Remove from festival room tracking
    if (socket.festivalId && festivalRooms.has(socket.festivalId)) {
      festivalRooms.get(socket.festivalId).delete(socket.id);
      console.log(`   Remaining users in ${socket.festivalId}: ${festivalRooms.get(socket.festivalId).size}`);
    }
  });
});

// Start crowd simulation after a short delay
// Start systems after server starts
setTimeout(async () => {
  // Start crowd simulation

  
  // Start notification system
simulator = new CrowdSimulator(io, 'saturnalia-2025');
  await simulator.start();
notificationSystem = new NotificationSystem(io, 'saturnalia-2025');
  await notificationSystem.start();
}, 5000);


// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('⚡ WebSocket server ready for real-time vibe updates');
  console.log('📊 Stats available at http://localhost:' + PORT + '/stats');
});
