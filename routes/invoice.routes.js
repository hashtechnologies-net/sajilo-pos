/** @format */

const express = require('express');
const invoiceController = require('../controller/invoice.controller');
const Invoice = require('../models/invoice.models');
const allqueryresults = require('../middleware/allqueryresults');
const { protect } = require('../controller/auth.controller');
const { getStock } = require('../middleware/stockCheck');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Invoice, {
			path: 'created_by',
			select: 'username',
		}),
		invoiceController.getAllInvoices
	)
	.post(protect, getStock, invoiceController.createInvoice);

router
	.route('/:id')
	.get(invoiceController.getSingleInvoice)
	.put(protect, invoiceController.updateInvoice)
	.delete(protect, invoiceController.deleteInvoice);

module.exports = router;
