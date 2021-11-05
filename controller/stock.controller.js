/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const StockEntry = require('../models/stockEntry.models');

// @desc  Get Sales
//@route  GET /api/v1/stock
exports.getStock = asyncHandler(async (req, res, next) => {
	StockEntry.aggregate([
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
		// {
		// 	$limit: 5,
		// },
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse(err, 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Sales Ajustment for stock Entry
//@route  POST /api/v1/stocks/adjustments
exports.stockAdjustment = asyncHandler(async (req, res, next) => {
	try {
		if (req.body.status === 'stockIn') {
			var data = {
				stockIn: req.body.count,
				product_id: req.body.product_id,
			};
			stocks = await StockEntry.create(data);
		} else if (req.body.status === 'stockOut') {
			var data = {
				status: req.body.status,
				stockOut: req.body.count,
				product_id: req.body.product_id,
			};
			stocks = await StockEntry.create(data);
		} else {
			return next(new ErrorResponse('Please enter the correct data!', 401));
		}
		res.status(200).json({
			status: true,
			data: stocks,
		});
	} catch (err) {
		return next(new ErrorResponse('Invalid Entry!', 401));
	}
});


// @desc  Sales Ajustment for stock Entry
//@route  POST /api/v1/stocks/adjustments
exports.stockAdjustment = asyncHandler(async (req, res, next) => {
    try {
        if (req.body.status === 'stockIn') {
            var data = {
                stockIn: req.body.count,
                product_id: req.body.product_id,
            };
            stocks = await StockEntry.create(data);
        } else if (req.body.status === 'stockOut') {
            var data = {
                status: req.body.status,
                stockOut: req.body.count,
                product_id: req.body.product_id,
            };
            stocks = await StockEntry.create(data);
        } else {
            return next(new ErrorResponse('Please enter the correct data!', 401));
        }
        res.status(200).json({
            status: true,
            data: stocks,
        });
    } catch (err) {
        return next(new ErrorResponse('Invalid Entry!', 401));
    }
});







