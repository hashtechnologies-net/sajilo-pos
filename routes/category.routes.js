/** @format */

const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

const Admin = require('../models/admin.model');
const Category = require('../models/category.model');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');

const productRouter = require('./product.routes');

const unitRouter = require('./unit.routes');

//re-routing to the product
router.use('/:categoryId/products', productRouter);

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
