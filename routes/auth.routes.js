/** @format */

const express = require('express');
const authController = require('../controller/auth.controller');
const authprotect = require('../middleware/authUser');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/me').get(authprotect.protect, authController.getMe);
router.route('/logout').post(authController.logout);
router.route('/token').post(authController.generateAccessToken);
router
	.route('/updatepassword')
	.put(authprotect.protect, authController.updatePassword);
router
	.route('/forgotpassword')
	.post(authprotect.protect, authController.forgotPassword);

module.exports = router;
