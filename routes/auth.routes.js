const express = require('express');
const authController = require('../controller/auth.controller');
const authprotect = require('../middleware/authAdmin');

const router = express.Router();

// router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
// router.route('/me').get(authprotect.protect, authController.getMe);

module.exports = router;
