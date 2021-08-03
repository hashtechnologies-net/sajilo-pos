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
	}

	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse(
				'Please login as admin to access this resources',
				401
			)
		);
	}

	try {
		// Verify token
<<<<<<< HEAD
		if (token.startsWith('user')) {
			return next(
				new ErrorResponse('Please login as an Admin not User', 404)
			);
		}
=======
		console.log(token);
>>>>>>> f042d54464154f85fd3127d4e60ab1be6f3fcf90
		const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
		req.admin = await Admin.findById(decoded.id);
		if (!req.admin) {
			return next(new ErrorResponse('Admin not found', 401));
		}
		next();
	} catch (err) {
		return next(
			new ErrorResponse(
<<<<<<< HEAD
				'Internal server error from admin authentication',
=======
				'Internal server error  from admin authentication',
>>>>>>> f042d54464154f85fd3127d4e60ab1be6f3fcf90
				500
			)
		);
	}
});
