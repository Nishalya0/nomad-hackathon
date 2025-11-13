const helpers = require('./helpers');
const { sampleArtists, walkingTimes } = require('./sample-data');

console.log('🧪 Testing Helper Functions\n');

// Test 1: Walking time
console.log('Test 1: Walking Time');
const walkTime = helpers.getWalkingTime('main-stage', 'sahara-tent', walkingTimes);
console.log(`Walking time from Main Stage to Sahara: ${walkTime} minutes`);
console.log(`Readable: ${helpers.minutesToReadable(walkTime)}\n`);

// Test 2: Time conflict
console.log('Test 2: Time Conflict Detection');
const artist1 = sampleArtists[0]; // The Headliners
const artist2 = sampleArtists[1]; // Electronic Dreams
const walkTimeConflict = helpers.getWalkingTime(artist1.stage, artist2.stage, walkingTimes);
const hasConflict = helpers.hasTimeConflict(artist1, artist2, walkTimeConflict);
console.log(`${artist1.name} (${helpers.formatTime(artist1.startTime)})`);
console.log(`${artist2.name} (${helpers.formatTime(artist2.startTime)})`);
console.log(`Walking time: ${walkTimeConflict} min`);
console.log(`Has conflict: ${hasConflict ? 'YES ⚠️' : 'NO ✅'}\n`);

// Test 3: Format time
console.log('Test 3: Time Formatting');
console.log(`Original: ${artist1.startTime}`);
console.log(`Formatted: ${helpers.formatTime(artist1.startTime)}\n`);

// Test 4: Crowd density
console.log('Test 4: Crowd Density Calculation');
const currentCrowd = 7800;
const capacity = 10000;
const density = helpers.calculateCrowdDensity(currentCrowd, capacity);
const status = helpers.getCrowdStatus(density);
console.log(`Current: ${currentCrowd}, Capacity: ${capacity}`);
console.log(`Density: ${density}%`);
console.log(`Status: ${status}\n`);

// Test 5: Find artists at specific time
console.log('Test 5: Artists Performing at 9:00 PM');
const targetTime = '2025-04-11T21:00:00';
const performingNow = helpers.getArtistsAtTime(sampleArtists, targetTime);
console.log(`At ${helpers.formatTime(targetTime)}:`);
performingNow.forEach(artist => {
  console.log(`  - ${artist.name} at ${artist.stage}`);
});

console.log('\n✅ All tests complete!');
