/** @format */

const express = require('express');
const businessInfoController = require('../controller/businessInfo.controller');
const allqueryresults = require('../middleware/allqueryresults');
const BusinessInfo = require('../models/businessInfo.models');
const { protect } = require('../middleware/authAdmin');
const upload = require('../middleware/logoUpload');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(BusinessInfo), businessInfoController.getAllInfo)
	.post(protect, upload.single('logo'), businessInfoController.createNewInfo);

router
	.route('/:id')
	.get(businessInfoController.getSingleInfo)
	.put(protect, upload.single('logo'), businessInfoController.updateInfo)
	.delete(protect, businessInfoController.deleteInfo);

module.exports = router;
