/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');
const Customer = require('../models/customer.models');
require('dotenv').config('./env');

// @desc      Register admin
// @route     POST /api/v1/customers/register
// @access    Admin
exports.register = asyncHandler(async (req, res, next) => {
	const { customer_fname,customer_lname, customer_username, customer_email, phone, address, password } = req.body;
	const customerExists = await Customer.findOne({ customer_username });
	//check duplicate email
	if (customerExists) {
		return res.json({
			Status: false,
			reason: `${customerExists.customer_username} is already registered`,
		});
	}

	// Create admin
	const customer = await Customer.create({
		customer_fname,
        customer_lname,
		customer_username,
		customer_email,
        phone,
        address,
		password,
	});

	sendTokenResponse(customer, 200, res);
});

// @desc      Login Admin
// @route     POST /api/v1/admin/admin_login
// @access    Private
exports.login = asyncHandler(async (req, res, next) => {
	const { customer_username, password } = req.body;

	// Validate email & password
	if (!customer_username || !password) {
		return next(
			new ErrorResponse('Please provide username and password', 400)
		);
	}
    console.log(customer_username);

	// Check for admin
	const customer = await Customer.findOne({ customer_username }).select('+password');
	if (!customer) {
		return next(new ErrorResponse('Invalid username or password', 401));
	}

	// // Check if password matches
	const isMatch = await bcrypt.compare(password, customer.password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid email or password', 401));
	}

	sendTokenResponse(customer, 200, res);
});

// @desc      Log admin out / clear cookie
// @route     GET /api/v1/admin/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Customer logged out',
		data: {},
	});
});

// Get token from model, create cookie and send response
const sendTokenResponse = (customer, statusCode, res) => {
	// Create token
	const token = 'customer-' + customer.getSignedJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token,
	});
};

// @desc      Get admin
// @route     GET /api/v1/admin/get_admin
// @access    Private

exports.getMe = asyncHandler(async (req, res, next) => {
	const customer = await Customer.findById(req.customer.id);
	res.status(200).json({ success: true, data: customer });
});
// @desc      Get all admin
// @route     GET /api/v1/admin/getadmins
// @access    Private

exports.getCustomers = asyncHandler(async (req, res, next) => {
	const customers = await Customer.find();
	res.status(200).json({ success: true, data: customers });
});
