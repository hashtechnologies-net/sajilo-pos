const express = require('express');
const adminAuth = require('../controller/admin.authentication');
const authprotect = require('../middleware/authAdmin');

const router = express.Router();

router.route('/register').post(adminAuth.register);
router.route('/admin_login').post(adminAuth.login);
router.route('/get_admin').get(authprotect.protect, adminAuth.getMe);
router.route('/logout').post(adminAuth.logout);

module.exports = router;
