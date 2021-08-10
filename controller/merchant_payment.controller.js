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
	req.body.created_by = req.admin.id;
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
	const getCredit = () => {
		let credit;
		if (req.body.cash) {
			credit = payments.amount - req.body.cash - payments.cash;
			return credit;
		} else if (req.body.bank) {
			if (!payments.bank) {
				credit = payments.amount - req.body.bank - payments.cash;
			}
			credit = payments.amount - req.body.bank - payments.bank;
			return credit;
		}
		credit = payments.amount;
		return credit;
	};
	req.body.credit = getCredit();
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	if (req.body.paymentconfirmId) {
		payments = await MerchantPayment.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			success: true,
			data: payments,
			message: 'Successfully Updated!!',
		});
	}
	res.status(404).json({
		success: false,
		reason: 'Please enter receipt no. or cheque no',
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

// @desc  GET  totalinvetsment
//@route  GET /api/v1/find/totalinvestments
exports.getInvestment = asyncHandler(async (req, res, next) => {
	let merchantPayment = await MerchantPayment.find();
	let inv = 0;
	merchantPayment.forEach((element) => {
		let investment = element.amount - element.credit;
		inv += investment;
	});
	res.status(200).json({
		success: true,
		Total_investments: inv,
	});
});
