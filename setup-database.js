const admin = require('firebase-admin');
const { festivalInfo, stages, sampleArtists, walkingTimes } = require('./sample-data');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nomad-hackathon-default-rtdb.firebaseio.com"
});

const db = admin.database();

async function setupDatabase() {
  console.log('📊 Initializing Saturnalia 2025 database...');
  
  try {
    const festivalId = 'saturnalia-2025';
    const festivalRef = db.ref(`festivals/${festivalId}`);
    
    // 1. Add festival info
    await festivalRef.child('info').set({
      name: festivalInfo.name,
      location: festivalInfo.location,
      dates: festivalInfo.dates,
      edition: festivalInfo.edition,
      expectedFootfall: festivalInfo.expectedFootfall,
      coordinates: festivalInfo.coordinates
    });
    console.log('✅ Festival info added');
    
    // 2. Add stages
    const stagesRef = festivalRef.child('stages');
    for (const stage of stages) {
      await stagesRef.child(stage.id).set({
        name: stage.name,
        capacity: stage.capacity,
        type: stage.type,
        coordinates: stage.coordinates,
        description: stage.description
      });
    }
    console.log(`✅ ${stages.length} stages added`);
    
    // 3. Add artists
    const artistsRef = festivalRef.child('artists');
    for (const artist of sampleArtists) {
      await artistsRef.child(artist.id).set({
        name: artist.name,
        genre: artist.genre,
        stage: artist.stage,
        startTime: artist.startTime,
        endTime: artist.endTime,
        duration: artist.duration,
        popularity: artist.popularity,
        description: artist.description,
        day: artist.day
      });
    }
    console.log(`✅ ${sampleArtists.length} artists added`);
    
    // 4. Initialize vibe counters for each stage
    const vibesRef = festivalRef.child('vibes');
    for (const stage of stages) {
      await vibesRef.child(stage.id).set({
        fire: 0,
        party: 0,
        sleep: 0,
        neutral: 0,
        lastUpdate: Date.now()
      });
    }
    console.log('✅ Vibe counters initialized');
    
    // 5. Initialize crowd data for each stage
    const crowdRef = festivalRef.child('crowd');
    for (const stage of stages) {
      const randomCrowd = Math.floor(Math.random() * (stage.capacity * 0.5)); // Start at 0-50% capacity
      await crowdRef.child(stage.id).set({
        current: randomCrowd,
        capacity: stage.capacity,
        percent: Math.round((randomCrowd / stage.capacity) * 100),
        lastUpdate: Date.now()
      });
    }
    console.log('✅ Crowd data initialized');
    
    console.log('🎉 Database setup complete!');
    console.log(`\n📍 Festival: ${festivalInfo.name}`);
    console.log(`📅 Dates: ${festivalInfo.dates.start} to ${festivalInfo.dates.end}`);
    console.log(`🎪 Stages: ${stages.map(s => s.name).join(', ')}`);
    console.log(`🎵 Artists: ${sampleArtists.map(a => a.name).join(', ')}`);
    console.log(`\n🔥 Ready to rock Saturnalia 2025!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
