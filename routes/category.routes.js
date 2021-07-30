/** @format */

const express = require('express');

const categoryController = require('../controller/category.controller');

const Admin = require('../models/admin.model');
const Category = require('../models/category.model');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

<<<<<<< HEAD
router
	.route('/')
	.get(allqueryresults(Category), categoryController.getAllCategory)
	.post(
		authprotect.protect,
		//authprotect.authorize('Admin'),
		categoryController.createCategory
	);
=======
router.route('/').get(categoryController.getAllCategory).post(
	authprotect.protect,
	categoryController.createCategory
);
>>>>>>> e218bb510ec0113cf4549707de4cb5861f140880

router
	.route('/:id')
	.get(categoryController.getSingleCategory)
	.put(authprotect.protect, categoryController.updateCategory)
	.delete(authprotect.protect, categoryController.deleteCategory);

module.exports = router;
