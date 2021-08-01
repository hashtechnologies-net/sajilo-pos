/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/category.model');

// @desc  get all Product Category
//@route  GET /api/v1/category
exports.getAllCategory = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get a single Product Category
//@route  GET /api/v1/productcategory/:id
exports.getSingleCategory = asyncHandler(async (req, res, next) => {
	const category1 = await Category.findById(req.params.id).populate(
		'admin_id'
	);

	if (!category1) {
		return next(
			new ErrorResponse(
				`Category not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: category1 });
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
	const Ucategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!Ucategory) {
		return next(
			new ErrorResponse(
				`Category not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: Ucategory });
});

// @desc  Delete  Category
//@route  DELETE /api/v1/category/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {
	const deleteCategory = await Category.findById(req.params.id);
	if (!deleteCategory) {
		return next(
			new ErrorResponse(
				`Already deleted Category with id of ${req.params.id}`,
				404
			)
		);
	}
	deleteCategory.remove();
	res.status(200).json({ success: true, data: {} });
});
