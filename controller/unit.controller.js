/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Unit = require('../models/unit.model');
const Product = require('../models/product.models');

// @desc  get all units
//@route  GET /api/v1/units
exports.getAllUnit = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

// @desc  get single Unit
//@route  GET /api/v1/units/:id
exports.getSingleUnit = asyncHandler(async (req, res, next) => {
	const units = await Unit.findById(req.params.id).populate('admin_id');

	if (!units) {
		return next(
			new ErrorResponse(`Unit not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: units });
});
// @desc  create new Unit
//@route  POST /api/v1/units

exports.createUnit = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.admin.id;
	const units = await Unit.create(req.body);
	res.status(201).json({ success: true, data: units });
});

// @desc  update  Unit
//@route  PUT /api/v1/units/:id
exports.updateUnit = asyncHandler(async (req, res, next) => {
	let units = await Unit.findByIdAndUpdate(req.params.id);
	if (!units) {
		return next(
			new ErrorResponse(
				`Unit with id ${req.params.id} could not be found`,
				404
			)
		);
	}

	units = await Unit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (Object.keys(req.body).length === 0) {
		return next(new ErrorResponse(`Nothing to update`, 200));
	}
	res.status(200).json({
		success: true,
		data: units,
		message: 'Successfully Updated!!',
	});
});

// @desc  Delete  unit
//@route  DELETE /api/v1/units/:id
exports.deleteUnit = asyncHandler(async (req, res, next) => {
	const units = await Unit.findById(req.params.id);
	if (!units) {
		return next(
			new ErrorResponse(
				`Unit with id ${req.params.id} has already been deleted`,
				404
			)
		);
	}
	units.remove();
	res.status(200).json({
		success: true,
		data: {},
		message: 'Successfully deleted !!',
	});
});
