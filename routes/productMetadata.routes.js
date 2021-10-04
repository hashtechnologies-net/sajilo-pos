/** @format */

const express = require('express');
const productMetadataController = require('../controller/product.metadata.controller.js');
const ProductMetadata = require('../models/product.metadata.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');
const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(ProductMetadata),
		productMetadataController.getAllMetadata,
	)
	.post(authprotect.protect, productMetadataController.createMetadata);

router
	.route('/:id')
	.get(productMetadataController.getSingleMetadata)
	.put(authprotect.protect, productMetadataController.updateMetadata)
	.delete(authprotect.protect, productMetadataController.deleteMetadata);

module.exports = router;
