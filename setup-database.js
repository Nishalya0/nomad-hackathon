const { database } = require('./firebase-config');
const { ref, set } = require('firebase/database');

async function setupDatabase() {
  console.log('🔧 Setting up Firebase database...');
  
  // Create the basic festival structure
  const festivalData = {
    info: {
      name: "Coachella 2025",
      location: "Indio, CA",
      dates: ["2025-04-11", "2025-04-12", "2025-04-13"]
    },
    stages: {
      'main-stage': {
        name: "Main Stage",
        capacity: 10000,
        coordinates: { lat: 33.6803, lng: -116.2370 }
      },
      'sahara-tent': {
        name: "Sahara Tent",
        capacity: 5000,
        coordinates: { lat: 33.6805, lng: -116.2365 }
      },
      'mojave-stage': {
        name: "Mojave Stage",
        capacity: 3000,
        coordinates: { lat: 33.6800, lng: -116.2375 }
      }
    },
    vibes: {
      'main-stage': { 
        fire: 0, 
        party: 0, 
        sleep: 0, 
        neutral: 0,
        lastUpdate: Date.now() 
      },
      'sahara-tent': { 
        fire: 0, 
        party: 0, 
        sleep: 0, 
        neutral: 0,
        lastUpdate: Date.now() 
      },
      'mojave-stage': { 
        fire: 0, 
        party: 0, 
        sleep: 0, 
        neutral: 0,
        lastUpdate: Date.now() 
      }
    },
    crowd: {
      'main-stage': { current: 0, capacity: 10000, percent: 0 },
      'sahara-tent': { current: 0, capacity: 5000, percent: 0 },
      'mojave-stage': { current: 0, capacity: 3000, percent: 0 }
    }
  };
  
  try {
    // Save to Firebase
    const festivalRef = ref(database, 'festivals/coachella-2025');
    await set(festivalRef, festivalData);
    
    console.log('✅ Database setup complete!');
    console.log('🎪 Festival: Coachella 2025');
    console.log('📍 3 stages created');
    console.log('🎭 Vibe tracking initialized');
    
    process.exit(0); // Exit the script
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
