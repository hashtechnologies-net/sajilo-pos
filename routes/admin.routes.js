/** @format */

const express = require('express');
const adminAuth = require('../controller/admin.authentication');
const authprotect = require('../middleware/authAdmin');

const router = express.Router();

router.route('/login').post(adminAuth.login);
router.route('/register').post(adminAuth.register);
router.route('/getadmin').get(authprotect.protect, adminAuth.getMe);
router.route('/logout').get(adminAuth.logout);
router.route('/').get(adminAuth.getAdmins);

module.exports = router;
