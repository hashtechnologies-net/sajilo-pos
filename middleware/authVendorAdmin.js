/** @format */

const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../models/admin.models');
const Vendor = require('../models/vendor.models');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	if (!req.headers.authorization) {
		return next(new ErrorResponse('No token Found', 401));
	}
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer vendor@')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split('@')[1];
	} else {
		token = req.headers.authorization.split(' ')[1];
	}
	//console.log(token);
	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse(
				'Please login as admin or vendor to access this resources',
				401
			)
		);
	}

	try {
		if (req.headers.authorization.startsWith('Bearer vendor@')) {
			const decoded = jwt.verify(token, process.env.JWT_VENDOR_SECRET);
			req.creator = await Vendor.findById(decoded.id);
			if (!req.creator) {
				return next(new ErrorResponse('Vendor not found', 401));
			}
			next();
		} else if (
			req.headers.authorization.startsWith('Bearer customer@') ||
			req.headers.authorization.startsWith('Bearer user@')
		) {
			return next(
				new ErrorResponse('Please login as an admin or vendor', 404)
			);
			next();
		} else {
			const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
			req.creator = await Admin.findById(decoded.id);
			if (!req.creator) {
				return next(new ErrorResponse('Admin not found', 401));
			}
			next();
		}
	} catch (err) {
		return next(new ErrorResponse('Token Expired', 500));
	}
});
