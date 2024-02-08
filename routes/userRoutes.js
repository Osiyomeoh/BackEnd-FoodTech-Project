const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// Get current user's profile
router.get('/profile', authMiddleware, getUserProfile);

// Update current user's profile
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
