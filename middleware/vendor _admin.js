/** @format */

const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../models/admin.models');
const Vendor = require('../models/vendor.models');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		
			req.headers.authorization.startsWith('Bearer vendor-')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split('-')[1];
	}
	else{
		token=req.headers.authorization.split(' ')[1];
	}

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
	
		if (req.headers.authorization.startsWith('Bearer vendor-')) {
			const decoded = jwt.verify(token, process.env.JWT_VENDOR_SECRET);
			req.vendor = await Vendor.findById(decoded.id);
			if (!req.vendor) {
				return next(new ErrorResponse('Vendor not found', 404));
			}
			
		}


		
		else {
			const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
			req.admin = await Admin.findById(decoded.id);
			if (!req.admin) {
				return next(new ErrorResponse('Admin not found', 404));
			}
		}
		
		next()
	} catch (err) {
		return next(
			new ErrorResponse(
				'Internal server error  from admin/vendor authentication',
				500
			)
		);
	}
});
