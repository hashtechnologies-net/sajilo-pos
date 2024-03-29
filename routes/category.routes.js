/** @format */

const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

const Category = require('../models/category.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');

router
	.route('/')
	.get(
		allqueryresults(Category, { path: 'created_by', select: 'username' }),
		categoryController.getAllCategory
	)
	.post( categoryController.createCategory);

router
	.route('/:id')
	.get(authprotect.protect, categoryController.getSingleCategory)
	.put(authprotect.protect, categoryController.updateCategory)
	.delete(authprotect.protect, categoryController.deleteCategory);

module.exports = router;
