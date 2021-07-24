const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

router
	.route('/')
	.get(productController.getAllProducts)
	.post(productController.createProduct);

router
	.route('/:id')
	.get(productController.getSingleProduct)
	.put(productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;
