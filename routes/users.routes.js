const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const User = require('../models/users.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');

router
	.route('/')
	.get(allqueryresults(User), userController.getAllUsers)
	.post(authprotect.protect, userController.createUser);

router
	.route('/:id')
	.get(userController.getSingleUser)
	.put(authprotect.protect, userController.updateUser)
	.delete(authprotect.protect, userController.deleteUser);

router
	.route('/:id/photo')
	.put(authprotect.protect, userController.userPhotoUpload);

module.exports = router;
