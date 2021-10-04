/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const ProductMetadata = require('../models/product.metadata.models');

// @desc  get all product metadata
//@route  GET /api/v1/product/metadata
exports.getAllMetadata = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});
// @desc  get single product metadata
//@route  GET /api/v1/product/metadata/:id
exports.getSingleMetadata = asyncHandler(async (req, res, next) => {
	const metadata = await ProductMetadata.findById(req.params.id);
	if (!metadata) {
		return next(
			new ErrorResponse(
				`Product Metadata with id ${req.params.id} could not be found`,
				404,
			),
		);
	}
	res.status(200).json({ success: true, data: metadata });
});
// @desc  create new product metadata
//@route  POST /api/v1/productmetadata
exports.createMetadata = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.admin.id;
	let metadata = await ProductMetadata.create(req.body);
	res.status(201).json({ success: true, data: metadata });
});

// @desc  update product metadata
//@route  PUT /api/v1/product/metadata
exports.updateMetadata = asyncHandler(async (req, res, next) => {
	let metadata = await ProductMetadata.findById(req.params.id);

	if (!metadata) {
		return next(
			new ErrorResponse(
				`Product Metadata with id ${req.params.id} could not be found`,
				404,
			),
		);
	}

	metadata = await ProductMetadata.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: metadata,
		message: 'Successfully Updated!!',
	});
});
// @desc  Delete  product metadata
//@route  DELETE /api/v1/product/metadata
exports.deleteMetadata = asyncHandler(async (req, res, next) => {
	let metadata = await ProductMetadata.findById(req.params.id);
	if (!metadata) {
		return next(
			new ErrorResponse(
				`Product Metadata with id ${req.params.id} has already been deleted`,
				404,
			),
		);
	}
	await metadata.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
