/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Order = require('../models/order.models');
const Stock = require('../models/stockEntry.models');

// @desc  get all orders
//@route  GET /api/v1/orders
exports.getAllOrders = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});
// @desc  get single Order
//@route  GET /api/v1/orders/:id
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if (!order) {
		return next(
			new ErrorResponse(
				`Order with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: order });
});
// @desc  create new Order
//@route  POST /api/v1/orders
exports.createOrder = asyncHandler(async (req, res, next) => {
	req.body.customer_id = req.customer.id;
	order = await Order.create(req.body);
	if(order.status=='Delivered'){
	order.description.forEach(async (sales) => {
		let stock = {
			product_id: sales.product,
			stockOut: sales.count,
			
		};
		const stockEntry = await Stock.create(stock);
		res.status(201).json({ success: true, data:order });
	});
}
});

// @desc  update  Order
//@route  PUT /api/v1/orders/:id
exports.updateOrder = asyncHandler(async (req, res, next) => {
	let order = await Order.findById(req.params.id);

	if (!order) {
		return next(
			new ErrorResponse(
				`Order with id ${req.params.id} could not be found`,
				404
			)
		);
	}

	order = await Order.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: order,
		message: 'Successfully Updated!!',
	});
});
// @desc  Delete  Order
//@route  DELETE /api/v1/orders/:id
exports.deleteOrder = asyncHandler(async (req, res, next) => {
	const order= await Order.findByIdAndDelete(req.params.id);
	if (!order) {
		return next(
			new ErrorResponse(
				`Order with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
