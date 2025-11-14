# NOMAD Real-Time Server - Team Integration Guide 🎪

> **Last Updated:** November 13, 2025 - Hour 6 Complete

## 📢 IMPORTANT: About the Current Data

### ⚠️ This is PLACEHOLDER DATA for Development

**Current Status:**
- ✅ All systems are functional with **mock "Coachella 2025"** data
- ✅ Database structure is ready
- ✅ WebSocket connections are working
- ⏳ **Real Saturnalia data to be added at Hour 18-20**

**What's Mock Data:**
- Festival name: "Coachella 2025" → Will become "Saturnalia 2025"
- Stages: "Main Stage", "Sahara Tent", etc. → Will become our actual campus venues
- Artists: "The Headliners", "Electronic Dreams", etc. → Will become real Saturnalia performers
- Dates: April 2025 → Will become actual Saturnalia dates

**Why We're Using Mock Data:**
1. **Focus on functionality first** - Build features without waiting for final event details
2. **Easier testing** - Consistent data makes debugging simpler
3. **Parallel development** - All team members can work simultaneously
4. **Quick data swap** - Takes only 15-20 minutes to replace with real data later

**When We'll Update:**
- **Hour 18-20**: Switch to real Saturnalia venue names, dates, and events
- **One-time change**: All files will be updated together to avoid confusion

---

## ✅ What's Ready (Hours 0-6)

### 🎯 Working Systems:
- ✅ WebSocket real-time server (Port 3001)
- ✅ Firebase Realtime Database (connected & populated)
- ✅ Sample data with 8 artists across 6 stages
- ✅ Helper functions for time calculations
- ✅ Database query functions
- ✅ Test scripts verified working

### 📁 Files Available:

**Core System Files:**
- `index.js` - WebSocket server (Socket.io)
- `firebase-config.js` - Database connection
- `setup-database.js` - Database initialization script

**Data Files (PLACEHOLDER - Will be updated):**
- `sample-data.js` - 8 mock artists, 6 mock stages, walking times
- `events.js` - WebSocket event definitions

**Helper Libraries (Production Ready):**
- `helpers.js` - Time calculations, conflict detection (reusable)
- `database-helpers.js` - Firebase query functions (reusable)

**Testing & Documentation:**
- `test-helpers.js` - Utility function tests
- `test-database.js` - Database query tests
- `test-client.html` - WebSocket connection demo
- `api-tests.rest` - API endpoint templates

---

## 📊 Firebase Database Structure

**Current Structure** (using mock data):
festivals/
└── coachella-2025/ ← Will become "saturnalia-2025"
├── info/ (festival name, dates, location)
├── stages/ (6 mock stages with capacity)
├── artists/ (8 mock artists with schedules)
├── vibes/ (emoji counts per stage - live)
└── crowd/ (current crowd per stage - live)

**After Hour 18 Update**:

festivals/
└── saturnalia-2025/ ← Updated festival ID
├── info/ (Real Saturnalia name, dates, campus location)
├── stages/ (Real campus venues: Auditorium, Quad, etc.)
├── artists/ (Real Saturnalia performers & events)
├── vibes/ (Same structure - no change needed)
└── crowd/ (Same structure - no change needed)


**Note:** The vibe and crowd tracking systems are **generic** and will work unchanged with real data.

---

## 🔌 Integration Guide by Developer Role

### 👨‍💻 Developer 1 (Frontend Team)

**What You Need:**
- WebSocket server URL: `http://localhost:3001`
- Socket.io client library (CDN)
- Event names from `events.js`

**Setup (No Installation Required):**
<!-- Add to your HTML --> <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script> <script> // Connect to real-time server const socket = io('http://localhost:3001'); // Join festival (update festival ID at Hour 18) socket.emit('join-festival', { festivalId: 'coachella-2025', // ← Will become 'saturnalia-2025' userId: 'user-123' }); // Submit vibe socket.on('vibe-update', (data) => { console.log('Received vibe update:', data); // Update your UI here }); </script>


**Important Notes:**
- Festival ID will change to `saturnalia-2025` at Hour 18
- Stage IDs will change (e.g., `main-stage` → `main-auditorium`)
- WebSocket event structure stays the same

**Available WebSocket Events:** See `events.js` for complete list

---

### 🔧 Developer 2 (Backend/API Team)

**What You Need:**
- Copy these files to your backend project:
  - `helpers.js` (time calculations)
  - `database-helpers.js` (Firebase queries)
  - `sample-data.js` (reference data structure)
  - `firebase-config.js` (database connection)

**Installation:**

**APIs You Need to Build:**

1. **GET /api/artists** - Return all artists
const dbHelpers = require('./database-helpers');

app.get('/api/artists', async (req, res) => {
const artists = await dbHelpers.getAllArtists('coachella-2025');
res.json(artists);
});

text

2. **GET /api/artists/:id** - Return single artist
3. **GET /api/stages** - Return all stages
4. **GET /api/vibes/:stageId** - Get vibe counts
5. **POST /api/vibes** - Submit new vibe (will be handled by WebSocket primarily)
6. **GET /api/crowd/:stageId** - Get crowd data

**Helper Functions You Can Use:**
const helpers = require('./helpers');
const { walkingTimes } = require('./sample-data');

