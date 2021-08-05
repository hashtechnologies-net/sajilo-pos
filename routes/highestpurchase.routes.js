/** @format */

const express = require('express');
const purchaseController = require('../controller/purchase.controller');
const router = express.Router();

router.route('/').get(purchaseController.getHighestPurchase);
