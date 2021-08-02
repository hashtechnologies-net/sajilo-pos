/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const SalesPayment = require('../models/sales.payment.models');

// @desc  get all salesPayments
//@route  GET /api/v1/salespayments
exports.getAllSPayments = asyncHandler(async (req, res, next) => {
	const Spayments = await SalesPayment.find().populate('user_id');
	res.status(200).json({ success: true, data: Spayments });
});
// @desc  get single salesPayment
//@route  GET /api/v1/salespayments/:id
exports.getSinglePayment = asyncHandler(async (req, res, next) => {
	const spayment1 = await SalesPayment.findById(req.params.id);
	if (!spayment1) {
		return next(
			new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: spayment1 });
});
// @desc  create new salesPayment
//@route  POST /api/v1/salespayments

exports.createSPayment = asyncHandler(async (req, res, next) => {
	const CSpayment = await SalesPayment.create(req.body);
	res.status(201).json({ success: true, data: CSpayment });
});
// @desc  update  salesPayment
//@route  PUT /api/v1/salespayments/:id
exports.updateSPayment = asyncHandler(async (req, res, next) => {
	const USpayment = await SalesPayment.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	if (!USpayment) {
		return next(
			new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404)
		);
	}
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({ success: true, data: USpayment });
});
// @desc  Delete  Payment
//@route  DELETE /api/v1/payments/:id
exports.deleteSPayment = asyncHandler(async (req, res, next) => {
	const deleteSPayment = await Payment.findByIdAndDelete(req.params.id);
	if (!deleteSPayment) {
		return next(
			new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
