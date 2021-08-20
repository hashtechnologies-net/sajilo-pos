/** @format */

const express = require('express');
const adminAuth = require('../controller/admin.authentication');
const authprotect = require('../middleware/authAdmin');

const router = express.Router();

router.route('/adminlogin').post(adminAuth.login);
router.route('/getadmin').get(authprotect.protect, adminAuth.getMe);
router.route('/logout').get(adminAuth.logout);

router.route('/')
.post(adminAuth.register)
.get(adminAuth.getAdmins);

router
.route('/:id')
	.get(adminAuth.getSingleAdmin)


module.exports = router;
