// Saturnalia 2025 - Golden Jubilee Edition
// TIET Patiala Festival Data

const festivalInfo = {
  id: 'saturnalia-2025',
  name: 'Saturnalia 2025 - Golden Jubilee Edition',
  location: 'Thapar Institute of Engineering & Technology, Patiala',
  dates: {
    start: '2025-11-13',
    end: '2025-11-16'
  },
  edition: '50th Edition',
  expectedFootfall: 20000,
  coordinates: {
    lat: 30.3549,
    lng: 76.3656
  }
};

const stages = [
  {
    id: 'mainstage',
    name: 'Main Stage',
    capacity: 8000,
    type: 'outdoor',
    coordinates: { lat: 30.3549, lng: 76.3656 },
    description: 'Primary performance arena for headlining acts'
  },
  {
    id: 'openair',
    name: 'Open Air Theatre',
    capacity: 5000,
    type: 'outdoor',
    coordinates: { lat: 30.3560, lng: 76.3645 },
    description: 'Outdoor venue for cultural performances'
  },
  {
    id: 'techzone',
    name: 'Tech Exhibition Arena',
    capacity: 3000,
    type: 'indoor',
    coordinates: { lat: 30.3540, lng: 76.3670 },
    description: 'Innovation showcase and tech competitions'
  },
  {
    id: 'indoorauditorium',
    name: 'Indoor Auditorium',
    capacity: 2500,
    type: 'indoor',
    coordinates: { lat: 30.3545, lng: 76.3650 },
    description: 'Classical performances and intimate shows'
  },
  {
    id: 'quadrangle',
    name: 'Campus Quadrangle',
    capacity: 4000,
    type: 'outdoor',
    coordinates: { lat: 30.3555, lng: 76.3660 },
    description: 'Central open space for dance battles and flash mobs'
  },
  {
    id: 'foodcourt',
    name: 'Festival Food Court',
    capacity: 2000,
    type: 'outdoor',
    coordinates: { lat: 30.3550, lng: 76.3665 },
    description: 'Dining and entertainment zone'
  }
];

const sampleArtists = [
  {
    id: 'artist-1',
    name: 'Amit Trivedi',
    genre: 'Bollywood/Indie',
    stage: 'mainstage',
    startTime: '2025-11-15T21:00:00',  // Day 3, 9 PM
    endTime: '2025-11-15T22:30:00',    // 90 min duration
    duration: 90,
    popularity: 95,
    description: 'Renowned Bollywood composer and singer',
    day: 3
  },
  {
    id: 'artist-2',
    name: 'The Local Train',
    genre: 'Rock/Alternative',
    stage: 'mainstage',
    startTime: '2025-11-14T20:00:00',  // Day 2, 8 PM
    endTime: '2025-11-14T21:15:00',    // 75 min
    duration: 75,
    popularity: 88,
    description: 'Popular Indian rock band',
    day: 2
  },
  {
    id: 'artist-3',
    name: 'Ritviz',
    genre: 'Electronic/EDM',
    stage: 'openair',
    startTime: '2025-11-15T22:45:00',  // Day 3, 10:45 PM
    endTime: '2025-11-15T23:45:00',    // 60 min
    duration: 60,
    popularity: 90,
    description: 'Electronic music producer and performer',
    day: 3
  },
  {
    id: 'artist-4',
    name: 'Pandit Mujtaba Hussain',
    genre: 'Classical/Flute',
    stage: 'indoorauditorium',
    startTime: '2025-11-13T19:00:00',  // Day 1, 7 PM
    endTime: '2025-11-13T20:00:00',    // 60 min
    duration: 60,
    popularity: 82,
    description: 'Renowned classical flautist',
    day: 1
  },
  {
    id: 'artist-5',
    name: 'When Chai Met Toast',
    genre: 'Indie/Folk',
    stage: 'openair',
    startTime: '2025-11-14T18:30:00',  // Day 2, 6:30 PM
    endTime: '2025-11-14T19:30:00',    // 60 min
    duration: 60,
    popularity: 85,
    description: 'Popular indie folk band',
    day: 2
  },
  {
    id: 'artist-6',
    name: 'Nucleya',
    genre: 'Bass/Electronic',
    stage: 'mainstage',
    startTime: '2025-11-16T21:30:00',  // Day 4, 9:30 PM
    endTime: '2025-11-16T23:00:00',    // 90 min
    duration: 90,
    popularity: 92,
    description: 'Indian electronic music producer',
    day: 4
  },
  {
    id: 'artist-7',
    name: 'Prateek Kuhad',
    genre: 'Indie/Singer-Songwriter',
    stage: 'openair',
    startTime: '2025-11-13T20:30:00',  // Day 1, 8:30 PM
    endTime: '2025-11-13T21:45:00',    // 75 min
    duration: 75,
    popularity: 89,
    description: 'Chart-topping indie singer-songwriter',
    day: 1
  },
  {
    id: 'artist-8',
    name: 'Lost Stories',
    genre: 'Progressive House/EDM',
    stage: 'mainstage',
    startTime: '2025-11-16T23:15:00',  // Day 4, 11:15 PM
    endTime: '2025-11-17T00:30:00',    // 75 min (goes into next day)
    duration: 75,
    popularity: 87,
    description: 'Award-winning DJ duo',
    day: 4
  }
];

// Walking times between stages (in minutes)
const walkingTimes = {
  'mainstage-openair': 5,
  'openair-mainstage': 5,
  
  'mainstage-techzone': 7,
  'techzone-mainstage': 7,
  
  'mainstage-indoorauditorium': 4,
  'indoorauditorium-mainstage': 4,
  
  'mainstage-quadrangle': 6,
  'quadrangle-mainstage': 6,
  
  'mainstage-foodcourt': 8,
  'foodcourt-mainstage': 8,
  
  'openair-techzone': 6,
  'techzone-openair': 6,
  
  'openair-indoorauditorium': 5,
  'indoorauditorium-openair': 5,
  
  'openair-quadrangle': 3,
  'quadrangle-openair': 3,
  
  'openair-foodcourt': 4,
  'foodcourt-openair': 4,
  
  'techzone-indoorauditorium': 5,
  'indoorauditorium-techzone': 5,
  
  'techzone-quadrangle': 7,
  'quadrangle-techzone': 7,
  
  'techzone-foodcourt': 4,
  'foodcourt-techzone': 4,
  
  'indoorauditorium-quadrangle': 4,
  'quadrangle-indoorauditorium': 4,
  
  'indoorauditorium-foodcourt': 6,
  'foodcourt-indoorauditorium': 6,
  
  'quadrangle-foodcourt': 3,
  'foodcourt-quadrangle': 3
};

module.exports = {
  festivalInfo,
  stages,
  sampleArtists,
  walkingTimes
};
