const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

const Product = require('../models/product.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/auth');

router
	.route('/')
	.get(
		allqueryresults(Product, {
			path: 'user_id',
			select: 'Name email gender accountType',
		}),
		productController.getAllProducts
	)
	.post(
		authprotect.protect,
		authprotect.authorize('Admin', 'Merchant'),
		productController.createProduct
	);

router
	.route('/:id')
	.get(productController.getSingleProduct)
	.put(authprotect.protect, productController.updateProduct)
	.delete(authprotect.protect, productController.deleteProduct);

module.exports = router;
