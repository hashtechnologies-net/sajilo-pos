/** @format */

const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../models/admin.models');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
	} else {
		return next(new ErrorResponse('Token not found', 401));
	}

	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse(
				'Please login as an admin to access this resources',
				401,
			),
		);
	}

	try {
		// Verify token
		if (token.startsWith('user')) {
			return next(new ErrorResponse('Please login as an Admin', 404));
		}
		const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
		req.admin = await Admin.findById(decoded.id);
		if (!req.admin) {
			return next(new ErrorResponse('Admin not found', 401));
		}
		next();
	} catch (err) {
		return next(new ErrorResponse('Token Expired', 500));
	}
});
