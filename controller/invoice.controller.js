/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Invoice = require('../models/invoice.models');
const Stock = require('../models/stockEntry.models');
const { getID } = require('../middleware/getuserId');

// @desc  get all Invoice
//@route  GET /api/v1/invoices
exports.getAllInvoices = asyncHandler(async (req, res, next) => {
	const Invoices = await Invoice.find().populate('user_id');
	res.status(200).json({ success: true, data: Invoices });
});
// @desc  get single Invoice
//@route  GET /api/v1/invoices/:id
exports.getSingleInvoice = asyncHandler(async (req, res, next) => {
	const Invoice1 = await Invoice.findById(req.params.id);
	if (!Invoice1) {
		return next(
			new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: Invoice1 });
});
// @desc  create new Invoice
//@route  POST /api/v1/invoices

exports.createInvoice = asyncHandler(async (req, res, next) => {
	req.body.user_id = req.user.id;
	const CInvoice = await Invoice.create(req.body);
	CInvoice.description.forEach(async (sales) => {
		let stock = {
			product_id: sales.product,
			stockOut: sales.stock,
			invoice_id: CInvoice.id,
		};
		const stockEntry = await Stock.create(stock);
	});
	res.status(201).json({ success: true, data: CInvoice });
});

// @desc  update  Invoice
//@route  PUT /api/v1/invoices/:id
exports.updateInvoice = asyncHandler(async (req, res, next) => {
	const UInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!UInvoice) {
		return next(
			new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
		);
	}
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({ success: true, data: UInvoice });
});
// @desc  Delete  Invoice
//@route  DELETE /api/v1/invoices/:id
exports.deleteInvoice = asyncHandler(async (req, res, next) => {
	const deleteInvoice = await Invoice.findByIdAndDelete(req.params.id);
	if (!deleteInvoice) {
		return next(
			new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: {} });
});
