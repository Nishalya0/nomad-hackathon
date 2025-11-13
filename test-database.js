const dbHelpers = require('./database-helpers');

async function testDatabase() {
  console.log('🧪 Testing Database Functions\n');
  
  const festivalId = 'coachella-2025';
  
  try {
    // Test 1: Get all artists
    console.log('Test 1: Get All Artists');
    const artists = await dbHelpers.getAllArtists(festivalId);
    console.log(`Found ${artists.length} artists`);
    if (artists.length > 0) {
      console.log(`First artist: ${artists[0].name}\n`);
    }
    
    // Test 2: Get single artist
    console.log('Test 2: Get Single Artist');
    const artist = await dbHelpers.getArtist(festivalId, 'artist-1');
    if (artist) {
      console.log(`Artist: ${artist.name}`);
      console.log(`Genre: ${artist.genre}`);
      console.log(`Stage: ${artist.stage}\n`);
    }
    
    // Test 3: Get stage vibes
    console.log('Test 3: Get Stage Vibes');
    const vibes = await dbHelpers.getStageVibes(festivalId, 'main-stage');
    if (vibes) {
      console.log('Current vibes:');
      console.log(`  🔥 Fire: ${vibes.fire}`);
      console.log(`  🎉 Party: ${vibes.party}`);
      console.log(`  😴 Sleep: ${vibes.sleep}\n`);
    }
    
    // Test 4: Update vibe
    console.log('Test 4: Update Vibe');
    const newCount = await dbHelpers.updateVibe(festivalId, 'main-stage', 'fire');
    console.log(`Updated fire count to: ${newCount}\n`);
    
    // Test 5: Get crowd data
    console.log('Test 5: Get Crowd Data');
    const crowd = await dbHelpers.getStageCrowd(festivalId, 'main-stage');
    if (crowd) {
      console.log(`Current: ${crowd.current}/${crowd.capacity}`);
      console.log(`Percentage: ${crowd.percent}%\n`);
    }
    
    // Test 6: Get all stages
    console.log('Test 6: Get All Stages');
    const stages = await dbHelpers.getAllStages(festivalId);
    console.log(`Found ${stages.length} stages:`);
    stages.forEach(stage => {
      console.log(`  - ${stage.name} (capacity: ${stage.capacity})`);
    });
    
    console.log('\n✅ All database tests passed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testDatabase();
