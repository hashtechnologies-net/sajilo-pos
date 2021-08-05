const express = require('express');
const router = express.Router();
const salesPaymentController = require('../controller/sales_payment.controller');

router.route('/').get(salesPaymentController.getSales);

module.exports = router;
