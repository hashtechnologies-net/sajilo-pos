/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Appsetting = require('../models/appsetting.models');

// @desc  get all appsettings
//@route  GET /api/v1/appsettings
exports.getAllSetting = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get single appsetting
//@route  GET /api/v1/appsettings/:id
exports.getSingleSetting = asyncHandler(async (req, res, next) => {
	const app_setting = await Appsetting.findById(req.params.id);

	if (!app_setting) {
		return next(
			new ErrorResponse(
				`App Setting with id ${req.params.id} could not be found`,
				404,
			),
		);
	}
	res.status(200).json({ success: true, data: app_setting });
});

// @desc  create new Product
//@route  POST /api/v1/products
exports.createSetting = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.admin.id;

	const app_setting = await Appsetting.create(req.body);
	res.status(201).json({ success: true, data: app_setting });
});

// @desc  update  Appsettings
//@route  PUT /api/v1/appsettimgs/:id
exports.updateSetting = asyncHandler(async (req, res, next) => {
	let app_setting = await Appsetting.findByIdAndUpdate(req.params.id);
	if (!app_setting) {
		return next(
			new ErrorResponse(
				`App Setting with id ${req.params.id} could not be found`,
				404,
			),
		);
	}
	app_setting = await Appsetting.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: app_setting,
		message: 'Successfully Updated!!',
	});
});

// @desc  Delete  appSetting
//@route  DELETE /api/v1/appsettings/:id
exports.deleteSetting = asyncHandler(async (req, res, next) => {
	let app_setting = await Appsetting.findById(req.params.id);
	if (!app_setting) {
		return next(
			new ErrorResponse(
				`App Setting with id ${req.params.id} has already been deleted`,
				404,
			),
		);
	}
	app_setting.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
