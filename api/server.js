const express = require('express');
const cors = require('cors');
const dbHelpers = require('./database-helpers');
const helpers = require('./helpers');
const { sampleArtists, walkingTimes, stages } = require('./sample-data');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'NOMAD REST API Server (Dev 2)',
    version: '1.0.0',
    endpoints: [
      'GET /api/artists',
      'GET /api/artists/:id',
      'GET /api/stages',
      'POST /api/schedule/generate',
      'GET /api/route',
      'GET /api/vibes/:stageId'
    ]
  });
});

// GET all artists
app.get('/api/artists', async (req, res) => {
  try {
    const festivalId = req.query.festivalId || 'coachella-2025';
    const artists = await dbHelpers.getAllArtists(festivalId);
    
    res.json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET single artist
app.get('/api/artists/:id', async (req, res) => {
  try {
    const festivalId = req.query.festivalId || 'coachella-2025';
    const artist = await dbHelpers.getArtist(festivalId, req.params.id);
    
    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }
    
    res.json({
      success: true,
      data: artist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET all stages
app.get('/api/stages', async (req, res) => {
  try {
    const festivalId = req.query.festivalId || 'coachella-2025';
    const stages = await dbHelpers.getAllStages(festivalId);
    
    res.json({
      success: true,
      count: stages.length,
      data: stages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST schedule generation
app.post('/api/schedule/generate', async (req, res) => {
  try {
    const { userId, preferredArtists, preferences = {} } = req.body;
    
    if (!preferredArtists || !Array.isArray(preferredArtists)) {
      return res.status(400).json({
        success: false,
        error: 'preferredArtists array is required'
      });
    }
    
    const festivalId = req.body.festivalId || 'coachella-2025';
    const allArtists = await dbHelpers.getAllArtists(festivalId);
    const selectedArtists = allArtists.filter(a => preferredArtists.includes(a.id));
    const sorted = helpers.sortArtistsByTime(selectedArtists);
    
    const schedule = generateOptimizedSchedule(
      sorted,
      preferences.fomoLevel || 5,
      preferences.crowdTolerance || 5
    );
    
    res.json({
      success: true,
      userId,
      schedule: schedule,
      conflicts: schedule.filter(s => s.conflict).length,
      totalEvents: schedule.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Schedule optimization algorithm
function generateOptimizedSchedule(artists, fomoLevel, crowdTolerance) {
  const schedule = [];
  
  for (let i = 0; i < artists.length; i++) {
    const current = artists[i];
    const scheduleItem = {
      ...current,
      conflict: false,
      reason: null,
      priority: (current.popularity || 50) * (fomoLevel / 10)
    };
    
    for (let j = 0; j < schedule.length; j++) {
      const scheduled = schedule[j];
      const walkTime = helpers.getWalkingTime(scheduled.stage, current.stage, walkingTimes);
      
      if (helpers.hasTimeConflict(scheduled, current, walkTime)) {
        scheduleItem.conflict = true;
        scheduleItem.reason = `Overlaps with ${scheduled.name}`;
        
        if (scheduleItem.priority > scheduled.priority) {
          scheduleItem.chosen = true;
          scheduled.chosen = false;
        } else {
          scheduleItem.chosen = false;
        }
      }
    }
    
    if (!scheduleItem.conflict || scheduleItem.chosen !== false) {
      schedule.push(scheduleItem);
    }
  }
  
  return addBreaks(schedule, crowdTolerance);
}

function addBreaks(schedule, crowdTolerance) {
  const withBreaks = [...schedule];
  
  for (let i = 1; i < schedule.length; i++) {
    const prev = schedule[i - 1];
    const current = schedule[i];
    const gap = helpers.getTimeDifferenceMinutes(prev.endTime, current.startTime);
    
    if (gap >= 30) {
      withBreaks.splice(i, 0, {
        type: 'break',
        suggestion: 'Food & Rest',
        duration: Math.min(gap, 45),
        startTime: prev.endTime,
        location: crowdTolerance < 5 ? 'Quiet area' : 'Main food court'
      });
    }
  }
  
  return withBreaks;
}

// GET route calculation
app.get('/api/route', (req, res) => {
  try {
    const { from, to } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: 'from and to parameters required'
      });
    }
    
    const walkTime = helpers.getWalkingTime(from, to, walkingTimes);
    
    res.json({
      success: true,
      route: {
        from,
        to,
        walkingTimeMinutes: walkTime,
        walkingTimeReadable: helpers.minutesToReadable(walkTime),
        distance: `${Math.round(walkTime * 80)}m`,
        recommendation: walkTime > 10 ? 'Leave early' : 'Quick walk'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET vibes for stage
app.get('/api/vibes/:stageId', async (req, res) => {
  try {
    const festivalId = req.query.festivalId || 'coachella-2025';
    const { stageId } = req.params;
    
    const vibes = await dbHelpers.getStageVibes(festivalId, stageId);
    const crowd = await dbHelpers.getStageCrowd(festivalId, stageId);
    
    res.json({
      success: true,
      stageId,
      vibes,
      crowd
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔧 NOMAD REST API Server running on http://localhost:${PORT}`);
  console.log('📋 Endpoints:');
  console.log('  GET  /api/artists');
  console.log('  GET  /api/stages');
  console.log('  POST /api/schedule/generate');
  console.log('  GET  /api/route');
  console.log('  GET  /api/vibes/:stageId');
});
