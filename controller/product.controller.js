/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/product.models');
const Category = require('../models/category.models');
const Units = require('../models/unit.model');
const stockEntry = require('../models/stockEntry.models');

// @desc  get all products
//@route  GET /api/v1/products
exports.getAllProducts = asyncHandler(async (req, res, next) => {

	Product.aggregate([
		{
			$lookup: {
				from: 'stockentries',
				localField: '_id',
				foreignField: 'product_id',
				as: 'stocks',
			},
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse(err, 500));
		}
		res.status(200).json({
			status: true,
			data: result,
			
		});
	});

	// res.status(200).json(res.allqueryresults);
});

// @desc  get single Product
//@route  GET /api/v1/products/:id
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(
				`Product with id ${req.params.id} could not be found`,
				404
			)
		);
	}

	res.status(200).json({ success: true, data: product });
});

// @desc  create new Product
//@route  POST /api/v1/products
exports.createProduct = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.creator.id;

	const category = await Category.findById(req.body.category_id);

	if (!category) {
		return next(
			new ErrorResponse(
				`Category with id ${req.body.category_id} could not be found`,
				404
			)
		);
	}
	const unit = await Units.findById(req.body.unit_id);

	if (!unit) {
		return next(
			new ErrorResponse(
				`Unit with id ${req.body.unit_id} could not be found`,
				404
			)
		);
	}

	const { product_code } = req.body;
	const productcodeExists = await Product.findOne({ product_code });

	// Check for duplicate product
	if (productcodeExists) {
		return next(
			new ErrorResponse(
				`The product of code ${productcodeExists.product_code} is already registered`,
				400
			)
		);
	}

	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		data: product,
	});
});

// @desc  update  Product
//@route  PUT /api/v1/products/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {
	let product = await Product.findByIdAndUpdate(req.params.id);
	if (!product) {
		return next(
			new ErrorResponse(
				`Product with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	if (product.created_by == req.creator.id) {
		product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (Object.keys(req.body).length === 0) {
			return next(new ErrorResponse(`Nothing to update`, 200));
		}
		res.status(200).json({
			success: true,
			data: product,
			message: 'Successfully Updated!!',
		});
	} else {
		return next(
			new ErrorResponse(
				'Please update the product created by you!Access Denied!',
				404
			)
		);
	}
});

// @desc  Delete  Product
//@route  DELETE /api/v1/products/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return next(
			new ErrorResponse(
				`Product with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	if ((product.created_by = req.creator.id)) {
		product.remove();
		res.status(200).json({
			success: true,
			data: {},
			message: 'Successfully deleted !!',
		});
	} else {
		return next(
			new ErrorResponse(
				'Please delete the product created by yourself!Access Denied!',
				404
			)
		);
	}
});
