const saturnalia2025 = {
  id: 'saturnalia_2025',
  name: 'Saturnalia 2025 - Golden Jubilee Edition',
  location: { 
    lng: 76.3656,  // TIET Patiala coordinates
    lat: 30.3549,
    address: 'Thapar Institute of Engineering & Technology, Patiala, Punjab 147004'
  },
  dates: ['2025-11-13', '2025-11-14', '2025-11-15', '2025-11-16'],
  edition: '50th Edition',
  expectedFootfall: 20000,
  
  stages: [
    { 
      id: 'mainstage', 
      name: 'Main Stage', 
      lng: 76.3656, 
      lat: 30.3549, 
      capacity: 8000,
      description: 'Primary performance arena for headlining acts'
    },
    { 
      id: 'openair', 
      name: 'Open Air Theatre', 
      lng: 76.3645, 
      lat: 30.3560, 
      capacity: 5000,
      description: 'Outdoor venue for cultural performances'
    },
    { 
      id: 'techzone', 
      name: 'Tech Exhibition Arena', 
      lng: 76.3670, 
      lat: 30.3540, 
      capacity: 3000,
      description: 'Innovation showcase and tech competitions'
    },
    { 
      id: 'indoorauditorium', 
      name: 'Indoor Auditorium', 
      lng: 76.3650, 
      lat: 30.3545, 
      capacity: 2500,
      description: 'Classical performances and intimate shows'
    },
    { 
      id: 'quadrangle', 
      name: 'Campus Quadrangle', 
      lng: 76.3660, 
      lat: 30.3555, 
      capacity: 4000,
      description: 'Central open space for dance battles and flash mobs'
    },
    { 
      id: 'foodcourt', 
      name: 'Festival Food Court', 
      lng: 76.3665, 
      lat: 30.3550, 
      capacity: 2000,
      description: 'Dining and entertainment zone'
    }
  ],
  
  artists: [
    { 
      id: 1, 
      name: 'Amit Trivedi', 
      genre: 'Bollywood/Indie', 
      stage: 'mainstage', 
      day: 'Day 3',
      time: '21:00', 
      duration: 90,
      popularity: 95,
      description: 'Renowned Bollywood composer and singer'
    },
    { 
      id: 2, 
      name: 'The Local Train', 
      genre: 'Rock/Alternative', 
      stage: 'mainstage', 
      day: 'Day 2',
      time: '20:00', 
      duration: 75,
      popularity: 88,
      description: 'Popular Indian rock band'
    },
    { 
      id: 3, 
      name: 'Ritviz', 
      genre: 'Electronic/EDM', 
      stage: 'openair', 
      day: 'Day 3',
      time: '22:45', 
      duration: 60,
      popularity: 90,
      description: 'Electronic music producer and performer'
    },
    { 
      id: 4, 
      name: 'Pandit Mujtaba Hussain', 
      genre: 'Classical/Flute', 
      stage: 'indoorauditorium', 
      day: 'Day 1',
      time: '19:00', 
      duration: 60,
      popularity: 82,
      description: 'Renowned classical flautist'
    },
    { 
      id: 5, 
      name: 'When Chai Met Toast', 
      genre: 'Indie/Folk', 
      stage: 'openair', 
      day: 'Day 2',
      time: '18:30', 
      duration: 60,
      popularity: 85,
      description: 'Popular indie folk band'
    },
    { 
      id: 6, 
      name: 'Nucleya', 
      genre: 'Bass/Electronic', 
      stage: 'mainstage', 
      day: 'Day 4',
      time: '21:30', 
      duration: 90,
      popularity: 92,
      description: 'Indian electronic music producer'
    },
    { 
      id: 7, 
      name: 'Prateek Kuhad', 
      genre: 'Indie/Singer-Songwriter', 
      stage: 'openair', 
      day: 'Day 1',
      time: '20:30', 
      duration: 75,
      popularity: 89,
      description: 'Chart-topping indie singer-songwriter'
    },
    { 
      id: 8, 
      name: 'Lost Stories', 
      genre: 'Progressive House/EDM', 
      stage: 'mainstage', 
      day: 'Day 4',
      time: '23:15', 
      duration: 75,
      popularity: 87,
      description: 'Award-winning DJ duo'
    }
  ],
  
  walkingTimes: {
    'mainstage-openair': 5,
    'mainstage-techzone': 7,
    'mainstage-indoorauditorium': 4,
    'mainstage-quadrangle': 6,
    'mainstage-foodcourt': 8,
    'openair-techzone': 6,
    'openair-indoorauditorium': 5,
    'openair-quadrangle': 3,
    'openair-foodcourt': 4,
    'techzone-indoorauditorium': 5,
    'techzone-quadrangle': 7,
    'techzone-foodcourt': 4,
    'indoorauditorium-quadrangle': 4,
    'indoorauditorium-foodcourt': 6,
    'quadrangle-foodcourt': 3
  }
};

module.exports = { saturnalia2025 };
