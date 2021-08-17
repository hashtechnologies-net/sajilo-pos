const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.photoUpload = asyncHandler(async (req, res, next) => {
	console.log(req.files);
});
