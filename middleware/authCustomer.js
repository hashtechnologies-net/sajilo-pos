/** @format */

const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Customer = require('../models/customer.models');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
	}

	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse(
				'Please login as customer to access this resources',
				401
			)
		);
	}

	try {
		// Verify token
		if (!token.startsWith('customer')) {
			return next(
				new ErrorResponse('Please login as a customer', 404)
			);
		}
		const decoded = jwt.verify(token, process.env.JWT_CUSTOMER_SECRET);
		req.customer = await Customer.findById(decoded.id);
		if (!req.customer) {
			return next(new ErrorResponse('Customer not found', 401));
		}
		next();
	} catch (err) {
		return next(
			new ErrorResponse(
				'Internal server error  from customer authentication',
				500
			)
		);
	}
});