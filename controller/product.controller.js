const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/product.models');
const Category = require('../models/category.models');

// @desc  get all products
//@route  GET /api/v1/products
//@route  GET /api/v1/category/:categoryId/products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
	if (req.params.categoryId) {
		const products = await Product.find({
			category_id: req.params.categoryId,
		});
		res.status(200).json({
			status: true,
			count: products.length,
			data: products,
		});
	}
	res.status(200).json(res.allqueryresults);
});

// @desc  get single Product
//@route  GET /api/v1/products/:id
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
	const product1 = await Product.findById(req.params.id).populate('admin_id');

	if (!product1) {
		return next(
			new ErrorResponse(
				`Product not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: product1 });
});
// @desc  create new Product
//@route  POST /api/v1/category/:categoryId/products

exports.createProduct = asyncHandler(async (req, res, next) => {
	req.body.category_id = req.body.categoryId;
	const category = await Category.findById(req.params.categoryId);

	if (!category) {
		return next(
			new ErrorResponse(
				`Category with id ${req.params.categoryId} not found`,
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
				`The product of code  ${productcodeExists.product_code} is already registered`,
				400
			)
		);
	}

	const Cproduct = await Product.create(req.body);
	res.status(201).json({ success: true, data: Cproduct });
});

// @desc  update  Product
//@route  PUT /api/v1/products/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {
	const Uproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!Uproduct) {
		return next(
			new ErrorResponse(
				`Product not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: Uproduct });
});

// @desc  Delete  Product
//@route  DELETE /api/v1/products/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const deleteProduct = await Product.findByIdAndDelete(req.params.id);
	if (!deleteProduct) {
		return next(
			new ErrorResponse(
				`Already deleted  Product with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: {} });
});
