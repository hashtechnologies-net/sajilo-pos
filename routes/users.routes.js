const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');

const User = require('../models/users.models');
const allqueryresults = require('../middleware/allqueryresults');

router
	.route('/')
	.get(allqueryresults(User), userController.getAllUsers)
	.post(userController.createUser);

router
	.route('/:id')
	.get(userController.getSingleUser)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

router.route('/login').post(userController.login);

module.exports = router;
