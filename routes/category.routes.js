/** @format */

const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

const Category = require('../models/category.models');
const allqueryresults = require('../middleware/allqueryresults');
//const authprotect = require('../middleware/authAdmin');

router
	.route('/')
	.get(allqueryresults(Category), categoryController.getAllCategory)
	.post(categoryController.createCategory);

router
	.route('/:id')
	.get(categoryController.getSingleCategory)
	.put(categoryController.updateCategory)
	.delete(categoryController.deleteCategory);

module.exports = router;
