/** @format */

const express = require('express');
const unitController = require('../controller/unit.controller');

const Unit = require('../models/unit.model');
const allqueryresults = require('../middleware/allqueryresults');
const authprotect = require('../middleware/authAdmin');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(Unit), unitController.getAllUnit)
	.post(authprotect.protect, unitController.createUnit);

router
	.route('/:id')
	.get(unitController.getSingleUnit)
	.put(authprotect.protect, unitController.updateUnit)
	.delete(authprotect.protect, unitController.deleteUnit);

module.exports = router;
