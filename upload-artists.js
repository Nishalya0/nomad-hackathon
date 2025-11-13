const { database } = require('./firebase-config');
const { ref, set } = require('firebase/database');
const { sampleArtists, stages } = require('./sample-data');

async function uploadArtists() {
  console.log('📤 Uploading artists to Firebase...\n');
  
  try {
    // Upload each artist
    for (const artist of sampleArtists) {
      const artistRef = ref(database, `festivals/coachella-2025/artists/${artist.id}`);
      await set(artistRef, artist);
      console.log(`✅ Uploaded: ${artist.name}`);
    }
    
    console.log(`\n🎵 Total artists uploaded: ${sampleArtists.length}`);
    
    // Upload stage details
    console.log('\n📍 Uploading stage details...');
    for (const stage of stages) {
      const stageRef = ref(database, `festivals/coachella-2025/stages/${stage.id}`);
      await set(stageRef, stage);
      console.log(`✅ Uploaded: ${stage.name}`);
    }
    
    console.log('\n🎉 All data uploaded successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error uploading data:', error);
    process.exit(1);
  }
}

uploadArtists();
