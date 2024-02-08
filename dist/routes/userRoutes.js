"use strict";

var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/authMiddleware');
var _require = require('../controllers/userController'),
  getUserProfile = _require.getUserProfile,
  updateUserProfile = _require.updateUserProfile;

// Get current user's profile
router.get('/profile', authMiddleware, getUserProfile);

// Update current user's profile
router.put('/profile', authMiddleware, updateUserProfile);
module.exports = router;