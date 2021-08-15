/** @format */

const express = require('express');
const productImageController = require('../controller/product.image.controller');
const multer = require('multer');
const ProductImage = require('../models/product.image.models');

const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');
const router = express.Router();
const upload = multer({ dest: './uploads/' });

//Including the upload middleware
//const upload = require('../middleware/upload');

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
		upload.single('productImage'),
		productImageController.uploadProductImages
	);
router.route('/photo/:id').put(productImageController.PhotoUpload);

module.exports = router;
