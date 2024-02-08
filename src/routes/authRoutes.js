const express = require('express');
const router = express.Router();
const { registerUser, registerMerchant, login } = require('../controllers/authController');

router.post('/register/user', registerUser);
router.post('/register/merchant', registerMerchant);
router.post('/login', login);

module.exports = router;
