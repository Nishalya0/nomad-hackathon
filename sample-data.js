// Sample data for testing - will replace with real Saturnalia data later

const sampleArtists = [
  // Headliners (Main Stage)
  {
    id: 'artist-1',
    name: 'The Headliners',
    genre: 'Rock',
    stage: 'main-stage',
    startTime: '2025-04-11T21:00:00',
    endTime: '2025-04-11T22:30:00',
    duration: 90,
    popularity: 95,
    description: 'Main headliner act'
  },
  {
    id: 'artist-2',
    name: 'Electronic Dreams',
    genre: 'EDM',
    stage: 'sahara-tent',
    startTime: '2025-04-11T20:30:00',
    endTime: '2025-04-11T22:00:00',
    duration: 90,
    popularity: 90,
    description: 'Electronic dance music'
  },
  
  // Mid-tier artists
  {
    id: 'artist-3',
    name: 'Indie Collective',
    genre: 'Indie Rock',
    stage: 'mojave-stage',
    startTime: '2025-04-11T19:00:00',
    endTime: '2025-04-11T20:00:00',
    duration: 60,
    popularity: 75,
    description: 'Popular indie band'
  },
  {
    id: 'artist-4',
    name: 'Jazz Fusion Band',
    genre: 'Jazz',
    stage: 'gobi-stage',
    startTime: '2025-04-11T18:30:00',
    endTime: '2025-04-11T19:30:00',
    duration: 60,
    popularity: 70,
    description: 'Smooth jazz vibes'
  },
  {
    id: 'artist-5',
    name: 'Hip Hop Collective',
    genre: 'Hip Hop',
    stage: 'sahara-tent',
    startTime: '2025-04-11T19:00:00',
    endTime: '2025-04-11T20:00:00',
    duration: 60,
    popularity: 85,
    description: 'High energy hip hop'
  },
  
  // Smaller acts
  {
    id: 'artist-6',
    name: 'Local Band A',
    genre: 'Alternative',
    stage: 'sonora-stage',
    startTime: '2025-04-11T17:00:00',
    endTime: '2025-04-11T17:45:00',
    duration: 45,
    popularity: 50,
    description: 'Up and coming local act'
  },
  {
    id: 'artist-7',
    name: 'Acoustic Duo',
    genre: 'Folk',
    stage: 'gobi-stage',
    startTime: '2025-04-11T17:00:00',
    endTime: '2025-04-11T18:00:00',
    duration: 60,
    popularity: 60,
    description: 'Chill acoustic performance'
  },
  {
    id: 'artist-8',
    name: 'DJ Nightshift',
    genre: 'House',
    stage: 'yuma-stage',
    startTime: '2025-04-11T22:00:00',
    endTime: '2025-04-11T23:30:00',
    duration: 90,
    popularity: 80,
    description: 'Late night house music'
  }
];

// Walking times between stages (in minutes)
const walkingTimes = {
  'main-stage': {
    'sahara-tent': 8,
    'mojave-stage': 5,
    'gobi-stage': 10,
    'sonora-stage': 12,
    'yuma-stage': 15
  },
  'sahara-tent': {
    'main-stage': 8,
    'mojave-stage': 6,
    'gobi-stage': 6,
    'sonora-stage': 10,
    'yuma-stage': 8
  },
  'mojave-stage': {
    'main-stage': 5,
    'sahara-tent': 6,
    'gobi-stage': 7,
    'sonora-stage': 9,
    'yuma-stage': 12
  },
  'gobi-stage': {
    'main-stage': 10,
    'sahara-tent': 6,
    'mojave-stage': 7,
    'sonora-stage': 4,
    'yuma-stage': 7
  },
  'sonora-stage': {
    'main-stage': 12,
    'sahara-tent': 10,
    'mojave-stage': 9,
    'gobi-stage': 4,
    'yuma-stage': 5
  },
  'yuma-stage': {
    'main-stage': 15,
    'sahara-tent': 8,
    'mojave-stage': 12,
    'gobi-stage': 7,
    'sonora-stage': 5
  }
};

// Stage information
const stages = [
  {
    id: 'main-stage',
    name: 'Main Stage',
    capacity: 10000,
    type: 'outdoor',
    amenities: ['food', 'restrooms', 'merchandise']
  },
  {
    id: 'sahara-tent',
    name: 'Sahara Tent',
    capacity: 5000,
    type: 'tent',
    amenities: ['bar', 'restrooms']
  },
  {
    id: 'mojave-stage',
    name: 'Mojave Stage',
    capacity: 3000,
    type: 'outdoor',
    amenities: ['food', 'seating']
  },
  {
    id: 'gobi-stage',
    name: 'Gobi Stage',
    capacity: 2500,
    type: 'tent',
    amenities: ['bar', 'vip-area']
  },
  {
    id: 'sonora-stage',
    name: 'Sonora Stage',
    capacity: 1500,
    type: 'indoor',
    amenities: ['ac', 'bar']
  },
  {
    id: 'yuma-stage',
    name: 'Yuma Stage',
    capacity: 2000,
    type: 'tent',
    amenities: ['bar', 'lighting-special']
  }
];

module.exports = {
  sampleArtists,
  walkingTimes,
  stages
};
