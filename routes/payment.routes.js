const express = require('express');
const router = express.Router();
const paymentcontroller = require('../controller/payment.controller');
const authprotect = require('../middleware/auth');

router
	.route('/')
	.get(paymentcontroller.getAllPayments)
	.post(paymentcontroller.createPayment);

router
	.route('/:id')
	.get(paymentcontroller.getSinglePayment)
	.put(authprotect.protect, paymentcontroller.updatePayment)
	.delete(paymentcontroller.deletePayment);

module.exports = router;
