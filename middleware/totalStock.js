/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');
const Product = require('../models/product.models');
// @desc  Get sales done within the hour
//@route  GET /api/v1/find/category/totalproducts
exports.getTotalProducts = asyncHandler(async (req, res, next) => {
	Product.aggregate([
		{
			$lookup: {
				from: 'categories',
				localField: 'category_id',
				foreignField: '_id',
				as: 'data',
			},
		},
		{
			$project: {
				data: {
					_id: 1,
				},
			},
		},
		{
			$group: {
				_id: '$data._id',
				products: { $sum: 1 },
			},
		},
		{
			$sort: {
				products: -1,
			},
		},
		{
			$limit: 5,
		},
	]).exec(async (err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		req.body.total = [];
		result.map((item) => {
			req.body.total.push(item);
		});

		req.body.total.map(async (element) => {
			const product = await Product.findById({ category_id: element._id });
			try {
				if (product.category_id == element._id) {
					req.total = element;
					next();
				}
			} catch (error) {
				return next(
					new ErrorResponse('Internal Server Error from Total Stock', 500),
				);
			}
		});
	});
});
