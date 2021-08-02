/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const MerchantPayment = require('../models/merchant.payment.models');

// @desc  get all merchantPayments
//@route  GET /api/v1/merchanpayments
exports.getAllPayment = asyncHandler(async (req, res, next) => {
	const payments = await MerchantPayment.find().populate('user_id');
	res.status(200).json({ success: true, data: payments });
});
// @desc  get single merchantPayment
//@route  GET /api/v1/merchantpayments/:id
exports.getSinglePayment = asyncHandler(async (req, res, next) => {
	const payment1 = await MerchantPayment.findById(req.params.id);
	if (!payment1) {
		return next(
			new ErrorResponse(
				`Payment not found with id of ${req.params.id} of any merchant`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: payment1 });
});
// @desc  create new merchantPayment
//@route  POST /api/v1/merchantpayments

exports.createPayment = asyncHandler(async (req, res, next) => {
	const payments = await MerchantPayment.create(req.body);
	res.status(201).json({ success: true, data: payments });
});
// @desc  update  merchantPayment
//@route  PUT /api/v1/merchantpayments/:id
exports.updatePayment = asyncHandler(async (req, res, next) => {
	let payments = await MerchantPayment.findById(req.params.id);
	if (!payments) {
		return next(
			new ErrorResponse(
				`Payment not found with id of ${req.params.id} of any merchant`,
				404
			)
		);
	}

	payments = await MerchantPayment.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: payments });
});
// @desc  Delete  merchantPayment
//@route  DELETE /api/v1/merchantpayments/:id
exports.deletePayment = asyncHandler(async (req, res, next) => {
	let payments = await MerchantPayment.findById(req.params.id);
	if (!payments) {
		return next(
			new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404)
		);
	}
	payments.remove();
	res.status(200).json({ success: true, data: {} });
});
