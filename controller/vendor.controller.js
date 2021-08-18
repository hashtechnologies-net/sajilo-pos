/** @format */

const bcrypt = require('bcrypt');
require('dotenv').config('./env');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Vendor = require('../models/vendor.models');
const sendEmail = require('../utils/sendEmail');

// @desc  get all vendors
//@route  GET /api/v1/vendors
exports.getAllvendors = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get single vendor
//@route  GET /api/v1/vendors/:id
exports.getSingleVendor = asyncHandler(async (req, res, next) => {
	const vendor1 = await Vendor.findById(req.params.id);

	if (!vendor1) {
		return next(
			new ErrorResponse(
				`vendor with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: vendor1 });
});

// @desc      Register vendor
// @route     POST /api/v1/vendors/register
// @access    vendor
exports.register = asyncHandler(async (req, res, next) => {
	const { vendorName, phoneNumber, email, password } = req.body;
	const vendorExists = await Vendor.findOne({ email });

	//check duplicate email
	if (vendorExists) {
		return res.json({
			Status: false,
			reason: `${vendorExists.email} is already registered`,
		});
	}
	// Register vendor
	const Rvendor = await Vendor.create({
		vendorName,
		phoneNumber,
		email,
		password,
	});
	res.status(201).json({ success: true, Rvendor });
});

// @desc  update  vendor
//@route  PUT /api/v1/vendors/:id
exports.updateVendor = asyncHandler(async (req, res, next) => {
	let Uvendor = await Vendor.findById(req.params.id);
	if (!Uvendor) {
		return next(
			new ErrorResponse(
				`vendor with id ${req.params.id} could not be found`,
				404
			)
		);
	}
	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	Uvendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: Uvendor,
		message: 'Successfully Updated!!',
	});
});
// @desc  Delete  vendor
//@route  DELETE /api/v1/vendors/:id
exports.deleteVendor = asyncHandler(async (req, res, next) => {
	let deletevendor = await Vendor.findById(req.params.id);
	if (!deletevendor) {
		return next(
			new ErrorResponse(
				`vendor with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	deletevendor.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
// @desc      Login vendor
// @route     POST /api/v1/vendors/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate emil & password
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide an email and password', 400)
		);
	}

	// Check for vendor
	const vendor = await Vendor.findOne({ email }).select('+password');
	if (!vendor) {
		return next(new ErrorResponse('Invalid email or password', 401));
	}

	// // Check if password matches
	const isMatch = await bcrypt.compare(password, vendor.password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid email or password', 401));
	}

	sendTokenResponse(vendor, 200, res);
});

// @desc      Get current logged in vendor
// @route     GET /api/v1/vendors/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
	// vendor is already available in req due to the protect middleware
	const vendor = req.vendor;

	res.status(200).json({
		success: true,
		data: vendor,
	});
});
// @desc      Update password
// @route     PUT /api/v1/vendors/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const vendor = await Vendor.findById(req.vendor.id).select('+password');

	// Check current password
	if (!(await vendor.matchPassword(req.body.currentPassword))) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	vendor.password = req.body.newPassword;
	await vendor.save();

	sendTokenResponse(vendor, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/vendors/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const vendor = await Vendor.findOne({ email: req.body.email });
	if (!vendor) {
		return next(
			new ErrorResponse('Vendor with given email could not be found', 404)
		);
	}

	// Get reset token
	const resetToken = vendor.getResetPasswordToken();

	// await vendor.save({ validateBeforeSave: false });

	// Create reset url
	const resetUrl = `${req.protocol}://${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	// const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: vendor.email,
			subject: 'Password reset token',
			message,
		});
		

		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		vendor.resetPasswordToken = undefined;
		vendor.resetPasswordExpire = undefined;

		// await vendor.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});

// Get token from model, create cookie and send response
const sendTokenResponse = (vendor, statusCode, res) => {
	// Create token
	const token = 'vendor@' + vendor.getSignedJwtToken();

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
