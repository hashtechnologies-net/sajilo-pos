const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const User = require('../models/users.models');
const allqueryresults = require('../middleware/allqueryresults');
const protectAdmin = require('../middleware/authAdmin');
const { protect } = require('../middleware/authUser');

router.route('/photo').put(protect, userController.userPhotoUpload);
router
	.route('/')
	.get(allqueryresults(User), userController.getAllUsers)
	.post(protectAdmin.protect, userController.createUser);

router
	.route('/:id')
	.get(userController.getSingleUser)
	.put(protectAdmin.protect, userController.updateUser)
	.delete(protectAdmin.protect, userController.deleteUser);

module.exports = router;
