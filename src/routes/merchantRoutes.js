const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMerchantProfile, updateMerchantProfile } = require('../controllers/merchantController');

// Get current merchant's profile
router.get('/profile', authMiddleware, getMerchantProfile);

// Update current merchant's profile
router.put('/profile', authMiddleware, updateMerchantProfile);

module.exports = router;
