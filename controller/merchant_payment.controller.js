/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const MerchantPayment = require('../models/merchant.payment.models');

// @desc  get all merchantPayments
//@route  GET /api/v1/merchanpayments
exports.getAllPayment = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});
// @desc  get single merchantPayment
//@route  GET /api/v1/merchantpayments/:id
exports.getSinglePayment = asyncHandler(async (req, res, next) => {
	const payment = await MerchantPayment.findById(req.params.id);
	if (!payment) {
		return next(
			new ErrorResponse(
				`Merchant Payment with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: payment });
});
// @desc  create new merchantPayment
//@route  POST /api/v1/merchantpayments

exports.createPayment = asyncHandler(async (req, res, next) => {
	const getCredit = () => {
		let credit;
		if (req.body.cash) {
			credit = req.body.amount - req.body.cash;
			return credit;
		} else if (req.body.bank) {
			credit = req.body.amount - req.body.bank;
			return credit;
		}
		credit = req.body.amount;
		return credit;
	};
	req.body.credit = getCredit();

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
				`Merchant Payment with id ${req.params.id} could not be found`,
				404
			)
		);
	}

	payments = await MerchantPayment.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}

	res.status(200).json({
		success: true,
		data: payments,
		message: 'Successfully Updated!!',
	});
});
// @desc  Delete  merchantPayment
//@route  DELETE /api/v1/merchantpayments/:id
exports.deletePayment = asyncHandler(async (req, res, next) => {
	let payments = await MerchantPayment.findById(req.params.id);
	if (!payments) {
		return next(
			new ErrorResponse(
				`Merchant Payment with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	payments.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
