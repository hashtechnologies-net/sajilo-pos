const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/users.models');

// @desc  get all users
//@route  GET /api/v1/users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({ success: true, data: users });
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
	const { email } = req.body;
	const userExists = await User.findOne({ email });

	//check duplicate email
	if (userExists) {
		return res.json({
			Status: false,
			reason: `${userExists.email} is already registered`,
		});
	}
	const Cuser = await User.create(req.body);
	res.status(201).json({ success: true, data: Cuser });
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
	res.status(200).json({ success: true, data: {} });
});
