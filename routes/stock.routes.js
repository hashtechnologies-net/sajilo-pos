/** @format */

const express = require('express');
const stockController = require('../controller/stock.controller');
const router = express.Router();
const authprotect = require('../middleware/authAdmin');

router.route('/').get(authprotect.protect, stockController.getStock);
router.route('/adjustments').post(authprotect.protect,stockController.stockAdjustment)

module.exports = router;
