/** @format */

const express = require('express');
const orderController = require('../controller/order.controller');
const Invoice = require('../models/invoice.models');
const allqueryresults = require('../middleware/allqueryresults');
//const { protect } = require('../middleware/authCustomer');
const { getStock } = require('../middleware/stockCheck');
const Order = require('../models/order.models');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Order, {
			path: 'description.product',
			select: 'product_name',
		}),
		orderController.getAllOrders,
	)
	.post(getStock, orderController.createOrder);

router
	.route('/:id')
	.get(orderController.getSingleOrder)
	.put(orderController.updateOrder)
	.delete(orderController.deleteOrder);

module.exports = router;
