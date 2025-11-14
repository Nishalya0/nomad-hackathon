// Helper functions for time calculations and data manipulation

// Calculate walking time between two stages
function getWalkingTime(fromStage, toStage, walkingTimes) {
  if (fromStage === toStage) return 0;
  
  if (walkingTimes[fromStage] && walkingTimes[fromStage][toStage]) {
    return walkingTimes[fromStage][toStage];
  }
  
  // If no data, return default estimate
  return 10;
}

// Check if two events have time conflict
function hasTimeConflict(event1, event2, walkingTime = 0) {
  const start1 = new Date(event1.startTime).getTime();
  const end1 = new Date(event1.endTime).getTime();
  const start2 = new Date(event2.startTime).getTime();
  const end2 = new Date(event2.endTime).getTime();
  
  // Add walking time buffer to event1's end time
  const end1WithBuffer = end1 + (walkingTime * 60 * 1000);
  
  // Check if they overlap
  return (start1 < end2 && end1WithBuffer > start2);
}

// Format time for display (e.g., "9:00 PM")
function formatTime(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
}

// Calculate time difference in minutes
function getTimeDifferenceMinutes(time1, time2) {
  const date1 = new Date(time1).getTime();
  const date2 = new Date(time2).getTime();
  
  return Math.abs(date2 - date1) / (1000 * 60);
}

// Get current timestamp
function getCurrentTimestamp() {
  return Date.now();
}

// Convert minutes to readable format (e.g., "1h 30m")
function minutesToReadable(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

// Find artists performing at a specific time
function getArtistsAtTime(artists, targetTime) {
  const target = new Date(targetTime).getTime();
  
  return artists.filter(artist => {
    const start = new Date(artist.startTime).getTime();
    const end = new Date(artist.endTime).getTime();
    return target >= start && target <= end;
  });
}

// Sort artists by start time
function sortArtistsByTime(artists) {
  return artists.sort((a, b) => {
    return new Date(a.startTime) - new Date(b.startTime);
  });
}

// Calculate crowd density percentage
function calculateCrowdDensity(current, capacity) {
  if (capacity === 0) return 0;
  return Math.round((current / capacity) * 100);
}

// Get crowd level status (low, medium, high)
function getCrowdStatus(percentage) {
  if (percentage < 50) return 'low';
  if (percentage < 80) return 'medium';
  return 'high';
}

module.exports = {
  getWalkingTime,
  hasTimeConflict,
  formatTime,
  getTimeDifferenceMinutes,
  getCurrentTimestamp,
  minutesToReadable,
  getArtistsAtTime,
  sortArtistsByTime,
  calculateCrowdDensity,
  getCrowdStatus
};
