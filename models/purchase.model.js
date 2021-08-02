/** @format */

const mongoose = require('mongoose');
const PurchaseSchema = new mongoose.Schema({
	description: [
		{
			product: {
				type: mongoose.Schema.ObjectId,
				ref: 'product',
				required: true,
			},
			stock: {
				type: Number,
				required: [true, 'Please add the stock number'],
			},
		},
	],

	merchant_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'merchant',
		required: true,
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'admin',
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('purchase', PurchaseSchema);

/*
        type: [Object],
		required: [true, 'Please add the description'],
        */
