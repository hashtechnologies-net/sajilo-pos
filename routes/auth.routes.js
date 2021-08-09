/** @format */

const express = require('express');
const authController = require('../controller/auth.controller');
const authprotect = require('../middleware/authUser');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/me').get(authprotect.protect, authController.getMe);
router.route('/logout').post(authController.logout);
router.route('/updatepassword').put(authController.updatePassword);
router.route('/forgotpassword').post(authController.forgotPassword);

module.exports = router;
