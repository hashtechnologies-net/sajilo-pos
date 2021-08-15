/** @format */

const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Vendor = require('../models/vendor.models');

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer vendor@')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split('@')[1];
	}

	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse(
				'Please login as a vendor to access this resource.',
				401
			)
		);
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_VENDOR_SECRET);
		const vendor = await Vendor.findById(decoded.id);

		if (!vendor) {
			return next(new ErrorResponse('Vendor could not be found', 401));
		}
		req.vendor = vendor;
		next();
	} catch (err) {
		return next(
			new ErrorResponse(
				'Inernal Server Error from vendor authentication',
				500
			)
		);
	}
});
