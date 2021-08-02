/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Invoice = require('../models/invoice.models');
const Stock = require('../models/stockEntry.models');
const { getID } = require('../middleware/getuserId');

// @desc  get all Invoice
//@route  GET /api/v1/invoices
exports.getAllInvoices = asyncHandler(async (req, res, next) => {
	const invoices = await Invoice.find().populate('user_id');
	res.status(200).json({ success: true, data: invoices });
});
// @desc  get single Invoice
//@route  GET /api/v1/invoices/:id
exports.getSingleInvoice = asyncHandler(async (req, res, next) => {
	const invoice = await Invoice.findById(req.params.id);
	if (!invoice) {
		return next(
			new ErrorResponse(
				`Invoice with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: invoice });
});
// @desc  create new Invoice
//@route  POST /api/v1/invoices

exports.createInvoice = asyncHandler(async (req, res, next) => {
	req.body.user_id = req.user.id;
	const invoice = await Invoice.create(req.body);
	invoice.description.forEach(async (sales) => {
		let stock = {
			product_id: sales.product,
			stockOut: sales.stock,
			invoice_id: invoice.id,
		};
		const stockEntry = await Stock.create(stock);
	});
	res.status(201).json({ success: true, data: invoice });
});

// @desc  update  Invoice
//@route  PUT /api/v1/invoices/:id
exports.updateInvoice = asyncHandler(async (req, res, next) => {
	let invoice = await Invoice.findById(req.params.id);

	if (!invoice) {
		return next(
			new ErrorResponse(
				`Invoice with id ${req.params.id} could not be found`,
				404
			)
		);
	}

	invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: invoice,
		message: 'Successfully Updated!!',
	});
});
// @desc  Delete  Invoice
//@route  DELETE /api/v1/invoices/:id
exports.deleteInvoice = asyncHandler(async (req, res, next) => {
	const invoice = await Invoice.findByIdAndDelete(req.params.id);
	if (!invoice) {
		return next(
			new ErrorResponse(
				`Invoice with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
