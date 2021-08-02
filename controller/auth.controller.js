/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');
const User = require('../models/users.models');
const jwt = require('jsonwebtoken');
require('dotenv').config('./env');

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
	const { email, password } = req.body;

	// Validate emil & password
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide an email and password', 400)
		);
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password');
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

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = 'user-' + user.getSignedJwtToken();

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

// @desc      Login me
// @route     POST /api/v1/auth/me
// @access    Private

exports.getMe = asyncHandler(async (req, res, next) => {
	console.log(res);
	const user = await User.findById(req.user.id);
	console.log(req.user.id);
	res.status(200).json({ success: true, data: user });
});

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer user-')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split('-')[1];
	}

	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse(
				'Please login as user to access this resource.',
				401
			)
		);
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
		const user = await User.findById(decoded.id);

		if (!user) {
			return next(
				new ErrorResponse('User not found with that that token', 401)
			);
		}
		req.user = user;
		next();
	} catch (err) {
		return next(
			new ErrorResponse(
				'Inernal Server Error from user authentication',
				500
			)
		);
	}
});
