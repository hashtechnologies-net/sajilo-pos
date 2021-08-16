/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');
const User = require('../models/users.models');
const jwt = require('jsonwebtoken');
require('dotenv').config('./env');
const sendEmail = require('../utils/sendEmail');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Admin
// exports.register = asyncHandler(async (req, res, next) => {
// 	const { Name, email, password, accountType } = req.body;
// 	const userExists = await User.findOne({ email });

// 	//check duplicate email
// 	if (userExists) {
// 		return res.json({
// 			Status: false,
// 			reason: `${userExists.email} is already registered`,
// 		});
// 	}

// 	// Create user
// 	const user = await User.create({
// 		Name,
// 		email,
// 		password,
// 		accountType,
// 	});

// 	sendTokenResponse(user, 200, res);
// });

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;

	// Validate emil & password
	if (!username || !password) {
		return next(
			new ErrorResponse('Please provide username and password', 400)
		);
	}

	// Check for user
	const user = await User.findOne({ username }).select('+password');
	if (!user) {
		return next(new ErrorResponse('Invalid email or password', 401));
	}

	// // Check if password matches
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid email or password', 401));
	}

	sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'User logged out',
		data: {},
	});
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
	// user is already available in req due to the protect middleware
	const user = req.user;

	res.status(200).json({
		success: true,
		data: user,
	});
});
// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	// Check current password
	if (!(await user.matchPassword(req.body.currentPassword))) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(
			new ErrorResponse('User with given email could not be found', 404)
		);
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	// await user.save({ validateBeforeSave: false });

	// Create reset url
	const resetUrl = `${req.protocol}://${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	// const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message,
		});

		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		// await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer user@')
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
		const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
		const user = await User.findById(decoded.id);

		if (!user) {
			return next(new ErrorResponse('User could not be found', 401));
		}
		req.user = user;
		next();
	} catch (err) {
		return next(
			new ErrorResponse('Inernal Server Error from user authentication', 500)
		);
	}
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = 'user@' + user.getSignedJwtToken();

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
