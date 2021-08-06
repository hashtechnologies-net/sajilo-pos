/** @format */

const express = require('express');
const queryController = require('../controller/query.controller');
const router = express.Router();

const Purchase = require('../models/purchase.model');

router.route('/highestpurchases').get(queryController.getHighestPurchase);
router.route('/counterusers').get(queryController.getCounterUser);
router
	.route('/highestpurchasedproducts')
	.get(queryController.getPurchaseProducts);
router.route('/highestsoldproducts').get(queryController.getSalesProducts);

module.exports = router;
