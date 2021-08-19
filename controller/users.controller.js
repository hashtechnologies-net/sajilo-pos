/** @format */

const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/users.models');

// @desc  get all users
//@route  GET /api/v1/users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});
// @desc  get single user
//@route  GET /api/v1/users/:id
exports.getSingleUser = asyncHandler(async (req, res, next) => {
	const user1 = await User.findById(req.params.id);

	if (!user1) {
		return next(
			new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: user1 });
});
// @desc  create new user
//@route  POST /api/v1/users
exports.createUser = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.admin.id;
	const { email, password, username } = req.body;
	// const { password } = req.body;
	const userExists = await User.findOne({ email });

	//check duplicate email
	if (userExists) {
		return res.json({
			Status: false,
			reason: `${userExists.email} is already registered`,
		});
	}
	const Cuser = await User.create(req.body);
	const data = {
		username,
		password,
		email,
	};
	res.status(201).json({ success: true, data });
});
// @desc  update  user
//@route  PUT /api/v1/users/:id
exports.updateUser = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!user) {
		return next(
			new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
		);
	}

	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({ success: true, data: user });
});
// @desc  Delete  user
//@route  DELETE /api/v1/users/:id
exports.deleteUser = asyncHandler(async (req, res, next) => {
	const deleteuser = await User.findByIdAndDelete(req.params.id);
	if (!deleteuser) {
		return next(
			new ErrorResponse(
				`Already deleted User with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});

// @desc  uplaod  photo
//@route  PUT /api/v1/users//photo
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
	let user = await User.findById(req.user.id);

	if (!user) {
		return next(
			new ErrorResponse(` User not found with id of ${req.user.id}`, 404)
		);
	}
	if (!req.file) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}
	var data = {
		photo: req.file.path,
	};

	//Adding both the body and the images in the monuments
	user = await User.findByIdAndUpdate(req.user.id, data, {
		runValidators: true,
		new: true,
	});
	res.status(201).json({
		status: true,
		message: 'Sucessfully added new image',
		data: user,
	});
});
