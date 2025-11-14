const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dljkqqqst',    // Replace with your cloud name
  api_key: '381786812651173',          // Replace with your API key
  api_secret: 'yChF0lNO4TOF4EWzEUD53f9XTZM'     // Replace with your API secret
});

module.exports = cloudinary;
