const { database } = require('./firebase-config');
const { ref, get, set, update, onValue, query, orderByChild, limitToLast } = require('firebase/database');

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

// ==========================================
// MEDIA UPLOAD FUNCTIONS (Photos + Videos)
// ==========================================

// Add media to database
async function addMedia(festivalId, stageId, mediaId, mediaData) {
  const mediaRef = ref(database, `festivals/${festivalId}/media/${stageId}/${mediaId}`);
  await set(mediaRef, mediaData);
  return mediaData;
}

// Get all media for a stage
async function getStageMedia(festivalId, stageId, limit = 20) {
  try {
    const mediaRef = ref(database, `festivals/${festivalId}/media/${stageId}`);
    const mediaQuery = query(mediaRef, orderByChild('likes'), limitToLast(limit));
    const snapshot = await get(mediaQuery);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const media = [];
    snapshot.forEach(child => {
      media.push(child.val());
    });
    
    return media.reverse(); // Most liked first
  } catch (error) {
    console.error('Error in getStageMedia:', error);
    return [];
  }
}

// Like/unlike media
async function likeMedia(festivalId, stageId, mediaId, userId) {
  const mediaRef = ref(database, `festivals/${festivalId}/media/${stageId}/${mediaId}`);
  const snapshot = await get(mediaRef);
  
  if (!snapshot.exists()) {
    throw new Error('Media not found');
  }
  
  const media = snapshot.val();
  const likedBy = media.likedBy || [];
  const hasLiked = likedBy.includes(userId);
  
  if (hasLiked) {
    // Unlike
    media.likedBy = likedBy.filter(id => id !== userId);
    media.likes = Math.max(0, media.likes - 1);
  } else {
    // Like
    media.likedBy = [...likedBy, userId];
    media.likes = (media.likes || 0) + 1;
  }
  
  await update(mediaRef, {
    likes: media.likes,
    likedBy: media.likedBy
  });
  
  return media;
}

// Get all media for festival
async function getAllMedia(festivalId, limit = 50) {
  try {
    const mediaRef = ref(database, `festivals/${festivalId}/media`);
    const snapshot = await get(mediaRef);
    
    if (!snapshot.exists()) {
      console.log('No media found in database yet');
      return [];
    }
    
    const allMedia = [];
    snapshot.forEach(stageSnapshot => {
      stageSnapshot.forEach(mediaSnapshot => {
        const mediaData = mediaSnapshot.val();
        if (mediaData) {
          allMedia.push(mediaData);
        }
      });
    });
    
    // Sort by likes (most popular first)
    return allMedia.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, limit);
  } catch (error) {
    console.error('Error in getAllMedia:', error);
    return [];
  }
}

module.exports = {
  getAllArtists,
  getArtist,
  getAllStages,
  getStageVibes,
  getStageCrowd,
  updateVibe,
  updateCrowd,
  listenToVibes,
  // Media functions
  addMedia,
  getStageMedia,
  likeMedia,
  getAllMedia
};
