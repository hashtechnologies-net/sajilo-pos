const express = require('express');
const router = express.Router();
const merchantPaymentController = require('../controller/merchant_payment.controller');

router.route('/').get(merchantPaymentController.getInvestment);

module.exports = router;
