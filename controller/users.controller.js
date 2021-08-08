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
			new ErrorResponse(
				`Product not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: user1 });
});
// @desc  create new user
//@route  POST /api/v1/users
exports.createUser = asyncHandler(async (req, res, next) => {
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
	const Uuser = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!Uuser) {
		return next(
			new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
		);
	}

	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({ success: true, data: Uuser });
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
	const user = await User.findById(req.user.id);
	console.log(req.user.id);
	if (!user) {
		return next(
			new ErrorResponse(` User not found with id of ${req.user.id}`, 404)
		);
	}
	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}
	const file = req.files.Photo;

	//Image is photo check
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}
	//check filesize
	if (file.size > process.env.FILE_MAX_SIZE) {
		return next(
			new ErrorResponse(`file size cannot be more than 1mb`, 400)
		);
	}
	//Create custom filename
	file.name = `photo_${user._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.error(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}

		await User.findByIdAndUpdate(req.user.id, { photo: file.name });

		res.status(200).json({
			success: true,
			data: file.name,
		});
	});
});
