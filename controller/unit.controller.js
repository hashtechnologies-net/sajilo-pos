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
	const unit1 = await Unit.findById(req.params.id).populate('admin_id');

	if (!unit1) {
		return next(
			new ErrorResponse(`Unit not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: unit1 });
});
// @desc  create new Unit
//@route  POST /api/v1/units

exports.createUnit = asyncHandler(async (req, res, next) => {
	req.body.created_by = req.admin.id;

	const Cunit = await Unit.create(req.body);
	res.status(201).json({ success: true, data: Cunit });
});

// @desc  update  Unit
//@route  PUT /api/v1/units/:id
exports.updateUnit = asyncHandler(async (req, res, next) => {
	const Uunit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!Uunit) {
		return next(
			new ErrorResponse(`Unit not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: Uunit });
});

// @desc  Delete  unit
//@route  DELETE /api/v1/units/:id
exports.deleteUnit = asyncHandler(async (req, res, next) => {
	const deleteUnit = await Unit.findByIdAndDelete(req.params.id);
	if (!deleteUnit) {
		return next(
			new ErrorResponse(
				`Already deleted Unit with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: {} });
});
