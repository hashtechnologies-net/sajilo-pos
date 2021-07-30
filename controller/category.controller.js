/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/category.models');

// @desc  get all Product Category
//@route  GET /api/v1/productcategory
exports.getAllCategory = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get a single Product Category
//@route  GET /api/v1/productcategory/:id
exports.getSingleCategory = asyncHandler(async (req, res, next) => {
	const category1 = await Category.findById(req.params.id).populate('user_id');

	if (!product1) {
		return next(
			new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: category1 });
});

// @desc  create new Product Category
//@route  POST /api/v1/category

exports.createProduct = asyncHandler(async (req, res, next) => {
	const category = await Category.create(req.body);
	//req.body.user_id = getUserId(req.headers);
	res.status(201).json({ success: true, data: category });
});
