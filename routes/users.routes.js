/** @format */

const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const User = require('../models/users.models');
const allqueryresults = require('../middleware/allqueryresults');
const protectAdmin = require('../middleware/authAdmin');
const upload = require('../middleware/photoUpload');
const { protect } = require('../middleware/authUser');

router
	.route('/photo')
	.put(protect, upload.single('photo'), userController.userPhotoUpload);
router
	.route('/')
	.get(
		protectAdmin.protect,
		allqueryresults(User, {
			path: 'created_by',
			select: 'username',
		}),
		userController.getAllUsers
	)
	.post(protectAdmin.protect, userController.createUser);

router
	.route('/:id')
	.get(protectAdmin.protect, userController.getSingleUser)
	.put(protectAdmin.protect, userController.updateUser)
	.delete(protectAdmin.protect, userController.deleteUser);

module.exports = router;
