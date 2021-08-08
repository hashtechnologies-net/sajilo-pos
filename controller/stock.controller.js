/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const stockEntry = require('../models/stockEntry.models');

// @desc  Get Sales
//@route  GET /api/v1/stock
exports.getStock = asyncHandler(async (req, res, next) => {
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
			res.status(200).json({
				status: true,
				data: result,
			});
		});
});
