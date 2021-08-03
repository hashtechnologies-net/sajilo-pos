/** @format */

const express = require('express');
const router = express.Router();
const merchantPaymentController = require('../controller/merchant_payment.controller');

const MerchantPayment = require('../models/merchant.payment.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');

router
	.route('/')
	.get(
		allqueryresults(MerchantPayment, {
			path: 'merchant_id',
			select: 'merchantName',
		}),
		merchantPaymentController.getAllPayment
	)
	.post(authprotect.protect, merchantPaymentController.createPayment);

router
	.route('/:id')
	.get(merchantPaymentController.getSinglePayment)
	.put(authprotect.protect, merchantPaymentController.updatePayment)
	.delete(authprotect.protect, merchantPaymentController.deletePayment);

module.exports = router;
