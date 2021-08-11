/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const stockEntry = require('../models/stockEntry.models');

exports.getCount = asyncHandler(async (req, res, next) => {
	stockEntry
		.aggregate([
			{
				$project: {
					product_id: 1,
					stockIn: 1,
					stockOut: 1,
				},
			},
			{
				$group: {
					_id: '$product_id',
					stockIn: { $sum: '$stockIn' },
					stockOut: { $sum: '$stockOut' },
				},
			},
			{
				$addFields: {
					totalStock: { $subtract: ['$stockIn', '$stockOut'] },
				},
			},

			{
				$sort: {
					count: -1,
				},
			},
			{
				$limit: 5,
			},
		])
		.exec((err, result) => {
			if (err) {
				return next(new ErrorResponse(err, 500));
			}
			req.body.total = [];
			result.map((item) => {
				req.body.total.push(item);
			});
			// logic not implemented for sales.product !== element._id due to error issue.
			req.body.total.map(async (element) => {
				req.body.description.map(async (sales) => {
					try {
						if (sales.product == element._id) {
							if (sales.count > element.totalStock) {
								return next(
									new ErrorResponse('Out of stock', 404)
								);
							}
							next();
						}
					} catch (error) {
						return next(
							new ErrorResponse(
								'Internal Server Error from Stock Check',
								500
							)
						);
					}
				});
			});
		});
});
