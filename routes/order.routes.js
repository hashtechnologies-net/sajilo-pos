/** @format */

const express = require('express');
const orderController = require('../controller/order.controller');
const Invoice = require('../models/invoice.models');
const allqueryresults = require('../middleware/allqueryresults');
const { protect } = require('../middleware/authCustomer');
const { getCount } = require('../middleware/orderCountCheck');
const Order= require('../models/order.models');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Order, {
			path: 'description.product',
			select: 'product_name',
		}),
		orderController.getAllOrders
	)
	.post(protect, getCount, orderController.createOrder);

router
	.route('/:id')
	.get(orderController.getSingleOrder)
	.put(protect, orderController.updateOrder)
	.delete(protect, orderController.deleteOrder);

module.exports = router;
