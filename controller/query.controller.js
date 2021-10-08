/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Purchase = require('../models/purchase.model');
const SalesPayment = require('../models/sales.payment.models');
const StockEntry = require('../models/stockEntry.models.js');
const Invoice = require('../models/invoice.models');
const Review = require('../models/review.models');
const Order = require('../models/order.models');
const MerchantPayment = require('../models/merchant.payment.models');

// @desc  Get Highest Purchase
//@route  GET /api/v1/find/highest/purchases
exports.getHighestPurchase = asyncHandler(async (req, res, next) => {
	Purchase.aggregate([
		{
			$project: {
				merchant_id: 1,
			},
		},
		{
			$group: {
				_id: '$merchant_id',
				count: { $sum: 1 },
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

// @desc  Get Highest Purchase
//@route  GET /api/v1/find/lowest/purchases
exports.getLowestPurchase = asyncHandler(async (req, res, next) => {
	Purchase.aggregate([
		{
			$project: {
				merchant_id: 1,
			},
		},
		{
			$group: {
				_id: '$merchant_id',
				count: { $sum: 1 },
			},
		},
		{
			$sort: {
				count: 1,
			},
		},
		{
			$limit: 5,
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get User
//@route  GET /api/v1/find/highest/counterusers
exports.getHighestCounterUser = asyncHandler(async (req, res, next) => {
	SalesPayment.aggregate([
		{
			$lookup: {
				from: 'invoices',
				localField: 'invoice_id',
				foreignField: '_id',
				as: 'data',
			},
		},
		{
			$project: {
				data: {
					created_by: 1,
				},
			},
		},
		{
			$group: {
				_id: '$data.created_by',
				sales: { $sum: 1 },
			},
		},
		{
			$sort: {
				sales: -1,
			},
		},
		{
			$limit: 5,
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
});

// @desc  Get Lowest Selling User
//@route  GET /api/v1/find/lowest/counterusers
exports.getLowestCounterUser = asyncHandler(async (req, res, next) => {
	SalesPayment.aggregate([
		{
			$lookup: {
				from: 'invoices',
				localField: 'invoice_id',
				foreignField: '_id',
				as: 'data',
			},
		},
		{
			$project: {
				data: {
					created_by: 1,
				},
			},
		},
		{
			$group: {
				_id: '$data.created_by',
				sales: { $sum: 1 },
			},
		},
		{
			$sort: {
				sales: 1,
			},
		},
		{
			$limit: 5,
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get highest purchased products
//@route  GET /api/v1/find/highest/purchasedproducts
exports.getHighestPurchaseProducts = asyncHandler(async (req, res, next) => {
	Purchase.aggregate([
		{
			$project: {
				description: 1,
			},
		},
		{
			$group: {
				_id: '$description.product',
				purchases: { $sum: 1 },
			},
		},
		{
			$sort: {
				purchases: -1,
			},
		},
		{
			$limit: 5,
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
});

// @desc  Get highest purchased products
//@route  GET /api/v1/find/lowest/purchasedproducts
exports.getLowestPurchaseProducts = asyncHandler(async (req, res, next) => {
	Purchase.aggregate([
		{
			$project: {
				description: 1,
			},
		},
		{
			$group: {
				_id: '$description.product',
				purchases: { $sum: 1 },
			},
		},
		{
			$sort: {
				purchases: 1,
			},
		},
		{
			$limit: 5,
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get highest sold products
//@route  GET /api/v1/find/highest/soldproducts
exports.getHighestSalesProducts = asyncHandler(async (req, res, next) => {
	SalesPayment.aggregate([
		{
			$lookup: {
				from: 'invoices',
				localField: 'invoice_id',
				foreignField: '_id',
				as: 'data',
			},
		},
		{
			$project: {
				event: 1,
			},
		},
		{
			$group: {
				_id: '$data.description.product',
				Items_sold: { $sum: 1 },
			},
		},
		{
			$sort: {
				Items_sold: -1,
			},
		},
		{
			$limit: 5,
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
});

// @desc  Get highest sold products
//@route  GET /api/v1/find/lowest/soldproducts
exports.getLowestSalesProducts = asyncHandler(async (req, res, next) => {
	SalesPayment.aggregate([
		{
			$lookup: {
				from: 'invoices',
				localField: 'invoice_id',
				foreignField: '_id',
				as: 'data',
			},
		},
		{
			$project: {
				data: {
					description: 1,
				},
			},
		},
		{
			$group: {
				_id: '$data.description.product',
				Items_sold: { $sum: 1 },
			},
		},
		{
			$sort: {
				Items_sold: 1,
			},
		},
		{
			$limit: 5,
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// // @desc  Get Average Rating
// //@route  GET /api/v1/find/averagerating
exports.getAverageRating = asyncHandler(async (req, res, next) => {
	Review.aggregate([
		{
			$project: {
				product: 1,
				rating: 1,
				customer: 1,
			},
		},
		{
			$group: {
				_id: '$product',
				rating: { $sum: '$rating' },
				count: { $sum: 1 },
			},
		},
		{
			$addFields: {
				AverageRating: { $divide: ['$rating', '$count'] },
			},
		},
		{
			$sort: {
				AverageRating: -1,
			},
		},
		{
			$limit: 5,
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  GET  totalSales
//@route  GET /api/v1/find/totalsales
exports.getSales = asyncHandler(async (req, res, next) => {
	Invoice.aggregate([
		{
			$project: {
				total_amount: 1,
			},
		},
		{
			$group: {
				_id: null,
				totalSales: { $sum: '$total_amount' },
			},
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  GET  totalinvetsment
//@route  GET /api/v1/find/totalinvestments
exports.getInvestment = asyncHandler(async (req, res, next) => {
	MerchantPayment.aggregate([
		{
			$project: {
				amount: 1,
				credit: 1,
			},
		},
		{
			$group: {
				_id: null,
				totalAmount: { $sum: '$amount' },
				totalCredit: { $sum: '$credit' },
			},
		},
		{
			$addFields: {
				Investment: { $subtract: ['$totalAmount', '$totalCredit'] },
			},
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get highest purchasing customer
//@route  GET /api/v1/find/highest/customer
exports.getHighestPurchasingCustomer = asyncHandler(async (req, res, next) => {
	Order.aggregate([
		{
			$project: {
				customer_id: 1,
			},
		},
		{
			$group: {
				_id: '$customer_id',
				Order: { $sum: 1 },
			},
		},
		{
			$sort: {
				Order: -1,
			},
		},
		{
			$limit: 5,
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get customer purchase history
//@route  GET /api/v1/find/customer/purchasehistory
exports.getCustomerPurchaseHistory = asyncHandler(async (req, res, next) => {
	Order.aggregate([
		{
			$lookup: {
				from: 'products',
				localField: 'description.product',
				foreignField: '_id',
				as: 'data',
			},
		},
		{
			$project: {
				customer_id: 1,
				status: 1,
				data: {
					product_name: 1,
					product_code: 1,
				},
			},
		},
		{
			$match: {
				$expr: { $eq: ['$status', 'Delivered'] },
			},
		},
		{
			$group: {
				_id: '$customer_id',
				data: {
					$push: {
						Product_name: '$data.product_name',
						Product_code: '$data.product_code',
						status: '$status',
					},
				},
			},
		},
	]).exec((err, result) => {
		if (err) {
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get product detail
// @route  GET /api/v1/find/productdetail
exports.getProductDetail = asyncHandler(async (req, res, next) => {
	StockEntry.aggregate([
		{
			$lookup: {
				from: 'products',
				localField: 'product_id',
				foreignField: '_id',
				as: 'product',
			},
		},
		{
			$project: {
				product_id: 1,
				stockIn: 1,
				stockOut: 1,
				order_id: 1,
				purchase_id: 1,
				invoice_id: 1,
				createdAt: 1,
				updatedAt: 1,
				product: {
					product_name: 1,
					product_code: 1,
				},
			},
		},

		{
			$group: {
				_id: '$product_id',
				data: {
					$push: {
						stockIn: { $sum: '$stockIn' },
						stockOut: { $sum: '$stockOut' },
						invoice_id: '$invoice_id',
						purchase_id: '$purchase_id',
						order_id: '$order_id',
						product_name: '$product.product_name',
						product_code: '$product.product_code',
						created_at: '$createdAt',
						updated_at: '$updatedAt',
					},
				},
			},
		},
		{
			$sort: {
				created_at: -1,
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
});
