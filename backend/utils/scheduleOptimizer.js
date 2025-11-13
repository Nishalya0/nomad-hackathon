// Smart Schedule Optimizer
class ScheduleOptimizer {
  constructor(artists, walkingTimes, userPreferences = {}) {
    this.artists = artists;
    this.walkingTimes = walkingTimes;
    this.preferences = userPreferences;
  }

  // Calculate preference score for an artist
  calculateScore(artist) {
    let score = artist.popularity || 50; // Base score from popularity
    
    // Boost score if genre matches user preferences
    if (this.preferences.genres && this.preferences.genres.includes(artist.genre)) {
      score += 30;
    }
    
    // Boost highly popular artists
    if (artist.popularity > 90) {
      score += 20;
    }
    
    return score;
  }

  // Check if two time slots conflict
  timeConflict(artist1, artist2) {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const start1 = parseTime(artist1.time);
    const end1 = start1 + artist1.duration;
    const start2 = parseTime(artist2.time);
    const end2 = start2 + artist2.duration;

    return (start1 < end2 && end1 > start2);
  }

  // Get walking time between two stages
  getWalkingTime(stage1, stage2) {
    const key1 = `${stage1}-${stage2}`;
    const key2 = `${stage2}-${stage1}`;
    return this.walkingTimes[key1] || this.walkingTimes[key2] || 10;
  }

  // Check if user can make it between two shows
  canMakeIt(artist1, artist2) {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const end1 = parseTime(artist1.time) + artist1.duration;
    const start2 = parseTime(artist2.time);
    const travelTime = this.getWalkingTime(artist1.stage, artist2.stage);

    return (start2 - end1) >= travelTime;
  }

  // Generate optimized schedule
  generateSchedule() {
    // Sort artists by preference score
    const scoredArtists = this.artists.map(artist => ({
      ...artist,
      score: this.calculateScore(artist)
    })).sort((a, b) => b.score - a.score);

    const schedule = [];
    const conflicts = [];

    for (let artist of scoredArtists) {
      let hasConflict = false;

      // Check for time conflicts
      for (let scheduled of schedule) {
        if (this.timeConflict(artist, scheduled)) {
          hasConflict = true;
          conflicts.push({
            artist1: scheduled.name,
            artist2: artist.name,
            reason: 'Time overlap'
          });
          break;
        }

        // Check if user can travel between venues in time
        if (!this.canMakeIt(scheduled, artist)) {
          hasConflict = true;
          conflicts.push({
            artist1: scheduled.name,
            artist2: artist.name,
            reason: `Cannot travel from ${scheduled.stage} to ${artist.stage} in time`
          });
          break;
        }
      }

      if (!hasConflict) {
        schedule.push(artist);
      }
    }

    return {
      schedule: schedule.sort((a, b) => {
        const parseTime = (timeStr) => {
          const [hours, minutes] = timeStr.split(':').map(Number);
          return hours * 60 + minutes;
        };
        return parseTime(a.time) - parseTime(b.time);
      }),
      conflicts: conflicts,
      stats: {
        totalArtists: this.artists.length,
        scheduledArtists: schedule.length,
        missedArtists: this.artists.length - schedule.length
      }
    };
  }

  // Get route between stages
  getOptimalRoute(fromStage, toStage) {
    const walkTime = this.getWalkingTime(fromStage, toStage);
    return {
      from: fromStage,
      to: toStage,
      walkingTime: walkTime,
      recommendation: walkTime > 8 ? 'Leave early!' : 'You have time'
    };
  }
}

module.exports = ScheduleOptimizer;
