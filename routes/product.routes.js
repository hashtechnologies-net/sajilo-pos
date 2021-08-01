/** @format */

const express = require('express');
const productController = require('../controller/product.controller');

const Product = require('../models/product.models');
const Unit = require('../models/unit.model');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');
const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Product, {
			path: 'category_id',
			select: 'category_name',
		}),
		allqueryresults(Product, {
			path: 'unit_id',
			select: 'unit_name',
		}),

		productController.getAllProducts
	)
	.post(authprotect.protect, productController.createProduct);

router
	.route('/:id')
	.get(productController.getSingleProduct)
	.put(authprotect.protect, productController.updateProduct)
	.delete(authprotect.protect, productController.deleteProduct);

module.exports = router;
