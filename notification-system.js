const dbHelpers = require('./database-helpers');
const helpers = require('./helpers');

class NotificationSystem {
  constructor(io, festivalId) {
    this.io = io;
    this.festivalId = festivalId;
    this.isRunning = false;
    this.interval = null;
    this.sentNotifications = new Set(); // Track sent notifications
  }
  
  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    console.log('📢 Starting notification system...');
    
    // Check for upcoming events every 30 seconds
    this.interval = setInterval(() => {
      this.checkUpcomingEvents();
    }, 30000);
    
    // Also check immediately
    this.checkUpcomingEvents();
  }
  
  async checkUpcomingEvents() {
    if (!this.isRunning) return;
    
    try {
      const artists = await dbHelpers.getAllArtists(this.festivalId);
      const now = Date.now();
      
      for (const artist of artists) {
        const startTime = new Date(artist.startTime).getTime();
        const timeUntilStart = startTime - now;
        
        // Notify 15 minutes before
        const fifteenMinutes = 15 * 60 * 1000;
        const notificationKey = `${artist.id}-15min`;
        
        if (timeUntilStart > 0 && timeUntilStart <= fifteenMinutes && !this.sentNotifications.has(notificationKey)) {
          this.sendNotification({
            type: 'event-starting',
            artistId: artist.id,
            artistName: artist.name,
            stageId: artist.stage,
            startTime: artist.startTime,
            minutesUntil: Math.round(timeUntilStart / 60000),
            message: `🎵 ${artist.name} starts in ${Math.round(timeUntilStart / 60000)} minutes at ${artist.stage}!`
          });
          
          this.sentNotifications.add(notificationKey);
          console.log(`📢 Sent notification: ${artist.name} starting soon`);
        }
        
        // Notify when starting (within 2 minutes)
        const twoMinutes = 2 * 60 * 1000;
        const startingKey = `${artist.id}-now`;
        
        if (timeUntilStart > 0 && timeUntilStart <= twoMinutes && !this.sentNotifications.has(startingKey)) {
          this.sendNotification({
            type: 'event-now',
            artistId: artist.id,
            artistName: artist.name,
            stageId: artist.stage,
            message: `🔴 LIVE NOW: ${artist.name} at ${artist.stage}!`
          });
          
          this.sentNotifications.add(startingKey);
          console.log(`📢 Sent notification: ${artist.name} NOW LIVE`);
        }
      }
      
    } catch (error) {
      console.error('Error checking upcoming events:', error);
    }
  }
  
  sendNotification(data) {
    // Broadcast to all users in the festival
    this.io.to(`festival-${this.festivalId}`).emit('schedule-notification', {
      ...data,
      timestamp: Date.now()
    });
  }
  
  // Manual notification (for testing)
  sendTestNotification(message) {
    this.io.to(`festival-${this.festivalId}`).emit('schedule-notification', {
      type: 'test',
      message: message,
      timestamp: Date.now()
    });
    console.log('📢 Sent test notification:', message);
  }
  
  stop() {
    console.log('🛑 Stopping notification system...');
    this.isRunning = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

module.exports = NotificationSystem
