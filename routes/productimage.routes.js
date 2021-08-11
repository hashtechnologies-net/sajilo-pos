/** @format */

const express = require('express');
const productImageController = require('../controller/product.image.controller');

const ProductImage = require('../models/product.image.models');

const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');
const router = express.Router();

//Including the upload middleware
const upload = require('../middleware/upload');

router.route('/').get(
	allqueryresults(
		ProductImage,

		{
			path: 'product',
			select: 'product_name',
		}
	),

	productImageController.getAllProductImages
);

router
	.route('/:id')
	.get(productImageController.getSingleProductImages)
	.put(productImageController.updateProductImages)
	.delete(productImageController.deleteProductImages)
	.post(
		upload.fields([{ name: 'productImage', maxCount: 3 }]),
		productImageController.uploadProductImages
	);

module.exports = router;
