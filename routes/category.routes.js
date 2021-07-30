/** @format */

const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

const User = require('../models/users.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');

router
	.route('/')
	.get(
		allqueryresults(User, {
			path: 'created_by',
			select: 'user_id',
		}),
		categoryController.getAllCategory
	)
	.post(
		authprotect.protect,
		authprotect.authorize('Admin'),
		categoryController.createCategory
	);

router.route('/:id').get(categoryController.getSingleCategory);

module.exports = router;
