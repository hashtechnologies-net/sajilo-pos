/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const SalesPayment = require('../models/sales.payment.models');
const Invoice = require('../models/invoice.models');

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

// // @desc  GET  todaySales
// //@route  GET /api/v1/find/today/sales
exports.getTodaySales = asyncHandler(async (req, res, next) => {
	let invoice = await Invoice.find();
	let sales = [];
	invoice.forEach((element) => {
		let created_at = element.created_at;
		let today = new Date().toISOString().slice(0, 10);
		let saledate = created_at.toISOString().slice(0, 10);

		if (today == saledate) {
			sales.push(created_at.getHours(), element.total_amount);
		}
	});

	res.status(200).json({
		success: true,
		sales: sales,
	});
});

// // @desc  GET  todaySales
// //@route  GET /api/v1/find/today/totalsales
exports.getTodayTotalSales = asyncHandler(async (req, res, next) => {
	let invoice = await Invoice.find();
	let totalAmount = 0;
	invoice.forEach((element) => {
		let created_at = element.created_at;
		let today = new Date().toISOString().slice(0, 10);
		let salesdate = created_at.toISOString().slice(0, 10);

		if (today == salesdate) {
			totalAmount += element.total_amount;
		}
	});
	res.status(200).json({
		success: true,
		total_amount: totalAmount,
	});
});
