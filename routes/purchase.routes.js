/** @format */

const express = require('express');
const purchaseController = require('../controller/purchase.controller');

const Purchase = require('../models/purchase.model');

const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');
const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Purchase, [
			{
				path: 'created_by',
				select: 'username',
			},
			{
				path: 'merchant_id',
				select: 'merchantName',
			},
			{
				path: 'description.product',
				select: 'product_name',
			},
		]),

		purchaseController.getAllPurchases
	)
	.post(authprotect.protect, purchaseController.createPurchase);

router
	.route('/:id')
	.get(purchaseController.getSinglePurchase)
	.put(authprotect.protect, purchaseController.updatePurchase)
	.delete(authprotect.protect, purchaseController.deletePurchase);

module.exports = router;
