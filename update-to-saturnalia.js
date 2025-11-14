// Quick script to update Firebase with Saturnalia 2025 data
const { initializeApp, getApps, getApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const firebaseConfig = require('./firebase-config');
const { festivalInfo, stages, sampleArtists } = require('./sample-data');

// Initialize only if not already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use existing app
}

const db = getDatabase(app);

async function updateData() {
  console.log('🔄 Updating to Saturnalia 2025 data...\n');
  
  const festivalId = 'saturnalia-2025';
  
  try {
    // Update festival info
    await set(ref(db, `festivals/${festivalId}/info`), festivalInfo);
    console.log('✅ Festival info updated');
    
    // Update stages
    for (const stage of stages) {
      await set(ref(db, `festivals/${festivalId}/stages/${stage.id}`), stage);
      
      // Initialize vibes for new stage
      await set(ref(db, `festivals/${festivalId}/vibes/${stage.id}`), {
        fire: 0,
        party: 0,
        sleep: 0,
        neutral: 0,
        lastUpdate: Date.now()
      });
      
      // Initialize crowd
      await set(ref(db, `festivals/${festivalId}/crowd/${stage.id}`), {
        current: Math.floor(Math.random() * stage.capacity * 0.5),
        capacity: stage.capacity,
        percent: Math.round((Math.random() * stage.capacity * 0.5 / stage.capacity) * 100),
        lastUpdate: Date.now()
      });
    }
    console.log(`✅ ${stages.length} stages updated`);
    
    // Update artists
    for (const artist of sampleArtists) {
      await set(ref(db, `festivals/${festivalId}/artists/${artist.id}`), artist);
    }
    console.log(`✅ ${sampleArtists.length} artists updated`);
    
    console.log('\n🎉 All data updated to Saturnalia 2025!');
    console.log(`\n📍 ${festivalInfo.name}`);
    console.log(`📅 ${festivalInfo.dates.start} to ${festivalInfo.dates.end}`);
    console.log(`🎪 Stages: ${stages.map(s => s.name).join(', ')}`);
    console.log(`🎵 Artists: ${sampleArtists.map(a => a.name).join(', ')}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateData();
