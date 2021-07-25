const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

const Product = require('../models/products.models');
const allqueryresults = require('../middleware/allqueryresults');

router
	.route('/')
	.get(
		allqueryresults(Product, {
			path: 'user_id',
			select: 'firstName lastName email',
		}),
		productController.getAllProducts
	)
	.post(productController.createProduct);

router
	.route('/:id')
	.get(productController.getSingleProduct)
	.put(productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;
