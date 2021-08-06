/** @format */

const express = require('express');
const queryController = require('../controller/query.controller');
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
	.get(queryController.getHighestCounterUser);
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

module.exports = router;
