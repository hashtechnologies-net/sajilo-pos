/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Purchase = require('../models/purchase.model');
const SalesPayment = require('../models/sales.payment.models');

// @desc  Get Highest Purchase
//@route  GET /api/v1/find/highestpurchases
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
				count: { $count: {} },
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
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get User
//@route  GET /api/v1/find/counterusers
exports.getCounterUser = asyncHandler(async (req, res, next) => {
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
				count: { $count: {} },
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
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get highest purchased products
//@route  GET /api/v1/find/highestpurchasedproducts
exports.getPurchaseProducts = asyncHandler(async (req, res, next) => {
	Purchase.aggregate([
		{
			$project: {
				description: 1,
			},
		},
		{
			$group: {
				_id: '$description.product',
				count: { $count: {} },
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
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});

// @desc  Get highest sold products
//@route  GET /api/v1/find/salesproducts
exports.getSalesProducts = asyncHandler(async (req, res, next) => {
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
				count: { $count: {} },
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
			return next(new ErrorResponse('Something Bad happened', 500));
		}
		res.status(200).json({
			status: true,
			data: result,
		});
	});
});
