const express = require('express');
const router = express.Router();
const { saturnalia2025 } = require('../data/festivalData');
const ScheduleOptimizer = require('../utils/scheduleOptimizer');

// Generate personalized schedule
router.post('/generate', (req, res) => {
  const { preferences } = req.body;
  
  const optimizer = new ScheduleOptimizer(
    saturnalia2025.artists,
    saturnalia2025.walkingTimes,
    preferences || {}
  );
  
  const result = optimizer.generateSchedule();
  
  res.json({
    success: true,
    schedule: result.schedule,
    conflicts: result.conflicts,
    stats: result.stats,
    message: `Generated optimized schedule with ${result.schedule.length} artists`
  });
});

// Get route between two stages
router.get('/route/:from/:to', (req, res) => {
  const { from, to } = req.params;
  
  const optimizer = new ScheduleOptimizer(
    saturnalia2025.artists,
    saturnalia2025.walkingTimes
  );
  
  const route = optimizer.getOptimalRoute(from, to);
  
  res.json(route);
});

// Check conflicts between specific artists
router.post('/check-conflicts', (req, res) => {
  const { artistIds } = req.body;
  
  const selectedArtists = saturnalia2025.artists.filter(
    artist => artistIds.includes(artist.id)
  );
  
  const optimizer = new ScheduleOptimizer(
    selectedArtists,
    saturnalia2025.walkingTimes
  );
  
  const conflicts = [];
  for (let i = 0; i < selectedArtists.length; i++) {
    for (let j = i + 1; j < selectedArtists.length; j++) {
      if (optimizer.timeConflict(selectedArtists[i], selectedArtists[j])) {
        conflicts.push({
          artist1: selectedArtists[i].name,
          artist2: selectedArtists[j].name,
          message: 'These shows overlap in time'
        });
      }
    }
  }
  
  res.json({
    conflicts: conflicts,
    hasConflicts: conflicts.length > 0
  });
});

module.exports = router;
