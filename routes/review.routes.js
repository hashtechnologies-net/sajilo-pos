/** @format */

const express = require('express');
const allqueryresults = require('../middleware/allqueryresults');

const Review = require('../models/review.models');

const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/vendoradmin');
const authCustomer = require('../middleware/authCustomer');

const {
	getAllReviews,
	getSingleReview,
	addReview,
	updateReview,
	deleteReview,
	reviewStatus,
} = require('../controller/review.controller');

router
	.route('/')
	.get(
		allqueryresults(Review, {
			path: 'product',
			select: 'product_name product_code',
		}),
		getAllReviews
	)

	.post(authCustomer.protect, addReview);

router.route('/status/:id').put(protect, reviewStatus);

router
	.route('/:id')
	.get(getSingleReview)
	.put(authCustomer.protect, updateReview)
	.delete(deleteReview);

module.exports = router;
