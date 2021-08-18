/** @format */

const express = require('express');
const vendorController = require('../controller/vendor.controller');
const Vendor = require('../models/vendor.models');
const allqueryresults = require('../middleware/allqueryresults');
const authvendor = require('../middleware/authVendor');
const authAdmin = require('../middleware/authAdmin');
const router = express.Router();

router.route('/me').get(authvendor.protect, vendorController.getMe);
router
	.route('/')
	.get(
		allqueryresults(Vendor),
		authAdmin.protect,
		vendorController.getAllvendors
	);

router.route('/register').post(vendorController.register);
router.route('/login').post(vendorController.login);
router.route('/logout').post(vendorController.logout);

router
	.route('/updatepassword')
	.put(authvendor.protect, vendorController.updatePassword);
router
	.route('/forgotpassword')
	.post(authvendor.protect, vendorController.forgotPassword);

router
	.route('/:id')
	.get(authAdmin.protect, vendorController.getSingleVendor)
	.put(authvendor.protect, vendorController.updateVendor)
	.delete(authvendor.protect, vendorController.deleteVendor);

module.exports = router;
