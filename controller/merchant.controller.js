/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Merchant = require('../models/merchant.models');

// @desc  get all merchants
//@route  GET /api/v1/merchants
exports.getAllMerchants = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});
// @desc  get single merchants
//@route  GET /api/v1/merchants/:id
exports.getSingleMerchant = asyncHandler(async (req, res, next) => {
	const merchant1 = await Merchant.findById(req.params.id);

	if (!merchant1) {
		return next(
			new ErrorResponse(
				`Merchant not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: merchant1 });
});
// @desc  create new merchant
//@route  POST /api/v1/merchants
exports.createMerchant = asyncHandler(async (req, res, next) => {
	const Cmerchant = await Merchant.create(req.body);
	res.status(201).json({ success: true, Cmerchant });
});
// @desc  update  merchant
//@route  PUT /api/v1/merchants/:id
exports.updateMerchant = asyncHandler(async (req, res, next) => {
	const Umerchant = await Merchant.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!Umerchant) {
		return next(
			new ErrorResponse(
				`Merchant not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: Umerchant });
});
// @desc  Delete  Merchant
//@route  DELETE /api/v1/merchants/:id
exports.deleteMerchant = asyncHandler(async (req, res, next) => {
	const deleteMerchant = await Merchant.findByIdAndDelete(req.params.id);
	if (!deleteMerchant) {
		return next(
			new ErrorResponse(
				`Already deleted merchant with id of ${req.params.id}`,
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
