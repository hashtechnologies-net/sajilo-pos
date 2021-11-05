/** @format */

const express = require('express');
const queryController = require('../controller/query.controller');
const salesPaymentController = require('../controller/sales_payment.controller');
const merchantPaymentController = require('../controller/merchant_payment.controller');
const router = express.Router();
const authprotect = require('../middleware/authAdmin');

router
	.route('/highest/purchases')
	.get(authprotect.protect, queryController.getHighestPurchase);

router
	.route('/lowest/purchases')
	.get(authprotect.protect, queryController.getLowestPurchase);
router
	.route('/highest/counterusers')
	.get(authprotect.protect, queryController.getHighestCounterUser);
router
	.route('/lowest/counterusers')
	.get(authprotect.protect, queryController.getLowestCounterUser);
router
	.route('/highest/purchasedproducts')
	.get(authprotect.protect, queryController.getHighestPurchaseProducts);
router
	.route('/lowest/purchasedproducts')
	.get(authprotect.protect, queryController.getLowestPurchaseProducts);
router
	.route('/highest/soldproducts')
	.get(authprotect.protect, queryController.getHighestSalesProducts);
router
	.route('/lowest/soldproducts')
	.get(authprotect.protect, queryController.getLowestSalesProducts);

router
	.route('/category/totalproducts')
	.get(authprotect.protect, queryController.getLowestSalesProducts);
router
	.route('/totalinvestments')
	.get(authprotect.protect, queryController.getInvestment);
router.route('/totalsales').get(authprotect.protect, queryController.getSales);

router
	.route('/averagerating')
	.get(authprotect.protect, queryController.getAverageRating);
router
	.route('/today/sales')
	.get(authprotect.protect, salesPaymentController.getTodaySales);
router
	.route('/today/totalsales')
	.get(authprotect.protect, salesPaymentController.getTodayTotalSales);

module.exports = router;
