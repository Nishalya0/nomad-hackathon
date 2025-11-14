const dbHelpers = require('./database-helpers');
const helpers = require('./helpers');

class CrowdSimulator {
  constructor(io, festivalId) {
    this.io = io;
    this.festivalId = festivalId;
    this.isRunning = false;
    this.intervals = [];
  }
  
  // Start simulating crowd changes
  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    console.log('🎭 Starting crowd simulation...');
    
    // Get all stages
    const stages = await dbHelpers.getAllStages(this.festivalId);
    
    // Simulate each stage independently
    for (const stage of stages) {
      this.simulateStage(stage);
    }
  }
  
  // Simulate realistic crowd movement for a stage
  simulateStage(stage) {
    const interval = setInterval(async () => {
      if (!this.isRunning) return;
      
      try {
        // Get current crowd
        const crowdData = await dbHelpers.getStageCrowd(this.festivalId, stage.id);
        
        if (!crowdData) return;
        
        // Random crowd change (-50 to +50 people)
        const change = Math.floor(Math.random() * 100) - 50;
        let newCrowd = crowdData.current + change;
        
        // Keep within realistic bounds (10% to 95% capacity)
        const minCrowd = Math.floor(stage.capacity * 0.1);
        const maxCrowd = Math.floor(stage.capacity * 0.95);
        newCrowd = Math.max(minCrowd, Math.min(maxCrowd, newCrowd));
        
        // Update Firebase
        const updatedCrowd = await dbHelpers.updateCrowd(this.festivalId, stage.id, newCrowd);
        
        // Broadcast update
        this.io.to(`festival-${this.festivalId}`).emit('crowd-update', {
          stageId: stage.id,
          stageName: stage.name,
          crowd: updatedCrowd,
          timestamp: Date.now()
        });
        
        // Check for alerts (over 80% capacity)
        if (updatedCrowd.percent >= 80 && crowdData.percent < 80) {
          this.io.to(`festival-${this.festivalId}`).emit('crowd-alert', {
            stageId: stage.id,
            stageName: stage.name,
            message: `⚠️ ${stage.name} is getting crowded (${updatedCrowd.percent}% full)`,
            severity: updatedCrowd.percent >= 90 ? 'high' : 'medium',
            timestamp: Date.now()
          });
          
          console.log(`⚠️ Alert: ${stage.name} at ${updatedCrowd.percent}%`);
        }
        
      } catch (error) {
        console.error(`Error simulating ${stage.id}:`, error);
      }
      
    }, 8000); // Update every 8 seconds
    
    this.intervals.push(interval);
  }
  
  // Stop simulation
  stop() {
    console.log('🛑 Stopping crowd simulation...');
    this.isRunning = false;
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
  }
}

module.exports = CrowdSimulator;
