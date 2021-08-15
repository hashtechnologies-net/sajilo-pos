/** @format */

const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer.controller');
const Customer = require('../models/customer.models');
const allqueryresults = require('../middleware/allqueryresults');
const protectAdmin = require('../middleware/authAdmin');
const { protect } = require('../middleware/authCustomer');

router.route('/login').post(customerController.login);
router.route('/me').get(protect, customerController.getMe);
router.route('/logout').post(customerController.logout);

router
	.route('/')
	.get(
		protectAdmin.protect,
		allqueryresults(Customer),
		customerController.getAllCustomers
	)
	.post(customerController.register);
    
router
.route('/updatepassword')
.put(protect, customerController.updatePassword);

router
.route('/forgotpassword')
.post(protect, customerController.forgotPassword);

    router
	.route('/:id')
	.get(protectAdmin.protect, customerController.getSingleCustomer)
	.put(protect, customerController.updateCustomer)



module.exports = router;
