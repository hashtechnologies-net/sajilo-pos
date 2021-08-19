/** @format */

const ProductImage = require('../models/product.image.models');
const Product = require('../models/product.models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc  get all product images
//@route  GET /api/v1/productimages
exports.getAllProductImages = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get single product images
//@route  GET /api/v1/productimages/:id
exports.getSingleProductImages = asyncHandler(async (req, res, next) => {
	const productImages = await ProductImage.findById(req.params.id);

	if (!productImages) {
		return next(
			new ErrorResponse(
				`Product image with id:${req.params.id} could not be found`,
				404
			)
		);
	}
	res.status(200).json({
		status: true,
		data: productImages,
	});
});

// @desc  upload product images
//@route  POST /api/v1/productimages
exports.uploadProductImages = asyncHandler(async (req, res, next) => {
	const products = await Product.findById(req.params.id);
	if (!products) {
		return next(
			new ErrorResponse(
				`Product with id:${req.params.id} could not be found`,
				500
			)
		);
	}

	if (products.created_by == req.creator.id) {
		if (!req.files) {
			return next(new ErrorResponse(`Please select the files`, 404));
		} else {
			let path = '';
			req.files.forEach((files, index, arr) => {
				path = path + files.path + ',';
			});
			path = path.substring(0, path.lastIndexOf(','));
			var data = {
				product: req.params.id,
				imageUrl: path,
			};

			const productImages = await ProductImage.create(data);
			res.status(201).json({
				status: true,
				data: productImages,
			});
		}
	} else {
		return next(
			new ErrorResponse(
				'Please upload the picture of the product created by you',
				404
			)
		);
	}
});

// @desc  update single product images
//@route  PUT /api/v1/productimages/:id
exports.updateProductImages = asyncHandler(async (req, res, next) => {
	let productImages = await ProductImage.findById(req.params.id);

	if (!productImages) {
		return next(
			new ErrorResponse(
				`Product image with id:${req.params.id} could not be found`,
				404
			)
		);
	}
	const product = await Product.find({ _id: productImages.product });

	if (product[0].created_by == req.creator.id) {
		if (!req.files) {
			return next(new ErrorResponse(`Please select the files`, 404));
		} else {
			let path = '';

			req.files.forEach((files, index, arr) => {
				path = path + files.path + ',';
			});
			path = path.substring(0, path.lastIndexOf(','));

			var data = {
				imageUrl: path,
			};

			productImages = await ProductImage.findByIdAndUpdate(
				req.params.id,
				data,
				{
					new: true,
					runValidator: true,
				}
			);
			res.status(200).json({
				status: true,
				message: 'Successfully updated the images',
				data: productImages,
			});
		}
	} else {
		return next(
			new ErrorResponse(
				'Please upload the picture of the product created by you',
				404
			)
		);
	}
});

// @desc  Delete single product images
//@route  DELETE /api/v1/productimages/:id
exports.deleteProductImages = asyncHandler(async (req, res, next) => {
	let productImages = await ProductImage.findById(req.params.id);

	if (!productImages) {
		return next(
			new ErrorResponse(
				`Prodcut Image with ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	const product = await Product.find({ _id: productImages.product });

	if (product[0].created_by == req.creator.id) {
		await productImages.remove();
		res.status(200).json({
			status: true,
			message: 'Successfully deleted the images',
		});
	} else {
		return next(
			new ErrorResponse(
				'Please delete the picture of the product you created!',
				404
			)
		);
	}
});