// Calculate walking time between venues
const walkTime = helpers.getWalkingTime('main-stage', 'sahara-tent', walkingTimes);

// Check for schedule conflicts
const hasConflict = helpers.hasTimeConflict(artist1, artist2, walkTime);

// Format times for display
const displayTime = helpers.formatTime(artist.startTime);

text

**Data Update Note:**
- At Hour 18, `sample-data.js` will be updated with real Saturnalia data
- Your API code **won't need to change** - just restart to load new data
- Festival ID changes from `coachella-2025` to `saturnalia-2025`

---

### 🚀 Developer 3 (Real-Time Systems - Me)

**Next Tasks (Hours 6-10):**
- [ ] Integrate `database-helpers.js` with WebSocket events
- [ ] Build vibe aggregation and broadcasting system
- [ ] Create crowd density simulation for demo
- [ ] Implement live notifications
- [ ] Choreograph multi-device demo

**Status:** ✅ Foundation complete, ready to build real-time features

---

### 🌐 Developer 4 (DevOps/Integration)

**What You Have Access To:**
- Firebase Console URL: [Add your Firebase console link]
- WebSocket server running on port 3001
- All test scripts in project root

**Deployment Requirements (Hour 14-16):**
- Deploy real-time server to Railway/Render
- Deploy frontend to Vercel/Netlify
- Update WebSocket URL from localhost to production
- Environment variables for Firebase config

**Testing Resources:**
- Run `node test-helpers.js` - Tests utility functions
- Run `node test-database.js` - Tests Firebase queries
- Open `test-client.html` - Visual WebSocket test
- Use `api-tests.rest` - API endpoint testing

---

## 🧪 Testing Everything Works

**Quick Verification (5 minutes):**

1. **Test helper functions:**
node test-helpers.js

text
Expected: ✅ All tests complete!

2. **Test database queries:**
node test-database.js

text
Expected: ✅ All database tests passed!

3. **Test WebSocket connection:**
- Make sure server is running: `npm run dev`
- Open `test-client.html` in 2 browser tabs
- Click "Send 🔥" in tab 1
- Should appear in tab 2 instantly

4. **Verify Firebase:**
- Open Firebase Console
- Check `festivals/coachella-2025/`
- Should see artists, stages, vibes, crowd data

---

## 🔄 Data Update Plan (Hour 18-20)

**When we get real Saturnalia data, we'll update:**

**Files to Change:**
1. `sample-data.js` - Replace with real venues, performers, times
2. `setup-database.js` - Update festival info and stage names
3. `test-client.html` - Update festival ID references

**Files That DON'T Need Changes:**
- ✅ `helpers.js` - Generic time functions
- ✅ `database-helpers.js` - Generic database queries
- ✅ `index.js` - WebSocket server (works with any festival)
- ✅ All API code - Uses festival ID parameter

**Estimated Time to Switch:** 15-20 minutes  
**Who Does It:** Developer 3 (Real-time lead) with team input

---

## 📋 What We Need from Team Before Hour 18

**Please provide:**
- [ ] List of actual Saturnalia venue names (with capacities)
- [ ] Festival dates (exact dates)
- [ ] Performer/event list with approximate times
- [ ] Walking times between campus venues (rough estimates OK)
- [ ] Campus location/name for festival info

**Share in:** Team group chat or shared doc by Hour 16

---

## 🚨 Important Notes

### For All Developers:
1. **Don't worry about "Coachella" references** - they're placeholders
2. **Build features assuming data structure stays the same** (it will)
3. **Test with current mock data** - easier to debug
4. **Festival ID will change once** - we'll sync as a team

### Best Practices:
- ✅ Use helper functions instead of duplicating code
- ✅ Test with `test-client.html` before integrating
- ✅ Check Firebase Console to see live data updates
- ✅ Commit code frequently (every 1-2 hours)

---

## 🆘 Troubleshooting

**Server won't start:**
npm install # Reinstall dependencies
npm run dev # Try starting again

text

**Firebase errors:**
- Check `firebase-config.js` has correct credentials
- Verify database is in "test mode" (no auth required)

**WebSocket won't connect:**
- Make sure server is running (`npm run dev`)
- Check browser console for errors
- Verify port 3001 is not blocked

**Data not showing in Firebase:**
node setup-database.js # Re-run database setup

text

---

## 📞 Questions?

**Ping Developer 3 (Real-time lead) for:**
- WebSocket connection issues
- Firebase database questions
- Helper function usage
- Testing problems

**Team Sync Schedule:**
- Hour 6: ✅ Complete (this status)
- Hour 10: Check-in on real-time features
- Hour 14: Integration testing
- Hour 18: **Data swap to Saturnalia**
- Hour 22: Final demo rehearsal

---

## 🎯 Success Criteria

**By Hour 24, we should have:**
- ✅ Live website with real Saturnalia data
- ✅ Real-time vibe map working across devices
- ✅ Smart schedule builder generating routes
- ✅ AI chatbot answering campus questions
- ✅ Polished demo ready for judges

**Current Progress:** 25% Complete (Hours 0-6/24)

---

**Built with ❤️ for Saturnalia 2025**  
*Mock data in use - Real campus data coming at Hour 18!*