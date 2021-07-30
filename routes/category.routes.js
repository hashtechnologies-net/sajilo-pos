/** @format */

const express = require('express');

const categoryController = require('../controller/category.controller');

const Admin = require('../models/admin.model');
const Category = require('../models/category.model');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(allqueryresults(Category), categoryController.getAllCategory)
	.post(
		authprotect.protect,
		//authprotect.authorize('Admin'),
		categoryController.createCategory
	);

router
	.route('/:id')
	.get(categoryController.getSingleCategory)
	.put(authprotect.protect, categoryController.updateCategory)
	.delete(authprotect.protect, categoryController.deleteCategory);

module.exports = router;
