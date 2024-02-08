"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/authController'),
  registerUser = _require.registerUser,
  registerMerchant = _require.registerMerchant,
  login = _require.login;
router.post('/register/user', registerUser);
router.post('/register/merchant', registerMerchant);
router.post('/login', login);
module.exports = router;