const express = require('express');
const router = express.Router();
const { saturnalia2025 } = require('../data/festivalData');

// Get full festival information
router.get('/:festivalId', (req, res) => {
  const { festivalId } = req.params;
  
  if (festivalId === 'saturnalia_2025') {
    res.json(saturnalia2025);
  } else {
    res.status(404).json({ error: 'Festival not found' });
  }
});

// Get all stages
router.get('/:festivalId/stages', (req, res) => {
  res.json(saturnalia2025.stages);
});

// Get specific stage
router.get('/:festivalId/stages/:stageId', (req, res) => {
  const { stageId } = req.params;
  const stage = saturnalia2025.stages.find(s => s.id === stageId);
  
  if (stage) {
    res.json(stage);
  } else {
    res.status(404).json({ error: 'Stage not found' });
  }
});

// Get all artists
router.get('/:festivalId/artists', (req, res) => {
  res.json(saturnalia2025.artists);
});

// Get specific artist
router.get('/:festivalId/artists/:artistId', (req, res) => {
  const { artistId } = req.params;
  const artist = saturnalia2025.artists.find(a => a.id === parseInt(artistId));
  
  if (artist) {
    res.json(artist);
  } else {
    res.status(404).json({ error: 'Artist not found' });
  }
});

// Get walking times
router.get('/:festivalId/walking-times', (req, res) => {
  res.json(saturnalia2025.walkingTimes);
});

module.exports = router;
