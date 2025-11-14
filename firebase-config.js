const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');

// YOUR FIREBASE CONFIG GOES HERE
const firebaseConfig = {
  apiKey: "AIzaSyDSSTgxXP-hpSKQZJClPn_5cHpMbv-kxtQ",
  authDomain: "nomad-hackathon.firebaseapp.com",
  databaseURL: "https://nomad-hackathon-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nomad-hackathon",
  storageBucket: "nomad-hackathon.firebasestorage.app",
  messagingSenderId: "698081387076",
  appId: "1:698081387076:web:39daac3b46ddec728ad211"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = { database };
