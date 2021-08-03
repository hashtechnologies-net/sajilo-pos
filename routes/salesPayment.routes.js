/** @format */

const express = require('express');
const SalesPaymentController = require('../controller/sales_payment.controller');

const Salespayment = require('../models/sales.payment.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authUser');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(Salespayment), SalesPaymentController.getAllSPayments)
	.post(authprotect.protect, SalesPaymentController.createSPayment);
router.route('/counteruser').get(SalesPaymentController.getCounterUser);
router
	.route('/:id')
	.get(SalesPaymentController.getSinglePayment)
	.put(authprotect.protect, SalesPaymentController.updateSPayment)
	.delete(authprotect.protect, SalesPaymentController.deleteSPayment);

module.exports = router;
