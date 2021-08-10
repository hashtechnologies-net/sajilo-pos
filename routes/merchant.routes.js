/** @format */

const express = require('express');
const merchantController = require('../controller/merchant.controller');
const Merchant = require('../models/merchant.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');
const router = express.Router();

router
	.route('/')
	.get(
		authprotect.protect,
		allqueryresults(Merchant, {
			path: 'created_by',
			select: 'username',
		}),
		merchantController.getAllMerchants
	)
	.post(authprotect.protect, merchantController.createMerchant);

router
	.route('/:id')
	.get(authprotect.protect, merchantController.getSingleMerchant)
	.put(authprotect.protect, merchantController.updateMerchant)
	.delete(authprotect.protect, merchantController.deleteMerchant);

module.exports = router;
