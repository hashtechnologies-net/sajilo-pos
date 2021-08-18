/** @format */

const express = require('express');
const productController = require('../controller/product.controller');

const Product = require('../models/product.models');

const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');
const routeprotect = require('../middleware/authVendorAdmin');
const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Product, [
			{
				path: 'unit_id',
				select: 'unit_name',
			},
			{
				path: 'category_id',
				select: 'category_name',
			},
		]),

		productController.getAllProducts
	)
	.post(routeprotect.protect, productController.createProduct);

router
	.route('/:id')
	.get(productController.getSingleProduct)
	.put(authprotect.protect, productController.updateProduct)
	.delete(authprotect.protect, productController.deleteProduct);

module.exports = router;
