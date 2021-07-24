const express = require('express');
const router = express.Router();
const paymentcontroller = require('../controller/payment.controller');

router
	.route('/')
	.get(paymentcontroller.getAllPayments)
	.post(paymentcontroller.createPayment);

router
	.route('/:id')
	.get(paymentcontroller.getSinglePayment)
	.put(paymentcontroller.updatePayment)
	.delete(paymentcontroller.deletePayment);

module.exports = router;
