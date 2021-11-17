/** @format */

const express = require('express');
const router = express.Router();
const AppsettingController = require('../controller/app_setting.controller');

const AppSetting = require('../models/appsetting.models');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');

router
	.route('/')
	.get(
		authprotect.protect,
		allqueryresults(
			AppSetting,

			{
				path: 'created_by',
				select: 'username',
			},
		),
		AppsettingController.getAllSetting,
	)
	.post(
		authprotect.protect,

		AppsettingController.createSetting,
	);

router
	.route('/:id')
	.get(authprotect.protect, AppsettingController.getSingleSetting)
	.put(authprotect.protect, AppsettingController.updateSetting)
	.delete(authprotect.protect, AppsettingController.deleteSetting);

module.exports = router;
