"use strict";

var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/authMiddleware');
var _require = require('../controllers/merchantController'),
  getMerchantProfile = _require.getMerchantProfile,
  updateMerchantProfile = _require.updateMerchantProfile;

// Get current merchant's profile
router.get('/profile', authMiddleware, getMerchantProfile);

// Update current merchant's profile
router.put('/profile', authMiddleware, updateMerchantProfile);
module.exports = router;