/** @format */

const express = require('express');
const productController = require('../controller/product.controller');

const Product = require('../models/product.models');

const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');
const routeprotect = require('../middleware/authVendorAdmin');
const upload = require('../middleware/QRUpload');
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

		productController.getAllProducts,
	)
	.post(
		routeprotect.protect,
		upload.single('QRLink'),
		productController.createProduct,
	);

router
	.route('/:id')
	.get(productController.getSingleProduct)
	.put(
		routeprotect.protect,
		upload.single('QRLink'),
		productController.updateProduct,
	)
	.delete(routeprotect.protect, productController.deleteProduct);

module.exports = router;
