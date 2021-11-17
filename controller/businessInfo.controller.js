/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const BusinessInfo = require('../models/businessInfo.models');

// @desc  get all Business Information
//@route  GET /api/v1/businessinfo
exports.getAllInfo = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get a single Business Info
//@route  GET /api/v1/businessinfo/:id
exports.getSingleInfo = asyncHandler(async (req, res, next) => {
	const info = await BusinessInfo.findById(req.params.id);

	if (!info) {
		return next(
			new ErrorResponse(
				`Business Information with id ${req.params.id} could not be found`,
				404,
			),
		);
	}
	res.status(200).json({ success: true, data: info });
});

// @desc  create new Business Information
//@route  POST /api/v1/businessinfo

exports.createNewInfo = asyncHandler(async (req, res, next) => {
	req.body.logo = req.file.path;
	const info = await BusinessInfo.create(req.body);
	res.status(201).json({
		status: true,
		data: info,
	});
});

// @desc  update  info
//@route  PUT /api/v1/businessinfo/:id
exports.updateInfo = asyncHandler(async (req, res, next) => {
	req.body.logo = req.file.path;
	let info = await BusinessInfo.findById(req.params.id);
	if (!info) {
		return next(
			new ErrorResponse(
				`Business Information with id ${req.params.id} could not be found`,
				404,
			),
		);
	}
	info = await BusinessInfo.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: info,
		message: 'Successfully Updated!!',
	});
});

// @desc  Delete  Business Information
//@route  DELETE /api/v1/businessinfo/:id
exports.deleteInfo = asyncHandler(async (req, res, next) => {
	const info = await BusinessInfo.findById(req.params.id);
	if (!info) {
		return next(
			new ErrorResponse(
				`Business Information with id ${req.params.id} has already been deleted`,
				404,
			),
		);
	}
	BusinessInfo.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
