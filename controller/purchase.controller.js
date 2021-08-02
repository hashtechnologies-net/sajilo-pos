/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Purchase = require('../models/purchase.model');
const Merchant = require('../models/merchant.models');

// @desc  get all products
//@route  GET /api/v1/purchases
exports.getAllPurchases = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get single Purchase
//@route  GET /api/v1/purchases/:id
exports.getSinglePurchase = asyncHandler(async (req, res, next) => {
	const purchase = await Purchase.findById(req.params.id).populate('admin_id');

	if (!purchase) {
		return next(
			new ErrorResponse(
				`Purchase not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: purchase });
});
// @desc  create new Purchases
//@route  POST /api/v1/purchases

exports.createPurchase = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.admin.id;

	const merchant = await Merchant.findById(req.body.merchant_id);

	if (!merchant) {
		return next(
			new ErrorResponse(
				`Merchant with id ${req.body.merchant_id} not found`,
				404
			)
		);
	}

	const purchase = await Purchase.create(req.body);
	res.status(201).json({ success: true, data: purchase });
});

// @desc  update  Purchase
//@route  PUT /api/v1/purchase/:id
exports.updatePurchase = asyncHandler(async (req, res, next) => {
	let purchase = await Purchase.findById(req.params.id);
	if (!purchase) {
		return next(
			new ErrorResponse(
				`Purchase not found with id of ${req.params.id}`,
				404
			)
		);
	}
	purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({ success: true, data: purchase });
});

// @desc  Delete  Purchase
//@route  DELETE /api/v1/purchases/:id
exports.deletePurchase = asyncHandler(async (req, res, next) => {
	let purchase = await Purchase.findById(req.params.id);
	if (!purchase) {
		return next(
			new ErrorResponse(
				`Purchase with id of ${req.params.id} doesn't exists`,
				404
			)
		);
	}
	purchase.remove();
	res.status(200).json({ success: true, data: {} });
});
