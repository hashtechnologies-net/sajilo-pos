/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.models');
require('dotenv').config('./env');
const sendEmail = require('../utils/sendEmail');

// @desc      Register admin
// @route     POST /api/v1/admin/register
// @access    Admin
exports.register = asyncHandler(async (req, res, next) => {
	// console.log(req.body);
	const { full_name, username, email, password } = req.body;
	
	const userExistsByUsername = await Admin.findOne({ username })
	const userExistsByEmail =  await Admin.findOne({ email})

	//check duplicate email
	if (userExistsByUsername) {
		return res.json({
			Status: false,
			reason: `${userExistsByUsername.username } is already registered`,
		});
	}
	if (userExistsByEmail) {
		return res.json({
			Status: false,
			reason: `${userExistsByEmail.email } is already registered`,
		});
	}
	
	// Create admin
	const admin = await Admin.create({
		full_name,
		username,
		email,
		password,
	}).catch(err =>{ console.log(err.message) })

	sendTokenResponse(admin, 200, res);
});

// @desc      Login Admin
// @route     POST /api/v1/admin/admin_login
// @access    Private
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate emil & password
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide username and password', 400)
		);
	}

	// Check for admin
	const admin = await Admin.findOne({ email }).select('+password');
	if (!admin) {
		return next(new ErrorResponse('Invalid username or password', 401));
	}

	// // Check if password matches
	const isMatch = await bcrypt.compare(password, admin.password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid email or password', 401));
	}

	sendTokenResponse(admin, 200, res);
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
		message: 'Admin logged out',
		data: {},
	});
});

// @desc      Forgot password
// @route     POST /api/v1/admin/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const admin = await Admin.findOne({ email: req.body.email });
	if (!admin) {
		return next(
			new ErrorResponse('Admin with given email could not be found', 404)
		);
	}

	// Get reset token
	const resetToken = admin.getResetPasswordToken();

	// await user.save({ validateBeforeSave: false });

	// Create reset url
	const resetUrl = `${req.protocol}://${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	// const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: admin.email,
			subject: 'Password reset token',
			message,
		});

		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		admin.resetPasswordToken = undefined;
		admin.resetPasswordExpire = undefined;

		// await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
	// Create token
	const token = admin.getSignedJwtToken();

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
	const admin = await Admin.findById(req.admin.id);
	res.status(200).json({ success: true, data: admin });
});
// @desc      Get all admin
// @route     GET /api/v1/admin/getadmins
// @access    Private

exports.getAdmins = asyncHandler(async (req, res, next) => {
	const admins = await Admin.find();
	const exist = (admins.length > 0 ? true : false)
	res.status(200).json({ success: true, exist });
});

exports.getSingleAdmin = asyncHandler(async (req, res, next) => {
	const admins1 = await Admin.findById(req.params.id);

	if (!admins1) {
		return next(
			new ErrorResponse(
				`Admin not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: admins1 });
});