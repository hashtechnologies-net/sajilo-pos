const express = require('express');
const adminAuth = require('../controller/admin.authentication');
const authprotect = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(adminAuth.register);
router.route('/admin_login').post(adminAuth.login);
router.route('/get_admin').get(authprotect.protect, adminAuth.getMe);

module.exports = router;
