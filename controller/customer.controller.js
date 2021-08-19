/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');
const Customer = require('../models/customer.models');
const sendEmail = require('../utils/sendEmail');

require('dotenv').config('./env');

// @desc      Register customer
// @route     POST /api/v1/customers/
// @access    Customer
exports.register = asyncHandler(async (req, res, next) => {
	const {
		customer_fname,
		customer_lname,
		customer_username,
		customer_email,
		phone,
		address,
		password,
	} = req.body;
	const customerExists = await Customer.findOne({ customer_username });
	//check duplicate email
	if (customerExists) {
		return res.json({
			Status: false,
			reason: `${customerExists.customer_username} is already registered`,
		});
	}

	// Create customer
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

// @desc  update  customer
//@route  PUT /api/v1/customers/:id
exports.updateCustomer = asyncHandler(async (req, res, next) => {
	const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!customer) {
		return next(
			new ErrorResponse(
				`Customer not found with id of ${req.params.id}`,
				404
			)
		);
	}
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({ success: true, data: customer });
});

// @desc      Login Customer
// @route     POST /api/v1/customers/customer_login
// @access    Private
exports.login = asyncHandler(async (req, res, next) => {
	const { customer_username, password } = req.body;

	// Validate email & password
	if (!customer_username || !password) {
		return next(
			new ErrorResponse('Please provide username and password', 400)
		);
	}

	// Check for customer
	const customer = await Customer.findOne({ customer_username }).select(
		'+password'
	);
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

// @desc      Log customer out / clear cookie
// @route     GET /api/v1/customers/logout
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
	const token = 'customer@' + customer.getSignedJwtToken();

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

// @desc  get all customers
//@route  GET /api/v1/customers
exports.getAllCustomers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});
// @desc  get single customer
//@route  GET /api/v1/customers/:id
exports.getSingleCustomer = asyncHandler(async (req, res, next) => {
	const customer1 = await Customer.findById(req.params.id);

	if (!customer1) {
		return next(
			new ErrorResponse(
				`Customer not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: customer1 });
});

// @desc      Get current logged in customer
// @route     GET /api/v1/customers/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
	// customer is already available in req due to the protect middleware
	const customer = req.customer;

	res.status(200).json({
		success: true,
		data: customer,
	});
});
// @desc      Update password
// @route     PUT /api/v1/customers/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const customer = await Customer.findById(req.customer.id).select(
		'+password'
	);

	// Check current password
	if (!(await customer.matchPassword(req.body.currentPassword))) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	customer.password = req.body.newPassword;
	await customer.save();

	sendTokenResponse(customer, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/customers/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const customer = await Customer.findOne({
		customer_email: req.body.customer_email,
	});
	if (!customer) {
		return next(
			new ErrorResponse(
				'Customer with given email could not be found',
				404
			)
		);
	}

	// Get reset token
	const resetToken = customer.getResetPasswordToken();
	// await customer.save({ validateBeforeSave: false });

	// Create reset url
	const resetUrl = `${req.protocol}://${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	// const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: customer.customer_email,
			subject: 'Password reset token',
			message,
		});

		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		customer.resetPasswordToken = undefined;
		customer.resetPasswordExpire = undefined;

		await customer.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer customer@')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split('@')[1];
	}

	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse(
				'Please login as a user to access this resource.',
				401
			)
		);
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_CUSTOMER_SECRET);

		const customer = await Customer.findById(decoded.id);

		if (!customer) {
			return next(new ErrorResponse('Customer could not be found', 401));
		}
		req.customer = customer;
		next();
	} catch (err) {
		return next(
			new ErrorResponse(
				'Internal Server Error from customer authentication',
				500
			)
		);
	}
});
