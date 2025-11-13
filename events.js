// WebSocket event definitions

module.exports = {
  CLIENT_EVENTS: {
    JOIN_FESTIVAL: 'join-festival',
    LEAVE_FESTIVAL: 'leave-festival',
    SUBMIT_VIBE: 'submit-vibe',
    REQUEST_VIBES: 'request-vibes'
  },
  
  SERVER_EVENTS: {
    WELCOME: 'welcome',
    VIBE_UPDATE: 'vibe-update',
    CROWD_ALERT: 'crowd-alert',
    SCHEDULE_NOTIFICATION: 'schedule-notification',
    ERROR: 'error'
  }
};
