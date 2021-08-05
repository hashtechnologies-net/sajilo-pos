/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const SalesPayment = require('../models/sales.payment.models');

// @desc  get all salesPayments
//@route  GET /api/v1/salespayments
exports.getAllSPayments = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});
// @desc  get single salesPayment
//@route  GET /api/v1/salespayments/:id
exports.getSinglePayment = asyncHandler(async (req, res, next) => {
	const spayment1 = await SalesPayment.findById(req.params.id);
	if (!spayment1) {
		return next(
			new ErrorResponse(
				`Payment with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: spayment1 });
});
// @desc  create new salesPayment
//@route  POST /api/v1/salespayments

exports.createSPayment = asyncHandler(async (req, res, next) => {
	//req.body.created_by = req.user.id;
	const CSpayment = await SalesPayment.create(req.body);
	res.status(201).json({ success: true, data: CSpayment });
});
// @desc  update  salesPayment
//@route  PUT /api/v1/salespayments/:id
exports.updateSPayment = asyncHandler(async (req, res, next) => {
	USpayment = await SalesPayment.findByIdAndUpdate(req.params.id);
	if (!USpayment) {
		return next(
			new ErrorResponse(
				`Payment with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	USpayment = await SalesPayment.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!USpayment) {
		return next(
			new ErrorResponse(
				`Sales Payment with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: USpayment,
		message: 'Successfully Updated!!',
	});
});
// @desc  Delete  Payment
//@route  DELETE /api/v1/salespayments/:id
exports.deleteSPayment = asyncHandler(async (req, res, next) => {
	let deleteSPayment = await SalesPayment.findById(req.params.id);
	if (!deleteSPayment) {
		return next(
			new ErrorResponse(
				`Payment with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	deleteSPayment.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
