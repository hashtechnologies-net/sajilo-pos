/** @format */

const express = require('express');

const categoryController = require('../controller/category.controller');

const Admin = require('../models/admin.model');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(categoryController.getAllCategory).post(
	authprotect.protect,
	categoryController.createCategory
);

router
	.route('/:id')
	.get(categoryController.getSingleCategory)
	.put(authprotect.protect, categoryController.updateCategory)
	.delete(authprotect.protect, categoryController.deleteCategory);

module.exports = router;
