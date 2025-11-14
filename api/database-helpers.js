const { database } = require('./firebase-config');
const { ref, get, set, update, onValue } = require('firebase/database');

// Get all artists for a festival
async function getAllArtists(festivalId) {
  const artistsRef = ref(database, `festivals/${festivalId}/artists`);
  const snapshot = await get(artistsRef);
  
  if (snapshot.exists()) {
    const artists = [];
    snapshot.forEach(child => {
      artists.push(child.val());
    });
    return artists;
  }
  return [];
}

// Get single artist by ID
async function getArtist(festivalId, artistId) {
  const artistRef = ref(database, `festivals/${festivalId}/artists/${artistId}`);
  const snapshot = await get(artistRef);
  
  return snapshot.exists() ? snapshot.val() : null;
}

// Get all vibes for a stage
async function getStageVibes(festivalId, stageId) {
  const vibesRef = ref(database, `festivals/${festivalId}/vibes/${stageId}`);
  const snapshot = await get(vibesRef);
  
  return snapshot.exists() ? snapshot.val() : null;
}

// Update vibe count for a stage
async function updateVibe(festivalId, stageId, emoji) {
  const vibeRef = ref(database, `festivals/${festivalId}/vibes/${stageId}/${emoji}`);
  const snapshot = await get(vibeRef);
  
  const currentCount = snapshot.exists() ? snapshot.val() : 0;
  await set(vibeRef, currentCount + 1);
  
  // Update timestamp
  const timestampRef = ref(database, `festivals/${festivalId}/vibes/${stageId}/lastUpdate`);
  await set(timestampRef, Date.now());
  
  return currentCount + 1;
}

// Get crowd data for a stage
async function getStageCrowd(festivalId, stageId) {
  const crowdRef = ref(database, `festivals/${festivalId}/crowd/${stageId}`);
  const snapshot = await get(crowdRef);
  
  return snapshot.exists() ? snapshot.val() : null;
}

// Update crowd count
async function updateCrowd(festivalId, stageId, newCount) {
  const crowdRef = ref(database, `festivals/${festivalId}/crowd/${stageId}`);
  const snapshot = await get(crowdRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    const percent = Math.round((newCount / data.capacity) * 100);
    
    await update(crowdRef, {
      current: newCount,
      percent: percent
    });
    
    return { current: newCount, capacity: data.capacity, percent };
  }
  
  return null;
}

// Listen to vibe changes in real-time
function listenToVibes(festivalId, stageId, callback) {
  const vibesRef = ref(database, `festivals/${festivalId}/vibes/${stageId}`);
  
  return onValue(vibesRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
}

// Get all stages
async function getAllStages(festivalId) {
  const stagesRef = ref(database, `festivals/${festivalId}/stages`);
  const snapshot = await get(stagesRef);
  
  if (snapshot.exists()) {
    const stages = [];
    snapshot.forEach(child => {
      stages.push(child.val());
    });
    return stages;
  }
  return [];
}

module.exports = {
  getAllArtists,
  getArtist,
  getStageVibes,
  updateVibe,
  getStageCrowd,
  updateCrowd,
  listenToVibes,
  getAllStages
};
