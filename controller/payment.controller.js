const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Payment = require('../models/payment.models');

// @desc  get all Payments
//@route  GET /api/v1/payments
exports.getAllPayments = asyncHandler(async (req, res, next) => {
	const payments = await Payment.find();
	res.status(200).json({ success: true, data: payments });
});
// @desc  get single Payment
//@route  GET /api/v1/payments/:id
exports.getSinglePayment = asyncHandler(async (req, res, next) => {
	const payment1 = await Payment.findById(req.params.id);
	if (!payment1) {
		return next(
			new ErrorResponse(
				`Payment not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: payment1 });
});
// @desc  create new Payment
//@route  POST /api/v1/payments

exports.createPayment = asyncHandler(async (req, res, next) => {
	const Cpayment = await Payment.create(req.body);
	if (!Cpayment) {
		return next(new ErrorResponse());
	}
	res.status(201).json({ success: true, data: Cproduct });
});
// @desc  update  Payment
//@route  PUT /api/v1/payments/:id
exports.updatePayment = asyncHandler(async (req, res) => {
	const Upayment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!Upayment) {
		return next(
			new ErrorResponse(
				`Payment not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: Upayment });
});
// @desc  Delete  Payment
//@route  DELETE /api/v1/payments/:id
exports.deletePayment = asyncHandler(async (req, res) => {
	const deletePayment = await Payment.findByIdAndDelete(req.params.id);
	if (!deletePayment) {
		return next(
			new ErrorResponse(
				`Payment not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: {} });
});
