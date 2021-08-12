/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/category.models');
const Product = require('../models/product.models');

// @desc  get all Product Category
//@route  GET /api/v1/category
exports.getAllCategory = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults)
});

// @desc  get a single Product Category
//@route  GET /api/v1/productcategory/:id
exports.getSingleCategory = asyncHandler(async (req, res, next) => {
	const category = await Category.findById(req.params.id).populate('admin_id');

	if (!category) {
		return next(
			new ErrorResponse(
				`Category with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: category });
});

// @desc  create new Product Category
//@route  POST /api/v1/category

exports.createCategory = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.admin.id;
	const category = await Category.create(req.body);
	res.status(201).json({
		status: true,
		data: category,
	});
});

// @desc  update  Category
//@route  PUT /api/v1/category/:id
exports.updateCategory = asyncHandler(async (req, res, next) => {
	let category = await Category.findById(req.params.id);
	if (!category) {
		return next(
			new ErrorResponse(
				`Category with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: category,
		message: 'Successfully Updated!!',
	});
});

// @desc  Delete  Category
//@route  DELETE /api/v1/category/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {
	const category = await Category.findById(req.params.id);
	if (!category) {
		return next(
			new ErrorResponse(
				`Category with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	category.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
